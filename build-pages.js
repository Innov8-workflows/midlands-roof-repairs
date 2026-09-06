/* Writes _site/. Required by generate.js - run `node generate.js`.
 *
 * The homepage is COPIED from the root index.html untouched. See the header of
 * generate.js for why, and for the client-mode consequence.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const G = require('./generate.js');
const { shell, crumbTrail, ctaBand, faqBlock, svg, esc, tok, asset, varName, B, ORIGIN, T,
        cfg, SERVICES, AREAS, SITE, OUT, ROOT, SRC, ASSETS, buildCss,
        bizNode, webPage, faqSchema, BIZ_ID, STAGING } = G;

const urls = [];
const write = (rel, html, addToSitemap = true) => {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
  if (addToSitemap && rel.endsWith('index.html')) {
    urls.push(ORIGIN + B + rel.replace(/index\.html$/, ''));
  }
};

/* ------------------------------------------------------------- clean out -- */
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

/* ---------------------------------------------------------------- assets -- */
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
let copied = 0;
for (const f of fs.readdirSync(ASSETS)) {
  fs.copyFileSync(path.join(ASSETS, f), path.join(OUT, 'assets', f));
  copied++;
}
fs.writeFileSync(path.join(OUT, 'assets', 'site.css'), buildCss());
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

/* ---------------------------------------------------------------- _headers --
 * Emitted here so it is regenerable - _site is wiped on every build, so nothing
 * may be hand-placed inside it.
 *
 * THE CSP IS DELIBERATELY LOOSER THAN THE HOUSE DEFAULT IN TWO PLACES:
 *   script-src 'unsafe-inline'  the demo homepage is a single self-contained
 *                               file with inline <script> blocks, and every
 *                               generated page carries its own inline nav script.
 *                               With plain 'self' the page still renders, so it
 *                               looks fine, while the burger menu, the hero
 *                               video, the before/after slider, the gallery
 *                               lightbox and the quote form are all dead.
 *   img-src / media-src data:   the homepage embeds every image and both videos
 *                               as base64 data: URIs.
 * Both are tested against the real built site before deploying, not assumed.
 *
 * connect-src is 'self' only. When lead-log or appscript is wired up, the Apps
 * Script endpoint has to be added here or the beacon is silently blocked. */
