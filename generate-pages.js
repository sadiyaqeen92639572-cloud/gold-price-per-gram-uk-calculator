const fs = require('fs');
const path = require('path');
const { buildSVG, buildStats } = require('./history-chart.js');

const ROOT = __dirname;
const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
const SITE_URL = CONFIG.siteUrl;
const US_URL = CONFIG.sisterSiteUrl;
const HISTORY = fs.existsSync(path.join(ROOT, 'history.json')) ? JSON.parse(fs.readFileSync(path.join(ROOT, 'history.json'), 'utf8')) : [];

const CARAT_KEYS = ['24k', '22k', '21k', '18k', '14k', '9ct'];

// hreflang counterpart on the US site — only for carats that genuinely exist on both sites.
// 21k and 9ct have no US equivalent (US low end is 10k, a different purity), so no hreflang pair.
const US_HREFLANG_PATH = {
  '24k': '24k-gold-price-per-gram',
  '22k': '22k-gold-price-per-gram',
  '18k': '18k-gold-price-per-gram',
  '14k': '14k-gold-price-per-gram',
};

function hreflangTags(caratKey) {
  const usPath = caratKey ? US_HREFLANG_PATH[caratKey] : '';
  if (caratKey && !usPath) return ''; // no US counterpart (21k, 9ct) — no hreflang pair
  const ukPath = caratKey ? CARATS[caratKey].slug + '/' : '';
  const ukHref = `${SITE_URL}/${ukPath}`;
  const usHref = usPath ? `${US_URL}/${usPath}/` : `${US_URL}/`;
  return `<link rel="alternate" hreflang="en-GB" href="${ukHref}">
<link rel="alternate" hreflang="en-US" href="${usHref}">`;
}

function siteBanner() {
  return `<div class="site-banner"><a href="https://goldpricepergram.co.uk/" class="sb-link active">🇬🇧 UK site · GBP</a><a href="https://usgoldpricepergram.com/" class="sb-link">🇺🇸 US site · USD</a></div>`;
}

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
    { q: 'What percentage of the spot price do UK gold dealers typically pay?', a: 'As a rough guide, specialist online bullion/scrap dealers tend to pay towards the higher end (commonly cited around 80-92% of spot for good-purity scrap), while high-street jewellers and especially pawnbrokers often pay less. These are general market ranges, not a quote — always compare actual offers.' },
    { q: 'Should I sell scrap gold to a local jeweller or a specialist online dealer?', a: 'Specialist online dealers (bullion/scrap refiners) usually offer better rates than a local jeweller or pawnbroker because refining and reselling gold at scale is their core business, but a local sale avoids postage and lets you inspect the process in person — weigh convenience against the size of the price gap for your specific weight and purity.' },
  ],
  sellGuideHtml: `
  <h2 class="st">What Percentage Do Gold Dealers Actually Pay?</h2>
  <table style="width:100%;border-collapse:collapse;margin:18px 0;font-size:.88rem;">
    <thead><tr style="background:var(--brand);color:#fff;"><th style="padding:10px 14px;text-align:left;">Seller type</th><th style="padding:10px 14px;text-align:left;">Typical % of spot (indicative)</th></tr></thead>
    <tbody>
      <tr><td style="padding:10px 14px;border-bottom:1px solid var(--border);">Specialist bullion/scrap dealers</td><td style="padding:10px 14px;border-bottom:1px solid var(--border);">~80-92%</td></tr>
      <tr><td style="padding:10px 14px;border-bottom:1px solid var(--border);">High-street jewellers</td><td style="padding:10px 14px;border-bottom:1px solid var(--border);">~65-85%</td></tr>
      <tr><td style="padding:10px 14px;border-bottom:1px solid var(--border);">Pawnbrokers &amp; cash-for-gold shops</td><td style="padding:10px 14px;border-bottom:1px solid var(--border);">~50-75%</td></tr>
      <tr><td style="padding:10px 14px;border-bottom:1px solid var(--border);">Postal cash-for-gold services</td><td style="padding:10px 14px;border-bottom:1px solid var(--border);">~60-85%</td></tr>
    </tbody>
  </table>
  <p style="font-size:.82rem;color:var(--muted);">Indicative ranges only, based on typical UK market patterns — not a quote from any specific dealer, and actual offers vary by weight, purity and how competitive a particular buyer is on the day.</p>

  <h2 class="st">Questions to Ask Before You Sell</h2>
  <ul style="margin:0 0 20px 20px;line-height:1.9;color:#3d3520;">
    <li>Will you test the purity in front of me, and how?</li>
    <li>Is your price based on today's spot rate — what rate are you using right now?</li>
    <li>Do you value mixed-purity items separately, or all at the lowest purity present?</li>
    <li>Is the quote in writing, and does it expire?</li>
    <li>What's your fee or deduction if I decide not to proceed (especially for postal services)?</li>
  </ul>

  <h2 class="st">Where to Get a Quote</h2>
  <p>This site doesn't buy gold itself — it's a price reference, not a dealer. A few well-known UK options if you want to compare quotes (not endorsements, and not a complete list):</p>
  <div class="link-grid">
    <a class="link-card" href="https://www.bullionbypost.co.uk/" target="_blank" rel="noopener noreferrer"><div class="t">BullionByPost</div><div class="sub">Online bullion dealer</div></a>
    <a class="link-card" href="https://www.gold.co.uk/" target="_blank" rel="noopener noreferrer"><div class="t">Gold.co.uk</div><div class="sub">Online bullion dealer</div></a>
    <a class="link-card" href="https://www.hattongardenmetals.com/" target="_blank" rel="noopener noreferrer"><div class="t">Hatton Garden Metals</div><div class="sub">Refiner, London</div></a>
  </div>
  <p style="font-size:.78rem;color:var(--muted);">Always get at least two or three quotes before selling — prices and service quality vary.</p>
`,
};

