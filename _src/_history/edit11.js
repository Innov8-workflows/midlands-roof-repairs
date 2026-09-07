'use strict';
/* Puts the reviews section back on the homepage. This is the inverse of edit6,
 * which took it out on 2026-09-05 because Kevin had no Google Business Profile
 * and the three platform badges pointed nowhere.
 *
 * He now has reviews on three platforms, so the section returns with real
 * content. Everything comes out of content/site.js - nothing is typed twice.
 *
 * WHAT THIS RESTORES
 *   1. the section itself, before ABOUT, as .s-tint. It goes back between #why
 *      and #about, both of which are .s-light, so the band alternation that has
 *      been missing since edit6 comes back with it.
 *   2. the two nav entries, desktop and drawer
 *   3. the carousel JS, its swipe and resize handlers
 *   4. the visibilitychange handler, which edit6 had to shrink because it
 *      referenced revTimer and resetRev
 *
 * WHAT IS DELIBERATELY DIFFERENT FROM THE KIT'S VERSION
 *   - no `.ph` placeholder spans anywhere. check.js fails a client build on one.
 *   - Google keeps its own four-colour mark. Bark and Yell get a Lucide glyph
 *     plus their name in text - their logos are not in any icon library and
 *     approximating a brand mark is both trademark trouble and obvious slop.
 *   - the badges are Google / Bark / Yell, not Google / Facebook / Checkatrade.
 *   - the score block quotes ONE platform's rating and says which, rather than
 *     inventing a blended average across three platforms.
 *
 * Re-runnable: refuses if the section is already there.
 */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'body.html');
const SITE = require(path.join(__dirname, '..', '..', 'content', 'site.js'));

let h = fs.readFileSync(P, 'utf8');
if (h.includes('id="reviews"')) { console.error('reviews section already present - nothing to do'); process.exit(1); }

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const jsStr = s => JSON.stringify(String(s));

const R = SITE.reviews;
const L = SITE.reviewLinks;
const plat = k => R.platforms.find(p => p.key === k);
const total = R.platforms.reduce((n, p) => n + p.count, 0);
const bark = plat('bark');

/* Lucide, copied exactly - see site-kit/icons/icon-set.json */
const AWARD = '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>';
const STAR_D = 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z';
const STAR_SVG = '<svg viewBox="0 0 24 24"><path d="' + STAR_D + '"/></svg>';
const GO = '<svg class="go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>';
const G_MARK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>';

function badge(key, href, logo, sub, edge) {
  const p = plat(key);
  return [
    '        <a class="plat plat-' + key + '" href="' + href + '" target="_blank" rel="noopener"' +
      ' style="box-shadow:inset 3px 0 0 ' + edge + ',var(--sh)"' +
      ' aria-label="Read our ' + esc(p.name) + ' reviews, opens in a new tab">',
    '          <span class="plat-logo">' + logo + '</span>',
    '          <span class="plat-txt"><b>' + esc(p.name) + '</b><span>' + esc(sub) + '</span></span>',
    '          ' + GO,
    '        </a>',
  ].join('\n');
}

