/* Midland Roof Shield - multi-page build-out.
 *
 *   node generate.js                    writes _site/
 *   STAGING_BASE=Midland-Roof-Shield node generate.js    writes _staging/, noindex
 *
 * The site-kit has no multi-page engine yet (engine/generate.js is still on its
 * to-do list), so this is a project-level generator in the same shape as the ones
 * on Fairmont, Weather Proof and S. Sparham Electrical.
 *
 * WHAT IT SHARES WITH THE DEMO
 *   - the kit's frozen template.html CSS, verbatim, with the contractor-bold
 *     direction spliced in exactly as engine/build.js does it. Extracted once to
 *     assets/site.css so it caches across every page.
 *   - _src/assets/*, copied as real files for the new pages.
 *
 * THE HOMEPAGE IS COPIED, NOT REGENERATED
 *   The root index.html - built by the kit from _src/body.html - is copied into
 *   _site/ rather than rebuilt here. Its markup, section order, hero and both
 *   videos are untouched, and nothing is re-encoded.
 *   What IS changed on the way through, in build-pages.js: a canonical and a
 *   LocalBusiness schema block are injected (the kit template emits neither), and
 *   every base64 data: URI is swapped back to its real file path. That last one
 *   took the homepage from 3.85 MB to 0.09 MB and is why the whole site now
 *   passes client mode.
 *   NOTE the homepage has its OWN footer, in _src/body.html. The footer() below
 *   does not reach it - change both, and crawl from / to prove it.
 *
 * CSS url() WARNING
 *   assets/site.css defines the {{VAR:}} payloads as url(). A RELATIVE url in an
 *   external stylesheet resolves against the stylesheet's folder, not the page,
 *   and 404s - it looks like an overlay that is far too dark. Every url here is
 *   root-absolute via cfg.base for exactly that reason.
 *
 * NEVER hand-edit anything in _site/. Edit content/*, _src/* or this file.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const KIT = 'C:/Users/Jay/.claude/site-kit';

/* STAGING_BASE builds a preview copy for a GitHub Pages project site, served
   from a subfolder rather than a domain root. It writes to _staging/, never over
   _site/, and every page gets noindex so a preview cannot compete in search.
   Pass it WITHOUT slashes - Git Bash rewrites a leading "/" into a Windows path
   and you end up with href="H:/Git/...". The slashes are added here. */
const STAGING = process.env.STAGING_BASE
  ? '/' + process.env.STAGING_BASE.split(/[\\/]/).filter(Boolean).pop() + '/'
  : '';
const OUT = path.join(ROOT, STAGING ? '_staging' : '_site');
const SRC = path.join(ROOT, '_src');
const ASSETS = path.join(SRC, 'assets');

const cfg = require(path.join(ROOT, 'site.config.js'));
const SERVICES = require(path.join(ROOT, 'content', 'services.js'));
const AREAS = require(path.join(ROOT, 'content', 'areas.js'));
const SITE = require(path.join(ROOT, 'content', 'site.js'));

const B = STAGING || cfg.base || '/';
const NOINDEX = STAGING ? '\n<meta name="robots" content="noindex,nofollow">' : '';
const ORIGIN = (cfg.origin || '').replace(/\/$/, '');
const T = cfg.tokens;

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const asset = f => B + 'assets/' + f;

/* Client facts into a string. Same {{TOKEN}} contract as the kit engine. */
function tok(s) {
  return String(s).replace(/\{\{([A-Z0-9_]+)\}\}/g, (whole, k) =>
    Object.prototype.hasOwnProperty.call(T, k) ? T[k] : whole);
}

/* ------------------------------------------------------------------ CSS -- */
const varName = f => '--a-' + f.replace(/[^a-z0-9]+/gi, '-').toLowerCase();

