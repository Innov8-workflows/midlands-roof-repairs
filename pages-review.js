/* The review landing page — /review/
 *
 * The one card Kevin texts a customer the day a job finishes. One job: get them
 * onto Google. It is NOT a public /reviews/ page.
 *
 * Called from build-pages.js. Deliberately self-contained: its own <style>, no
 * nav, no footer links, not the site stylesheet. This page is opened once, on a
 * phone, on mobile data, and every extra link is a way to leave without leaving
 * a review. It does reuse the shared data, the logo and the phone number so they
 * cannot drift from the rest of the site.
 *
 * THE HARD RULES, AND WHY
 *
 *   NO INLINE <script>. Not one. The href is written here, at build time.
 *   Redline's page sets its button hrefs from an inline block; on a CSP-hardened
 *   site every button silently stays on href="#" and a normal visitor's console
 *   says nothing. There is no JS on this page at all, so there is nothing to go
 *   wrong.
 *
 *   noindex,nofollow AND absent from sitemap.xml. It is passed to write() with
 *   addToSitemap false. Listing a noindex page asks Google to crawl the page
 *   that tells it not to.
 *
 *   A still photograph, not the hero clip. The page is opened once on mobile
 *   data and a 540 KB video earns nothing. No video also means there is no
 *   prefers-reduced-motion branch to get wrong, which is how a working hero gets
 *   reported broken twice.
 *
 *   Google's "G" is the official four-path mark, the same one the kit uses. A
 *   traced brand mark is trademark trouble and reads as slop.
 *
 *   The reassurance line carries only claims declared in site.config.js claims{}.
 *
 * WHEN THERE IS NO GOOGLE LINK the primary button routes to WhatsApp instead
 * and the Google-specific steps are omitted, so the page still works and still
 * collects feedback. It switches to the Google version automatically the moment
 * reviewLinks.google is filled in. A dead button would be worse than the 404
 * this page used to serve.
 */
'use strict';

