'use strict';
/* Build-out pass over the demo homepage, from onboarding submission #17.
 *
 * WHAT DOES NOT CHANGE: section order, the hero, both videos, the
 * transformations, the gallery, the theme, the art direction. Untouched.
 *
 * WHAT DOES:
 *   1. nav, drawer and footer hrefs point at the new pages. Without this the 37
 *      new pages have no crawl path from the homepage and the build-out does
 *      nothing for search. Same reasoning as the Fairmont generator.
 *   2. "the Midlands" becomes Cannock - the 27 Aug value was a guess off the
 *      trading name and the submission now gives the real town. Jay approved.
 *   3. placeholders that the submission answers are filled with real facts:
 *      opening hours, the areas list, the accreditation strip, Kevin's story.
 *   4. the Facebook rows come out - no page URL was ever given.
 */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'body.html');
let h = fs.readFileSync(P, 'utf8');
const R = [];
const rep = (a, b) => R.push([a, b]);

const pin = '<svg class="icon" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';

/* ---------- 1. nav + drawer hrefs ---------- */
rep(`      <a href="#services">Services</a>
      <a href="#transformations">Our Jobs</a>
      <a href="#gallery">Our Work</a>
      <a href="#about">About</a>
      <a href="#areas">Areas</a>
      <a href="#contact">Contact</a>`,
`      <a href="{{BASE}}services/">Services</a>
      <a href="#transformations">Our Jobs</a>
      <a href="{{BASE}}our-work/">Our Work</a>
      <a href="{{BASE}}about/">About</a>
      <a href="{{BASE}}areas-we-cover/">Areas</a>
      <a href="{{BASE}}faqs/">FAQs</a>
      <a href="{{BASE}}contact/">Contact</a>`);

const arrow = '<svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
rep(`    <a href="#services">Services ${arrow}</a>
    <a href="#transformations">Our Jobs ${arrow}</a>
    <a href="#gallery">Our Work ${arrow}</a>
    <a href="#about">About ${arrow}</a>
    <a href="#areas">Areas ${arrow}</a>
    <a href="#contact">Contact ${arrow}</a>`,
`    <a href="{{BASE}}services/">Services ${arrow}</a>
    <a href="#transformations">Our Jobs ${arrow}</a>
    <a href="{{BASE}}our-work/">Our Work ${arrow}</a>
    <a href="{{BASE}}about/">About ${arrow}</a>
    <a href="{{BASE}}areas-we-cover/">Areas ${arrow}</a>
    <a href="{{BASE}}faqs/">FAQs ${arrow}</a>
    <a href="{{BASE}}contact/">Contact ${arrow}</a>`);

/* ---------- 2. the Midlands -> Cannock ---------- */
rep('<b>Midlands based</b><span>Working across the Midlands and the counties around it</span>',
    '<b>{{TOWN}} based</b><span>Our yard is in Hednesford, covering 20 miles of {{COUNTY}}</span>');
rep('<p>Based in the Midlands and working across the counties around it, so we are close by if you need us back.</p>',
    '<p>Our yard is on Oaklands Industrial Estate in Hednesford, so across {{TOWN}} and the Chase we are minutes away rather than hours.</p>');

/* ---------- 3. accreditation strip -> the real credentials ---------- */
rep('<b>Accreditations <span class="ph">Placeholder</span></b><span>Send your accreditation logos and they go here</span>',
    '<b>Insured and guaranteed</b><span>Public liability insured, 10 year workmanship guarantee</span>');

/* ---------- 4. transformations note: job 01 is now a real clip ---------- */
rep(`    <div class="center" style="margin-top:34px">
      <p class="lede" style="font-size:13.5px"><span class="ph">Placeholder</span> These are stage photographs of re-roofing work, not two shots of one roof. Send a genuine before and after from the same job, or a transformation video, and they replace these.</p>
    </div>
`, '');

/* ---------- 5. about: the real story ---------- */
rep('<p><span class="ph">Placeholder</span> {{OWNER}}, your own story goes here. Send how long you have been roofing, where you served your time, the job you are most proud of, and a photograph of yourself on a roof. This paragraph then gets rewritten in your words.</p>',
    '<p>{{OWNER_FULL}} has been roofing for twenty five years and there are six of us working out of the Hednesford yard. We also run our own roofing supplies shop, which is why we can usually match a discontinued tile ourselves rather than joining the queue behind every other roofer waiting on a merchant. <a href="{{BASE}}about/" style="color:var(--accent)">More about us</a>.</p>');
rep('<b>{{OWNER}} <span class="ph">Surname to confirm</span></b>', '<b>{{OWNER_FULL}}</b>');

