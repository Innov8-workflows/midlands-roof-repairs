'use strict';
/* Adds a photographic background to the "Where we work" band.
   Mirrors the kit's proven .cta pattern: a background div plus a separate scrim
   div, both on a negative z-index inside an `isolation:isolate` section.

   The background is set with an INLINE style="background-image:url(...)" and NOT
   through a CSS custom property - a custom-property url() in a stylesheet
   resolves against the stylesheet's directory and 404s, which reads as an
   overlay that is far too dark. See HOUSE-RULES. */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'body.html');
let h = fs.readFileSync(P, 'utf8');
const R = [];
const rep = (a, b) => R.push([a, b]);

/* the darkening keeps the direction's own gradient recipe, just made translucent
   so the photograph shows through underneath it */
rep('  .brand-txt span{color:var(--brand-lt)}',
`  .brand-txt span{color:var(--brand-lt)}
  /* Where we work: photograph behind the band. Same structure as .cta. */
  .areas{position:relative;overflow:hidden;isolation:isolate;background-image:none}
  .areas-bg{position:absolute;inset:0;z-index:-2;background-size:cover;background-position:center}
  .areas-scrim{position:absolute;inset:0;z-index:-1;background:
    radial-gradient(72% 100% at 10% 50%,rgba(var(--brand-rgb),.30),transparent 62%),
    radial-gradient(72% 100% at 92% 42%,rgba(var(--brand2-rgb),.24),transparent 60%),
    linear-gradient(135deg,rgba(var(--ink-deep-rgb),.90) 0%,rgba(var(--ink-rgb),.82) 52%,rgba(var(--ink-deep-rgb),.92) 100%)}`);

rep('<section class="sec areas s-brand" id="areas">\n  <div class="wrap">',
    '<section class="sec areas s-brand" id="areas">\n  <div class="areas-bg" style="background-image:url(\'{{ASSET:areas.jpg}}\')" role="img" aria-label="A newly tiled roof above the street it sits on"></div>\n  <div class="areas-scrim"></div>\n  <div class="wrap">');

let fails = [];
for (const [a, b] of R) {
  const n = h.split(a).length - 1;
  if (n !== 1) { fails.push('found ' + n + 'x: ' + JSON.stringify(a.slice(0, 80))); continue; }
  h = h.replace(a, () => b);
}
if (fails.length) { console.error('UNMATCHED:\n' + fails.join('\n')); process.exit(1); }
fs.writeFileSync(P, h);
console.log('edit3: areas band background wired in');