const OUNCE_PAGE = {
  slug: 'gold-price-per-ounce-uk',
  title: 'Gold Price Per Ounce UK Today — Live Troy Ounce Calculator',
  metaDesc: 'Live gold price per troy ounce in the UK today, GBP, by purity (24k, 22k, 18k, 9ct). The bullion-industry standard unit — updated 3× daily.',
  keywords: 'gold price per ounce uk, gold price per troy ounce uk, gold ounce price uk today, troy ounce gold price gbp',
  h1: 'Gold Price Per Ounce UK Today',
  badgeText: 'Troy ounce · bullion standard',
  intro: 'The gold price per troy ounce in the UK today, in GBP — the standard unit used for bullion bars, coins and interbank spot pricing, as opposed to the per-gram price used for jewellery.',
  shortLabel: 'Per Ounce',
  unitLabel: 'troy oz', unitLabelSingular: 'troy oz', unitLabelSingularCap: 'Troy Ounce',
  gramsPerUnit: CONFIG.troyOzToGrams,
  step: '0.01', defaultValue: '1',
  angleTitle: 'Why Gold Is Priced Per Troy Ounce, Not a Standard Ounce',
  angleBody: 'A troy ounce (31.1035g) is heavier than the everyday avoirdupois ounce (28.35g) used for food or post — bullion, coins and the interbank spot price are always quoted in troy ounces, a convention dating back to medieval bullion trading. If you\'re pricing a bar, Sovereign or Britannia coin rather than jewellery, this is the unit dealers and price charts will quote.',
  faq: [
    { q: 'How many grams are in a troy ounce of gold?', a: 'A troy ounce is 31.1035 grams — heavier than the 28.35g "standard" (avoirdupois) ounce used for everyday weights. All gold bullion and spot prices use the troy ounce.' },
    { q: 'Is the gold price per ounce the same as the spot price?', a: 'For 24k (999.9 fine) gold, yes — the troy ounce price is the raw interbank spot price. For 22k, 21k, 18k and 14k, the per-ounce price comes from goldapi.io\'s own per-purity quote (scaled up to a troy ounce), not from scaling the spot price by a fraction. 9ct is the exception, calculated as the 24k price × 0.375, since goldapi.io has no 9ct field.' },
    { q: 'Why do bullion dealers quote per ounce and jewellers quote per gram?', a: 'Bullion (bars, coins) is bought and sold in large enough units that the troy ounce is a practical, industry-standard size. Jewellery pieces are usually a few grams, so pricing per gram is more useful for valuing a ring, chain or bracelet.' },
  ],
};

const KG_PAGE = {
  slug: 'gold-price-per-kg-uk',
  title: 'Gold Price Per Kg UK Today — Live Kilogram Calculator',
  metaDesc: 'Live gold price per kilogram in the UK today, GBP, by purity. The wholesale/bulk unit for large bars and institutional trades — updated 3× daily.',
  keywords: 'gold price per kg uk, gold price per kilogram uk today, gold kilo price uk, gold bar price per kg uk',
  h1: 'Gold Price Per Kg UK Today',
  badgeText: 'Kilogram · wholesale/bulk',
  intro: 'The gold price per kilogram in the UK today, in GBP — the unit used for large bullion bars (a standard "good delivery" bar is roughly 12.4kg) and bulk or institutional-scale gold trades.',
  shortLabel: 'Per Kg',
  unitLabel: 'kg', unitLabelSingular: 'kg', unitLabelSingularCap: 'Kilogram',
  gramsPerUnit: 1000,
  step: '0.001', defaultValue: '1',
  angleTitle: 'Gold Price Per Kilogram — Bulk & Bar Pricing',
  angleBody: 'A kilogram of gold is 1,000 grams — a size relevant to 1kg investment bars, or for scaling up a per-gram price to value a larger holding, estate or bulk lot without doing the multiplication by hand. Large "good delivery" bars used in the London bullion market are around 12.4kg (400 troy oz), so this unit is also a useful reference point when that figure is quoted.',
  faq: [
    { q: 'How much does 1kg of 24 carat gold cost in the UK?', a: 'Multiply the live 24 carat price per gram by 1,000 — the calculator above does this instantly and updates with the live spot price.' },
    { q: 'What is a "good delivery" gold bar?', a: 'The London bullion market\'s standard wholesale bar, weighing approximately 400 troy ounces (about 12.4kg) of gold at a minimum 995 fineness — the benchmark unit for institutional gold trading, distinct from the smaller 1kg or 1oz bars sold to retail investors.' },
    { q: 'Is buying gold by the kilogram cheaper per gram than buying small bars?', a: 'Generally yes — larger bars carry a smaller fabrication/premium markup per gram than small bars or coins, though this calculator shows the raw spot-based price only, not dealer premiums.' },
  ],
};

const COINS = {
  fullSovereign: { label: 'Full Sovereign', weightG: 7.98805, purity: '22k', purityLabel: '22 carat (916)' },
  halfSovereign: { label: 'Half Sovereign', weightG: 3.99403, purity: '22k', purityLabel: '22 carat (916)' },
  britannia: { label: 'Britannia (1oz)', weightG: 31.1035, purity: '24k', purityLabel: '24 carat (999.9)' },
};

const SOVEREIGN_PAGE = {
  slug: 'gold-sovereign-price-uk',
  title: 'Gold Sovereign Price UK Today — Live Calculator (Full & Half Sovereign)',
  metaDesc: 'Live gold Sovereign and half Sovereign price UK today, GBP — plus whether Sovereigns and Britannias are Capital Gains Tax-free for UK residents.',
  keywords: 'gold sovereign price uk, half sovereign price uk, sovereign coin gold price today, are gold sovereigns tax free uk, gold sovereign cgt exempt',
  h1: 'Gold Sovereign Price UK Today',
  faq: [
    { q: 'What is a gold Sovereign made of?', a: 'A full Sovereign weighs 7.98805g at 22 carat (916, 91.6% pure) gold — the same purity used in South Asian wedding jewellery, though the Sovereign is a UK-minted legal tender coin rather than a piece of jewellery.' },
    { q: 'Are gold Sovereigns free of Capital Gains Tax in the UK?', a: 'For UK residents, gains on UK legal tender gold coins — including Sovereigns, half-Sovereigns and Britannias minted by the Royal Mint — are generally exempt from Capital Gains Tax, because they count as sterling currency rather than a chargeable asset. This is general information, not personal tax advice; confirm your own position with HMRC or an accountant, especially if you deal in coins as a trade or aren\'t UK tax resident.' },
    { q: 'Is a Krugerrand also Capital Gains Tax-free in the UK?', a: 'No — the South African Krugerrand is not UK legal tender, so it does not qualify for the same CGT exemption as Sovereigns or Britannias. This distinction is a common reason UK buyers specifically choose UK-minted coins for investment.' },
    { q: 'What is the difference between a Sovereign and a Britannia?', a: 'A Sovereign is 22 carat gold (916) weighing 7.98805g, with a long numismatic history dating to 1817. A Britannia is 24 carat (999.9 fine) gold, typically sold in 1 troy oz size, introduced more recently as a pure-gold investment coin. Both are UK legal tender and both benefit from the same CGT exemption for UK residents.' },
  ],
};