function buildCss() {
  const tpl = fs.readFileSync(path.join(KIT, 'template', 'template.html'), 'utf8');
  const dir = require(path.join(KIT, 'art-directions', cfg.direction + '.js'));

  /* palette override, byte-for-byte the engine's logic so the look cannot drift */
  let directionCss = dir.css;
  for (const [k, v] of Object.entries(cfg.palette || {})) {
    const re = new RegExp('(--' + k.replace(/[^a-z0-9-]/gi, '') + ':)[^;]*;');
    if (!re.test(directionCss)) throw new Error('palette key "' + k + '" is not a token in ' + cfg.direction);
    directionCss = directionCss.replace(re, '$1' + v + ';');
  }

  const open = tpl.indexOf('<style>', tpl.indexOf('{{ASSETVARS}}') + 1) + '<style>'.length;
  const close = tpl.indexOf('</style>', open);
  if (open < '<style>'.length || close < 0) throw new Error('could not locate the kit CSS block');
  const core = tpl.slice(open, close).replace('{{DIRECTION}}', directionCss);

  /* the logo, referenced by the nav, drawer and footer on every page */
  const rootBlock = ':root{' + varName('logo.png') + ':url("' + asset('logo.png') + '")}\n';
  return rootBlock + core + '\n' + EXTRA_CSS;
}

/* Layout for the page types the demo body does not have. Deliberately small and
   built only from tokens the direction already owns - no new colours. */
const EXTRA_CSS = `
/* ---------- build-out page chrome ---------- */
.page-head{padding:calc(74px + var(--sec)) 0 var(--sec);background:var(--ink);color:var(--on-ink);position:relative}
.page-head::after{content:"";position:absolute;inset:auto 0 0;height:1px;background:rgba(255,255,255,.10)}
.page-head .wrap{position:relative}
.crumbs{display:flex;flex-wrap:wrap;gap:6px;font-size:12.5px;color:var(--on-ink-muted);margin-bottom:14px}
.crumbs a{color:var(--brand-lt)}
.crumbs a:hover{text-decoration:underline}
.crumbs span[aria-current]{color:var(--on-ink-2)}
.page-head h1{font-size:clamp(28px,5vw,46px);color:#fff;text-wrap:balance}
.page-head .lede{color:var(--on-ink-2);margin-top:14px;max-width:62ch}
.prose{max-width:70ch}
.prose h2{font-size:clamp(21px,3.3vw,30px);margin:34px 0 12px;color:var(--fg)}
.prose h3{font-size:clamp(17px,2.4vw,20px);margin:22px 0 7px;color:var(--fg)}
.prose p{color:var(--fg-muted);margin-top:11px}
.prose ul{color:var(--fg-muted);margin:12px 0 0;padding-left:20px}
.prose li{margin-top:7px}
.prose a{color:var(--accent);text-decoration:underline;text-underline-offset:2px}
/* the underline is for links in running text only. Without this it bleeds into
   every card and button inside .prose and the CTA reads as struck through. */
.prose .linkcard,.prose .btn,.prose .areas-cols a,.prose figure a{text-decoration:none}
.prose .linkcard:hover,.prose .areas-cols a:hover{text-decoration:none}
.inshort{background:var(--card);border:1px solid var(--card-line);border-left:3px solid var(--accent);
  border-radius:var(--r);padding:18px 20px;margin-top:8px}
.inshort p{margin:0;color:var(--fg-2);font-size:16px}
.steps{counter-reset:s;margin-top:6px}
.step{counter-increment:s;position:relative;padding-left:52px;margin-top:20px}
.step::before{content:counter(s,decimal-leading-zero);position:absolute;left:0;top:1px;
  font-family:var(--font-display);font-weight:800;font-size:13px;letter-spacing:.08em;color:var(--accent);
  background:var(--chip);border:1px solid var(--card-line);border-radius:var(--r);padding:5px 8px}
.step h3{margin:0}
.linkgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px;margin-top:16px}
.linkcard{display:flex;align-items:center;justify-content:space-between;gap:10px;
  background:var(--card);border:1px solid var(--card-line);border-radius:var(--r);
  padding:13px 15px;font-weight:600;font-size:14.5px;color:var(--fg);transition:.2s}
.linkcard:hover{border-color:var(--card-line-hi);transform:translateY(-2px)}
.linkcard .icon{width:16px;height:16px;color:var(--accent);flex:0 0 auto}
.linkcard small{display:block;font-weight:500;color:var(--fg-muted);font-size:12.5px;margin-top:2px}
.faq{border-top:1px solid var(--card-line);padding:16px 0}
.faq h3{font-size:16.5px;margin:0 0 7px;color:var(--fg)}
.faq p{margin:0;color:var(--fg-muted);font-size:15px}
.cta-band{background:var(--card);border:1px solid var(--card-line);border-radius:var(--r-lg);
  padding:clamp(20px,4vw,32px);margin-top:34px}
.cta-band h2{margin:0 0 8px !important}
.cta-band .hero-btns{justify-content:flex-start;margin-top:18px}
.pg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;margin-top:20px}
.pg-grid figure{margin:0;border-radius:var(--r-lg);overflow:hidden;border:1px solid var(--card-line);background:#000}
.pg-grid img{width:100%;height:auto;display:block;aspect-ratio:4/3;object-fit:cover}
.pg-grid figcaption{padding:10px 13px;font-size:13px;color:var(--fg-muted);background:var(--card)}
.two-col{display:grid;grid-template-columns:1.35fr .65fr;gap:clamp(22px,4vw,44px);align-items:start}
@media(max-width:900px){.two-col{grid-template-columns:1fr}}
.side{position:sticky;top:96px}
@media(max-width:900px){.side{position:static}}
.side-card{background:var(--card);border:1px solid var(--card-line);border-radius:var(--r-lg);padding:20px}
.side-card h2{font-size:18px;margin:0 0 10px !important;color:var(--fg)}
.side-card p{color:var(--fg-muted);font-size:14.5px;margin-bottom:14px}
.side-card .btn{width:100%;justify-content:center;margin-top:8px}
.factrow{display:flex;gap:9px;align-items:flex-start;font-size:14px;color:var(--fg-muted);margin-top:11px}
.factrow .icon{width:16px;height:16px;color:var(--accent);flex:0 0 auto;margin-top:2px}
.areas-cols{columns:3 190px;column-gap:22px;margin-top:16px}
.areas-cols a{display:block;padding:6px 0;color:var(--fg);font-size:14.5px;break-inside:avoid}
.areas-cols a:hover{color:var(--accent)}
`;

