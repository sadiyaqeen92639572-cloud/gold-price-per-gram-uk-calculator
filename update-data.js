const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = __dirname;
const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
const DATA_FILE = path.join(ROOT, 'gold-data.json');
const HISTORY_FILE = path.join(ROOT, 'history.json');
const SITEMAP_FILE = path.join(ROOT, 'sitemap.xml');
const HISTORY_MAX_POINTS = 3000; // ~3x/day → covers roughly 2.5 years before oldest points roll off
const { buildSVG, buildStats } = require('./history-chart.js');

const GOLDAPI_KEY = process.env.GOLDAPI_KEY;
const MOCK_MODE = process.argv.includes('--mock');
const FORCE_FAIL = process.argv.includes('--force-fail'); // test fallback path without touching real API

function fetchSpot() {
  return new Promise((resolve, reject) => {
    const url = new URL(CONFIG.apiEndpoint);
    const req = https.request(url, { headers: { 'x-access-token': GOLDAPI_KEY } }, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`goldapi.io returned HTTP ${res.statusCode}: ${body.slice(0, 200)}`));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(`Failed to parse goldapi.io response: ${e.message}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function mockSpot() {
  // Representative mock shape matching goldapi.io's real response fields, for local testing without burning API quota.
  return Promise.resolve({
    timestamp: Math.floor(Date.now() / 1000),
    metal: 'XAU',
    currency: 'GBP',
    price: 2380.5,
    price_gram_24k: 76.52,
    price_gram_22k: 70.16,
    price_gram_21k: 66.96,
    price_gram_20k: 63.77,
    price_gram_18k: 57.39,
    price_gram_16k: 51.01,
    price_gram_14k: 44.77,
    price_gram_10k: 31.93,
  });
}

function computePrices(apiResponse) {
  const pricePerGram = {};
  const scrapPricePerGram = {};
  for (const [key, purity] of Object.entries(CONFIG.purities)) {
    const gramPrice = purity.apiField && apiResponse[purity.apiField] != null
      ? apiResponse[purity.apiField]
      : apiResponse.price_gram_24k * purity.fraction;
    pricePerGram[key] = Number(gramPrice.toFixed(2));
    scrapPricePerGram[key] = Number((gramPrice * CONFIG.dealerDiscountFactor).toFixed(2));
  }
  return { pricePerGram, scrapPricePerGram };
}

function injectIntoPage(filePath, data) {
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠ skipped (not generated yet): ${filePath}`);
    return;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  const marker = /<!-- START_PRICE_DATA -->[\s\S]*?<!-- END_PRICE_DATA -->/;
  const block = `<!-- START_PRICE_DATA -->\n<script>window.GOLD_DATA = ${JSON.stringify(data)};</script>\n<!-- END_PRICE_DATA -->`;
  if (!marker.test(html)) {
    console.warn(`  ⚠ no price-data markers found in: ${filePath}`);
    return;
  }
  fs.writeFileSync(filePath, html.replace(marker, block));
  console.log(`  ✓ injected: ${filePath}`);
}

function appendHistory(data) {
  if (data.isFallback) return; // don't record a repeated stale price as a new data point
  let history = [];
  if (fs.existsSync(HISTORY_FILE)) {
    try { history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8')); } catch (e) { history = []; }
  }
  const last = history[history.length - 1];
  if (last && last.t === data.lastUpdated) return; // already recorded
  history.push({
    t: data.lastUpdated,
    spot: data.spotPricePerOzGBP,
    g24k: data.pricePerGram['24k'],
    g22k: data.pricePerGram['22k'],
    g18k: data.pricePerGram['18k'],
    g9ct: data.pricePerGram['9ct'],
  });
  if (history.length > HISTORY_MAX_POINTS) history = history.slice(history.length - HISTORY_MAX_POINTS);
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history));
  console.log(`  ✓ history.json — appended, now ${history.length} points`);
  return history;
}

function injectHistoryChart(history) {
  const filePath = path.join(ROOT, 'gold-price-history-uk', 'index.html');
  if (!history || !fs.existsSync(filePath)) return;
  const html = fs.readFileSync(filePath, 'utf8');
  const marker = /<!-- START_HISTORY_CHART -->[\s\S]*?<!-- END_HISTORY_CHART -->/;
  if (!marker.test(html)) { console.warn('  ⚠ no history-chart markers found'); return; }
  const svg = buildSVG(history, 'g24k');
  const stats = buildStats(history, 'g24k');
  const statsScript = `<script>window.GOLD_HISTORY_STATS = ${JSON.stringify(stats)};</script>`;
  const block = `<!-- START_HISTORY_CHART -->\n${svg}\n${statsScript}\n<!-- END_HISTORY_CHART -->`;
  fs.writeFileSync(filePath, html.replace(marker, block));
  console.log('  ✓ injected: gold-price-history-uk/index.html chart');
}

function updateSitemapLastmod(todayISO) {
  if (!fs.existsSync(SITEMAP_FILE)) return;
  let xml = fs.readFileSync(SITEMAP_FILE, 'utf8');
  xml = xml.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${todayISO}</lastmod>`);
  fs.writeFileSync(SITEMAP_FILE, xml);
  console.log(`  ✓ sitemap.xml lastmod → ${todayISO}`);
}

async function main() {
  console.log(`🪙 Gold Price Per Gram UK — update-data.js`);
  const previous = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

  let data;
  try {
    if (FORCE_FAIL) throw new Error('forced failure (--force-fail test)');
    if (!MOCK_MODE && !GOLDAPI_KEY) throw new Error('GOLDAPI_KEY env var not set');

    const apiResponse = MOCK_MODE ? await mockSpot() : await fetchSpot();
    const { pricePerGram, scrapPricePerGram } = computePrices(apiResponse);

    data = {
      lastUpdated: new Date().toISOString(),
      isFallback: false,
      spotPricePerOzGBP: apiResponse.price,
      pricePerGram,
      scrapPricePerGram,
      note: null,
    };
    console.log(`  ✓ live fetch OK — 24k = £${pricePerGram['24k']}/g`);
  } catch (err) {
    console.error(`  ✗ live fetch failed: ${err.message}`);
    if (previous.pricePerGram && previous.pricePerGram['24k'] != null) {
      data = { ...previous, isFallback: true, note: `Fallback: live fetch failed (${err.message}), showing last known price.` };
      console.log(`  → falling back to cached price from ${previous.lastUpdated}`);
    } else {
      console.error('  ✗ no previous cached price available either — aborting without touching pages.');
      process.exit(1);
    }
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  console.log('Injecting into pages:');
  for (const page of CONFIG.pages) {
    injectIntoPage(path.join(ROOT, page.file), data);
  }

  const history = appendHistory(data);
  injectHistoryChart(history || (fs.existsSync(HISTORY_FILE) ? JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8')) : null));

  updateSitemapLastmod(data.lastUpdated ? data.lastUpdated.slice(0, 10) : new Date().toISOString().slice(0, 10));

  console.log('Done.');
}

main();