/* ------------------------------------------------------------- markup -- */
const section = [
'<!-- ================= REVIEWS ================= -->',
'<section class="sec rev s-tint" id="reviews">',
'  <div class="wrap">',
'    <div class="rev-head rv">',
'      <div>',
'        <span class="eyebrow">Reviews</span>',
'        <h2 class="title">What our customers say</h2>',
'        <p class="lede" style="margin-top:10px">These are customers&rsquo; own words, copied from Bark exactly as they were written. Every badge below opens the platform it came from, so you can read the rest for yourself.</p>',
'      </div>',
'      <div class="rev-score">',
'        <div>',
'          <b>' + esc(bark.rating) + '</b>',
'          <small>out of 5 on Bark</small>',
'        </div>',
'        <div>',
'          <div class="stars" aria-hidden="true">' + STAR_SVG.repeat(5) + '</div>',
'          <div style="font-size:12.5px;color:var(--paper-muted);margin-top:4px">' + total + ' reviews across Google, Bark and Yell</div>',
'        </div>',
'      </div>',
'    </div>',
'',
'    <div class="rev-view rv" id="revView">',
'      <div class="rev-track" id="revTrack"></div>',
'    </div>',
'    <div class="rev-ctl">',
'      <button class="rev-arrow" id="revPrev" aria-label="Previous reviews">',
'        <svg class="icon" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>',
'      </button>',
'      <div class="rev-pages" id="revPages"></div>',
'      <button class="rev-arrow" id="revNext" aria-label="Next reviews">',
'        <svg class="icon" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>',
'      </button>',
'    </div>',
'',
'    <div class="rev-plat rv">',
'      <p class="rev-plat-lede">Reviewed on three platforms. Every one of these opens the real listing.</p>',
'      <div class="plat-row">',
badge('google', L.googleRead, G_MARK, plat('google').count + ' reviews', '#4285F4'),
badge('bark', L.bark, '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" style="color:var(--brand)">' + AWARD + '</svg>',
      bark.count + ' reviews, rated ' + bark.rating + ' out of 5', 'var(--brand)'),
badge('yell', L.yell, '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="color:var(--brand)"><path d="' + STAR_D + '"/></svg>',
      plat('yell').count + ' reviews', 'var(--brand)'),
'      </div>',
'    </div>',
'  </div>',
'</section>',
'',
''].join('\n');

const ABOUT = '<!-- ================= ABOUT ================= -->';
if (h.split(ABOUT).length - 1 !== 1) { console.error('ABOUT marker not unique'); process.exit(1); }
h = h.replace(ABOUT, () => section + ABOUT);

/* ------------------------------------------------------- the two links -- */
const navAnchor = '      <a href="{{BASE}}our-work/">Our Work</a>\n';
if (h.split(navAnchor).length - 1 !== 1) { console.error('desktop nav anchor not unique'); process.exit(1); }
h = h.replace(navAnchor, () => navAnchor + '      <a href="#reviews">Reviews</a>\n');

const ARROW = ' <svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
const drawerAnchor = '    <a href="{{BASE}}our-work/">Our Work' + ARROW + '</a>\n';
if (h.split(drawerAnchor).length - 1 !== 1) { console.error('drawer anchor not unique'); process.exit(1); }
h = h.replace(drawerAnchor, () => drawerAnchor + '    <a href="#reviews">Reviews' + ARROW + '</a>\n');