/* --------------------------------------------------------------- chrome -- */
const ICON = {
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
};
/* wa.me with a prefilled first line - see content/site.js `whatsapp`.
   waHref() takes optional page context, e.g. waHref('for roof repairs'). */
function waText(where) {
  return tok(SITE.whatsapp.opener(where));
}
function waHref(where) {
  return 'https://wa.me/' + T.PHONE_WA + '?text=' + encodeURIComponent(waText(where));
}

const WA_PATH = '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>';
const svg = k => '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + ICON[k] + '</svg>';

/* Same labels and order as the demo nav, now pointing at real pages. Without
   this the new pages have no crawl path from the homepage and the build-out
   does nothing for search - the same reasoning as the Fairmont generator. */
const NAV = [
  ['Services', B + 'services/'],
  ['Our Work', B + 'our-work/'],
  ['About', B + 'about/'],
  ['Areas', B + 'areas-we-cover/'],
  ['FAQs', B + 'faqs/'],
  ['Contact', B + 'contact/'],
];

function nav() {
  return `<header class="nav" id="nav">
  <div class="nav-in">
    <a class="brand" href="${B}" aria-label="${esc(T.BUSINESS)} home">
      <span class="logo-mark" style="background-image:var(${varName('logo.png')})" role="img" aria-label="${esc(T.BUSINESS)} logo"></span>
      <span class="brand-txt"><b>${esc(T.BUSINESS_SHORT)}</b><span>Roof Shield</span></span>
    </a>
    <nav class="nav-links" aria-label="Primary">
${NAV.map(([l, h]) => `      <a href="${h}">${l}</a>`).join('\n')}
    </nav>
    <div class="nav-cta">
      <a class="nav-call" href="tel:${T.PHONE_TEL}" data-track="call">${svg('phone')}<span class="lbl">${T.PHONE}</span></a>
      <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false">${svg('menu')}</button>
    </div>
  </div>
</header>

<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="drawer-top">
    <a class="brand" href="${B}">
      <span class="logo-mark" style="background-image:var(${varName('logo.png')})" aria-hidden="true"></span>
      <span class="brand-txt"><b>${esc(T.BUSINESS_SHORT)}</b><span>Roof Shield</span></span>
    </a>
    <button class="burger" id="closeDrawer" aria-label="Close menu" style="display:flex">${svg('x')}</button>
  </div>
  <nav aria-label="Mobile">
${NAV.map(([l, h]) => `    <a href="${h}">${l}${svg('arrow')}</a>`).join('\n')}
  </nav>
  <div class="drawer-foot">
    <a class="btn btn-primary btn-block" href="tel:${T.PHONE_TEL}" data-track="call">${svg('phone')}Call ${T.PHONE}</a>
    <a class="btn btn-ghost btn-block" href="${waHref()}" target="_blank" rel="noopener">Message on WhatsApp</a>
  </div>
</div>`;
}

