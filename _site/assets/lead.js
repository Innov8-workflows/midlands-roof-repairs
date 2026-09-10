/* ============================================================================
   SOURCE for _site/assets/lead.js  -  the lead beacon.

   Posts every contact action to the Apps Script web app, which fans it out to
   the Google Sheet, an email alert to Jay, and the innov8 CRM.

   build-pages.js substitutes the exec URL from site.config.js leadLog.exec.
   While that is empty this file returns early and does nothing at all, so the
   site can ship before the script is deployed.

   NEVER navigator.sendBeacon HERE. Brave, uBlock and Firefox strict mode block
   the beacon WHILE sendBeacon() still returns true, so the usual
       if (sendBeacon(...)) return; fetch(...)
   shape skips the working fetch and the lead vanishes with no error anywhere.
   fetch + keepalive survives the WhatsApp app-switch just as well - that is what
   keepalive is for - and cannot report a success it did not achieve.

   NOT CONSENT GATED, and deliberately a separate file from analytics.js so that
   distinction is structural rather than a comment someone has to notice. It sets
   no cookies and stores no identifiers, so PECR - which governs device storage -
   does not apply. A declined cookie banner must never cost a real enquiry.
   ============================================================================ */
(function () {
  'use strict';

  var LEAD_URL = '';
  if (!LEAD_URL) return;              // not deployed yet - do nothing

  /* ?test=1 routes the row to a hidden Test tab and prefixes the alert [TEST].
     The CRM does NOT separate test leads - delete those from the Client Dash. */
  var LEAD_TEST = /[?&]test=1/.test(location.search);

  function sendLead(d) {
    try {
      d.page = location.pathname || '/';
      d.referrer = document.referrer || '';
      if (LEAD_TEST) d.test = true;
      fetch(LEAD_URL, {
        method: 'POST',
        mode: 'no-cors',            // the reply is not read, only delivered
        keepalive: true,            // survives unload and the app-switch
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },  // no preflight
        body: JSON.stringify(d)
      })['catch'](function () { /* never break the page */ });
    } catch (e) { /* never break the page */ }
  }
  window.sendLead = sendLead;

  /* Where on the page it happened -> the Sheet's Source column, so "three calls
     off the bottom CTA" is an answerable question. Selectors are this site's. */
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

  /* One delegated listener covers every link on all 40 pages, including the
     drawer, which is built before this runs but could be re-rendered.

     THESE TYPE STRINGS AND Code.gs NOTIFY_TYPES MUST STAY IDENTICAL. A mismatch
     silently disables every alert for that action while the row still lands, so
     it looks like the email is broken rather than the name. */
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

  /* The quote form, homepage only.
     Read through form.elements, NOT getElementById - these inputs carry `name`
     and no `id`, so an id lookup would post five empty strings and every lead
     would arrive blank while still looking like it worked.
     Fires on submit, before the site's own handler carries the tab off to
     WhatsApp. preventDefault() does not stop propagation, so both run. */
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
      /* No email field on this form - the site collects name, phone, town,
         service and detail. `area` is Midland-specific and Code.gs already
         folds it into the CRM message. */
      area: v('area'),
      service: v('service'),
      details: v('detail'),
      source: 'contact form'
    });
  }, true);
})();