const CSP = [
  "default-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "media-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
  "manifest-src 'none'",
  "worker-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

fs.writeFileSync(path.join(OUT, '_headers'), `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Cross-Origin-Opener-Policy: same-origin
  Permissions-Policy: accelerometer=(), autoplay=(self), camera=(), display-capture=(), encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=(), xr-spatial-tracking=()
  Content-Security-Policy: ${CSP}

# Filenames are not content hashed, so a replaced photo must not be able to stick
# in a cache with no way to bust it. Cloudflare's default (revalidate + ETag)
# gives repeat visitors a cheap 304 without that risk.

# Belt and braces while the custom domain settles. workers_dev is set false once
# the apex serves.
https://:worker.:account.workers.dev/*
  X-Robots-Tag: noindex, nofollow
`);

/* ------------------------------------------------------------- homepage --
   Copied verbatim. Not regenerated, not re-encoded, no video replaced. */
const homeSrc = path.join(ROOT, 'index.html');
if (!fs.existsSync(homeSrc)) throw new Error('index.html missing - run `node build.js` first');
let home = fs.readFileSync(homeSrc, 'utf8');

/* The kit template emits no canonical - it was only ever building one page, and
   client mode requires one. Injected here rather than by hand-editing the built
   file, which would be lost on the next `node build.js`. */
home = home.replace('</title>', '</title>\n<link rel="canonical" href="' + ORIGIN + B + '">');

/* The demo homepage carried no structured data at all - the kit template emits
   none. That leaves the single most important page on the site as the only one
   without a LocalBusiness node. Injected here, same shape as every other page,
   so the @id all the other pages reference actually resolves to something. */
{
  const homeCrumbs = [['Home', null]];
  /* NO FAQPage here. The homepage deliberately has no FAQ section - that is its
     own page - and a FAQPage block whose questions are not visible on the page
     is cloaking, which is the fastest way to lose a client their rankings. */
  const homeSchema = [
    bizNode(),
    ...webPage('', cfg.title, cfg.description, homeCrumbs),
  ];
  home = home.replace('</head>',
    homeSchema.map(s => '<script type="application/ld+json">' + JSON.stringify(s) + '</script>').join('\n') + '\n</head>');
}

/* ---------------------------------------------------- base64 -> real files --
 * The kit engine inlines every asset as a base64 data: URI, which is right for a
 * single-file demo you email to someone and wrong for a live site. It made the
 * homepage 3.85 MB, put it over the 2 MB client budget, stopped either video
 * being range-seekable, and meant adding a photograph cost 1.3x its file size in
 * page weight.
 *
 * Every asset is already sitting in _site/assets/ as a real file for the other
 * pages to use, so this swaps each data: URI back to its file path by matching
 * on content. Nothing is re-encoded and no video is replaced - it is the same
 * bytes, addressed differently. The markup, the section order, the hero and both
 * videos are untouched.
 *
 * Must run BEFORE the STAGING rewrite below, so the paths it produces get the
 * subfolder prefix too. */
const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4' };
{
  const before = Buffer.byteLength(home);
  let swapped = 0;
  for (const f of fs.readdirSync(ASSETS)) {
    const mime = MIME[path.extname(f).toLowerCase()];
    if (!mime) continue;
    const needle = 'data:' + mime + ';base64,' + fs.readFileSync(path.join(ASSETS, f)).toString('base64');
    if (!home.includes(needle)) continue;
    home = home.split(needle).join(asset(f));
    swapped++;
  }
  const after = Buffer.byteLength(home);
  console.log(`  homepage: ${swapped} assets un-inlined, ${(before / 1048576).toFixed(2)} MB -> ${(after / 1048576).toFixed(2)} MB`);
  const left = (home.match(/data:(image|video)\/[a-z0-9]+;base64,/g) || []).length;
  if (left) console.log(`  WARNING: ${left} base64 payload(s) still inline - an asset in the page is not in _src/assets`);
}

if (STAGING) {
  home = home.replace('</title>', '</title>\n<meta name="robots" content="noindex,nofollow">');
  /* The homepage is copied rather than regenerated, so its root-absolute hrefs
     still read "/services/". On a Pages project site that resolves to the
     account root and 404s, so prefix them for the staging build only. */
  home = home.replace(/(href|src)="\/(?!\/)/g, '$1="' + B);
}
fs.writeFileSync(path.join(OUT, 'index.html'), home);
urls.push(ORIGIN + B);

/* ------------------------------------------------------------- fragments -- */
const svcCard = s => `<a class="linkcard" href="${B}services/${s.slug}/">
  <span>${esc(s.name)}<small>${esc(tok(s.lede))}</small></span>${svg('arrow')}</a>`;

const areaCard = a => `<a class="linkcard" href="${B}${a.slug}/">
  <span>${esc(a.name)}<small>${a.miles === 0 ? 'Our yard is here' : a.miles + ' miles from the yard'}</small></span>${svg('arrow')}</a>`;

const sideCard = () => `<div class="side">
  <div class="side-card">
    <h2>Get a free quote</h2>
    <p>Someone comes out, looks at the roof properly and gives you a fixed written price. No charge, no obligation.</p>
    <a class="btn btn-primary" href="tel:${T.PHONE_TEL}" data-track="call">${svg('phone')}Call ${T.PHONE}</a>
    <a class="btn btn-ghost" href="https://wa.me/${T.PHONE_WA}" target="_blank" rel="noopener">WhatsApp us</a>
    <div class="factrow">${svg('clock')}<span>${esc(SITE.contact.hours)}</span></div>
    <div class="factrow">${svg('pin')}<span>${esc(SITE.contact.addressOneLine)}</span></div>
    <div class="factrow">${svg('shield')}<span>Public liability insured, 10 year workmanship guarantee</span></div>
    <div class="factrow">${svg('users')}<span>Family business, 25 years, six of us</span></div>
  </div>
</div>`;

/* The homeowner side card sells a free quote, which is the wrong ask for a
   supplier or a rep. This one gives them the direct line and the company facts
   they would otherwise have to look up. */
const tradeSideCard = () => `<div class="side">
  <div class="side-card">
    <h2>Trade and supplier enquiries</h2>
    <p>Stocking, trade accounts and rep visits go direct to ${esc(T.OWNER)}, not through a call centre.</p>
    <a class="btn btn-primary" href="tel:${T.PHONE_TEL}" data-track="call">${svg('phone')}Call ${T.PHONE}</a>
    <a class="btn btn-ghost" href="mailto:${T.EMAIL}">${svg('mail')}Email us</a>
    <div class="factrow">${svg('pin')}<span>${esc(SITE.contact.addressOneLine)}</span></div>
    <div class="factrow">${svg('users')}<span>Roofing contractor and roofing merchant, one yard, six of us</span></div>
    <div class="factrow">${svg('shield')}<span>Midland Roof Shield Limited, company 15537075</span></div>
  </div>
</div>`;

const galleryFigs = ids => `<div class="pg-grid">` + ids.map(id => {
  const g = SITE.galleryAll.find(x => x[0] === id);
  return `<figure><img loading="lazy" src="${asset(id + '.jpg')}" alt="${esc(g[1])}"><figcaption>${esc(g[2])}</figcaption></figure>`;
}).join('') + `</div>`;

/* =================================================================== HOME
   hubs and standalone pages
   ================================================================== */

/* ---------------------------------------------------------- services hub -- */
{
  const crumbs = [['Home', B], ['Services', null]];
  const title = 'Roofing Services in {{TOWN}} | {{BUSINESS}}';
  const desc = 'Roof repairs, re-roofing, fascias and guttering, roof cleaning and conservatory warm roofs across {{TOWN}}, Hednesford and 20 miles of {{COUNTY}}.';
  const faqs = SITE.generalFaqs.slice(0, 5);
  write('services/index.html', shell({
    slug: 'services', title, desc,
    schema: [bizNode(), ...webPage('services', title, desc, crumbs), faqSchema(faqs)],
    body: `<section class="page-head"><div class="wrap">${crumbTrail(crumbs)}
  <h1>Roofing services in ${esc(T.TOWN)}</h1>
  <p class="lede">Five things we do, all of them properly. Everything below is covered across ${esc(T.TOWN)}, Hednesford and around twenty miles of ${esc(T.COUNTY)}.</p>
</div></section>
<section class="sec s-light"><div class="wrap"><div class="two-col">
  <div class="prose">
    <h2>In short</h2>
    <div class="inshort"><p>${esc(T.BUSINESS)} covers roof repairs, full roof replacement, fascias, soffits and guttering, roof cleaning and conservatory warm roof conversions. We are a family business of six working out of Hednesford, twenty five years in, and we answer the phone 24 hours a day. Quotes are free, fixed and in writing, and the workmanship carries a ten year guarantee.</p></div>
    <h2>What we do</h2>
    <div class="linkgrid">${SERVICES.map(svcCard).join('')}</div>
    <h2>Not sure which one you need?</h2>
    <p>Most people ring about a leak and are not certain whether it is a repair or the roof reaching the end of its life. That is a perfectly normal place to start. Someone comes out, gets on the roof, finds where the water is actually getting in, and tells you honestly which of the two you are looking at. If it is a repair, we say so.</p>
    <h2>Frequently asked questions</h2>
    ${faqBlock(faqs)}
    ${ctaBand('Want someone to take a look?', 'Free quotes, fixed written prices, and a 24 hour phone line.')}
  </div>
  ${sideCard()}
</div></div></section>`,
  }));
}

/* -------------------------------------------------------------- services -- */
for (const s of SERVICES) {
  const crumbs = [['Home', B], ['Services', B + 'services/'], [s.name, null]];
  const others = SERVICES.filter(x => x.slug !== s.slug);
  const faqs = s.faqs;
  const svcSchema = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: tok(s.name), serviceType: tok(s.name),
    provider: { '@id': BIZ_ID },
    description: tok(s.inShort),
    areaServed: AREAS.map(a => ({ '@type': 'City', name: a.name })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Roofing services',
      /* no `price` anywhere: serviceDetail{} came back empty, and an invented
         price is a claim */
      itemListElement: SERVICES.map(x => ({
        '@type': 'Offer', itemOffered: { '@type': 'Service', name: tok(x.name) } })),
    },
  };
  write(`services/${s.slug}/index.html`, shell({
    slug: `services/${s.slug}`, title: s.title, desc: s.desc,
    ogImage: s.gallery[0] + '.jpg',
    schema: [bizNode(), ...webPage(`services/${s.slug}`, s.title, s.desc, crumbs), svcSchema, faqSchema(faqs)],
    body: `<section class="page-head"><div class="wrap">${crumbTrail(crumbs)}
  <h1>${esc(tok(s.h1))}</h1>
  <p class="lede">${esc(tok(s.lede))}</p>
</div></section>
<section class="sec s-light"><div class="wrap"><div class="two-col">
  <div class="prose">
    <h2>In short</h2>
    <div class="inshort"><p>${esc(tok(s.inShort))}</p></div>

    <h2>${esc(s.signsTitle)}</h2>
    <ul>${s.signs.map(x => `<li>${esc(tok(x))}</li>`).join('')}</ul>

    <h2>${esc(s.processTitle)}</h2>
    <div class="steps">${s.steps.map(([h, p]) =>
      `<div class="step"><h3>${esc(tok(h))}</h3><p>${esc(tok(p))}</p></div>`).join('')}</div>

    ${galleryFigs(s.gallery)}

    ${ctaBand('Want someone to take a look?', 'Free quote, fixed written price, and we answer the phone 24 hours a day.')}

    <h2>${esc(s.name)} near you</h2>
    <p>We cover around twenty miles from our yard in Hednesford. Pick your town for what the work tends to look like there.</p>
    <div class="areas-cols">${AREAS.map(a =>
      `<a href="${B}${a.slug}/">${esc(s.name)} in ${esc(a.name)}</a>`).join('')}</div>

    <h2>Frequently asked questions</h2>
    ${faqBlock(faqs)}

    <h2>Other services</h2>
    <div class="linkgrid">${others.map(svcCard).join('')}</div>
  </div>
  ${sideCard()}
</div></div></section>`,
  }));
}

/* ------------------------------------------------------------- areas hub -- */
{
  const crumbs = [['Home', B], ['Areas we cover', null]];
  const title = 'Areas We Cover | {{BUSINESS}}';
  const desc = 'Roofers covering ' + AREAS.slice(0, 5).map(a => a.name).join(', ') + ' and ' + (AREAS.length - 5) + ' more towns within 20 miles of Hednesford. Call {{PHONE}}.';
  const faqs = [
    ['How far do you travel?', 'Around twenty miles from our yard in Hednesford. That covers Cannock Chase, most of south Staffordshire and the north of the Black Country.'],
    ['What if I am just outside your area?', 'Ring anyway. Twenty miles is a guide rather than a fence, and depending on the job and what else we have on it is often still worth us coming out.'],
    ['Do you charge more for the towns further away?', 'No. Everywhere on this page is priced the same way. If a job were genuinely too far to do properly we would tell you rather than adding a travel charge.'],
    ['Which areas do you get to fastest?', 'Hednesford, Cannock and Heath Hayes are all within a couple of miles of the yard, so those are the quickest, which matters most for emergency call outs.'],
  ];
  write('areas-we-cover/index.html', shell({
    slug: 'areas-we-cover', title, desc,
    ogImage: 'areas.jpg',
    schema: [bizNode(), ...webPage('areas-we-cover', title, desc, crumbs), faqSchema(faqs)],
    body: `<section class="page-head"><div class="wrap">${crumbTrail(crumbs)}
  <h1>Areas we cover</h1>
  <p class="lede">${AREAS.length} towns within about twenty miles of our yard in Hednesford, across ${esc(T.COUNTY)} and into the north of the Black Country.</p>
</div></section>
<section class="sec s-light"><div class="wrap"><div class="two-col">
  <div class="prose">
    <h2>In short</h2>
    <div class="inshort"><p>We work to roughly a twenty mile radius of Hednesford, just outside ${esc(T.TOWN)}. That takes in the whole of Cannock Chase, most of south ${esc(T.COUNTY)} including Rugeley, Lichfield, Burntwood, Penkridge and Stafford, and reaches down into the north of the Black Country through Brownhills, Walsall, Aldridge and on to Wolverhampton. Every town below is priced the same way, with no travel charge.</p></div>

    <h2>Towns we cover</h2>
    <div class="linkgrid">${AREAS.map(areaCard).join('')}</div>

    <h2>Not sure if you are in range?</h2>
    <p>Twenty miles is a guide, not a boundary. If you are a little outside it, ring and describe the job. Depending on what it is and what else we have on, it is often still worth us coming out, and if it genuinely is not we will say so rather than quoting a price that has a long drive buried in it.</p>

    ${ctaBand('Check your postcode', 'Tell us where you are and we will tell you straight away whether we cover it.')}

    <h2>Frequently asked questions</h2>
    ${faqBlock(faqs)}
  </div>
  ${sideCard()}
</div></div></section>`,
  }));
}

/* ----------------------------------------------------------------- areas -- */
for (const a of AREAS) {
  const crumbs = [['Home', B], ['Areas we cover', B + 'areas-we-cover/'], [a.name, null]];
  const title = `Roofers in ${a.name} | ${T.BUSINESS}`;
  const desc = `Roofers covering ${a.name}${a.nearby.length ? ' and ' + a.nearby.slice(0, 3).join(', ') : ''}. Repairs, re-roofing, guttering and roof cleaning. 24 hour call out. Call ${T.PHONE}.`;
  const faqs = [...a.faqs, ...SITE.sharedAreaFaqs];
  const placeSchema = {
    '@context': 'https://schema.org', '@type': 'City', name: a.name,
    containedInPlace: { '@type': 'AdministrativeArea', name: T.COUNTY },
  };
  const svcSchema = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: `Roofing in ${a.name}`, serviceType: 'Roofing',
    provider: { '@id': BIZ_ID },
    description: tok(a.inShort),
    areaServed: { '@type': 'City', name: a.name },
  };
  write(`${a.slug}/index.html`, shell({
    slug: a.slug, title, desc,
    schema: [bizNode(), ...webPage(a.slug, title, desc, crumbs), placeSchema, svcSchema, faqSchema(faqs)],
    body: `<section class="page-head"><div class="wrap">${crumbTrail(crumbs)}
  <h1>Roofers in ${esc(a.name)}</h1>
  <p class="lede">${a.base ? 'Our yard is in ' + esc(a.name) + '.' : esc(a.name) + ' is about ' + a.miles + ' miles from our yard in Hednesford.'} Repairs, re-roofing, guttering, roof cleaning and warm roofs.</p>
</div></section>
<section class="sec s-light"><div class="wrap"><div class="two-col">
  <div class="prose">
    <h2>In short</h2>
    <div class="inshort"><p>${esc(tok(a.inShort))}</p></div>

    <h2>Roofing in ${esc(a.name)}</h2>
    <p>${esc(tok(a.local))}</p>

    <h2>What we do in ${esc(a.name)}</h2>
    <div class="linkgrid">${SERVICES.map(svcCard).join('')}</div>

    ${ctaBand('Need a roofer in ' + a.name + '?', 'Free quote, fixed written price, and a 24 hour phone line.')}

    <h2>Areas we cover around ${esc(a.name)}</h2>
    <p>As well as ${esc(a.name)} itself we cover ${a.nearby.map(n => esc(n)).join(', ')} and the surrounding villages.</p>
    <div class="areas-cols">${AREAS.filter(x => x.slug !== a.slug).map(x =>
      `<a href="${B}${x.slug}/">Roofers in ${esc(x.name)}</a>`).join('')}</div>

    <h2>Frequently asked questions</h2>
    ${faqBlock(faqs)}
  </div>
  ${sideCard()}
</div></div></section>`,
  }));
}

