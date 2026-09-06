'use strict';
/* Adds Kevin's batch 2 photographs to the homepage gallery.
 *
 * They go in as `.more`, which the kit hides in the homepage grid
 * (.gal figure.more{display:none}) but still clones into the "View all our work"
 * panel and counts in workCount. So:
 *   - the homepage grid keeps exactly the 10 visible photographs it converted on
 *   - the panel goes from 17 to 35
 *   - the counter goes from 17 to 35 (the JS sets it from figs.length anyway;
 *     the static number is only the no-JS fallback)
 *
 * Nothing is reordered and nothing is removed. If any of the new photographs
 * should be promoted into the visible 10, that is a matter of moving a figure up
 * and dropping its `more` class - a deliberate change to the converting layout,
 * so it is not done here.
 */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'body.html');
const SITE = require(path.join(__dirname, '..', '..', 'content', 'site.js'));
let h = fs.readFileSync(P, 'utf8');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const figs = SITE.galleryV2.map(([id, , alt, cap]) =>
  `      <figure class="more"><img loading="lazy" src="{{ASSET:${id}.jpg}}" alt="${esc(alt)}"><figcaption>${esc(cap)}</figcaption></figure>`
).join('\n');

/* insert immediately before the gallery's closing </div>, which is the one that
   follows the last batch 1 figure */
const anchor = '<figcaption>Lead tray</figcaption></figure>\n    </div>';
if (h.split(anchor).length - 1 !== 1) { console.error('gallery close anchor not unique'); process.exit(1); }
h = h.replace(anchor, '<figcaption>Lead tray</figcaption></figure>\n' + figs + '\n    </div>');

/* no-JS fallback count */
const before = '<span id="workCount">17</span> roof photographs';
const after = '<span id="workCount">' + (SITE.gallery.length + SITE.galleryV2.length) + '</span> roof photographs';
if (h.split(before).length - 1 !== 1) { console.error('workCount anchor not found'); process.exit(1); }
h = h.replace(before, after);

fs.writeFileSync(P, h);
const total = (h.match(/<figure[^>]*><img loading="lazy" src="\{\{ASSET:/g) || []).length;
console.log('edit8: homepage gallery now ' + total + ' figures (' + SITE.galleryV2.length + ' added as .more)');