const HISTORY_PAGE = {
  slug: 'gold-price-history-uk',
  title: 'Gold Price History UK — Live Chart & Data Per Gram (GBP)',
  metaDesc: 'Gold price history UK per gram in GBP, charted from real live-tracked data — not a scraped estimate. See the trend, high/low and % change since tracking began.',
  keywords: 'gold price history uk, gold price chart uk, gold price per gram history, gold price uk over time',
  h1: 'Gold Price History UK',
  faq: [
    { q: 'Where does this historical gold price data come from?', a: 'Every point on this chart is a real price this site fetched and published live, three times a day, since tracking began — not a scraped or reconstructed estimate. The archive grows automatically with each update, so the further back in time you look, the more of the chart is genuine recorded history.' },
    { q: 'Why does the chart only cover a few weeks/months so far?', a: 'The tracker is actively building its own historical archive in real time rather than backfilling with third-party data of unknown accuracy. Longer ranges (6 months, 1 year, 5 years) will appear automatically as the site continues running — check the "tracking since" date on this page.' },
    { q: 'How often is the gold price history updated?', a: 'A new data point is added roughly three times a day, in step with the live price refresh — see the methodology page for the exact schedule.' },
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

function headBoilerplate(page, caratKey) {
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title}</title>
<meta name="description" content="${page.metaDesc}">
${page.keywords ? `<meta name="keywords" content="${page.keywords}">` : ''}
<link rel="canonical" href="${SITE_URL}/${page.slug}/">
${hreflangTags(caratKey)}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.png" type="image/png">
<meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.metaDesc}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE_URL}/${page.slug}/">
<meta property="og:image" content="${SITE_URL}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${SITE_URL}/og-image.png">`;
}

const SHARED_STYLE = `<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root { --brand:#a8790a; --brand-dark:#6b4d05; --brand-light:#fbf3de; --text:#241f12; --muted:#7a6f5c; --border:#ece1c9; --bg:#faf8f2; --radius:12px; }
.site-banner { position:sticky; top:0; z-index:200; display:flex; justify-content:center; gap:6px; padding:7px 10px; background:#2c2408; border-bottom:1px solid rgba(255,255,255,.08); }
.sb-link { display:inline-flex; align-items:center; gap:5px; padding:5px 14px; border-radius:20px; font-size:.8rem; font-weight:600; text-decoration:none; color:#e9dcc0; border:1px solid rgba(255,255,255,.14); }
.sb-link:hover { background:rgba(255,255,255,.10); }
.sb-link.active { background:#fff; color:#2c2408; border-color:#fff; }
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
.eeat-section { background:#fff; border:1px solid var(--border); border-radius:var(--radius); padding:32px; margin-top:32px; box-shadow:0 4px 20px rgba(107,77,5,.05); }
.eeat-title { font-size:1.3rem; font-weight:800; color:var(--brand-dark); margin-bottom:24px; display:flex; align-items:center; gap:10px; border-bottom:2px solid var(--brand-light); padding-bottom:12px; }
.eeat-grid { display:grid; grid-template-columns:1.2fr 1fr; gap:32px; }
@media (max-width:768px) { .eeat-grid { grid-template-columns:1fr; gap:24px; } }
.eeat-author-card { display:flex; gap:16px; align-items:flex-start; }
.eeat-avatar { width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg,var(--brand) 0%,var(--brand-dark) 100%); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:1.4rem; flex-shrink:0; box-shadow:0 4px 10px rgba(107,77,5,.15); }
.eeat-author-info h3 { font-size:1.1rem; font-weight:700; color:var(--brand-dark); margin-bottom:2px; }
.eeat-author-subtitle { font-size:.82rem; font-weight:700; color:var(--brand); text-transform:uppercase; letter-spacing:.5px; margin-bottom:10px; }
.eeat-author-info p { font-size:.92rem; color:var(--muted); line-height:1.6; }
.eeat-compliance { display:flex; flex-direction:column; gap:18px; }
.eeat-badge-list { display:flex; flex-wrap:wrap; gap:8px; }
.eeat-badge { display:inline-flex; align-items:center; gap:6px; background:var(--brand-light); color:var(--brand-dark); font-size:.78rem; font-weight:700; padding:6px 12px; border-radius:20px; border:1px solid rgba(107,77,5,.1); }
.eeat-compliance-item { display:flex; gap:12px; align-items:flex-start; }
.eeat-compliance-icon { color:var(--brand); flex-shrink:0; margin-top:3px; }
.eeat-compliance-text h4 { font-size:.95rem; font-weight:700; color:var(--brand-dark); margin-bottom:2px; }
.eeat-compliance-text p { font-size:.88rem; color:var(--muted); line-height:1.5; margin-bottom:0; }
.eeat-compliance-text a { color:var(--brand); text-decoration:underline; }
.eeat-compliance-text a:hover { color:var(--brand-dark); }
</style>`;

function eeatBlock() {
  return `<div class="container" style="padding-top:0;">
  <div class="eeat-section">
    <h2 class="eeat-title">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--brand);"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
      Transparency &amp; Methodology
    </h2>
    <div class="eeat-grid">
      <div class="eeat-author-card">
        <div class="eeat-avatar">GP</div>
        <div class="eeat-author-info">
          <h3>Gold Price Per Gram UK</h3>
          <div class="eeat-author-subtitle">Independent, Open-Source Live Tracker</div>
          <p>An independent calculator that pulls a live gold spot price and applies the standard troy-ounce-to-gram conversion deterministically — no manual price entry, no AI estimate.</p>
        </div>
      </div>
      <div class="eeat-compliance">
        <div class="eeat-badge-list">
          <span class="eeat-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Live goldapi.io feed
          </span>
          <span class="eeat-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            Updated 3×/day
          </span>
        </div>
        <div class="eeat-compliance-item">
          <svg class="eeat-compliance-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
          <div class="eeat-compliance-text">
            <h4>Methodology &amp; Limitations</h4>
            <p>Prices are the live interbank/wholesale spot rate sourced from <a href="https://www.goldapi.io/" target="_blank" rel="noopener noreferrer">goldapi.io</a>, not a retail dealer quote. See the full <a href="/methodology/">methodology</a> for the exact formula and update schedule.</p>
          </div>
        </div>
        <div class="eeat-compliance-item">
          <svg class="eeat-compliance-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <div class="eeat-compliance-text">
            <h4>Not a Dealer or Adviser</h4>
            <p>This site is not a bullion dealer, refiner or financial adviser — prices are indicative only. Before selling, compare quotes from a reputable dealer; for industry-standard benchmark pricing see the <a href="https://www.lbma.org.uk/prices-and-data/lbma-gold-price" target="_blank" rel="noopener noreferrer">LBMA Gold Price</a>.</p>
          </div>
        </div>
        <div class="eeat-compliance-item">
          <svg class="eeat-compliance-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          <div class="eeat-compliance-text">
            <h4>Open Source</h4>
            <p>The fetch, formula and page-generation code is public. Inspect it or suggest improvements on <a href="https://github.com/sadiyaqeen92639572-cloud/gold-price-per-gram-uk-calculator" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

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
    },
    {
      "@type": "Organization",
      "name": "Gold Price Per Gram UK",
      "legalName": "Gesmine-Invest Limited",
      "identifier": { "@type": "PropertyValue", "propertyID": "UK Company Number", "value": "14120136" },
      "address": { "@type": "PostalAddress", "streetAddress": "Hardy House, 269 Poynders Gardens", "addressLocality": "London", "postalCode": "SW4 8PQ", "addressCountry": "GB" }
    }
  ]
}
</script>`;

  const per10gBox = page.extra10gBox ? `
        <div class="r-stat"><div class="sv" id="r-per10g"></div><div class="sl">Price per 10g</div></div>` : '';

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
${headBoilerplate(page, key)}

<!-- START_PRICE_DATA -->
<script>window.GOLD_DATA = ${JSON.stringify(require('./gold-data.json'))};</script>
<!-- END_PRICE_DATA -->

${jsonLd}
${SHARED_STYLE}
</head>
<body>

${siteBanner()}

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
    <a class="link-card" href="/gold-price-history-uk/"><div class="t">Price History</div><div class="sub">Chart &amp; trend</div></a>
    <a class="link-card" href="/gold-price-per-ounce-uk/"><div class="t">Per Troy Ounce</div><div class="sub">Bullion-unit pricing</div></a>
    <a class="link-card" href="/gold-sovereign-price-uk/"><div class="t">Sovereign Coins</div><div class="sub">Sovereign, half-Sovereign, Britannia</div></a>
    <a class="link-card" href="/"><div class="t">Main Calculator</div><div class="sub">All purities in one tool</div></a>
    <a class="link-card" href="/methodology/"><div class="t">Methodology</div><div class="sub">Data source &amp; formula</div></a>
  </div>

  <h2 class="st">Frequently Asked Questions</h2>
${faqHtml(page.faq)}
</div>
</div>

${eeatBlock()}

<footer>
  <div class="container">
    <div class="disc">Prices are an indicative live spot rate, not a dealer quote — always confirm with a dealer before selling. Data source: goldapi.io.</div>
    <p><a href="/methodology/">Methodology</a> · Gold Price Per Gram UK</p>
    <p style="font-size:.72rem;margin-top:8px;">Gold Price Per Gram calculators are part of Gesmine-Invest Limited, registered UK company number 14120136, registered office address at Hardy House, 269 Poynders Gardens, London, London, United Kingdom, SW4 8PQ.</p>
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
fetch('/gold-data.json?t=' + Date.now(), {cache:'no-store'})
  .then(function(r){ return r.ok ? r.json() : null; })
  .then(function(fresh){
    if(fresh && fresh.lastUpdated && new Date(fresh.lastUpdated) > new Date(window.GOLD_DATA.lastUpdated)){
      window.GOLD_DATA = fresh;
      refreshBanner();
    }
  })
  .catch(function(){});
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
    },
    {
      "@type": "Organization",
      "name": "Gold Price Per Gram UK",
      "legalName": "Gesmine-Invest Limited",
      "identifier": { "@type": "PropertyValue", "propertyID": "UK Company Number", "value": "14120136" },
      "address": { "@type": "PostalAddress", "streetAddress": "Hardy House, 269 Poynders Gardens", "addressLocality": "London", "postalCode": "SW4 8PQ", "addressCountry": "GB" }
    }
  ]
}
</script>`;

  const options = CARAT_KEYS.map(k => `<option value="${k}">${CARATS[k].label} (${CARATS[k].shortLabel}) — ${CARATS[k].hallmark}</option>`).join('\n          ');

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
${headBoilerplate(page, null)}