/* ---------- 6. areas: the real town list ---------- */
rep('<p class="lede">Working across {{TOWN}} and the counties around it. <span class="ph">Placeholder</span> Send the towns you actually cover and they get listed here as chips and as their own pages later.</p>',
    '<p class="lede">Around twenty miles from our yard in Hednesford, taking in Cannock Chase, most of south {{COUNTY}} and the north of the Black Country.</p>');
rep('        <span class="chip ph-chip"><span class="ph">Placeholder</span>Your town list goes here</span>',
`        <span class="chip">${pin}Hednesford</span>
        <span class="chip">${pin}Rugeley</span>
        <span class="chip">${pin}Burntwood</span>
        <span class="chip">${pin}Lichfield</span>
        <span class="chip">${pin}Penkridge</span>
        <span class="chip">${pin}Walsall</span>
        <span class="chip">${pin}Stafford</span>`);
rep('<a class="btn btn-primary" href="#contact">Ask about your postcode</a>',
    '<a class="btn btn-primary" href="{{BASE}}areas-we-cover/">See all 21 areas we cover</a>');

/* ---------- 7. contact rows ---------- */
rep(`        <div class="contact-row dupe">
          <svg class="icon" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          <div><small>Facebook</small><b><span class="ph">Placeholder</span> Send your page link</b></div>
        </div>
`, `        <div class="contact-row dupe">
          ${pin}
          <div><small>Yard</small><b>Oaklands Ind Est, Hednesford WS12 2UZ</b></div>
        </div>
`);
rep('<div><small>Opening hours</small><b><span class="ph">Placeholder</span> To confirm</b></div>',
    '<div><small>Opening hours</small><b>24 hours a day, 7 days a week</b></div>');

/* ---------- 8. footer ---------- */
rep(`          <li><a href="#services">Roof repairs</a></li>
          <li><a href="#services">New roofs and re-roofing</a></li>
          <li><a href="#services">Flat roofing</a></li>
          <li><a href="#services">Chimneys and leadwork</a></li>
          <li><a href="#services">Fascias, soffits and guttering</a></li>
          <li><a href="#services">Moss removal and maintenance</a></li>`,
`          <li><a href="{{BASE}}services/roof-repairs/">Roof repairs</a></li>
          <li><a href="{{BASE}}services/roof-replacement/">Roof replacement</a></li>
          <li><a href="{{BASE}}services/fascias-soffits-and-guttering/">Fascias, soffits and guttering</a></li>
          <li><a href="{{BASE}}services/roof-cleaning/">Roof cleaning</a></li>
          <li><a href="{{BASE}}services/conservatory-warm-roofs/">Conservatory warm roofs</a></li>`);
rep(`          <li>{{TOWN}}</li>
          <li>And the surrounding counties</li>
          <li><span class="ph">Placeholder</span> Full town list to confirm</li>`,
`          <li><a href="{{BASE}}roofers-in-cannock/">Cannock</a></li>
          <li><a href="{{BASE}}roofers-in-hednesford/">Hednesford</a></li>
          <li><a href="{{BASE}}roofers-in-rugeley/">Rugeley</a></li>
          <li><a href="{{BASE}}roofers-in-lichfield/">Lichfield</a></li>
          <li><a href="{{BASE}}roofers-in-walsall/">Walsall</a></li>
          <li><a href="{{BASE}}areas-we-cover/">All 21 areas we cover</a></li>`);
rep('          <li><span class="ph">Placeholder</span> Facebook page link to confirm</li>',
    '          <li><a href="{{BASE}}contact/">Contact and opening hours</a></li>');
rep('<div class="accred"><span class="ph">Placeholder</span> Accreditation and insurance logos go here once supplied.</div>',
    '<div class="accred">Public liability insured. 10 year workmanship guarantee. Family run, 25 years.</div>');
rep('<small>Copyright 2026 {{BUSINESS}}. All rights reserved.</small>',
    '<small>Copyright 2026 {{BUSINESS}}. All rights reserved. <a href="{{BASE}}privacy-policy/">Privacy</a> / <a href="{{BASE}}terms/">Terms</a></small>');

/* ---------- 9. Our Work panel CTA ---------- */
rep('<span>Roofing across {{TOWN}} and the surrounding counties</span>',
    '<span>Roofing across {{TOWN}}, Hednesford and 20 miles of {{COUNTY}}</span>');

/* ---------- apply ---------- */
let fails = [];
for (const [a, b] of R) {
  const n = h.split(a).length - 1;
  if (n !== 1) { fails.push('found ' + n + 'x: ' + JSON.stringify(a.slice(0, 90))); continue; }
  h = h.replace(a, () => b);
}
if (fails.length) { console.error('UNMATCHED:\n' + fails.join('\n')); process.exit(1); }
fs.writeFileSync(P, h);
const left = (h.match(/class="ph"/g) || []).length;
console.log('edit7: ' + R.length + ' replacements applied. Placeholder chips left on the homepage: ' + left);