module.exports = function writeReviewPage({ write, G }) {
  const { esc, tok, asset, svg, B, ORIGIN, T, cfg, SITE, WA_PATH } = G;
  const L = SITE.reviewLinks;

  const R = SITE.review;


  const G_MARK =
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">' +
    '<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>' +
    '<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>' +
    '<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>' +
    '<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>';

  const STAR =
    '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">' +
    '<path fill="#FBBC04" d="M12 2.6l2.7 5.47 6.04.88-4.37 4.26 1.03 6.01L12 16.37l-5.4 2.85 1.03-6.01L3.26 8.95l6.04-.88z"/></svg>';

  /* WhatsApp's own mark, fill="currentColor" so `color` drives it, not `fill` */
  const WA = '<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">' + WA_PATH + '</svg>';
  /* white, for use on the green primary button */
  const WA_WHITE = '<svg viewBox="0 0 24 24" width="22" height="22" fill="#fff" aria-hidden="true">' + WA_PATH + '</svg>';

  /* ---------------------------------------------------------- the primary ask
   * Kevin has no Google Business Profile yet, so there is nowhere for a customer
   * to leave a Google review. Three options, and only one of them is any good:
   *   404          - what the page did before. Useless to him.
   *   dead button  - worse than the 404. A customer taps, nothing happens, and
   *                  they do not come back. That costs the review outright.
   *   route to WhatsApp - the page goes live, works, and collects feedback from
   *                  day one. This one.
   * The moment a real link is put in reviewLinks.google the page switches to the
   * Google version on the next build, and none of the fallback is used. */
  const hasGoogle = !!L.google;
  const primary = hasGoogle
    ? { href: L.google, label: R.button, note: R.buttonNote, ask: R.ask, mark: G_MARK, ext: true }
    : { href: 'https://wa.me/' + T.PHONE_WA, label: R.fallbackButton, note: R.fallbackNote,
        ask: R.fallbackAsk, mark: WA_WHITE, ext: true };


  /* About 3 KB of CSS. The site stylesheet is far larger and none of it applies. */
  const CSS = [
    '*{margin:0;padding:0;box-sizing:border-box}',
    'html{-webkit-text-size-adjust:100%}',
    'body{background:#0D1411;color:#14231C;font:400 16px/1.55 Inter,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;display:flex;align-items:flex-start;justify-content:center;min-height:100vh}',
    '.card{width:100%;max-width:520px;background:#fff;padding-bottom:4px}',
    '.hd{position:relative;padding:34px 24px 26px;text-align:center;background:#0D1411;overflow:hidden}',
    '.hd-bg{position:absolute;inset:0;background-image:url("' + asset('v2-4.jpg') + '");background-size:cover;background-position:center;opacity:.34}',
    '.hd-sc{position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,10,8,.60),rgba(6,10,8,.88))}',
    '.hd-in{position:relative}',
    '.logo{width:210px;height:86px;margin:0 auto 14px;background:url("' + asset('logo.png') + '") center/contain no-repeat;display:block}',
    '.hd p{color:#CBD8CF;font-size:14px}',
    '.body{padding:28px 24px 0;text-align:center}',
    '.stars{display:flex;gap:5px;justify-content:center;margin-bottom:14px}',
    '.eyebrow{font:700 11.5px/1 Inter,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#2C7D00;margin-bottom:9px}',
    'h1{font:800 30px/1.15 "Plus Jakarta Sans",Inter,sans-serif;color:#14231C;margin-bottom:12px}',
    '.thanks{color:#3C4F45;font-size:16px;max-width:40ch;margin:0 auto}',
    '.ask{margin:24px 24px 0;background:#F3F7F3;border:1px solid #E1E8E2;border-radius:14px;padding:22px 20px;text-align:center}',
    '.ask h2{font:800 19px/1.25 "Plus Jakarta Sans",Inter,sans-serif;color:#14231C;margin-bottom:9px}',
    '.ask p{color:#5D6F65;font-size:14.5px;margin-bottom:18px}',
    '.btn{display:flex;align-items:center;justify-content:center;gap:11px;width:100%;background:#3FB000;color:#fff;font:700 17px/1 "Plus Jakarta Sans",Inter,sans-serif;padding:18px 20px;border-radius:12px;text-decoration:none;box-shadow:0 6px 18px rgba(44,125,0,.28)}',
    '.btn-note{display:block;margin-top:10px;font-size:12.5px;color:#8A9891}',
    '.steps{margin:26px 24px 0;counter-reset:s;text-align:left}',
    '.steps h2{font:800 15px/1 "Plus Jakarta Sans",Inter,sans-serif;color:#14231C;margin-bottom:14px;text-align:center}',
    '.step{counter-increment:s;position:relative;padding-left:40px;margin-top:13px;color:#3C4F45;font-size:14.5px}',
    '.step::before{counter-increment:none;content:counter(s);position:absolute;left:0;top:-1px;width:26px;height:26px;border-radius:50%;background:#EAF1EC;color:#2C7D00;font:800 13px/26px Inter,sans-serif;text-align:center}',
    '.put{margin:28px 24px 0;border-top:1px solid #E8EEEA;padding-top:22px;text-align:center}',
    '.put h2{font:800 16px/1 "Plus Jakarta Sans",Inter,sans-serif;color:#14231C;margin-bottom:8px}',
    '.put p{color:#5D6F65;font-size:14px;margin-bottom:15px}',
    '.put-btns{display:flex;gap:10px}',
    '.pbtn{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;border:1px solid #C4D0C6;border-radius:11px;padding:13px 10px;text-decoration:none;color:#14231C;font:600 14.5px/1 Inter,sans-serif}',
    '.pbtn .icon{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
    '.ft{margin-top:26px;padding:18px 24px 24px;border-top:1px solid #E8EEEA;text-align:center;color:#8A9891;font-size:12px}',
    '.ft a{color:#5D6F65}',
    '.reassure{display:block;margin-bottom:6px;color:#5D6F65}',
    '@media(max-width:400px){.hd{padding:26px 18px 22px}.ask,.steps,.put{margin-left:16px;margin-right:16px}.body{padding-left:16px;padding-right:16px}h1{font-size:26px}.logo{width:175px;height:72px}}',
  ].join('\n');

  const secondary = (L.secondary || []).length
    ? '\n  <div class="put" style="border-top:none;padding-top:6px">\n    <h2>No Google account?</h2>\n    <p>These work just as well.</p>\n    <div class="put-btns">' +
      L.secondary.map(s => '<a class="pbtn" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a>').join('') +
      '</div>\n  </div>'
    : '';

  const html = '<!doctype html>\n<html lang="en-GB">\n<head>\n' +
    '<meta charset="utf-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
    '<title>Leave a review | ' + esc(T.BUSINESS) + '</title>\n' +
    '<meta name="description" content="Thank you from ' + esc(T.BUSINESS) + '. If you have a moment, a short Google review really helps a small family business in ' + esc(T.TOWN) + '.">\n' +
    '<meta name="robots" content="noindex, nofollow">\n' +
    /* Self-referencing canonical. check.js requires one on every page in client
       mode, and a SELF canonical alongside noindex is correct and standard - it
       is a canonical pointing somewhere ELSE that would conflict. */
    '<link rel="canonical" href="' + ORIGIN + B + 'review/">\n' +
    '<meta name="theme-color" content="' + cfg.palette.ink + '">\n' +
    '<link rel="icon" href="' + asset('favicon.png') + '">\n' +
    '<meta property="og:type" content="website">\n' +
    '<meta property="og:title" content="How did we do? | ' + esc(T.BUSINESS) + '">\n' +
    '<meta property="og:description" content="Thank you for having us out. A few words on Google takes about thirty seconds.">\n' +
    '<meta property="og:url" content="' + ORIGIN + B + 'review/">\n' +
    /* its OWN card, not the site default - otherwise the review link and the
       homepage link produce identical previews in the same WhatsApp thread */
    '<meta property="og:image" content="' + ORIGIN + asset('card-review.jpg') + '">\n' +
    '<meta name="twitter:card" content="summary_large_image">\n' +
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">\n' +
    '<style>\n' + CSS + '\n</style>\n</head>\n<body>\n' +
    '<main class="card">\n' +
    '  <div class="hd">\n    <div class="hd-bg"></div><div class="hd-sc"></div>\n    <div class="hd-in">\n' +
    '      <span class="logo" role="img" aria-label="' + esc(T.BUSINESS) + '"></span>\n' +
    '      <p>Roofing in ' + esc(T.TOWN) + ' and across ' + esc(T.COUNTY) + '</p>\n    </div>\n  </div>\n\n' +
    '  <div class="body">\n' +
    '    <div class="stars" aria-label="Five stars">' + STAR.repeat(5) + '</div>\n' +
    '    <div class="eyebrow">' + esc(R.eyebrow) + '</div>\n' +
    '    <h1>' + esc(R.title) + '</h1>\n' +
    '    <p class="thanks">' + esc(tok(R.thanks)) + '</p>\n  </div>\n\n' +
    '  <div class="ask">\n' +
    '    <h2>' + esc(tok(R.askTitle)) + '</h2>\n' +
    '    <p>' + esc(tok(primary.ask)) + '</p>\n' +
    '    <a class="btn" href="' + esc(primary.href) + '" target="_blank" rel="noopener">' + primary.mark + esc(primary.label) + '</a>\n' +
    '    <span class="btn-note">' + esc(primary.note) + '</span>\n  </div>\n\n' +
    /* The steps are about signing in to Google, so they only make sense in the
       Google version. In the WhatsApp fallback they are omitted entirely rather
       than reworded into filler. */
    (hasGoogle
      ? '  <div class="steps">\n    <h2>How it works</h2>\n' +
        R.steps.map(x => '    <div class="step">' + esc(tok(x)) + '</div>').join('\n') + '\n  </div>\n'
      : '') +
    secondary + '\n\n' +
    '  <div class="put">\n' +
    '    <h2>' + esc(tok(R.putRightTitle)) + '</h2>\n' +
    '    <p>' + esc(tok(hasGoogle ? R.putRight : R.fallbackPutRight)) + '</p>\n' +
    '    <div class="put-btns">\n' +
    '      <a class="pbtn" href="tel:' + T.PHONE_TEL + '">' + svg('phone') + 'Call ' + esc(T.OWNER) + '</a>\n' +
    /* In the WhatsApp fallback the primary button is already WhatsApp, so
       repeating it here would put the same destination on the card twice. */
    (hasGoogle
      ? '      <a class="pbtn" href="https://wa.me/' + T.PHONE_WA + '" target="_blank" rel="noopener">' + WA + 'WhatsApp</a>\n'
      : '') +
    '    </div>\n  </div>\n\n' +
    '  <div class="ft">\n' +
    '    <span class="reassure">' + esc(R.reassure) + '</span>\n' +
    '    Copyright 2026 ' + esc(T.BUSINESS) + ', ' + esc(T.TOWN) + '.<br>\n' +
    '    Website by <a href="https://innov8workflows.co.uk" target="_blank" rel="noopener">Innov8 Workflows</a>\n' +
    '  </div>\n</main>\n</body>\n</html>\n';

  /* false = keep it OUT of sitemap.xml */
  write('review/index.html', html, false);
  console.log('  review landing page written -> ' + B + 'review/');
};
