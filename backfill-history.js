const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const hashes = execSync('git log --format=%H --reverse -- gold-data.json', { cwd: ROOT, encoding: 'utf8' })
  .trim().split('\n').filter(Boolean);

const history = [];
for (const h of hashes) {
  let raw;
  try {
    raw = execSync(`git show ${h}:gold-data.json`, { cwd: ROOT, encoding: 'utf8' });
  } catch (e) {
    continue;
  }
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    continue;
  }
  if (!data.lastUpdated || data.spotPricePerOzGBP == null || !data.pricePerGram) continue;
  const last = history[history.length - 1];
  if (last && last.t === data.lastUpdated) continue; // dedupe identical timestamp
  history.push({
    t: data.lastUpdated,
    spot: data.spotPricePerOzGBP,
    g24k: data.pricePerGram['24k'],
    g22k: data.pricePerGram['22k'],
    g18k: data.pricePerGram['18k'],
    g9ct: data.pricePerGram['9ct'],
  });
}

fs.writeFileSync(path.join(ROOT, 'history.json'), JSON.stringify(history, null, 0));
console.log(`✓ history.json — ${history.length} data points, ${history[0].t} → ${history[history.length - 1].t}`);