<!-- START_PRICE_DATA -->
<script>window.GOLD_DATA = ${JSON.stringify(require('./gold-data.json'))};</script>
<!-- END_PRICE_DATA -->

${jsonLd}
${SHARED_STYLE}
<style>select{border:2px solid var(--border);border-radius:8px;padding:12px 14px;font-size:1rem;color:var(--text);background:#fff;width:100%;}select:focus{outline:none;border-color:var(--brand);}</style>
</head>
<body>

${siteBanner()}

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
${page.sellGuideHtml || ''}
  <h2 class="st">Other Pages</h2>
  <div class="link-grid">
    ${relatedCaratLinks('')}
    <a class="link-card" href="/"><div class="t">Main Calculator</div><div class="sub">All purities in one tool</div></a>
    <a class="link-card" href="/gold-sovereign-price-uk/"><div class="t">Sovereign Coins</div><div class="sub">Sovereign, half-Sovereign, Britannia</div></a>
    <a class="link-card" href="/methodology/"><div class="t">Methodology</div><div class="sub">Data source &amp; formula</div></a>
  </div>

  <h2 class="st">Frequently Asked Questions</h2>
${faqHtml(page.faq)}
</div>
</div>

${eeatBlock()}

<footer>
  <div class="container">
    <div class="disc">Prices are an indicative live spot rate, not a dealer quote — always confirm with a dealer before selling. Data source: goldapi.io.</div>
    <p><a href="/methodology/">Methodology</a> · Gold Price Per Gram UK</p>
    <p style="font-size:.72rem;margin-top:8px;">Gold Price Per Gram calculators are part of Gesmine-Invest Limited, registered UK company number 14120136, registered office address at Hardy House, 269 Poynders Gardens, London, London, United Kingdom, SW4 8PQ.</p>
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
fetch('/gold-data.json?t=' + Date.now(), {cache:'no-store'})
  .then(function(r){ return r.ok ? r.json() : null; })
  .then(function(fresh){
    if(fresh && fresh.lastUpdated && new Date(fresh.lastUpdated) > new Date(window.GOLD_DATA.lastUpdated)){
      window.GOLD_DATA = fresh;
      refreshBanner();
    }
  })
  .catch(function(){});
</script>
</body>
</html>
`;
}

function buildMethodologyPage(page) {
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
${headBoilerplate(page, null)}

<!-- START_PRICE_DATA -->
<script>window.GOLD_DATA = ${JSON.stringify(require('./gold-data.json'))};</script>
<!-- END_PRICE_DATA -->

${SHARED_STYLE}
</head>
<body>

${siteBanner()}

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
<span>price_per_gram(22k, 21k, 18k, 14k) = goldapi.io's own per-carat quote field (its true fine-gold ratio, not a fixed rounded fraction)</span><br>
<span>price_per_gram(9ct) = price_per_gram(24k) × 0.375  (fallback formula, used because goldapi.io has no 9ct field)</span><br>
<span>scrap_estimate(purity) = price_per_gram(purity) × dealer_discount_factor</span>
    </div>
    <p style="font-size:.85rem;color:var(--muted);">The reference fractions in the table below are shown for comparison and used only as a fallback if goldapi.io's live per-carat field is ever missing — in normal operation, 22k/21k/18k/14k prices come directly from goldapi.io's own quote for that carat, which can differ very slightly (typically under 0.3%) from a simple 24k × nominal-hallmark-fraction calculation.</p>
    <p id="liveExample" style="font-size:.85rem;color:var(--muted);"></p>
  </div>

  <h2 class="st">Purity Fractions — Reference &amp; Fallback Values</h2>
  <table style="width:100%;border-collapse:collapse;margin:18px 0;font-size:.88rem;">
    <thead><tr style="background:var(--brand);color:#fff;"><th style="padding:10px 14px;text-align:left;">Purity</th><th style="padding:10px 14px;text-align:left;">Hallmark</th><th style="padding:10px 14px;text-align:left;">Reference fraction</th><th style="padding:10px 14px;text-align:left;">Price source</th></tr></thead>
    <tbody>
      ${CARAT_KEYS.map(k => `<tr><td style="padding:10px 14px;border-bottom:1px solid var(--border);">${CARATS[k].label}</td><td style="padding:10px 14px;border-bottom:1px solid var(--border);">${CARATS[k].hallmark}</td><td style="padding:10px 14px;border-bottom:1px solid var(--border);">${CONFIG.purities[k].fraction}</td><td style="padding:10px 14px;border-bottom:1px solid var(--border);">${CONFIG.purities[k].apiField ? 'Direct goldapi.io field' : (k === '24k' ? 'Spot ÷ 31.1035' : '24k × fraction (fallback formula)')}</td></tr>`).join('\n      ')}
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

${eeatBlock()}

<footer>
  <div class="container">
    <div class="disc">Prices are an indicative live spot rate, not a dealer quote — always confirm with a dealer before selling. Data source: goldapi.io.</div>
    <p>Gold Price Per Gram UK</p>
    <p style="font-size:.72rem;margin-top:8px;">Gold Price Per Gram calculators are part of Gesmine-Invest Limited, registered UK company number 14120136, registered office address at Hardy House, 269 Poynders Gardens, London, London, United Kingdom, SW4 8PQ.</p>
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

function buildUnitPage(page) {
  const jsonLd = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "${page.h1} Calculator",
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
    },
    {
      "@type": "Organization",
      "name": "Gold Price Per Gram UK",
      "legalName": "Gesmine-Invest Limited",
      "identifier": { "@type": "PropertyValue", "propertyID": "UK Company Number", "value": "14120136" },
      "address": { "@type": "PostalAddress", "streetAddress": "Hardy House, 269 Poynders Gardens", "addressLocality": "London", "postalCode": "SW4 8PQ", "addressCountry": "GB" }
    }
  ]
}
</script>`;

  const options = CARAT_KEYS.map(k => `<option value="${k}"${k === '24k' ? ' selected' : ''}>${CARATS[k].label} (${CARATS[k].shortLabel}) — ${CARATS[k].hallmark}</option>`).join('\n          ');
  const tableRows = CARAT_KEYS.map(k => `<tr><td style="padding:10px 14px;border-bottom:1px solid var(--border);">${CARATS[k].label} (${CARATS[k].shortLabel})</td><td style="padding:10px 14px;border-bottom:1px solid var(--border);" id="row-${k}">—</td></tr>`).join('\n      ');

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
${headBoilerplate(page, null)}

<!-- START_PRICE_DATA -->
<script>window.GOLD_DATA = ${JSON.stringify(require('./gold-data.json'))};</script>
<!-- END_PRICE_DATA -->

${jsonLd}
${SHARED_STYLE}
<style>select{border:2px solid var(--border);border-radius:8px;padding:12px 14px;font-size:1rem;color:var(--text);background:#fff;width:100%;}select:focus{outline:none;border-color:var(--brand);}</style>
</head>
<body>

${siteBanner()}

<header>
  <div class="container">
    <div class="badge">⚖️ ${page.badgeText} · updated 3×/day</div>
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
        <label>Weight (${page.unitLabel})</label>
        <input type="number" id="wUnit" min="0.001" step="${page.step}" value="${page.defaultValue}" placeholder="e.g. ${page.defaultValue}">
      </div>
      <div class="form-group">
        <label>Purity</label>
        <select id="purity">
          ${options}
        </select>
      </div>
    </div>
    <button class="calc-btn" onclick="calculate()">Calculate ${page.shortLabel} Gold Price →</button>

    <div class="result" id="result">
      <div class="result-hero">
        <div class="rl">Total value (GBP)</div>
        <div class="ra" id="r-total"></div>
        <div class="rs" id="r-sub"></div>
      </div>
      <div class="result-grid">
        <div class="r-stat"><div class="sv" id="r-perUnit"></div><div class="sl">Price per ${page.unitLabelSingular}</div></div>
        <div class="r-stat"><div class="sv" id="r-perGram"></div><div class="sl">Price per gram</div></div>
      </div>
    </div>
  </div>
</div>

<div class="content">
  <h2 class="st">Gold Price Per ${page.unitLabelSingularCap} UK — By Purity Today</h2>
  <table style="width:100%;border-collapse:collapse;margin:18px 0;font-size:.88rem;">
    <thead><tr style="background:var(--brand);color:#fff;"><th style="padding:10px 14px;text-align:left;">Purity</th><th style="padding:10px 14px;text-align:left;">Price per ${page.unitLabelSingular} (GBP)</th></tr></thead>
    <tbody id="unitTable">
      ${tableRows}
    </tbody>
  </table>

  <h2 class="st">${page.angleTitle}</h2>
  <p>${page.angleBody}</p>

  <h2 class="st">Other Units &amp; Related Pages</h2>
  <div class="link-grid">
    ${relatedCaratLinks('')}
    <a class="link-card" href="/gold-price-history-uk/"><div class="t">Price History</div><div class="sub">Chart &amp; trend</div></a>
    <a class="link-card" href="/scrap-gold-price-per-gram-uk/"><div class="t">Scrap Gold</div><div class="sub">Selling &amp; dealer estimate</div></a>
    <a class="link-card" href="/methodology/"><div class="t">Methodology</div><div class="sub">Data source &amp; formula</div></a>
  </div>

  <h2 class="st">Frequently Asked Questions</h2>
${faqHtml(page.faq)}
</div>
</div>

${eeatBlock()}

<footer>
  <div class="container">
    <div class="disc">Prices are an indicative live spot rate, not a dealer quote — always confirm with a dealer before selling. Data source: goldapi.io.</div>
    <p><a href="/methodology/">Methodology</a> · Gold Price Per Gram UK</p>
    <p style="font-size:.72rem;margin-top:8px;">Gold Price Per Gram calculators are part of Gesmine-Invest Limited, registered UK company number 14120136, registered office address at Hardy House, 269 Poynders Gardens, London, London, United Kingdom, SW4 8PQ.</p>
  </div>
</footer>

<script>
const GRAMS_PER_UNIT = ${page.gramsPerUnit};
function fmtGBP(n){ return '£' + n.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2}); }
function refreshBanner(){
  const gd = window.GOLD_DATA;
  const line = document.getElementById('refreshLine');
  const banner = document.getElementById('fallbackBanner');
  line.textContent = gd.lastUpdated ? 'Last refreshed: ' + new Date(gd.lastUpdated).toLocaleString('en-GB', {dateStyle:'medium', timeStyle:'short'}) : 'Last refreshed: pending first update';
  banner.style.display = gd.isFallback ? 'block' : 'none';
  populateTable();
}
function populateTable(){
  const gd = window.GOLD_DATA;
  ${CARAT_KEYS.map(k => `if(gd.pricePerGram['${k}'] != null) document.getElementById('row-${k}').textContent = fmtGBP(gd.pricePerGram['${k}'] * GRAMS_PER_UNIT);`).join('\n  ')}
}
function calculate(){
  const gd = window.GOLD_DATA;
  const units = parseFloat(document.getElementById('wUnit').value) || 0;
  const purity = document.getElementById('purity').value;
  const perGram = gd.pricePerGram[purity];
  if(perGram == null){ alert('Live price not yet available — please check back shortly.'); return; }
  if(units<=0){ alert('Please enter a weight.'); return; }
  const grams = units * GRAMS_PER_UNIT;
  document.getElementById('r-total').textContent = fmtGBP(perGram*grams);
  document.getElementById('r-sub').textContent = units+' ${page.unitLabel} · '+purity+' gold';
  document.getElementById('r-perUnit').textContent = fmtGBP(perGram*GRAMS_PER_UNIT);
  document.getElementById('r-perGram').textContent = fmtGBP(perGram);
  document.getElementById('result').style.display='block';
  document.getElementById('result').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function toggleFaq(b){ b.classList.toggle('open'); b.nextElementSibling.classList.toggle('open'); }
refreshBanner();
fetch('/gold-data.json?t=' + Date.now(), {cache:'no-store'})
  .then(function(r){ return r.ok ? r.json() : null; })
  .then(function(fresh){
    if(fresh && fresh.lastUpdated && new Date(fresh.lastUpdated) > new Date(window.GOLD_DATA.lastUpdated)){
      window.GOLD_DATA = fresh;
      refreshBanner();
    }
  })
  .catch(function(){});
</script>
</body>
</html>
`;
}

function buildSovereignPage(page) {
  const jsonLd = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Gold Sovereign Price UK Calculator",
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
    },
    {
      "@type": "Organization",
      "name": "Gold Price Per Gram UK",
      "legalName": "Gesmine-Invest Limited",
      "identifier": { "@type": "PropertyValue", "propertyID": "UK Company Number", "value": "14120136" },
      "address": { "@type": "PostalAddress", "streetAddress": "Hardy House, 269 Poynders Gardens", "addressLocality": "London", "postalCode": "SW4 8PQ", "addressCountry": "GB" }
    }
  ]
}
</script>`;

  const coinRows = Object.entries(COINS).map(([key, c]) =>
    `<tr><td style="padding:10px 14px;border-bottom:1px solid var(--border);">${c.label}</td><td style="padding:10px 14px;border-bottom:1px solid var(--border);">${c.weightG}g</td><td style="padding:10px 14px;border-bottom:1px solid var(--border);">${c.purityLabel}</td><td style="padding:10px 14px;border-bottom:1px solid var(--border);" id="row-${key}">—</td></tr>`
  ).join('\n      ');

  const coinOptions = Object.entries(COINS).map(([key, c]) => `<option value="${key}">${c.label}</option>`).join('\n          ');

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
${headBoilerplate(page, null)}

<!-- START_PRICE_DATA -->
<script>window.GOLD_DATA = ${JSON.stringify(require('./gold-data.json'))};</script>
<!-- END_PRICE_DATA -->

${jsonLd}
${SHARED_STYLE}
<style>select{border:2px solid var(--border);border-radius:8px;padding:12px 14px;font-size:1rem;color:var(--text);background:#fff;width:100%;}select:focus{outline:none;border-color:var(--brand);}</style>
</head>
<body>

${siteBanner()}

<header>
  <div class="container">
    <div class="badge">👑 Sovereign · Half Sovereign · Britannia</div>
    <h1>${page.h1}</h1>
    <p>Live value of UK gold Sovereign, half Sovereign and Britannia coins, priced from the live spot rate — plus the Capital Gains Tax exemption that makes them a popular UK-specific choice.</p>
  </div>
</header>

<div class="container">
<div class="tool-wrapper">
  <div class="tool-card">
    <div class="refresh-line" id="refreshLine">Last refreshed: —</div>
    <div class="fallback-banner" id="fallbackBanner">⚠ Using cached rate — live API temporarily unavailable</div>
    <div class="form-grid" style="max-width:420px;">
      <div class="form-group">
        <label>Coin</label>
        <select id="coin">
          ${coinOptions}
        </select>
      </div>
      <div class="form-group">
        <label>Quantity</label>
        <input type="number" id="qty" min="1" step="1" value="1" placeholder="e.g. 1">
      </div>
    </div>
    <button class="calc-btn" onclick="calculate()">Calculate Coin Value →</button>

    <div class="result" id="result">
      <div class="result-hero">
        <div class="rl">Total value (GBP)</div>
        <div class="ra" id="r-total"></div>
        <div class="rs" id="r-sub"></div>
      </div>
      <div class="result-grid">
        <div class="r-stat"><div class="sv" id="r-perCoin"></div><div class="sl">Price per coin</div></div>
        <div class="r-stat"><div class="sv" id="r-weight"></div><div class="sl">Weight &amp; purity</div></div>
      </div>
    </div>
  </div>
</div>

<div class="content">
  <h2 class="st">Gold Coin Prices UK Today</h2>
  <table style="width:100%;border-collapse:collapse;margin:18px 0;font-size:.88rem;">
    <thead><tr style="background:var(--brand);color:#fff;"><th style="padding:10px 14px;text-align:left;">Coin</th><th style="padding:10px 14px;text-align:left;">Weight</th><th style="padding:10px 14px;text-align:left;">Purity</th><th style="padding:10px 14px;text-align:left;">Value (GBP)</th></tr></thead>
    <tbody>
      ${coinRows}
    </tbody>
  </table>

  <h2 class="st">Are Gold Sovereigns Tax-Free in the UK?</h2>
  <p>For UK residents, one of the main reasons Sovereigns, half-Sovereigns and Britannias are popular over other bullion is that gains on UK legal tender coins are generally exempt from Capital Gains Tax — they're treated as sterling currency rather than a chargeable asset, regardless of how much the coin has risen in value. A South African Krugerrand or a gold bar, by contrast, doesn't carry this exemption since it isn't UK legal tender.</p>
  <p style="font-size:.85rem;background:var(--brand-light);border-radius:8px;padding:14px 16px;">This is general information, not personal tax advice. Your own position can depend on residency, whether you deal in coins as a trade, and current HMRC rules — confirm with <a href="https://www.gov.uk/capital-gains-tax" target="_blank" rel="noopener">HMRC</a> or an accountant before relying on it.</p>

  <h2 class="st">Sovereign vs Half Sovereign vs Britannia</h2>
  <p>The Sovereign (7.98805g, 22 carat/916) has been minted since 1817 and is the classic UK gold coin, with the half Sovereign its smaller counterpart at exactly half the gold content. The Britannia is a newer, purer alternative — 24 carat (999.9 fine), usually sold as a 1 troy oz coin — aimed squarely at investors who want minimal alloy. All three are UK legal tender and share the same CGT treatment for UK residents.</p>

  <h2 class="st">Other Pages</h2>
  <div class="link-grid">
    ${relatedCaratLinks('')}
    <a class="link-card" href="/gold-price-per-ounce-uk/"><div class="t">Per Troy Ounce</div><div class="sub">Bullion-unit pricing</div></a>
    <a class="link-card" href="/gold-price-history-uk/"><div class="t">Price History</div><div class="sub">Chart &amp; trend</div></a>
    <a class="link-card" href="/methodology/"><div class="t">Methodology</div><div class="sub">Data source &amp; formula</div></a>
  </div>

  <h2 class="st">Frequently Asked Questions</h2>
${faqHtml(page.faq)}
</div>
</div>

${eeatBlock()}

<footer>
  <div class="container">
    <div class="disc">Prices are an indicative live spot rate, not a dealer quote — always confirm with a dealer before selling. Not tax advice — confirm your position with HMRC or an accountant. Data source: goldapi.io.</div>
    <p><a href="/methodology/">Methodology</a> · Gold Price Per Gram UK</p>
    <p style="font-size:.72rem;margin-top:8px;">Gold Price Per Gram calculators are part of Gesmine-Invest Limited, registered UK company number 14120136, registered office address at Hardy House, 269 Poynders Gardens, London, London, United Kingdom, SW4 8PQ.</p>
  </div>
</footer>

<script>
const COINS = ${JSON.stringify(Object.fromEntries(Object.entries(COINS).map(([k, c]) => [k, { weightG: c.weightG, purity: c.purity, label: c.label, purityLabel: c.purityLabel }])))};
function fmtGBP(n){ return '£' + n.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2}); }
function refreshBanner(){
  const gd = window.GOLD_DATA;
  const line = document.getElementById('refreshLine');
  const banner = document.getElementById('fallbackBanner');
  line.textContent = gd.lastUpdated ? 'Last refreshed: ' + new Date(gd.lastUpdated).toLocaleString('en-GB', {dateStyle:'medium', timeStyle:'short'}) : 'Last refreshed: pending first update';
  banner.style.display = gd.isFallback ? 'block' : 'none';
  populateTable();
}
function populateTable(){
  const gd = window.GOLD_DATA;
  for(const key in COINS){
    const c = COINS[key];
    const perGram = gd.pricePerGram[c.purity];
    const row = document.getElementById('row-'+key);
    if(row && perGram != null) row.textContent = fmtGBP(perGram * c.weightG);
  }
}
function calculate(){
  const gd = window.GOLD_DATA;
  const key = document.getElementById('coin').value;
  const qty = parseInt(document.getElementById('qty').value, 10) || 0;
  const c = COINS[key];
  const perGram = gd.pricePerGram[c.purity];
  if(perGram == null){ alert('Live price not yet available — please check back shortly.'); return; }
  if(qty<=0){ alert('Please enter a quantity.'); return; }
  const perCoin = perGram * c.weightG;
  document.getElementById('r-total').textContent = fmtGBP(perCoin*qty);
  document.getElementById('r-sub').textContent = qty+' × '+c.label;
  document.getElementById('r-perCoin').textContent = fmtGBP(perCoin);
  document.getElementById('r-weight').textContent = c.weightG+'g · '+c.purityLabel;
  document.getElementById('result').style.display='block';
  document.getElementById('result').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function toggleFaq(b){ b.classList.toggle('open'); b.nextElementSibling.classList.toggle('open'); }
refreshBanner();
fetch('/gold-data.json?t=' + Date.now(), {cache:'no-store'})
  .then(function(r){ return r.ok ? r.json() : null; })
  .then(function(fresh){
    if(fresh && fresh.lastUpdated && new Date(fresh.lastUpdated) > new Date(window.GOLD_DATA.lastUpdated)){
      window.GOLD_DATA = fresh;
      refreshBanner();
    }
  })
  .catch(function(){});
</script>
</body>
</html>
`;
}

function buildHistoryPage(page) {
  const jsonLd = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "mainEntity": [
${faqJsonLd(page.faq)}
      ]
    },
    {
      "@type": "Organization",
      "name": "Gold Price Per Gram UK",
      "legalName": "Gesmine-Invest Limited",
      "identifier": { "@type": "PropertyValue", "propertyID": "UK Company Number", "value": "14120136" },
      "address": { "@type": "PostalAddress", "streetAddress": "Hardy House, 269 Poynders Gardens", "addressLocality": "London", "postalCode": "SW4 8PQ", "addressCountry": "GB" }
    }
  ]
}
</script>`;

  const stats = buildStats(HISTORY, 'g24k');
  const svg = buildSVG(HISTORY, 'g24k');
  const statsSummary = stats
    ? `Since ${stats.fromDate}, the live-tracked 24 carat gold price per gram has moved between <strong>£${stats.min.toFixed(2)}</strong> and <strong>£${stats.max.toFixed(2)}</strong>, a ${stats.changePct >= 0 ? 'rise' : 'fall'} of ${Math.abs(stats.changePct).toFixed(1)}% over ${stats.days} day${stats.days === 1 ? '' : 's'} (${stats.points} tracked data points).`
    : 'The historical archive is just starting to build — check back after a few days of tracking for a chart.';

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
${headBoilerplate(page, null)}

<!-- START_PRICE_DATA -->
<script>window.GOLD_DATA = ${JSON.stringify(require('./gold-data.json'))};</script>
<!-- END_PRICE_DATA -->

${jsonLd}
${SHARED_STYLE}
<style>.chart-card{background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:24px 20px;margin:0 0 8px;box-shadow:0 8px 40px rgba(107,77,5,.10);} .chart-card svg{width:100%;height:auto;display:block;} .stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:16px;} @media (max-width:480px){.stat-row{grid-template-columns:1fr;}} .stat-row .r-stat{background:var(--brand-light);}</style>
</head>
<body>