/* ----------------------------------------------------------------- about -- */
{
  const crumbs = [['Home', B], ['About', null]];
  const title = 'About {{BUSINESS}} | Family Roofers in {{TOWN}}';
  const desc = 'A family roofing business based in Hednesford, {{TOWN}}. Twenty five years, six of us, and our own roofing supplies shop. Call {{PHONE}}.';
  write('about/index.html', shell({
    slug: 'about', title, desc, ogImage: 'about1.jpg',
    schema: [bizNode(), ...webPage('about', title, desc, crumbs)],
    body: `<section class="page-head"><div class="wrap">${crumbTrail(crumbs)}
  <h1>About ${esc(T.BUSINESS)}</h1>
  <p class="lede">${esc(SITE.about.lede)}</p>
</div></section>
<section class="sec s-light"><div class="wrap"><div class="two-col">
  <div class="prose">
    <h2>Who we are</h2>
    ${SITE.about.paras.map(p => `<p>${esc(tok(p))}</p>`).join('\n    ')}
    <div class="pg-grid" style="grid-template-columns:1fr 1fr">
      <figure><img loading="lazy" src="${asset('about1.jpg')}" alt="The ${esc(T.BUSINESS)} van parked outside a house being re-roofed"><figcaption>The van on site</figcaption></figure>
      <figure><img loading="lazy" src="${asset('about2.jpg')}" alt="Roofers stripping the old tiles from a roof before it is re-covered"><figcaption>Stripping a roof back</figcaption></figure>
    </div>
    <h2>The Roofing Outlaw Cannock branch</h2>
    <p>${tok(SITE.about.outlaw)}</p>
    <h2>What you can expect</h2>
    <ul>
      <li>A free quote, fixed and in writing, before anything starts</li>
      <li>Photographs of each stage, including the parts of the roof you cannot get to</li>
      <li>Public liability insurance, with the certificate available to see</li>
      <li>A ten year guarantee on our workmanship</li>
      <li>Waste taken with us as we go, and the drive swept before we leave</li>
    </ul>
    ${ctaBand('Want a quote from us?', 'Ring, message on WhatsApp, or send a couple of photographs and we will tell you what we think.')}
  </div>
  ${sideCard()}
</div></div></section>`,
  }));
}

