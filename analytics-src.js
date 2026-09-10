/* ============================================================================
   SOURCE for _site/assets/analytics.js
   build-pages.js reads this file, substitutes the GA4 id placeholder below for
   site.config.js analytics.ga4, and writes it into the built site. Edit THIS
   file, never the one in _site.

   The placeholder must appear EXACTLY ONCE in this file - build-pages.js
   throws otherwise - so do not quote it in a comment.

   WHY IT IS ONE EXTERNAL FILE AND NOT AN INLINE SNIPPET
   This site is 40 pages built two different ways: the homepage comes out of
   _src/body.html through the kit engine, everything else out of generate.js.
   An inline snippet would have to be pasted into both and would drift. One
   file, referenced by both, cannot.

   It also injects its own CSS and its own banner markup, so adding analytics
   to a page is exactly one <script src> line and nothing else - which matters,
   because the homepage is the demo that won the customer and is not to be
   restructured.

   WHY THE CSS AND MARKUP COME FROM JAVASCRIPT
   No JavaScript means no gtag, which means no cookies, which means nothing to
   consent to. A banner rendered in HTML for a visitor who can never be tracked
   is a nuisance asking permission for something that is not happening.

   NOT ON /review/. That page carries zero script tags by design - it is opened
   once, on a phone, on mobile data, and its CSP story is simpler for it. It
   sets no cookies either way.
   ============================================================================ */
(function () {
  'use strict';

  var GA4 = '{{GA4_ID}}';
  var KEY = 'mrs_consent';

  /* Nothing below does anything useful without an id, and shipping a banner
     that asks to set cookies nobody is setting would be worse than useless. */
  if (!GA4) return;

  var loaded = false;
  var bar = null;

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* private mode */ } }

  /* ---------------------------------------------------------------- gtag -- */
  /* Injected ONLY after an explicit Accept. Under UK PECR the tag must not run
     first and ask afterwards, which is what a banner bolted onto a hard-coded
     gtag snippet actually does. */
  function grantConsent() {
    if (loaded) return;
    loaded = true;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    /* No anonymize_ip - that is a Universal Analytics parameter. GA4 ignores it
       and already truncates the IP itself, so setting it would imply a control
       that is not being applied. */
    gtag('config', GA4);

    /* Replay anything that happened before Accept. A visitor who taps Call and
       then accepts has still tapped Call. Nothing was sent while consent was
       absent - it was only held. */
    var q = window.__trackQueue || [];
    window.__trackQueue = null;
    q.forEach(function (ev) { window.track(ev[0], ev[1]); });
  }

  /* ------------------------------------------------------ the entry point -- */
  /* Before consent: queue. After a decline: discard. Never throws - an
     analytics failure must not take a contact button down with it. */
  window.track = function (name, params) {
    if (!loaded) {
      if (read() === 'no') return;
      window.__trackQueue = window.__trackQueue || [];
      window.__trackQueue.push([name, params]);
      return;
    }
    try { if (window.gtag) gtag('event', name, params || {}); } catch (e) {}
  };

  /* ---------------------------------------------------------------- CSS --- */
  function css() {
    var st = document.createElement('style');
    st.textContent =
      '.cc{position:fixed;left:0;right:0;bottom:0;z-index:90;background:#0D1411;' +
      'border-top:1px solid rgba(255,255,255,.12);box-shadow:0 -10px 30px rgba(0,0,0,.45);' +
      'padding:16px var(--pad,20px) calc(16px + env(safe-area-inset-bottom))}' +
      '.cc[hidden]{display:none!important}' +
      '.cc-in{max-width:var(--wrap,1200px);margin-inline:auto;display:flex;align-items:center;' +
      'gap:16px 22px;flex-wrap:wrap}' +
      '.cc p{color:#CBD8CF;font-size:13.6px;line-height:1.55;flex:1 1 320px;margin:0}' +
      '.cc a{color:var(--brand-lt,#66D42B);text-decoration:underline}' +
      '.cc-btns{display:flex;gap:10px;flex:0 0 auto}' +
      '.cc-btn{font-family:var(--font-display,inherit);font-weight:800;font-size:14px;' +
      'padding:11px 22px;border-radius:var(--r,12px);cursor:pointer;white-space:nowrap;border:0}' +
      '.cc-yes{background:var(--brand,#3FB000);color:#fff}' +
      '.cc-no{background:transparent;color:#CBD8CF;border:1.5px solid rgba(255,255,255,.24)}' +
      /* the WhatsApp float must not sit under the bar */
      'body.cc-open .wa{bottom:calc(18px + 104px)}' +
      '@media(max-width:600px){.cc-btns{width:100%}.cc-btn{flex:1 1 0}' +
      'body.cc-open .wa{bottom:calc(14px + 158px)}}';
    document.head.appendChild(st);
  }

  /* -------------------------------------------------------------- banner -- */
  function build() {
    css();
    bar = document.createElement('div');
    bar.className = 'cc';
    bar.id = 'cc';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie choices');
    bar.hidden = true;
    bar.innerHTML =
      '<div class="cc-in">' +
        '<p>We use cookies to measure how the website is doing. Nothing is set unless you accept, ' +
        'and declining does not affect your quote or how we handle your enquiry. ' +
        'See our <a href="/privacy-policy/">privacy policy</a>.</p>' +
        '<div class="cc-btns">' +
          '<button class="cc-btn cc-no" type="button" data-cc="no">Decline</button>' +
          '<button class="cc-btn cc-yes" type="button" data-cc="yes">Accept</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(bar);

    bar.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-cc]') : null;
      if (!b) return;
      var yes = b.getAttribute('data-cc') === 'yes';
      store(yes ? 'yes' : 'no');
      hide();
      if (yes) grantConsent(); else window.__trackQueue = null;
    });
  }

  function show() { if (bar) { bar.hidden = false; document.body.classList.add('cc-open'); } }
  function hide() { if (bar) { bar.hidden = true; document.body.classList.remove('cc-open'); } }

  /* ------------------------------------------------------------- events -- */
  /* Wired on the LINK, not on a data-track attribute. Only some of the contact
     links carry data-track, and a rule that silently covers five of nine
     buttons is worse than no rule. href is the thing that is always true. */
  function wire() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.indexOf('tel:') === 0) window.track('contact_call', { method: 'phone' });
      else if (href.indexOf('wa.me') > -1) window.track('contact_whatsapp', { method: 'whatsapp' });
      else if (href.indexOf('mailto:') === 0) window.track('contact_email', { method: 'email' });
    }, true);

    /* The homepage quote form. Its own handler calls preventDefault(), which
       does NOT stop this one - preventDefault cancels the default action, it
       does not stop propagation - so the two coexist without touching the
       homepage IIFE at all. */
    document.addEventListener('submit', function (e) {
      var f = e.target;
      if (!f || f.id !== 'quoteForm') return;
      var svc = '';
      try { svc = (f.elements.service && f.elements.service.value) || ''; } catch (err) {}
      /* generate_lead is a GA4 recommended event name, so it can be marked as a
         key event in the GA4 admin without a custom definition. */
      window.track('generate_lead', { method: 'quote_form', service: svc });
    }, true);
  }

  /* ---------------------------------------------------------------- go --- */
  function start() {
    build();
    wire();
    var prior = read();
    if (prior === 'yes') grantConsent();
    else if (prior !== 'no') show();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