${siteBanner()}

<header>
  <div class="container">
    <div class="badge">📈 Real tracked data · updated 3×/day</div>
    <h1>${page.h1}</h1>
    <p>The gold price per gram in the UK, charted from data this site has actually recorded live — no scraped or reconstructed history.</p>
  </div>
</header>

<div class="container">
<div class="tool-wrapper">
  <div class="chart-card">
    <!-- START_HISTORY_CHART -->
${svg}
<script>window.GOLD_HISTORY_STATS = ${JSON.stringify(stats)};</script>
    <!-- END_HISTORY_CHART -->
    <p style="font-size:.82rem;color:var(--muted);margin-top:10px;text-align:center;">24 carat (24k) gold price per gram, GBP — tracking since ${stats ? stats.fromDate : 'launch'}.</p>
  </div>
</div>

<div class="content">
  <h2 class="st">Gold Price Per Gram UK — Trend Summary</h2>
  <p>${statsSummary}</p>
  <p>Want today's exact figure instead of the trend? Use the <a href="/">live calculator</a> for the current price by purity, or the <a href="/scrap-gold-price-per-gram-uk/">scrap gold page</a> if you're pricing jewellery to sell.</p>

  <h2 class="st">Other Purities &amp; Related Pages</h2>
  <div class="link-grid">
    ${relatedCaratLinks('')}
    <a class="link-card" href="/gold-price-per-ounce-uk/"><div class="t">Per Troy Ounce</div><div class="sub">Bullion-unit pricing</div></a>
    <a class="link-card" href="/gold-price-per-kg-uk/"><div class="t">Per Kilogram</div><div class="sub">Bulk/wholesale pricing</div></a>
    <a class="link-card" href="/methodology/"><div class="t">Methodology</div><div class="sub">Data source &amp; formula</div></a>
  </div>

  <h2 class="st">Frequently Asked Questions</h2>
