'use strict';
/* Removes the reviews section. The client has no Google Business Profile yet, so
   there is nothing real to show and the three platform badges pointed nowhere.

   The JS has to go with the markup. The carousel does
   `track.appendChild(...)` unguarded, so leaving it behind would throw on a null
   #revTrack and kill the rest of the IIFE - the contact form, the lightbox and
   the reveal observer all live after it in the same function. */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'body.html');
let h = fs.readFileSync(P, 'utf8');

/* cut everything between `from` (inclusive) and `to` (exclusive) */
function cutBetween(label, from, to) {
  const i = h.indexOf(from), j = h.indexOf(to);
  if (i < 0) { console.error('missing start marker: ' + label); process.exit(1); }
  if (j < 0) { console.error('missing end marker: ' + label); process.exit(1); }
  if (j <= i) { console.error('markers out of order: ' + label); process.exit(1); }
  const removed = j - i;
  h = h.slice(0, i) + h.slice(j);
  console.log('  cut ' + label + ': ' + removed + ' chars');
}

function cutExact(label, s) {
  const n = h.split(s).length - 1;
  if (n !== 1) { console.error('expected 1 match for ' + label + ', found ' + n); process.exit(1); }
  h = h.replace(s, () => '');
  console.log('  cut ' + label);
}

/* 1. the section itself */
cutBetween('reviews section',
  '<!-- ================= REVIEWS ================= -->',
  '<!-- ================= ABOUT ================= -->');

/* 2. the two nav entries */
cutExact('desktop nav link', '      <a href="#reviews">Reviews</a>\n');
cutExact('drawer nav link',
  '    <a href="#reviews">Reviews <svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>\n');

/* 3. the carousel JS, including its resize and swipe handlers */
cutBetween('carousel JS',
  '  /* ---------- reviews carousel ---------- */',
  '  /* ---------- contact form to WhatsApp ---------- */');

/* 4. the visibility handler still referenced revTimer and resetRev */
cutExact('visibility handler body',
  `    if (document.hidden){ clearInterval(heroTimer); clearInterval(revTimer); }
    else { if (typeof restartHero === "function") restartHero(); resetRev(); }`);
h = h.replace('  document.addEventListener("visibilitychange", function(){\n\n  });',
`  document.addEventListener("visibilitychange", function(){
    if (document.hidden){ clearInterval(heroTimer); }
    else if (typeof restartHero === "function") restartHero();
  });`);

/* nothing may still reference the carousel */
const dead = ['revTrack', 'revPages', 'revView', 'revPrev', 'revNext', 'revTimer',
              'resetRev', 'goRev', 'REVIEWS', 'rev-cell', 'rev-plat', '#reviews'];
const left = dead.filter(k => h.includes(k));
if (left.length) { console.error('still referenced: ' + left.join(', ')); process.exit(1); }

fs.writeFileSync(P, h);
console.log('edit6: reviews section removed, no dangling references');