/* ------------------------------------------------------- roofing supplies --
 * Supplier and rep facing. See content/site.js `supplies` for the rule this page
 * is written under: Kevin runs the Roofing Outlaw CANNOCK BRANCH and does not own
 * the brand. Nothing here may imply otherwise. */
{
  const S = SITE.supplies;
  const crumbs = [['Home', B], ['Roofing supplies', null]];
  const title = 'Roofing Supplies in {{TOWN}} | {{BUSINESS}}';
  const desc = 'A roofing merchant and a roofing contractor in one yard in Hednesford, {{TOWN}}. Trade counter, collection, and supplier enquiries direct to {{OWNER_FULL}}.';
  write('roofing-supplies/index.html', shell({
    slug: 'roofing-supplies', title, desc, ogImage: 'about1.jpg',
    /* bizNode + WebPage + BreadcrumbList only. Deliberately NO second business
       entity and nothing naming The Roofing Outlaw as his, and no FAQPage
       because the page carries no visible questions. */
    schema: [bizNode(), ...webPage('roofing-supplies', title, desc, crumbs)],
    body: `<section class="page-head"><div class="wrap">${crumbTrail(crumbs)}
  <h1>${esc(tok(S.h1))}</h1>
  <p class="lede">${esc(tok(S.lede))}</p>
</div></section>
<section class="sec s-light"><div class="wrap"><div class="two-col">
  <div class="prose">
    <h2>In short</h2>
    <div class="inshort"><p>${esc(tok(S.inShort))}</p></div>

    ${S.sections.map(([h, ps]) =>
      '<h2>' + esc(tok(h)) + '</h2>' + ps.map(p => '<p>' + esc(tok(p)) + '</p>').join('')).join('\n    ')}

    <div class="pg-media">
      <img loading="lazy" src="${asset('about1.jpg')}" alt="The ${esc(T.BUSINESS)} van outside a house being re-roofed">
    </div>

    <h2>Company details</h2>
    <ul>
      ${S.company.map(([k, v]) => '<li><strong>' + esc(k) + ':</strong> ' + esc(v) + '</li>').join('\n      ')}
    </ul>

    <div class="cta-band">
      <h2>${esc(tok(S.ctaTitle))}</h2>
      <p style="color:var(--fg-muted)">${esc(tok(S.ctaBody))}</p>
      <div class="hero-btns">
        <a class="btn btn-primary" href="tel:${T.PHONE_TEL}" data-track="call">${svg('phone')}Call ${T.PHONE}</a>
        <a class="btn btn-ghost" href="mailto:${T.EMAIL}">${svg('mail')}${T.EMAIL}</a>
      </div>
    </div>

    <h2>The roofing side</h2>
    <p>The contracting arm covers ${AREAS.length} towns within about twenty miles of the yard. <a href="${B}services/">What we do</a> and <a href="${B}areas-we-cover/">where we work</a>.</p>
  </div>
  ${tradeSideCard()}
</div></div></section>`,
  }));
}

