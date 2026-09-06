'use strict';
/* Content edits, part 2: gallery, why, reviews, about, areas, contact, CTA, footer. */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, 'body.html');
let h = fs.readFileSync(P, 'utf8');
const R = [];
const rep = (a, b) => R.push([a, b]);

const ICO = {
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  sparkles: '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
};
const svg = k => '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + ICO[k] + '</svg>';

/* ---------- 6. gallery ---------- */
rep('<h2 class="title">Recent projects</h2>\n      <p class="lede">Gardens we have designed, built and planted around {{TOWN}}.</p>',
    '<h2 class="title">Recent roofs</h2>\n      <p class="lede">Repairs, re-roofs, leadwork and flat roofing from around {{TOWN}}.</p>');

/* g1..g17 in display order. cls: '' | 'big' | 'more' */
const GAL = [
  ['g1',  'big',  'Newly tiled hip roof with a bedded ridge and a chimney stack behind', 'Re-roof completed'],
  ['g2',  '',     'Red clay tiled roof photographed along the ridge on a clear day', 'Clay tiled roof'],
  ['g3',  '',     'Slate roof and stone chimney stacks on an older property', 'Slate and stone chimneys'],
  ['g4',  '',     'New lead work dressed into a grey tiled roof beside a flat section', 'Leadwork and abutment'],
  ['g5',  '',     'Finished tiled roof looking out across woodland under a grey sky', 'Tiled roof and ridge'],
  ['g6',  'big',  'Red tiled hip roof meeting a newly laid grey flat roof below it', 'Pitched and flat together'],
  ['g7',  '',     'Lead flashing and soakers stepped into the side of a brick chimney', 'Chimney flashing renewed'],
  ['g8',  '',     'Two red tiled roof slopes meeting along a shared ridge', 'Ridge and verge detail'],
  ['g9',  '',     'Lead valley dressed between two slate slopes against stone brickwork', 'Lead valley'],
  ['g10', '',     'Grey tiled hip and valley with new lead work below the chimney', 'Hip and valley tiling'],
  ['g11', 'more', 'Stepped lead flashing at the base of a brick chimney on a red tiled roof', 'Chimney leadwork'],
  ['g12', 'more', 'Tiles cut and dressed neatly into a brick abutment wall', 'Abutment detail'],
  ['g13', 'more', 'Brown tiles run up to a brick gable with the scaffold still in place', 'Gable and scaffold'],
  ['g14', 'more', 'Freshly tiled roof slope with the scaffold boards still down', 'Tiling in progress'],
  ['g15', 'more', 'New tiles loaded out in stacks across the membrane at the end of the day', 'Loading out'],
  ['g16', 'more', 'Roof stripped back with the scaffold sheeted before the new covering goes on', 'Stripped and sheeted'],
  ['g17', 'more', 'Lead tray and flashing formed around a stone chimney above a flat roof', 'Lead tray'],
];
const galHtml = GAL.map(([f, cls, alt, cap]) =>
  '      <figure' + (cls ? ' class="' + cls + '"' : '') + '><img loading="lazy" src="{{ASSET:' + f + '.jpg}}" alt="' + alt + '"><figcaption>' + cap + '</figcaption></figure>'
).join('\n');

const galStart = '      <figure class="big"><img loading="lazy" src="{{ASSET:g14.jpg}}"';
const galEndMark = '<figcaption>Hydrangea and new fencing</figcaption></figure>\n    </div>';
const i0 = h.indexOf(galStart);
const i1 = h.indexOf(galEndMark);
if (i0 < 0 || i1 < 0) { console.error('gallery block not found'); process.exit(1); }
h = h.slice(0, i0) + galHtml + '\n    </div>' + h.slice(i1 + galEndMark.length);

rep('<span id="workCount">17</span> project photographs', '<span id="workCount">17</span> roof photographs');
rep('View all our work\n      </button>', 'View all our work\n      </button>');

/* ---------- 7. why ---------- */
rep('<h2 class="title">Built properly, planted properly</h2>\n      <p class="lede">Plenty of firms can lay a slab. The difference shows in what is underneath it a year later.</p>',
    '<h2 class="title">The bit you cannot see is the bit that matters</h2>\n      <p class="lede">Anyone can lay a tile. Whether the roof is still dry in five winters comes down to the membrane, the battens and the lead underneath it.</p>');

