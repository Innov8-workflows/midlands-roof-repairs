

(function () {
  'use strict';

  var GA4 = 'G-E33FMGV73W';
  var KEY = 'mrs_consent';

  if (!GA4) return;

  var loaded = false;
  var bar = null;

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {   } }

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

    gtag('config', GA4);

    var q = window.__trackQueue || [];
    window.__trackQueue = null;
    q.forEach(function (ev) { window.track(ev[0], ev[1]); });
  }

  window.track = function (name, params) {
    if (!loaded) {
      if (read() === 'no') return;
      window.__trackQueue = window.__trackQueue || [];
      window.__trackQueue.push([name, params]);
      return;
    }
    try { if (window.gtag) gtag('event', name, params || {}); } catch (e) {}
  };

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

      'body.cc-open .wa{bottom:calc(18px + 104px)}' +
      '@media(max-width:600px){.cc-btns{width:100%}.cc-btn{flex:1 1 0}' +
      'body.cc-open .wa{bottom:calc(14px + 158px)}}';
    document.head.appendChild(st);
  }

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

  function wire() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.indexOf('tel:') === 0) window.track('contact_call', { method: 'phone' });
      else if (href.indexOf('wa.me') > -1) window.track('contact_whatsapp', { method: 'whatsapp' });
      else if (href.indexOf('mailto:') === 0) window.track('contact_email', { method: 'email' });
    }, true);

    document.addEventListener('submit', function (e) {
      var f = e.target;
      if (!f || f.id !== 'quoteForm') return;
      var svc = '';
      try { svc = (f.elements.service && f.elements.service.value) || ''; } catch (err) {}

      window.track('generate_lead', { method: 'quote_form', service: svc });
    }, true);
  }

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