/* --------------------------------------------------------------- our work -- */
{
  const crumbs = [['Home', B], ['Our work', null]];
  const title = 'Our Work | Roofing Photographs | {{BUSINESS}}';
  const desc = 'Photographs of roof repairs, re-roofs, leadwork and flat roofing carried out across {{TOWN}}, Hednesford and {{COUNTY}}.';
  write('our-work/index.html', shell({
    slug: 'our-work', title, desc, ogImage: 'g1.jpg',
    schema: [bizNode(), ...webPage('our-work', title, desc, crumbs)],
    body: `<section class="page-head"><div class="wrap">${crumbTrail(crumbs)}
  <h1>Our work</h1>
  <p class="lede">${SITE.galleryAll.length} photographs of finished roofs, leadwork and jobs in progress from around ${esc(T.TOWN)} and ${esc(T.COUNTY)}.</p>
</div></section>
<section class="sec s-light"><div class="wrap">
  <div class="prose" style="max-width:none">
    <h2>In short</h2>
    <div class="inshort" style="max-width:70ch"><p>Every photograph below is our own work. Most of a roof is somewhere you will never stand, which is exactly why we photograph each stage as we go: the membrane, the battens and the leadwork are the parts that decide whether a roof lasts, and they are all hidden by the time the job looks finished.</p></div>
    ${galleryFigs(SITE.galleryAll.map(g => g[0]))}
    ${ctaBand('Want your roof to look like this?', 'Free quote, fixed written price, and a 24 hour phone line.')}
  </div>
</div></section>`,
  }));
}