function footer() {
  const svcLinks = SERVICES.map(s =>
    `          <li><a href="${B}services/${s.slug}/">${esc(s.name)}</a></li>`).join('\n');
  const areaLinks = AREAS.slice(0, 6).map(a =>
    `          <li><a href="${B}${a.slug}/">${esc(a.name)}</a></li>`).join('\n')
    + `\n          <li><a href="${B}areas-we-cover/">All ${AREAS.length} areas we cover</a></li>`;
  return `<footer class="foot s-dark">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <span class="logo-mark" style="background-image:var(${varName('logo.png')})" role="img" aria-label="${esc(T.BUSINESS)}"></span>
        <p>Roof repairs, re-roofing, fascias and guttering, roof cleaning and conservatory warm roofs across ${esc(T.TOWN)}, Hednesford and around twenty miles of ${esc(T.COUNTY)}.</p>
        <div class="socials">
          <a href="${waHref()}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24">${WA_PATH}</svg></a>
        </div>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
${svcLinks}
        </ul>
      </div>
      <div>
        <h4>Areas covered</h4>
        <ul>
${areaLinks}
        </ul>
      </div>
      <div>
        <h4>Get in touch</h4>
        <ul>
          <li><a href="tel:${T.PHONE_TEL}" data-track="call">${T.PHONE}</a></li>
          <li><a href="mailto:${T.EMAIL}">${T.EMAIL}</a></li>
          <li><a href="${waHref()}" target="_blank" rel="noopener">WhatsApp us</a></li>
          <li>${esc(SITE.contact.addressOneLine)}</li>
          <li><a href="${B}roofing-supplies/">Roofing supplies and trade counter</a></li>
        </ul>
        <div class="accred">Public liability insured. 10 year workmanship guarantee.</div>
      </div>
    </div>
    <div class="foot-bar">
      <small>Midland Roof Shield Limited, registered in England and Wales, company 15537075.
        Registered office ${esc(SITE.contact.addressOneLine)}.<br>
        Copyright 2026 ${esc(T.BUSINESS)}. All rights reserved.
        <a href="${B}privacy-policy/">Privacy</a> / <a href="${B}terms/">Terms</a></small>
      <small>Website by <a href="https://innov8workflows.co.uk" target="_blank" rel="noopener">Innov8 Workflows</a></small>
    </div>
  </div>
</footer>

<a class="wa" href="${waHref()}" target="_blank" rel="noopener" aria-label="Message us on WhatsApp" data-track="whatsapp">
  <svg viewBox="0 0 24 24" aria-hidden="true">${WA_PATH}</svg>
</a>`;
}

const PAGE_JS = `<script>
(function(){"use strict";
var nav=document.getElementById("nav");
var onScroll=function(){nav.classList.toggle("solid",window.scrollY>40)};
onScroll();window.addEventListener("scroll",onScroll,{passive:true});
var d=document.getElementById("drawer"),b=document.getElementById("burger"),c=document.getElementById("closeDrawer");
var open=function(o){d.classList.toggle("open",o);b.setAttribute("aria-expanded",o?"true":"false");document.body.style.overflow=o?"hidden":""};
b.addEventListener("click",function(){open(true)});
c.addEventListener("click",function(){open(false)});
d.querySelectorAll("nav a").forEach(function(a){a.addEventListener("click",function(){open(false)})});
document.addEventListener("keydown",function(e){if(e.key==="Escape")open(false)});
})();
</script>`;

