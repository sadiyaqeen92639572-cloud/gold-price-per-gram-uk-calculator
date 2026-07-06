const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
const SITE_URL = CONFIG.siteUrl;

const CARAT_KEYS = ['24k', '22k', '21k', '18k', '14k', '9ct'];

// Per-page content — each purity page has a genuinely distinct angle/use-case section
// (not a title-swapped template) to avoid a near-duplicate-content SEO risk.
const CARATS = {
  '24k': {
    slug: '24-carat-gold-price-per-gram-uk',
    label: '24 Carat', shortLabel: '24k', hallmark: '999',
    title: '24 Carat Gold Price Per Gram UK Today (24k) — Live Calculator',
    metaDesc: 'Live 24 carat (24k) gold price per gram in the UK today, updated 3× daily. Pure investment-grade gold, hallmarked 999 — calculator in GBP.',
    keywords: 'price of gold per gram uk today 24 carat, 24k gold price per gram uk, pure gold price per gram uk',
    h1: '24 Carat Gold Price Per Gram UK Today',
    intro: 'The price of gold per gram UK today for 24 carat — the purest form, hallmarked 999 — is the closest figure to the raw international spot price, with no purity discount applied. This is the rate used for gold bullion, Britannia coins and Sovereigns.',
    angleTitle: 'Why 24 Carat Gold Is for Investment, Not Jewellery',
    angleBody: 'At 99.9% pure, 24 carat gold is too soft for everyday jewellery — it scratches and bends easily, which is why rings and bracelets are almost always a lower carat alloyed with other metals. 24k gold is instead the standard for investment products: bullion bars, Britannia and Sovereign coins, and gold certificates. If you\'re pricing an investment coin or bar rather than a piece of jewellery, this is the purity you want.',
    faq: [
      { q: 'Why is 24 carat gold too soft for jewellery?', a: '24 carat gold is 99.9% pure with almost no alloy metals to add hardness, so rings and bracelets made from it deform and scratch easily. Jewellery is usually made from 22k, 18k, 14k or 9ct gold instead, which is alloyed with metals like copper and silver for strength.' },
      { q: 'What does 999 mean on a gold hallmark?', a: '999 indicates 99.9% pure gold by weight — the hallmark used for 24 carat gold bullion, coins and bars in the UK.' },
    ],
  },
  '22k': {
    slug: '22-carat-gold-price-per-gram-uk',
    label: '22 Carat', shortLabel: '22k', hallmark: '916',
    title: '22 Carat Gold Price Per Gram UK Today (22k) — Per Gram & Per 10 Gram',
    metaDesc: 'Live 22 carat (22k) gold price per gram UK today, plus price per 10 grams. Hallmarked 916 — the standard for South Asian wedding jewellery.',
    keywords: 'price of gold per gram uk today 22 carat, price of gold per gram uk today 22k, 22 carat gold price in uk today per 10 gram, 22k gold price in uk today per 10 gram',
    h1: '22 Carat Gold Price Per Gram UK Today',
    intro: 'The price of gold per gram UK today for 22 carat (22k), hallmarked 916, is the benchmark most often quoted for South Asian bridal and wedding jewellery — sets are frequently priced and sold by the 10-gram unit rather than a single gram, so this page shows both.',
    angleTitle: '22 Carat Gold in Wedding & Bridal Jewellery',
    angleBody: '22 carat (916) gold is the traditional standard for South Asian wedding jewellery — bridal sets, dowry (dot) pieces and festival gold are almost always this purity, valued for its rich colour and high gold content while still being workable enough for intricate designs. Because these pieces are often bought and valued in larger units, jewellers and buyers commonly ask for the 22 carat gold price per 10 grams rather than per single gram — the calculator below gives you both instantly.',
    extra10gBox: true,
    faq: [
      { q: 'What does 916 mean on gold jewellery?', a: '916 means the item is 91.6% pure gold by weight — the standard hallmark for 22 carat gold, widely used in South Asian and Middle Eastern jewellery.' },
      { q: 'Why is 22 carat gold popular for wedding jewellery?', a: 'It balances a high gold content (and rich yellow colour) with enough alloy strength to hold intricate bridal designs, making it the traditional standard for South Asian wedding and dowry jewellery.' },
      { q: 'How do I convert the 22 carat price per gram to price per 10 grams?', a: 'Multiply the price per gram by 10. This calculator does it automatically — enter any weight, or read the dedicated "price per 10g" figure shown alongside the per-gram result.' },
    ],
  },
  '21k': {
    slug: '21-carat-gold-price-per-gram-uk',
    label: '21 Carat', shortLabel: '21k', hallmark: '875',
    title: '21 Carat Gold Price Per Gram UK Today (21k) — Live Calculator',
    metaDesc: 'Live 21 carat (21k) gold price per gram UK today. Hallmarked 875 — common in Middle Eastern and Gulf-import jewellery. Calculator in GBP.',
    keywords: 'price of gold per gram uk today 21 carat, 21k gold price per gram uk',
    h1: '21 Carat Gold Price Per Gram UK Today',
    intro: 'The price of gold per gram UK today for 21 carat (21k), hallmarked 875, sits between 22k and 18k in purity — it\'s the standard most often seen on jewellery imported from the Middle East and Gulf region.',
    angleTitle: '21 Carat Gold in Middle Eastern Jewellery',
    angleBody: '21 carat gold, hallmarked 875, is the everyday standard in much of the Middle East and Gulf — it\'s common to find necklaces, bangles and sets bought while travelling, or inherited pieces, stamped 875 rather than the UK\'s more familiar 375 or 750. If you\'ve had a piece valued or hallmark-checked and it reads 875, this is the purity to use for an accurate price.',
    faq: [
      { q: 'What does 875 mean on a gold hallmark?', a: '875 indicates 87.5% pure gold by weight — the standard hallmark for 21 carat gold, common on jewellery from the Middle East and Gulf region.' },
      { q: 'Is 21 carat gold common in the UK?', a: 'It\'s less common as a UK retail standard (which favours 9ct, 18k and 22k) but frequently appears on jewellery bought abroad or imported from Middle Eastern markets.' },
    ],
  },
  '18k': {
    slug: '18-carat-gold-price-per-gram-uk',
    label: '18 Carat', shortLabel: '18k', hallmark: '750',
    title: '18 Carat Gold Price Per Gram UK Today (18k) — Live Calculator',
    metaDesc: 'Live 18 carat (18k) gold price per gram UK today. Hallmarked 750 — the UK standard for engagement rings and fine jewellery. Calculator in GBP.',
    keywords: 'price of gold per gram uk today 18 carat, 18k gold price per gram uk',
    h1: '18 Carat Gold Price Per Gram UK Today',
    intro: 'The price of gold per gram UK today for 18 carat (18k), hallmarked 750, is the standard most UK jewellers use for engagement rings and fine jewellery — a balance of rich gold colour and everyday durability.',
    angleTitle: '18 Carat Gold in Engagement Rings & Fine Jewellery',
    angleBody: '18 carat gold (750) is 75% pure gold alloyed with metals like copper, silver or palladium — strong enough for a ring worn daily, while keeping noticeably more gold colour and value than 9ct. It\'s the UK jeweller\'s default recommendation for engagement and wedding rings set with diamonds or other stones, since it holds claws and settings securely without excessive wear over years of wear.',
    faq: [
      { q: 'What does 750 mean on a gold hallmark?', a: '750 indicates 75% pure gold by weight — the standard hallmark for 18 carat gold, the most common choice for UK engagement and wedding rings.' },
      { q: 'Is 18 carat gold better than 9 carat for a ring?', a: 'Neither is objectively "better" — 18 carat has more gold and colour but is softer, while 9 carat is more scratch-resistant and cheaper. 18 carat is preferred for rings with stone settings; 9 carat suits everyday, budget-conscious pieces.' },
    ],
  },
  '14k': {
    slug: '14k-gold-price-per-gram-uk',
    label: '14 Carat', shortLabel: '14k', hallmark: '585',
    title: '14k Gold Price Per Gram UK Today — Live Calculator',
    metaDesc: 'Live 14k gold price per gram UK today. Hallmarked 585 — common on US-imported jewellery. Calculator in GBP, updated 3× daily.',
    keywords: 'price of gold per gram uk today 14k, price of 14k gold per gram uk today, 14 carat gold price per gram uk',
    h1: '14k Gold Price Per Gram UK Today',
    intro: 'The price of gold per gram UK today for 14k gold, hallmarked 585, is worth checking separately from UK-standard purities — 14k is the everyday jewellery standard in the US, so pieces bought there or imported carry this stamp instead of the UK\'s familiar 9ct or 18k.',
    angleTitle: '14k Gold in US-Imported Jewellery',
    angleBody: '14 carat (585) gold is the most common jewellery purity in the United States, much as 9ct is in the UK — durable, more affordable than 18k, and widely used for chains, rings and watches. If you\'ve bought jewellery in the US or received a piece from an American retailer, it\'s very likely stamped 14K or 585 rather than a UK carat mark, so use this page rather than the 9ct or 18k pages for an accurate valuation.',
    faq: [
      { q: 'What does 585 mean on a gold hallmark?', a: '585 indicates 58.5% pure gold by weight — the standard hallmark for 14 carat gold, most commonly used for jewellery sold in the United States.' },
      { q: 'Is 14k gold the same as UK 14 carat gold?', a: 'Yes — 14k and 14 carat refer to the same purity (58.5% pure gold, hallmarked 585); "14k" is simply the more common way it\'s written and stamped on jewellery from the US market.' },
    ],
  },
  '9ct': {
    slug: '9ct-gold-price-per-gram-uk',
    label: '9 Carat', shortLabel: '9ct', hallmark: '375',
    title: '9ct Gold Price Per Gram UK Today — Live Calculator',
    metaDesc: 'Live 9ct gold price per gram UK today. Hallmarked 375 — the UK\'s most common everyday jewellery standard. Calculator in GBP, updated 3× daily.',
    keywords: 'price of gold per gram uk today 9ct, 9 carat gold price per gram uk',
    h1: '9 Carat (9ct) Gold Price Per Gram UK Today',
    intro: 'The price of gold per gram UK today for 9 carat (9ct), hallmarked 375, matters most to UK shoppers — it\'s by far the most common gold purity sold on the UK high street, valued for being affordable and hard-wearing.',
    angleTitle: '9ct Gold — The UK\'s Everyday Jewellery Standard',
    angleBody: '9 carat gold (375) is only 37.5% pure gold, alloyed heavily with copper, silver and other metals — the legal minimum that can still be called "gold" in the UK. That lower gold content makes it the most affordable and scratch-resistant option, which is exactly why it dominates UK high-street jewellery: signet rings, chains, earrings and everyday pieces from most British retailers are 9ct unless stated otherwise.',
    faq: [
      { q: 'What does 375 mean on a gold hallmark?', a: '375 indicates 37.5% pure gold by weight — the standard hallmark for 9 carat gold, the UK\'s legal minimum and most common jewellery purity.' },
      { q: 'Why is most UK jewellery 9 carat gold?', a: '9 carat gold is the cheapest legally-recognised gold purity in the UK and the most durable against everyday scratches and knocks, which is why the majority of UK high-street jewellery — rings, chains, earrings — is sold at this purity.' },
    ],
  },
};

