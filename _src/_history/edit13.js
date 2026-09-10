'use strict';
/* Puts the analytics script tag on the homepage.
 *
 * That is the whole change - ONE line. The consent banner, its CSS and the
 * event wiring all live inside assets/analytics.js and are injected at runtime,
 * precisely so the demo homepage does not have to be opened up to add tracking
 * to it. No markup moves, no section changes, the IIFE is not touched.
 *
 * The quote form keeps its own submit handler. analytics.js listens for the
 * same submit event separately: preventDefault() cancels the default action, it
 * does not stop propagation, so both run and neither knows about the other.
 *
 * The 39 generated pages get the same tag from generate.js shell().
 * /review/ does NOT get it - zero script tags there is a hard rule.
 *
 * Re-runnable: refuses if the tag is already present.
 */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'body.html');

let h = fs.readFileSync(P, 'utf8');
if (h.includes('assets/analytics.js')) { console.error('analytics tag already on the homepage'); process.exit(1); }

/* body.html is a FRAGMENT. The kit template supplies <html>, <head> and
   </body>, so there is no closing tag in here to anchor on. The file ends with
   the site's own IIFE, and the tag belongs after it - last, and deferred, so it
   is never in the way of the hero or the form. */
if (!/<\/script>\s*$/.test(h)) {
  console.error('body.html does not end with the site IIFE - refusing to guess where the tag goes');
  process.exit(1);
}

const tag = '\n<script src="{{BASE}}assets/analytics.js" defer></script>\n';
h = h.replace(/\s*$/, tag);
fs.writeFileSync(P, h);

console.log('edit13: homepage now loads assets/analytics.js (deferred)');