const WHY = [
  ['shield', 'Sound underneath, not just on top', 'New breathable membrane and treated battens on every re-roof. Tiles dropped back onto tired felt is a job you end up paying for twice.'],
  ['pencil', 'Leadwork done, not patched', 'Chimneys, valleys and abutments get proper lead, dressed and fixed, rather than a smear of mastic that lasts one winter.'],
  ['users', 'One team, start to finish', 'The person who quotes the roof is on the roof. Nothing gets handed off to a subcontractor you have never met.'],
  ['pin', 'Genuinely local', 'Based in the Midlands and working across the counties around it, so we are close by if you need us back.'],
  ['image', 'Photographs throughout', 'You see what was wrong and what was done, including the parts of the roof you could never get up to yourself.'],
  ['sparkles', 'Clean site, swept drive', 'Sheeted down, waste taken away as we go, and the drive swept before we leave.'],
];
const OLD_WHY = [
  ['<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>', 'The groundwork comes first', 'Bases dug to depth, compacted and drained before a slab goes down. The part nobody sees is the reason the job lasts.'],
  ['<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>', 'We are planters, not just pavers', 'Plants chosen for your soil, light and how much time you want to spend, so borders still look right in year three.'],
  ['<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', 'One team, start to finish', 'The person who quotes the job is on the job. No handing you to a subcontractor you have never met.'],
  ['<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>', 'Genuinely local', 'Based in {{TOWN}} and working across the surrounding areas, so we are close by if you need us.'],
  ['<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>', 'A tidy site every day', 'Waste taken away as we go and everything swept down before we leave.'],
  ['<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>', 'Domestic and commercial', 'From a back garden patio to estate grounds on a schedule, handled by the same people.'],
];
OLD_WHY.forEach(([inner, t, d], i) => {
  rep('<svg class="icon" viewBox="0 0 24 24">' + inner + '</svg>\n        <h3>' + t + '</h3>\n        <p>' + d + '</p>',
      svg(WHY[i][0]) + '\n        <h3>' + WHY[i][1] + '</h3>\n        <p>' + WHY[i][2] + '</p>');
});

/* ---------- 8. about ---------- */
rep('<img loading="lazy" src="{{ASSET:about1.jpg}}" alt="The {{BUSINESS}} vehicle on site">',
    '<img loading="lazy" src="{{ASSET:about1.jpg}}" alt="The {{BUSINESS}} van parked outside a scaffolded house">');
rep('<img loading="lazy" src="{{ASSET:about2.jpg}}" alt="{{BUSINESS}} branding and contact details on the vehicle">',
    '<img loading="lazy" src="{{ASSET:about2.jpg}}" alt="Roofers stripping the old tiles from a roof before it is re-covered">');
rep('<p>A {{TOWN}} based landscaping business covering the town and surrounding areas. We take on private gardens, estate grounds and commercial sites, and handle the whole job ourselves rather than passing pieces of it around.</p>',
    '<p>{{BUSINESS}} is a roofing business working across {{TOWN}} and the counties around it. Repairs, full re-roofs, flat roofing, chimneys and leadwork, taken on and finished by the same people rather than passed around.</p>');
rep('<p>The sustainable part is not a slogan. It means reusing what is already worth keeping, choosing planting that suits the soil instead of fighting it, and building hard landscaping once so it lasts.</p>',
    '<p>The name is the point of it. A roof is the one part of a house that is protecting everything underneath, and it only does that job properly if the membrane, the battens and the lead are right. That is where the hours go, even though none of it shows from the ground.</p>');
rep('<p><span class="ph">Placeholder</span> Your own story goes here. Send how long you have been going, your background and a photograph of yourself, and this gets rewritten in your words.</p>',
    '<p><span class="ph">Placeholder</span> {{OWNER}}, your own story goes here. Send how long you have been roofing, where you served your time, the job you are most proud of, and a photograph of yourself on a roof. This paragraph then gets rewritten in your words.</p>');
rep('<b>Dylan <span class="ph">Surname to confirm</span></b>\n            <span>Owner, {{BUSINESS}}</span>',
    '<b>{{OWNER}} <span class="ph">Surname to confirm</span></b>\n            <span>Owner, {{BUSINESS}}</span>');

/* ---------- 9. areas ---------- */
rep('<h2 class="title">{{TOWN}} and the surrounding areas</h2>\n        <p class="lede">Based in {{TOWN}} and working across South Yorkshire. If you are just outside the towns listed it is still worth asking.</p>',
    '<h2 class="title">Covering {{TOWN}}</h2>\n        <p class="lede">Working across {{TOWN}} and the counties around it. <span class="ph">Placeholder</span> Send the towns you actually cover and they get listed here as chips and as their own pages later.</p>');