/* ------------------------------------------------------------------ faqs -- */
{
  const crumbs = [['Home', B], ['FAQs', null]];
  const title = 'Roofing FAQs | {{BUSINESS}} | {{TOWN}}';
  const desc = 'Common questions about roof repairs, re-roofing, quotes, guarantees, scaffolding and insurance, answered by {{BUSINESS}} in {{TOWN}}.';
  write('faqs/index.html', shell({
    slug: 'faqs', title, desc,
    schema: [bizNode(), ...webPage('faqs', title, desc, crumbs), faqSchema(SITE.generalFaqs)],
    body: `<section class="page-head"><div class="wrap">${crumbTrail(crumbs)}
  <h1>Frequently asked questions</h1>
  <p class="lede">The things people actually ring and ask, answered straight.</p>
</div></section>
<section class="sec s-light"><div class="wrap"><div class="two-col">
  <div class="prose">
    ${faqBlock(SITE.generalFaqs)}
    ${ctaBand('Still not sure?', 'Ring and ask. We would rather answer a question than have you guess.')}
  </div>
  ${sideCard()}
</div></div></section>`,
  }));
}

/* --------------------------------------------------------------- contact -- */
{
  const crumbs = [['Home', B], ['Contact', null]];
  const title = 'Contact {{BUSINESS}} | Roofers in {{TOWN}}';
  const desc = 'Call {{PHONE}} 24 hours a day, message on WhatsApp, or email {{EMAIL}}. Roofers covering {{TOWN}}, Hednesford and 20 miles of {{COUNTY}}.';
  const a = SITE.contact.address;
  write('contact/index.html', shell({
    slug: 'contact', title, desc,
    schema: [bizNode(), ...webPage('contact', title, desc, crumbs)],
    body: `<section class="page-head"><div class="wrap">${crumbTrail(crumbs)}
  <h1>Contact us</h1>
  <p class="lede">We answer the phone 24 hours a day. Quotes are free, fixed and in writing.</p>
</div></section>
<section class="sec s-light"><div class="wrap"><div class="two-col">
  <div class="prose">
    <h2>How to reach us</h2>
    <div class="linkgrid" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr))">
      <a class="linkcard" href="tel:${T.PHONE_TEL}" data-track="call"><span>Call or text<small>${T.PHONE}</small></span>${svg('phone')}</a>
      <a class="linkcard" href="https://wa.me/${T.PHONE_WA}" target="_blank" rel="noopener" data-track="whatsapp"><span>WhatsApp<small>${T.PHONE}</small></span>${svg('send')}</a>
      <a class="linkcard" href="mailto:${T.EMAIL}"><span>Email<small>${T.EMAIL}</small></span>${svg('mail')}</a>
    </div>

    <h2>Where we are</h2>
    <p>${esc(a.line1)}<br>${esc(a.line2)}<br>${esc(a.town)}<br>${esc(a.region)}<br>${esc(a.postcode)}</p>
    <p>The yard and our roofing supplies shop are both on Oaklands Industrial Estate, just off Lower Road in Hednesford.</p>

    <h2>Opening hours</h2>
    <p>${esc(SITE.contact.hours)}. If something has come off the roof in the middle of the night, ring. We would far rather make it safe first and talk about the proper repair in daylight.</p>

    <h2>Areas we cover</h2>
    <p>Around twenty miles from Hednesford. <a href="${B}areas-we-cover/">See the full list of ${AREAS.length} towns</a>.</p>

    ${ctaBand('Send a photograph', 'A couple of pictures on WhatsApp and a rough description is usually enough for us to tell you what you are dealing with.')}
  </div>
  ${sideCard()}
</div></div></section>`,
  }));
}