${faqHtml(page.faq)}
</div>
</div>

${eeatBlock()}

<footer>
  <div class="container">
    <div class="disc">Prices are an indicative live spot rate, not a dealer quote — always confirm with a dealer before selling. Data source: goldapi.io.</div>
    <p><a href="/methodology/">Methodology</a> · Gold Price Per Gram UK</p>
    <p style="font-size:.72rem;margin-top:8px;">Gold Price Per Gram calculators are part of Gesmine-Invest Limited, registered UK company number 14120136, registered office address at Hardy House, 269 Poynders Gardens, London, London, United Kingdom, SW4 8PQ.</p>
  </div>
</footer>

<script>function toggleFaq(b){ b.classList.toggle('open'); b.nextElementSibling.classList.toggle('open'); }</script>
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

fs.mkdirSync(path.join(ROOT, HISTORY_PAGE.slug), { recursive: true });
fs.writeFileSync(path.join(ROOT, HISTORY_PAGE.slug, 'index.html'), buildHistoryPage(HISTORY_PAGE));
console.log(`✓ ${HISTORY_PAGE.slug}/index.html`);

for (const unitPage of [OUNCE_PAGE, KG_PAGE]) {
  fs.mkdirSync(path.join(ROOT, unitPage.slug), { recursive: true });
  fs.writeFileSync(path.join(ROOT, unitPage.slug, 'index.html'), buildUnitPage(unitPage));
  console.log(`✓ ${unitPage.slug}/index.html`);
}

fs.mkdirSync(path.join(ROOT, SOVEREIGN_PAGE.slug), { recursive: true });
fs.writeFileSync(path.join(ROOT, SOVEREIGN_PAGE.slug, 'index.html'), buildSovereignPage(SOVEREIGN_PAGE));
console.log(`✓ ${SOVEREIGN_PAGE.slug}/index.html`);

console.log('Done. Run update-data.js next to inject live prices.');