rep('<span class="chip"><svg class="icon" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>Sheffield</span>\n        <span class="chip"><svg class="icon" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>Rotherham</span>\n        <span class="chip"><svg class="icon" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>Barnsley</span>\n        <span class="chip ph-chip"><span class="ph">Placeholder</span>Send your full town list</span>',
    '<span class="chip ph-chip"><span class="ph">Placeholder</span>Your town list goes here</span>');
rep('<a class="btn btn-primary" href="#contact">Check your postcode</a>',
    '<a class="btn btn-primary" href="#contact">Ask about your postcode</a>');

/* ---------- 10. contact ---------- */
rep('<h2 class="title">Tell us about your garden</h2>',
    '<h2 class="title">Tell us about your roof</h2>');
rep('<a class="contact-row" href="mailto:info@sustainablelandscapesolutions.co.uk">\n          <svg class="icon" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>\n          <div><small>Email</small><b>info@sustainablelandscapesolutions.co.uk</b></div>\n        </a>',
    '<a class="contact-row" href="mailto:{{EMAIL}}">\n          <svg class="icon" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>\n          <div><small>Email</small><b>{{EMAIL}}</b></div>\n        </a>');
rep('<a class="contact-row" href="https://www.facebook.com/profile.php?id=61589813816171" target="_blank" rel="noopener">\n          <svg class="icon" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>\n          <div><small>Facebook</small><b>Follow our latest jobs</b></div>\n        </a>',
    '<div class="contact-row dupe">\n          <svg class="icon" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>\n          <div><small>Facebook</small><b><span class="ph">Placeholder</span> Send your page link</b></div>\n        </div>');
rep('<div><small>Coverage</small><b>{{TOWN}} and surrounding areas</b></div>',
    '<div><small>Coverage</small><b>{{TOWN}} and the surrounding areas</b></div>');
rep('placeholder="{{TOWN}}, DN1"', 'placeholder="Your town or postcode"');
rep('<option>Garden design and build</option>\n              <option>Patios and paving</option>\n              <option>Driveways</option>\n              <option>Fencing and timber</option>\n              <option>Planting and borders</option>\n              <option>Grounds maintenance</option>\n              <option>Something else</option>',
    '<option>Roof repair or leak</option>\n              <option>New roof or re-roofing</option>\n              <option>Flat roofing</option>\n              <option>Chimney or leadwork</option>\n              <option>Fascias, soffits and guttering</option>\n              <option>Moss removal and maintenance</option>\n              <option>Something else</option>');
rep('<textarea name="detail" placeholder="Rough size of the garden, what you are hoping for and any timescale."></textarea>',
    '<textarea name="detail" placeholder="What the roof is doing, roughly how old it is, and whether it is leaking now."></textarea>');

/* ---------- 11. final CTA ---------- */
rep('<h2>Ready to get started on your garden</h2>\n    <p>Send a couple of photographs and a rough idea of what you want, and you will get a straight answer on what is possible.</p>',
    '<h2>Roof needing attention</h2>\n    <p>Send a couple of photographs and a rough idea of the problem, and you will get a straight answer on what it actually needs.</p>');

/* ---------- 12. footer ---------- */
rep('<p>Landscaping, garden design and grounds maintenance across {{TOWN}} and the surrounding areas. Domestic and commercial, handled from design through to completion.</p>',
    '<p>Roof repairs, re-roofing, flat roofing, chimneys, leadwork and guttering across {{TOWN}} and the surrounding areas. Domestic and commercial, taken on and finished by the same team.</p>');
rep('          <a href="https://www.facebook.com/profile.php?id=61589813816171" target="_blank" rel="noopener" aria-label="Facebook">\n            <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>\n          </a>\n', '');
rep('          <li><a href="#services">Garden design and build</a></li>\n          <li><a href="#services">Patios and paving</a></li>\n          <li><a href="#services">Driveways</a></li>\n          <li><a href="#services">Fencing and timber</a></li>\n          <li><a href="#services">Planting and borders</a></li>\n          <li><a href="#services">Grounds maintenance</a></li>',
    '          <li><a href="#services">Roof repairs</a></li>\n          <li><a href="#services">New roofs and re-roofing</a></li>\n          <li><a href="#services">Flat roofing</a></li>\n          <li><a href="#services">Chimneys and leadwork</a></li>\n          <li><a href="#services">Fascias, soffits and guttering</a></li>\n          <li><a href="#services">Moss removal and maintenance</a></li>');
rep('          <li>{{TOWN}}</li>\n          <li>Sheffield</li>\n          <li>Rotherham</li>\n          <li>Barnsley</li>\n          <li>And the surrounding areas</li>',
    '          <li>{{TOWN}}</li>\n          <li>And the surrounding counties</li>\n          <li><span class="ph">Placeholder</span> Full town list to confirm</li>');