const SCRAP_PAGE = {
  slug: 'scrap-gold-price-per-gram-uk',
  title: 'Scrap Gold Price Per Gram UK Today — Selling Calculator',
  metaDesc: 'Estimate what scrap gold is worth per gram in the UK today. Live spot-based calculator with an adjustable dealer discount — see the price of gold per gram UK today to sell.',
  keywords: 'price of scrap gold per gram uk today, price of gold per gram uk today to sell, sell scrap gold uk',
  h1: 'Scrap Gold Price Per Gram UK Today',
  intro: 'If you\'re asking the price of gold per gram UK today to sell broken chains, mismatched earrings or old jewellery for melt value, the figure you need isn\'t the raw spot price — dealers buy at a discount to cover refining and their margin. This page estimates that scrap price by purity.',
  angleTitle: 'Why Scrap Gold Sells Below the Spot Price',
  angleBody: 'When you sell gold for scrap, a dealer isn\'t paying the live spot rate — they\'re paying spot minus a margin that covers refining costs, testing, and their own profit. This calculator applies an adjustable estimate factor to the live per-gram price by purity, clearly labelled as an <strong>estimate, not a quote</strong> — actual dealer offers vary by purity, weight sold, and which dealer you use. Always get a second quote before selling, and ask whether the dealer tests purity in front of you.',
  faq: [
    { q: 'Will I get the full spot price for scrap gold?', a: 'No. Dealers buy scrap gold below the live spot price to cover refining costs and their margin. The exact discount varies by dealer, purity and the weight you\'re selling — this calculator shows an adjustable estimate, not a guaranteed quote.' },
    { q: 'How can I get the best price when selling scrap gold?', a: 'Get quotes from at least two or three dealers, ask them to test purity in front of you, and sell items together by purity (9ct separate from 18ct, for example) rather than as a mixed lot, since mixed-purity gold is often valued at the lowest purity present.' },
    { q: 'Does the purity of my scrap gold affect the price per gram?', a: 'Yes — significantly. 22ct scrap is worth much more per gram than 9ct scrap, since 9ct is only 37.5% pure gold by weight. Always check the hallmark before comparing offers.' },
  ],
};

