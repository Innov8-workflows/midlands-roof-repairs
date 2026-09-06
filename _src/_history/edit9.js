'use strict';
/* The homepage has its OWN footer, in _src/body.html, separate from the footer()
 * in generate.js that every other page uses. Changes to one do not reach the
 * other, and a crawl from / is what catches it.
 *
 * Brings the homepage footer into line with the rest of the site:
 *   1. the roofing supplies link
 *   2. the company details a UK limited company's website has to carry, which
 *      this site was showing nowhere
 */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'body.html');
let h = fs.readFileSync(P, 'utf8');
const R = [];
const rep = (a, b) => R.push([a, b]);

rep('          <li><a href="{{BASE}}contact/">Contact and opening hours</a></li>',
    '          <li><a href="{{BASE}}contact/">Contact and opening hours</a></li>\n          <li><a href="{{BASE}}roofing-supplies/">Roofing supplies and trade counter</a></li>');

rep('<small>Copyright 2026 {{BUSINESS}}. All rights reserved. <a href="{{BASE}}privacy-policy/">Privacy</a> / <a href="{{BASE}}terms/">Terms</a></small>',
    '<small>Midland Roof Shield Limited, registered in England and Wales, company 15537075.\n        Registered office Unit 12 Oaklands Industrial Estate, Lower Road, Hednesford, Cannock WS12 2UZ.<br>\n        Copyright 2026 {{BUSINESS}}. All rights reserved. <a href="{{BASE}}privacy-policy/">Privacy</a> / <a href="{{BASE}}terms/">Terms</a></small>');

let fails = [];
for (const [a, b] of R) {
  const n = h.split(a).length - 1;
  if (n !== 1) { fails.push('found ' + n + 'x: ' + JSON.stringify(a.slice(0, 70))); continue; }
  h = h.replace(a, () => b);
}
if (fails.length) { console.error('UNMATCHED:\n' + fails.join('\n')); process.exit(1); }
fs.writeFileSync(P, h);
console.log('edit9: homepage footer now carries the supplies link and the company details');