rep('          <li><a href="mailto:info@sustainablelandscapesolutions.co.uk">info@sustainablelandscapesolutions.co.uk</a></li>\n          <li><a href="https://wa.me/{{PHONE_WA}}" target="_blank" rel="noopener">WhatsApp us</a></li>\n          <li><a href="https://www.facebook.com/profile.php?id=61589813816171" target="_blank" rel="noopener">Facebook</a></li>',
    '          <li><a href="mailto:{{EMAIL}}">{{EMAIL}}</a></li>\n          <li><a href="https://wa.me/{{PHONE_WA}}" target="_blank" rel="noopener">WhatsApp us</a></li>\n          <li><span class="ph">Placeholder</span> Facebook page link to confirm</li>');

/* ---------- 13. Our Work panel ---------- */
rep('<span>Landscaping and grounds care across {{TOWN}} and South Yorkshire</span>',
    '<span>Roofing across {{TOWN}} and the surrounding counties</span>');
rep('<a class="btn btn-primary" href="#contact" id="workQuote">Get a quote for your garden</a>',
    '<a class="btn btn-primary" href="#contact" id="workQuote">Get a quote for your roof</a>');

/* ---------- 14. reviews ---------- */
rep('{n:"[Customer name]", t:"[Placeholder review] Replace this with a real review. Around two or three sentences describing the job and how it went reads best on a card this size.", w:"{{TOWN}}", d:"[Date]"},',
    '{n:"[Customer name]", t:"[Placeholder review] Replace this with a real review. Around two or three sentences describing the roof, the job and how it went reads best on a card this size.", w:"[Town]", d:"[Date]"},');
rep('{n:"[Customer name]", t:"[Placeholder review] Real reviews carry far more weight than anything written on the site itself, so this section is deliberately left blank until yours are in.", w:"{{TOWN}}", d:"[Date]"},',
    '{n:"[Customer name]", t:"[Placeholder review] Real reviews carry far more weight than anything written on the site itself, so this section is deliberately left blank until yours are in.", w:"[Town]", d:"[Date]"},');
rep('{n:"[Customer name]", t:"[Placeholder review] Send over the wording from your Google or Facebook reviews and each one drops straight into a card like this.", w:"Sheffield", d:"[Date]"},',
    '{n:"[Customer name]", t:"[Placeholder review] Send over the wording from your Google or Facebook reviews and each one drops straight into a card like this.", w:"[Town]", d:"[Date]"},');
rep('{n:"[Customer name]", t:"[Placeholder review] Mentioning the actual service, patio, driveway, fencing or maintenance, helps both customers and search engines understand what you do.", w:"Rotherham", d:"[Date]"},',
    '{n:"[Customer name]", t:"[Placeholder review] Mentioning the actual work, a leak chased down, a full re-roof, a chimney re-leaded, helps both customers and search engines understand what you do.", w:"[Town]", d:"[Date]"},');
rep('{n:"[Customer name]", t:"[Placeholder review] A first name and a town is enough. No need for full names or addresses on a public website.", w:"Barnsley", d:"[Date]"},',
    '{n:"[Customer name]", t:"[Placeholder review] A first name and a town is enough. No need for full names or addresses on a public website.", w:"[Town]", d:"[Date]"},');
rep('{n:"[Customer name]", t:"[Placeholder review] Six is a good number to start with. The carousel handles as many as you want to add.", w:"{{TOWN}}", d:"[Date]"}',
    '{n:"[Customer name]", t:"[Placeholder review] Six is a good number to start with. The carousel handles as many as you want to add.", w:"[Town]", d:"[Date]"}');
rep('var AV = ["#6D9B52","#0CC1E0","#4E7239","#2E8FA8","#7FA85E","#1AA5C4"];',
    'var AV = ["#3FB000","#33414B","#2C7D00","#4A5A66","#66D42B","#26332C"];');
rep('<b style="color:#78846F">?.?</b>', '<b style="color:#5D6F65">?.?</b>');

/* ---------- apply ---------- */
let fails = [];
for (const [a, b] of R) {
  const n = h.split(a).length - 1;
  if (n !== 1) { fails.push('found ' + n + 'x: ' + JSON.stringify(a.slice(0, 90))); continue; }
  h = h.replace(a, () => b);
}
if (fails.length) { console.error('UNMATCHED:\n' + fails.join('\n')); process.exit(1); }
fs.writeFileSync(P, h);
console.log('edit2: ' + R.length + ' replacements applied, gallery rebuilt with 17 figures');
