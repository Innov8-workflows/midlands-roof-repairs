'use strict';
/* Keeps the homepage review badges pointing at whatever content/site.js says.
 *
 * WHY THIS EXISTS
 * The 39 generated pages read content/site.js at build time. The homepage does
 * not - it is built by the kit engine from _src/body.html, so anything the
 * homepage shows had to be written into that file. edit11.js wrote the three
 * review badge hrefs in on 2026-09-07, and the moment reviewLinks.googleRead
 * changed the next day the homepage was still pointing at the old URL, silently.
 * A stale link on the badge that says "read our reviews" is exactly the kind of
 * thing nobody notices until a customer does.
 *
 * So: build.js runs this first, every build. It is idempotent - it rewrites the
 * hrefs to match the data file and says nothing if they already do.
 *
 * It deliberately does NOT touch the counts or the review text, which are also
 * baked. Those are prose inside the carousel and rewriting them safely means
 * re-running edit11, which is destructive. If the reviews themselves change,
 * revert _src/body.html and re-run edit11.js. This only guards the hrefs,
 * because those are what silently rot.
 */
const fs = require('fs');
const path = require('path');

module.exports = function syncReviewLinks(root) {
  root = root || __dirname;
  const P = path.join(root, '_src', 'body.html');
  const SITE = require(path.join(root, 'content', 'site.js'));
  const L = SITE.reviewLinks;

  if (!fs.existsSync(P)) throw new Error('sync-review-links: no _src/body.html');
  let h = fs.readFileSync(P, 'utf8');

  /* the badge row, keyed by the class the writer gave each one */
  const want = { google: L.googleRead, bark: L.bark, yell: L.yell };
  const changed = [];

  for (const key of Object.keys(want)) {
    const target = want[key];
    if (!target) throw new Error('sync-review-links: reviewLinks has no URL for ' + key);

    /* <a class="plat plat-google" href="..."  - capture and replace just the href */
    const re = new RegExp('(<a class="plat plat-' + key + '" href=")([^"]*)(")');
    const m = h.match(re);
    if (!m) throw new Error('sync-review-links: no plat-' + key + ' badge in _src/body.html');

    /* the href in the file is HTML-escaped; compare like for like */
    const current = m[2].replace(/&amp;/g, '&');
    if (current === target) continue;

    changed.push(key + ': ' + current.slice(0, 48) + ' -> ' + target.slice(0, 48));
    h = h.replace(re, (_, a, __, c) => a + target.replace(/&/g, '&amp;') + c);
  }

  if (changed.length) {
    fs.writeFileSync(P, h);
    console.log('sync-review-links: rewrote ' + changed.length + ' homepage badge href(s)');
    changed.forEach(c => console.log('  ' + c));
  }
  return changed.length;
};

if (require.main === module) {
  const n = module.exports(__dirname);
  if (!n) console.log('sync-review-links: homepage badges already match content/site.js');
}