/* ------------------------------------------------------------------ page -- */
function shell({ slug, title, desc, body, schema, ogImage }) {
  const canonical = ORIGIN + B + (slug ? slug + '/' : '');
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(tok(title))}</title>
<meta name="description" content="${esc(tok(desc))}">
<meta name="theme-color" content="${cfg.palette.ink}">${NOINDEX}
<link rel="canonical" href="${canonical}">
<link rel="icon" href="${asset('favicon.png')}">
<link rel="apple-touch-icon" href="${asset('favicon.png')}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(tok(title))}">
<meta property="og:description" content="${esc(tok(desc))}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ORIGIN}${asset(ogImage || 'hero_poster.jpg')}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${asset('site.css')}">
${schema.map(s => '<script type="application/ld+json">' + JSON.stringify(s) + '</script>').join('\n')}
</head>
<body>
${nav()}
${body}
${footer()}
${PAGE_JS}
<script src="${asset('analytics.js')}" defer></script>
</body>
</html>
`;
}

function crumbTrail(items) {
  return `<div class="crumbs">` + items.map((it, i) =>
    i === items.length - 1
      ? `<span aria-current="page">${esc(it[0])}</span>`
      : `<a href="${it[1]}">${esc(it[0])}</a> <span aria-hidden="true">/</span>`
  ).join(' ') + `</div>`;
}

function ctaBand(headline, sub, where) {
  return `<div class="cta-band">
  <h2>${esc(tok(headline))}</h2>
  <p style="color:var(--fg-muted)">${esc(tok(sub))}</p>
  <div class="hero-btns">
    <a class="btn btn-primary" href="tel:${T.PHONE_TEL}" data-track="call">${svg('phone')}Call ${T.PHONE}</a>
    <a class="btn btn-ghost" href="${waHref(where)}" target="_blank" rel="noopener">WhatsApp us</a>
    <a class="btn btn-ghost" href="${B}contact/">Get a free quote</a>
  </div>
</div>`;
}

const faqBlock = list => list.map(([q, a]) =>
  `<div class="faq"><h3>${esc(tok(q))}</h3><p>${esc(tok(a))}</p></div>`).join('\n');

/* ---------------------------------------------------------------- schema -- */
const BIZ_ID = ORIGIN + B + '#business';

/* One LocalBusiness node, referenced by @id everywhere else, rather than a full
   copy on every page. NO aggregateRating: ratings.google says 5.0 from 50 but
   there is no profile URL to point at, and an unverifiable rating shows as stars
   in a result, which makes it the most damaging field on the page to get wrong. */
function bizNode() {
  const a = SITE.contact.address;
  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    '@id': BIZ_ID,
    name: T.BUSINESS,
    url: ORIGIN + B,
    telephone: T.PHONE_TEL,
    email: T.EMAIL,
    image: ORIGIN + asset('hero_poster.jpg'),
    logo: ORIGIN + asset('logo.png'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.line1 + ', ' + a.line2,
      addressLocality: a.town,
      addressRegion: a.region,
      postalCode: a.postcode,
      addressCountry: a.country,
    },
    openingHours: SITE.contact.hoursSchema,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: T.PHONE_TEL,
      contactType: 'customer service',
      areaServed: 'GB',
      availableLanguage: 'English',
    },
    areaServed: AREAS.map(x => ({ '@type': 'City', name: x.name })),
    knowsAbout: SERVICES.map(s => s.name),
  };
}

function webPage(slug, title, desc, crumbs) {
  const url = ORIGIN + B + (slug ? slug + '/' : '');
  return [
    { '@context': 'https://schema.org', '@type': 'WebPage', '@id': url + '#page',
      url, name: tok(title), description: tok(desc),
      isPartOf: { '@type': 'WebSite', '@id': ORIGIN + B + '#website', url: ORIGIN + B, name: T.BUSINESS },
      about: { '@id': BIZ_ID } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem', position: i + 1, name: c[0],
        item: c[1] ? ORIGIN + c[1] : url })) },
  ];
}

const faqSchema = list => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: list.map(([q, a]) => ({
    '@type': 'Question', name: tok(q),
    acceptedAnswer: { '@type': 'Answer', text: tok(a) } })),
});

module.exports = {
  STAGING, NOINDEX, buildCss, shell, crumbTrail, ctaBand, faqBlock, svg, esc, tok, asset,
  varName, B, ORIGIN, T, cfg, SERVICES, AREAS, SITE, OUT, ROOT, SRC, ASSETS, KIT,
  bizNode, webPage, faqSchema, BIZ_ID, NAV, WA_PATH, waHref, waText,
};

if (require.main === module) require(path.join(ROOT, 'build-pages.js'));
