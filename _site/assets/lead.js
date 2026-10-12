

(function () {
  'use strict';

  var LEAD_URL = 'https://script.google.com/macros/s/AKfycbzn4JFEaXzzLFegCZYYSj07wRE7dTLExrphLwZPeaBr_duebZhnTObvAfONZ9cU0e2Y/exec';
  if (!LEAD_URL) return;

  var LEAD_TEST = /[?&]test=1/.test(location.search);

  function sendLead(d) {
    try {
      d.page = location.pathname || '/';
      d.referrer = document.referrer || '';
      if (LEAD_TEST) d.test = true;
      fetch(LEAD_URL, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(d)
      })['catch'](function () {   });
    } catch (e) {   }
  }
  window.sendLead = sendLead;

  function where(el) {
    if (!el || !el.closest) return 'page';
    if (el.closest('.wa')) return 'whatsapp widget';
    if (el.closest('.drawer')) return 'mobile menu';
    if (el.closest('.nav')) return 'nav';
    if (el.closest('.hero')) return 'hero';
    if (el.closest('#contact, form')) return 'contact form';
    if (el.closest('.side-card')) return 'side card';
    if (el.closest('.cta')) return 'CTA band';
    if (el.closest('footer')) return 'footer';
    return 'page';
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var a = t.closest('a');
    if (!a) return;
    var h = a.getAttribute('href') || '';

    if (h.indexOf('tel:') === 0) {
      sendLead({ type: 'Call click', phone: h.replace('tel:', ''), source: where(a) });
    } else if (/wa\.me|api\.whatsapp\.com|whatsapp:/i.test(h)) {
      sendLead({ type: 'WhatsApp click', source: where(a) });
    } else if (h.indexOf('mailto:') === 0) {
      sendLead({ type: 'Email click', details: h.replace('mailto:', '').split('?')[0], source: where(a) });
    }
  }, true);

  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || f.id !== 'quoteForm') return;
    function v(k) {
      try { var el = f.elements[k]; return el ? String(el.value || '').trim() : ''; }
      catch (err) { return ''; }
    }
    sendLead({
      type: 'Quote form',
      name: v('name'),
      phone: v('phone'),

      area: v('area'),
      service: v('service'),
      details: v('detail'),
      botcheck: v('botcheck'),
      source: 'contact form'
    });
  }, true);
})();
