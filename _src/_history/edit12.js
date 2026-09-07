'use strict';
/* Makes every WhatsApp link on the HOMEPAGE open with a message saying the
 * enquiry came from the website, and adds a source line to the quote form.
 *
 * The other 38 pages get this from generate.js waHref(). The homepage does not
 * go through generate.js - it is built from this file by the kit engine - so its
 * links have to be written out here. The wording still comes from ONE place,
 * content/site.js `whatsapp`, which this reads.
 *
 * WHY THE TEXT IS BAKED AND NOT TOKENISED
 * `{{BUSINESS}}` is substituted by a plain string replace at build time. Inside
 * a URL query string that would drop "Midland Roof Shield" in with raw spaces
 * and break the href, so the business name is URL-encoded here instead. That
 * means a change to tokens.BUSINESS does NOT reach these six links - re-run this
 * script if the trading name ever changes.
 *
 * The form message is different in kind. It already carries name, phone, area
 * and service, so it does not need page context; it needs to say which form on
 * which site, which is what formSource does.
 *
 * Re-runnable: refuses if the links already carry text.
 */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'body.html');
const SITE = require(path.join(__dirname, '..', '..', 'content', 'site.js'));
const cfg = require(path.join(__dirname, '..', '..', 'site.config.js'));

let h = fs.readFileSync(P, 'utf8');
if (h.includes('wa.me/{{PHONE_WA}}?text=')) { console.error('homepage WhatsApp links already carry text'); process.exit(1); }

const T = cfg.tokens;
const tok = s => String(s).replace(/\{\{(\w+)\}\}/g, (m, k) => (k in T ? T[k] : m));

/* ---------------------------------------------------- the plain links --- */
const text = tok(SITE.whatsapp.opener(null));
const BARE = 'https://wa.me/{{PHONE_WA}}';
const withText = BARE + '?text=' + encodeURIComponent(text);

const n = h.split('href="' + BARE + '"').length - 1;
if (n !== 5) { console.error("expected 5 bare WhatsApp hrefs on the homepage, found " + n); process.exit(1); }
h = h.split('href="' + BARE + '"').join('href="' + withText + '"');

/* nothing may be left bare */
if (h.includes('href="' + BARE + '"')) { console.error('a bare href survived'); process.exit(1); }

/* ------------------------------------------------------- the form JS ---- */
const oldFirst = '      "Hi {{BUSINESS}}, I would like a quote.",';
if (h.split(oldFirst).length - 1 !== 1) { console.error('form opening line not found'); process.exit(1); }
h = h.replace(oldFirst, () => '      ' + JSON.stringify(SITE.whatsapp.formOpener) + ',');

const oldLast = '      "Details: " + (v("detail") || "Not given")\n    ];';
if (h.split(oldLast).length - 1 !== 1) { console.error('form last line not found'); process.exit(1); }
h = h.replace(oldLast, () =>
  '      "Details: " + (v("detail") || "Not given"),\n' +
  '      "",\n' +
  '      ' + JSON.stringify(SITE.whatsapp.formSource) + '\n    ];');

fs.writeFileSync(P, h);

console.log('edit12: 5 homepage WhatsApp links now open with:');
console.log('        "' + text + '"');
console.log('        form opens with : ' + tok(SITE.whatsapp.formOpener));
console.log('        form signs off  : ' + tok(SITE.whatsapp.formSource));