/* ------------------------------------------------------------ the JS --- */
const revJs = [
'  /* ---------- reviews carousel ---------- */',
'  var REVIEWS = [',
].concat(R.featured.map(r =>
'    {n:' + jsStr(r.name) + ', t:' + jsStr(r.text) + ', w:' + jsStr('Verified on ' + r.platform) + ', d:' + jsStr(r.date) + '},'
)).concat([
'  ];',
'  var AV = ["#3FB000","#2E7D0B","#57C21F","#1F5E07","#4CA31A","#265F12"];',
'  var STAR = ' + jsStr(STAR_SVG) + ';',
'  var track = document.getElementById("revTrack"), pagesBox = document.getElementById("revPages");',
'  REVIEWS.forEach(function(r, i){',
'    var cell = document.createElement("div");',
'    cell.className = "rev-cell";',
'    cell.innerHTML =',
'      \'<article class="rev-card">\' +',
'        \'<div class="rev-top">\' +',
'          \'<div class="rev-av" style="background:\' + AV[i % AV.length] + \'">\' + r.n.charAt(0) + \'</div>\' +',
'          \'<div class="rev-who"><b>\' + r.n + \'</b><span>\' + r.w + \'</span></div>\' +',
'        \'</div>\' +',
'        \'<div class="stars" aria-label="5 out of 5">\' + STAR + STAR + STAR + STAR + STAR + \'</div>\' +',
'        \'<p>\' + r.t + \'</p>\' +',
'        \'<div class="rev-foot">\' + r.d + \'</div>\' +',
'      \'</article>\';',
'    track.appendChild(cell);',
'  });',
'',
'  var perView = function(){ return window.innerWidth <= 680 ? 1 : (window.innerWidth <= 1024 ? 2 : 3); };',
'  var rp = 0, revTimer, pv = perView();',
'  var pageCount = function(){ return Math.max(1, Math.ceil(REVIEWS.length / pv)); };',
'  var buildPages = function(){',
'    pagesBox.innerHTML = "";',
'    for (var i = 0; i < pageCount(); i++){',
'      (function(i){',
'        var b = document.createElement("button");',
'        b.type = "button";',
'        b.setAttribute("aria-label", "Reviews page " + (i+1));',
'        b.addEventListener("click", function(){ goRev(i); resetRev(); });',
'        pagesBox.appendChild(b);',
'      })(i);',
'    }',
'  };',
'  var goRev = function(n){',
'    var pc = pageCount();',
'    rp = (n + pc) % pc;',
'    track.style.transform = "translateX(-" + (rp * 100) + "%)";',
'    pagesBox.querySelectorAll("button").forEach(function(b, i){ b.classList.toggle("on", i === rp); });',
'  };',
'  var resetRev = function(){',
'    clearInterval(revTimer);',
'    revTimer = setInterval(function(){ goRev(rp + 1); }, 6500);',
'  };',
'  buildPages(); goRev(0); resetRev();',
'  var revView = document.getElementById("revView");',
'  revView.addEventListener("mouseenter", function(){ clearInterval(revTimer); });',
'  revView.addEventListener("mouseleave", resetRev);',
'  document.getElementById("revPrev").addEventListener("click", function(){ goRev(rp - 1); resetRev(); });',
'  document.getElementById("revNext").addEventListener("click", function(){ goRev(rp + 1); resetRev(); });',
'',
'  /* swipe on mobile */',
'  var sx = 0, sy = 0, swiping = false;',
'  revView.addEventListener("touchstart", function(e){ sx = e.touches[0].clientX; sy = e.touches[0].clientY; swiping = true; }, {passive:true});',
'  revView.addEventListener("touchend", function(e){',
'    if (!swiping) return;',
'    swiping = false;',
'    var dx = e.changedTouches[0].clientX - sx;',
'    var dy = e.changedTouches[0].clientY - sy;',
'    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)){ goRev(rp + (dx < 0 ? 1 : -1)); resetRev(); }',
'  }, {passive:true});',
'',
'  var lastPv = pv;',
'  window.addEventListener("resize", function(){',
'    pv = perView();',
'    if (pv !== lastPv){ lastPv = pv; buildPages(); goRev(0); resetRev(); }',
'  });',
'',
'']).join('\n');

const FORM = '  /* ---------- contact form to WhatsApp ---------- */';
if (h.split(FORM).length - 1 !== 1) { console.error('contact form marker not unique'); process.exit(1); }
h = h.replace(FORM, () => revJs + FORM);

/* ------------------------------------------ the visibility handler back -- */
const oldVis = `    if (document.hidden){ clearInterval(heroTimer); }
    else if (typeof restartHero === "function") restartHero();`;
if (h.split(oldVis).length - 1 !== 1) { console.error('visibility handler not as edit6 left it'); process.exit(1); }
h = h.replace(oldVis, () =>
`    if (document.hidden){ clearInterval(heroTimer); clearInterval(revTimer); }
    else { if (typeof restartHero === "function") restartHero(); resetRev(); }`);

fs.writeFileSync(P, h);

console.log('edit11: reviews section restored');
console.log('        ' + R.featured.length + ' reviews, ' + R.platforms.length + ' platforms, ' + total + ' total');
console.log('        placeholder spans in section: ' + (section.match(/class="ph"/g) || []).length);