/* ----------------------------------------------------------------- legal -- */
const legalShell = (slug, h1, title, desc, inner) => {
  const crumbs = [['Home', B], [h1, null]];
  write(`${slug}/index.html`, shell({
    slug, title, desc,
    schema: [bizNode(), ...webPage(slug, title, desc, crumbs)],
    body: `<section class="page-head"><div class="wrap">${crumbTrail(crumbs)}
  <h1>${esc(h1)}</h1>
</div></section>
<section class="sec s-light"><div class="wrap"><div class="prose">${inner}</div></div></section>`,
  }));
};

legalShell('privacy-policy', 'Privacy policy',
  'Privacy Policy | {{BUSINESS}}',
  'How {{BUSINESS}} collects, uses and stores the personal information you give us.',
  `<p>This policy explains what ${esc(T.BUSINESS)} does with the personal information you give us. It was last updated in September 2026.</p>
   <h2>Who we are</h2>
   <p>${esc(T.BUSINESS)}, ${esc(SITE.contact.addressOneLine)}. You can reach us on <a href="tel:${T.PHONE_TEL}">${T.PHONE}</a> or at <a href="mailto:${T.EMAIL}">${T.EMAIL}</a>.</p>
   <h2>What we collect</h2>
   <p>Only what you give us when you get in touch: your name, your phone number, your email address if you use it, the address of the property and whatever you tell us about the job. We do not buy data about you from anyone else.</p>
   <h2>Why we hold it</h2>
   <p>To quote for your work, to carry it out, and to contact you about it afterwards. If you become a customer we keep a record of the work for as long as the guarantee runs, because you may need us to honour it.</p>
   <h2>Who we share it with</h2>
   <p>Nobody, other than where we genuinely have to in order to do the job, such as a scaffolding contractor who needs the address. We do not sell your details and we do not pass them to marketing companies.</p>
   <h2>How long we keep it</h2>
   <p>Enquiries that do not turn into work are deleted once they are clearly not going anywhere. Customer records are kept for the length of the guarantee plus the period our insurers require.</p>
   <h2>Your rights</h2>
   <p>You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Contact us on the details above and we will deal with it. If you are not happy with how we have handled it you can complain to the Information Commissioner's Office at ico.org.uk.</p>
   <h2>This website</h2>
   <p>The site does not set advertising or tracking cookies. If that changes this page will be updated first.</p>`);