const METHODOLOGY_PAGE = {
  slug: 'methodology',
  title: 'Methodology — How Gold Price Per Gram UK Is Calculated',
  metaDesc: 'How goldpricepergram.co.uk calculates its live gold price per gram: data source, update frequency, formula, and a live worked example.',
  h1: 'Methodology',
};

function relatedCaratLinks(excludeKey) {
  return CARAT_KEYS.filter(k => k !== excludeKey).map(k => {
    const c = CARATS[k];
    return `<a class="link-card" href="/${c.slug}/"><div class="t">${c.label} (${c.shortLabel})</div><div class="sub">Hallmark ${c.hallmark}</div></a>`;
  }).join('\n    ');
}

function headBoilerplate(page) {
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title}</title>
<meta name="description" content="${page.metaDesc}">
${page.keywords ? `<meta name="keywords" content="${page.keywords}">` : ''}
<link rel="canonical" href="${SITE_URL}/${page.slug}/">
<meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.metaDesc}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE_URL}/${page.slug}/">
<meta name="twitter:card" content="summary_large_image">`;
}

const SHARED_STYLE = `<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root { --brand:#a8790a; --brand-dark:#6b4d05; --brand-light:#fbf3de; --text:#241f12; --muted:#7a6f5c; --border:#ece1c9; --bg:#faf8f2; --radius:12px; }
body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:var(--text); background:var(--bg); font-size:16px; line-height:1.65; }
header { background:linear-gradient(135deg,var(--brand-dark) 0%,var(--brand) 100%); color:#fff; padding:52px 20px 88px; text-align:center; }
header .badge { display:inline-block; background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.3); border-radius:20px; padding:4px 14px; font-size:.78rem; font-weight:600; letter-spacing:.4px; margin-bottom:16px; }
header h1 { font-size:clamp(1.5rem,4vw,2.2rem); font-weight:800; margin-bottom:12px; }
header p { color:rgba(255,255,255,.92); font-size:1rem; max-width:600px; margin:0 auto; }
.container { max-width:840px; margin:0 auto; padding:0 20px; }
.tool-wrapper { margin:-56px auto 48px; }
.tool-card { background:#fff; border-radius:var(--radius); box-shadow:0 8px 40px rgba(107,77,5,.14); border:1px solid var(--border); padding:32px 28px; }
@media (max-width:580px){ .tool-card{ padding:22px 16px; } }
.refresh-line { font-size:.78rem; color:var(--muted); text-align:center; margin-bottom:18px; }
.fallback-banner { display:none; background:#fff3cd; border:1px solid #f0c94a; color:#5c4a00; border-radius:8px; padding:10px 14px; font-size:.82rem; margin-bottom:16px; text-align:center; }
.form-grid { display:grid; grid-template-columns:1fr; gap:16px; max-width:320px; margin:0 auto; }
.form-group { display:flex; flex-direction:column; gap:6px; }
label { font-size:.79rem; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:.5px; }
input[type=number] { border:2px solid var(--border); border-radius:8px; padding:12px 14px; font-size:1rem; color:var(--text); background:#fff; width:100%; }
input[type=number]:focus { outline:none; border-color:var(--brand); }
.calc-btn { width:100%; margin-top:22px; padding:17px; background:var(--brand); color:#fff; border:none; border-radius:10px; font-size:1.08rem; font-weight:700; cursor:pointer; }
.calc-btn:hover { background:var(--brand-dark); }
.result { display:none; margin-top:26px; }
.result-hero { background:linear-gradient(135deg,var(--brand-dark),var(--brand)); border-radius:10px; padding:26px; color:#fff; text-align:center; margin-bottom:14px; }
.result-hero .rl { font-size:.76rem; font-weight:700; text-transform:uppercase; letter-spacing:.5px; opacity:.85; margin-bottom:4px; }
.result-hero .ra { font-size:2.5rem; font-weight:900; line-height:1.1; }
.result-hero .rs { font-size:.9rem; opacity:.9; margin-top:6px; }
.result-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
@media (max-width:480px){ .result-grid{ grid-template-columns:1fr 1fr; } }
.r-stat { background:var(--brand-light); border-radius:8px; padding:14px; text-align:center; }
.r-stat .sv { font-size:1.15rem; font-weight:800; color:var(--brand-dark); }
.r-stat .sl { font-size:.72rem; color:var(--muted); margin-top:2px; }
.content { padding-bottom:64px; }
h2.st { font-size:1.3rem; font-weight:800; margin:48px 0 16px; }
p { color:#3d3520; margin-bottom:14px; line-height:1.75; }
.link-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(190px,1fr)); gap:12px; margin:18px 0; }
.link-card { display:block; background:#fff; border:1px solid var(--border); border-radius:10px; padding:16px; text-decoration:none; color:var(--text); }
.link-card:hover { border-color:var(--brand); }
.link-card .t { font-weight:700; font-size:.92rem; margin-bottom:3px; }
.link-card .sub { font-size:.76rem; color:var(--muted); }
.method { background:#fff; border:1px solid var(--border); border-radius:12px; padding:26px 26px 18px; margin:0 0 36px; font-size:.9rem; }
.method .code { background:#2c2408; color:#f2e3c5; border-radius:8px; padding:16px 18px; font-family:'Courier New',monospace; font-size:.82rem; line-height:1.9; margin:14px 0; overflow-x:auto; }
.faq-item { border-bottom:1px solid var(--border); }
.faq-q { width:100%; background:none; border:none; text-align:left; padding:17px 0; font-size:.92rem; font-weight:600; cursor:pointer; display:flex; justify-content:space-between; align-items:center; color:var(--text); }
.faq-q::after { content:'+'; font-size:1.3rem; color:var(--brand); flex-shrink:0; margin-left:12px; }
.faq-q.open::after { content:'−'; }
.faq-a { display:none; padding:0 0 16px; font-size:.88rem; color:#4b4326; line-height:1.75; }
.faq-a.open { display:block; }
.disc { background:#3a2f0e; border-radius:8px; padding:13px 18px; margin-bottom:16px; font-size:.78rem; color:#d9c9a3; line-height:1.6; }
footer { background:#2c2408; color:#c9bd9c; text-align:center; padding:30px 20px; font-size:.8rem; }
footer p { color:#c9bd9c; }
footer a { color:#e9dcc0; }
</style>`;

function faqJsonLd(faq) {
  return faq.map(f => `        { "@type": "Question", "name": ${JSON.stringify(f.q)}, "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(f.a)} } }`).join(',\n');
}

function faqHtml(faq) {
  return faq.map(f => `  <div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)">${f.q}</button>
    <div class="faq-a">${f.a}</div></div>`).join('\n');
}

function buildCaratPage(key, page) {
  const jsonLd = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "${page.label} Gold Price Per Gram UK Calculator",
      "url": "${SITE_URL}/${page.slug}/",
      "description": "${page.metaDesc}",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "inLanguage": "en-GB",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
${faqJsonLd(page.faq)}
      ]
    }
  ]
}
</script>`;

  const per10gBox = page.extra10gBox ? `
        <div class="r-stat"><div class="sv" id="r-per10g"></div><div class="sl">Price per 10g</div></div>` : '';

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
${headBoilerplate(page)}

<!-- START_PRICE_DATA -->
<script>window.GOLD_DATA = ${JSON.stringify(require('./gold-data.json'))};</script>
<!-- END_PRICE_DATA -->

${jsonLd}
${SHARED_STYLE}
</head>
<body>

<header>
  <div class="container">
    <div class="badge">🥇 Hallmark ${page.hallmark} · updated 3×/day</div>
    <h1>${page.h1}</h1>
    <p>${page.intro}</p>
  </div>
</header>

<div class="container">
<div class="tool-wrapper">
  <div class="tool-card">
    <div class="refresh-line" id="refreshLine">Last refreshed: —</div>
    <div class="fallback-banner" id="fallbackBanner">⚠ Using cached rate — live API temporarily unavailable</div>
    <div class="form-grid">
      <div class="form-group">
        <label>Weight (grams)</label>
        <input type="number" id="wGrams" min="0.1" step="0.1" value="10" placeholder="e.g. 10">
      </div>
    </div>
    <button class="calc-btn" onclick="calculate()">Calculate ${page.label} Gold Price →</button>

    <div class="result" id="result">
      <div class="result-hero">
        <div class="rl">Total value (GBP)</div>
        <div class="ra" id="r-total"></div>
        <div class="rs" id="r-sub"></div>
      </div>
      <div class="result-grid">
        <div class="r-stat"><div class="sv" id="r-perGram"></div><div class="sl">Price per gram</div></div>${per10gBox}
        <div class="r-stat"><div class="sv" id="r-perOz"></div><div class="sl">Price per troy oz</div></div>
      </div>
    </div>
  </div>
</div>

<div class="content">
  <h2 class="st">${page.angleTitle}</h2>
  <p>${page.angleBody}</p>

  <h2 class="st">Other Purities &amp; Related Pages</h2>
  <div class="link-grid">
    ${relatedCaratLinks(key)}
    <a class="link-card" href="/scrap-gold-price-per-gram-uk/"><div class="t">Scrap Gold</div><div class="sub">Selling &amp; dealer estimate</div></a>
    <a class="link-card" href="/"><div class="t">Main Calculator</div><div class="sub">All purities in one tool</div></a>
    <a class="link-card" href="/methodology/"><div class="t">Methodology</div><div class="sub">Data source &amp; formula</div></a>
  </div>

  <h2 class="st">Frequently Asked Questions</h2>
${faqHtml(page.faq)}
</div>
</div>

<footer>
  <div class="container">
    <div class="disc">Prices are an indicative live spot rate, not a dealer quote — always confirm with a dealer before selling. Data source: goldapi.io.</div>
    <p><a href="/methodology/">Methodology</a> · Gold Price Per Gram UK</p>
  </div>
</footer>

<script>
const TROY_OZ_G = 31.1035;
const PURITY = '${key}';
function fmtGBP(n){ return '£' + n.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2}); }
function refreshBanner(){
  const gd = window.GOLD_DATA;
  const line = document.getElementById('refreshLine');
  const banner = document.getElementById('fallbackBanner');
  line.textContent = gd.lastUpdated ? 'Last refreshed: ' + new Date(gd.lastUpdated).toLocaleString('en-GB', {dateStyle:'medium', timeStyle:'short'}) : 'Last refreshed: pending first update';
  banner.style.display = gd.isFallback ? 'block' : 'none';
}
function calculate(){
  const gd = window.GOLD_DATA;
  const grams = parseFloat(document.getElementById('wGrams').value) || 0;
  const perGram = gd.pricePerGram[PURITY];
  if(perGram == null){ alert('Live price not yet available — please check back shortly.'); return; }
  if(grams<=0){ alert('Please enter a weight in grams.'); return; }
  document.getElementById('r-total').textContent = fmtGBP(perGram*grams);
  document.getElementById('r-sub').textContent = grams+'g · ${page.shortLabel} gold';
  document.getElementById('r-perGram').textContent = fmtGBP(perGram);
  ${page.extra10gBox ? "document.getElementById('r-per10g').textContent = fmtGBP(perGram*10);" : ''}
  document.getElementById('r-perOz').textContent = fmtGBP(perGram*TROY_OZ_G);
  document.getElementById('result').style.display='block';
  document.getElementById('result').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function toggleFaq(b){ b.classList.toggle('open'); b.nextElementSibling.classList.toggle('open'); }
refreshBanner();
</script>
</body>
</html>
`;
}

function buildScrapPage(page) {
  const jsonLd = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Scrap Gold Price Per Gram UK Calculator",
      "url": "${SITE_URL}/${page.slug}/",
      "description": "${page.metaDesc}",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "inLanguage": "en-GB",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
${faqJsonLd(page.faq)}
      ]
    }
  ]
}
</script>`;

  const options = CARAT_KEYS.map(k => `<option value="${k}">${CARATS[k].label} (${CARATS[k].shortLabel}) — ${CARATS[k].hallmark}</option>`).join('\n          ');

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
${headBoilerplate(page)}

<!-- START_PRICE_DATA -->
<script>window.GOLD_DATA = ${JSON.stringify(require('./gold-data.json'))};</script>
<!-- END_PRICE_DATA -->

${jsonLd}
${SHARED_STYLE}
<style>select{border:2px solid var(--border);border-radius:8px;padding:12px 14px;font-size:1rem;color:var(--text);background:#fff;width:100%;}select:focus{outline:none;border-color:var(--brand);}</style>
</head>
<body>

<header>
  <div class="container">
    <div class="badge">💰 Estimate only · adjustable</div>
    <h1>${page.h1}</h1>
    <p>${page.intro}</p>
  </div>
</header>

<div class="container">
<div class="tool-wrapper">
  <div class="tool-card">
    <div class="refresh-line" id="refreshLine">Last refreshed: —</div>
    <div class="fallback-banner" id="fallbackBanner">⚠ Using cached rate — live API temporarily unavailable</div>
    <div class="form-grid" style="max-width:420px;">
      <div class="form-group">
        <label>Weight (grams)</label>
        <input type="number" id="wGrams" min="0.1" step="0.1" value="10" placeholder="e.g. 10">
      </div>
      <div class="form-group">
        <label>Purity</label>
        <select id="purity">
          ${options}
        </select>
      </div>
    </div>
    <button class="calc-btn" onclick="calculate()">Estimate Scrap Value →</button>

    <div class="result" id="result">
      <div class="result-hero">
        <div class="rl">Estimated scrap value (GBP)</div>
        <div class="ra" id="r-total"></div>
        <div class="rs" id="r-sub"></div>
      </div>
      <div class="result-grid">
        <div class="r-stat"><div class="sv" id="r-perGram"></div><div class="sl">Est. scrap £/gram</div></div>
        <div class="r-stat"><div class="sv" id="r-spot"></div><div class="sl">Live spot £/gram</div></div>
      </div>
      <p style="font-size:.76rem;color:var(--muted);margin-top:10px;text-align:center;">Estimate only — not a dealer quote. Actual offers vary by purity, volume and dealer.</p>
    </div>
  </div>
</div>

<div class="content">
  <h2 class="st">${page.angleTitle}</h2>
  <p>${page.angleBody}</p>

  <h2 class="st">Other Pages</h2>
  <div class="link-grid">
    ${relatedCaratLinks('')}
    <a class="link-card" href="/"><div class="t">Main Calculator</div><div class="sub">All purities in one tool</div></a>
    <a class="link-card" href="/methodology/"><div class="t">Methodology</div><div class="sub">Data source &amp; formula</div></a>
  </div>

  <h2 class="st">Frequently Asked Questions</h2>
${faqHtml(page.faq)}
</div>
</div>

<footer>
  <div class="container">
    <div class="disc">Prices are an indicative live spot rate, not a dealer quote — always confirm with a dealer before selling. Data source: goldapi.io.</div>
    <p><a href="/methodology/">Methodology</a> · Gold Price Per Gram UK</p>
  </div>
</footer>

<script>
function fmtGBP(n){ return '£' + n.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2}); }
function refreshBanner(){
  const gd = window.GOLD_DATA;
  const line = document.getElementById('refreshLine');
  const banner = document.getElementById('fallbackBanner');
  line.textContent = gd.lastUpdated ? 'Last refreshed: ' + new Date(gd.lastUpdated).toLocaleString('en-GB', {dateStyle:'medium', timeStyle:'short'}) : 'Last refreshed: pending first update';
  banner.style.display = gd.isFallback ? 'block' : 'none';
}
function calculate(){
  const gd = window.GOLD_DATA;
  const grams = parseFloat(document.getElementById('wGrams').value) || 0;
  const purity = document.getElementById('purity').value;
  const spotPerGram = gd.pricePerGram[purity];
  const scrapPerGram = gd.scrapPricePerGram[purity];
  if(scrapPerGram == null){ alert('Live price not yet available — please check back shortly.'); return; }
  if(grams<=0){ alert('Please enter a weight in grams.'); return; }
  document.getElementById('r-total').textContent = fmtGBP(scrapPerGram*grams);
  document.getElementById('r-sub').textContent = grams+'g · '+purity+' scrap gold (estimate)';
  document.getElementById('r-perGram').textContent = fmtGBP(scrapPerGram);
  document.getElementById('r-spot').textContent = fmtGBP(spotPerGram);
  document.getElementById('result').style.display='block';
  document.getElementById('result').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function toggleFaq(b){ b.classList.toggle('open'); b.nextElementSibling.classList.toggle('open'); }
refreshBanner();
</script>
</body>
</html>
`;
}

function buildMethodologyPage(page) {
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
${headBoilerplate(page)}

<!-- START_PRICE_DATA -->
<script>window.GOLD_DATA = ${JSON.stringify(require('./gold-data.json'))};</script>
<!-- END_PRICE_DATA -->

${SHARED_STYLE}
</head>
<body>

<header>
  <div class="container">
    <div class="badge">📐 Data source &amp; formula</div>
    <h1>${page.h1}</h1>
    <p>How this site's gold price per gram is sourced, calculated and refreshed.</p>
  </div>
</header>

<div class="container">
<div class="content" style="padding-top:64px;">
  <h2 class="st">Data Source</h2>
  <p>Live spot gold prices are sourced from <a href="https://www.goldapi.io/" target="_blank" rel="noopener">goldapi.io</a>, queried in GBP against the XAU (gold) symbol. This is a live wholesale/interbank-style spot price, not a retail dealer quote.</p>

  <h2 class="st">Update Frequency</h2>
  <p>The price is refreshed <strong>three times per day</strong> via an automated job. Every page always shows the exact "Last refreshed" timestamp of the data currently displayed. If the live feed is temporarily unavailable, the site falls back to the last known price and shows a clear "using cached rate" banner rather than a broken or zeroed page.</p>

  <h2 class="st">Calculation Formula</h2>
  <div class="method">
    <div class="code">
<span>price_per_gram(24k) = spot_price_per_troy_oz(GBP) / 31.1035</span><br>
<span>price_per_gram(purity) = price_per_gram(24k) × purity_fraction</span><br>
<span>scrap_estimate(purity) = price_per_gram(purity) × dealer_discount_factor</span>
    </div>
    <p id="liveExample" style="font-size:.85rem;color:var(--muted);"></p>
  </div>

  <h2 class="st">Purity Fractions Used</h2>
  <table style="width:100%;border-collapse:collapse;margin:18px 0;font-size:.88rem;">
    <thead><tr style="background:var(--brand);color:#fff;"><th style="padding:10px 14px;text-align:left;">Purity</th><th style="padding:10px 14px;text-align:left;">Hallmark</th><th style="padding:10px 14px;text-align:left;">Fine gold fraction</th></tr></thead>
    <tbody>
      ${CARAT_KEYS.map(k => `<tr><td style="padding:10px 14px;border-bottom:1px solid var(--border);">${CARATS[k].label}</td><td style="padding:10px 14px;border-bottom:1px solid var(--border);">${CARATS[k].hallmark}</td><td style="padding:10px 14px;border-bottom:1px solid var(--border);">${CONFIG.purities[k].fraction}</td></tr>`).join('\n      ')}
    </tbody>
  </table>

  <h2 class="st">Scrap / Dealer Discount</h2>
  <p>The scrap gold estimate applies a configurable discount factor (currently ${CONFIG.dealerDiscountFactor}) to the live per-gram price. This is explicitly an <strong>estimate, not a market rule</strong> — real dealer offers vary by purity, weight sold and the individual dealer. Always get a real quote before selling.</p>

  <h2 class="st">Who Runs This Site</h2>
  <p>Gold Price Per Gram UK is an independent calculator site. It is not a dealer, refiner or financial adviser, and prices shown are indicative only — always confirm with a dealer or jeweller before any transaction.</p>

  <div class="link-grid" style="margin-top:32px;">
    <a class="link-card" href="/"><div class="t">Main Calculator</div><div class="sub">All purities in one tool</div></a>
    ${relatedCaratLinks('')}
    <a class="link-card" href="/scrap-gold-price-per-gram-uk/"><div class="t">Scrap Gold</div><div class="sub">Selling &amp; dealer estimate</div></a>
  </div>
</div>
</div>

<footer>
  <div class="container">
    <div class="disc">Prices are an indicative live spot rate, not a dealer quote — always confirm with a dealer before selling. Data source: goldapi.io.</div>
    <p>Gold Price Per Gram UK</p>
  </div>
</footer>

<script>
(function(){
  const gd = window.GOLD_DATA;
  const el = document.getElementById('liveExample');
  if(gd && gd.pricePerGram && gd.pricePerGram['24k'] != null){
    const g24 = gd.pricePerGram['24k'];
    const oz = (g24*31.1035).toFixed(2);
    el.textContent = 'Live worked example (as of last refresh): spot ≈ £' + oz + '/oz → £' + g24.toFixed(2) + '/g at 24k.';
  } else {
    el.textContent = 'Live worked example will appear once the first price update has run.';
  }
})();
</script>
</body>
</html>
`;
}

// --- Write files ---
for (const key of CARAT_KEYS) {
  const page = CARATS[key];
  const dir = path.join(ROOT, page.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildCaratPage(key, page));
  console.log(`✓ ${page.slug}/index.html`);
}

fs.mkdirSync(path.join(ROOT, SCRAP_PAGE.slug), { recursive: true });
fs.writeFileSync(path.join(ROOT, SCRAP_PAGE.slug, 'index.html'), buildScrapPage(SCRAP_PAGE));
console.log(`✓ ${SCRAP_PAGE.slug}/index.html`);

fs.mkdirSync(path.join(ROOT, METHODOLOGY_PAGE.slug), { recursive: true });
fs.writeFileSync(path.join(ROOT, METHODOLOGY_PAGE.slug, 'index.html'), buildMethodologyPage(METHODOLOGY_PAGE));
console.log(`✓ ${METHODOLOGY_PAGE.slug}/index.html`);

console.log('Done. Run update-data.js next to inject live prices.');