legalShell('terms', 'Terms and conditions',
  'Terms and Conditions | {{BUSINESS}}',
  'The terms on which {{BUSINESS}} quotes for and carries out roofing work.',
  `<p>These are the terms on which ${esc(T.BUSINESS)} quotes for and carries out work. They were last updated in September 2026, and nothing in them affects your statutory rights.</p>
   <h2>Quotations</h2>
   <p>Quotes are free and given in writing after we have looked at the roof. A quote is fixed for the work described in it. If we find something once work starts that could not reasonably have been seen beforehand, typically rotten timber under an existing covering, we stop, tell you what it will cost and get your agreement before carrying on.</p>
   <h2>Booking and access</h2>
   <p>We will agree a start date with you. You will need to give us reasonable access to the property and, where the job requires it, to a neighbouring property. Where scaffolding is needed it is included in the quoted price unless the quote says otherwise.</p>
   <h2>Payment</h2>
   <p>Payment terms are set out on your quote. We do not ask for large deposits before work begins.</p>
   <h2>Guarantee</h2>
   <p>Our workmanship is guaranteed for ten years from completion. The guarantee covers our work; it does not cover storm damage, accidental damage, work later altered by somebody else, or failures in parts of the roof we did not carry out. Tiles, membranes and other materials carry their own manufacturer warranties, which are separate from ours.</p>
   <h2>Cancellation</h2>
   <p>Where you engage us as a consumer away from our premises you have a statutory right to cancel within fourteen days. If you ask us to start within that period and then cancel, we may charge for work already done.</p>
   <h2>Insurance</h2>
   <p>We carry public liability insurance. The certificate is available to see on request, and we would encourage you to ask for it from us and from anyone else quoting.</p>
   <h2>Complaints</h2>
   <p>If something is not right, ring ${esc(T.OWNER)} on <a href="tel:${T.PHONE_TEL}">${T.PHONE}</a>. We would much rather hear about it and put it right than have you live with it.</p>`);

/* ------------------------------------------------------------------- 404 -- */
{
  const title = 'Page not found | {{BUSINESS}}';
  const desc = 'That page does not exist. Try our services, the areas we cover, or ring {{PHONE}}.';
  fs.writeFileSync(path.join(OUT, '404.html'), shell({
    slug: '404', title, desc,
    schema: [bizNode()],
    body: `<section class="page-head"><div class="wrap">
  <h1>That page does not exist</h1>
  <p class="lede">It may have moved, or the link may be wrong. Here is where most people are heading.</p>
</div></section>
<section class="sec s-light"><div class="wrap"><div class="prose">
  <h2>Try one of these</h2>
  <div class="linkgrid">
    <a class="linkcard" href="${B}"><span>Home${svg('arrow')}</span></a>
    <a class="linkcard" href="${B}services/"><span>Services${svg('arrow')}</span></a>
    <a class="linkcard" href="${B}areas-we-cover/"><span>Areas we cover${svg('arrow')}</span></a>
    <a class="linkcard" href="${B}our-work/"><span>Our work${svg('arrow')}</span></a>
    <a class="linkcard" href="${B}faqs/"><span>FAQs${svg('arrow')}</span></a>
    <a class="linkcard" href="${B}contact/"><span>Contact${svg('arrow')}</span></a>
  </div>
  ${ctaBand('Or just ring us', 'We answer the phone 24 hours a day.')}
</div></div></section>`,
  }), 'utf8');
}

/* ------------------------------------------------------- sitemap + robots -- */
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
  `\n</urlset>\n`);

fs.writeFileSync(path.join(OUT, 'robots.txt'),
  STAGING
    ? `User-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}${B}sitemap.xml\n`);

console.log(`${STAGING ? '_staging' : '_site'}: ${urls.length} pages, ${copied + 1} assets`);
console.log(`  ${SERVICES.length} services, ${AREAS.length} areas, ${urls.length - SERVICES.length - AREAS.length} other`);
if (STAGING) console.log(`  STAGING build - noindex on every page, robots.txt disallows all`);
