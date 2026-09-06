'use strict';
/* Content edits for Midland Roof Shield, applied to the golden body.
   Re-runnable only against a fresh copy of the kit body - it asserts each
   find-string appears exactly once and fails loudly otherwise. */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, 'body.html');
let h = fs.readFileSync(P, 'utf8');
const R = [];
const rep = (a, b) => R.push([a, b]);

const ICO = {
  pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
  house: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  grid: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 3v18"/><path d="M3 12h18"/>',
  building: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  fence: '<path d="M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"/><path d="M6 8h4"/><path d="M6 18h4"/><path d="m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"/><path d="M14 8h4"/><path d="M14 18h4"/><path d="m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  sparkles: '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
};
const svg = k => '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + ICO[k] + '</svg>';

/* ---------- 0. project surface colours ----------
   The direction owns colour, but three surface swatches are matched by first
   occurrence inside the direction CSS so site.config.js `palette` cannot reach
   them. Colour only, no geometry, so this cannot break the layout. */
rep('<!-- ================= NAV ================= -->',
`<style>
  /* Project surface tweaks. Colour only - the direction owns everything else. */
  .s-brand{--bg:#101A15}
  .s-tint{--bg:#F3F7F3;--card-line:#E1E8E2;--card-line-hi:#BECBC0}
  .s-light{--card:#F4F7F4;--card-line:#E3EAE4;--card-line-hi:#C4D0C6}
</style>

<!-- ================= NAV ================= -->`);

/* ---------- 1. nav and drawer ---------- */
rep('<b>{{BUSINESS_SHORT}}</b>\n        <span>Solutions</span>',
    '<b>{{BUSINESS_SHORT}}</b>\n        <span>Roof Shield</span>');
rep('<b>{{BUSINESS_SHORT}}</b><span>Solutions</span>',
    '<b>{{BUSINESS_SHORT}}</b><span>Roof Shield</span>');
rep('<a href="#transformations">Transformations</a>', '<a href="#transformations">Our Jobs</a>');
rep('<a href="#transformations">Transformations <svg', '<a href="#transformations">Our Jobs <svg');

/* ---------- 2. hero ---------- */
rep('<h1>Landscaping and garden transformations across <em>{{TOWN}}</em></h1>',
    '<h1>Roof repairs and re-roofing across <em>{{TOWN}}</em></h1>');
rep('<p class="hero-sub">Design, build and maintenance from one local team. Patios, driveways, fencing, planting and grounds care, done properly from the groundwork up.</p>',
    '<p class="hero-sub">Pitched and flat roofing, repairs, chimneys, leadwork and guttering. Free quotes, no obligation, and the site left clean when we go.</p>');
rep('{{TOWN}} and surrounding areas</span>\n      <span class="hero-chip"><svg class="icon" viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>Design, build and maintain</span>',
    '{{TOWN}} and the surrounding areas</span>\n      <span class="hero-chip">' + svg('shield') + 'Repairs to full re-roofs</span>');

/* ---------- 3. trust strip ---------- */
rep('<b>{{TOWN}} based</b><span>Covering {{TOWN}} and the surrounding areas</span>',
    '<b>Midlands based</b><span>Working across the Midlands and the counties around it</span>');
rep('<b>Design to completion</b><span>One team from first drawing to final planting</span>',
    '<b>Repairs to re-roofs</b><span>One team, from a slipped tile to a full strip and re-cover</span>');
rep('<b>Homes and commercial</b><span>Private gardens, estates and grounds contracts</span>',
    '<b>Homes and commercial</b><span>Houses, bungalows, extensions and commercial roofs</span>');

/* ---------- 4. services ---------- */
rep('<h2 class="title">Landscaping services in {{TOWN}}</h2>\n      <p class="lede">From a single new patio to a full garden rebuild, and the maintenance that keeps it right.</p>',
    '<h2 class="title">Roofing services across {{TOWN}}</h2>\n      <p class="lede">From one slipped tile to a full strip and re-cover, plus the leadwork, flat roofing and guttering that goes with it.</p>');

const SVC = [
  ['pencil', 'Roof repairs', 'Slipped tiles, leaks, storm damage and failed flashing put right, usually in a single visit.'],
  ['house', 'New roofs and re-roofing', 'Stripped back to the rafters and rebuilt with breathable membrane, treated battens and new tiles.'],
  ['grid', 'Flat roofing', 'Fibreglass, EPDM rubber and felt systems for extensions, garages and dormers.'],
  ['building', 'Chimneys and leadwork', 'Repointing, rebuilds, cowls and new lead flashing where the old work has given up.'],
  ['fence', 'Fascias, soffits and guttering', 'UPVC replacements that stop water tracking back down into the brickwork.'],
  ['leaf', 'Moss removal and maintenance', 'Roof cleaning, gutter clearing and the small fixes that stop a much bigger bill later.'],
];
const OLD_SVC = [
  ['Garden Design and Build', 'Planned and built by the same team, so what you are shown is what gets installed.'],
  ['Patios and Paving', 'Porcelain, stone and block paving laid on properly prepared bases, with the falls done right.'],
  ['Driveways', 'Block paved and resin bound, with the sub base and drainage sorted before anything is laid.'],
  ['Fencing and Timber', 'Close board and panel fencing, gates, sleeper edging and decking, set square and solid.'],
  ['Planting and Borders', 'Schemes picked for your soil and aspect, with good topsoil and mulch so plants establish.'],
  ['Grounds Maintenance', 'Grass cutting, hedge work and seasonal tidies for homes, estates and commercial grounds.'],
];
OLD_SVC.forEach(([t, d], i) =>
  rep('<h3>' + t + '</h3>\n        <p>' + d + '</p>',
      '<h3>' + SVC[i][1] + '</h3>\n        <p>' + SVC[i][2] + '</p>'));

const OLD_ICO = [
  '<div class="svc-ico"><svg class="icon" viewBox="0 0 24 24"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg></div>',
  '<div class="svc-ico"><svg class="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 3v18"/><path d="M3 12h18"/></svg></div>',
  '<div class="svc-ico"><svg class="icon" viewBox="0 0 24 24"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></div>',
  '<div class="svc-ico"><svg class="icon" viewBox="0 0 24 24"><path d="M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"/><path d="M6 8h4"/><path d="M6 18h4"/><path d="m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"/><path d="M14 8h4"/><path d="M14 18h4"/><path d="m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"/></svg></div>',
  '<div class="svc-ico"><svg class="icon" viewBox="0 0 24 24"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg></div>',
  '<div class="svc-ico"><svg class="icon" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg></div>',
];
OLD_ICO.forEach((o, i) => rep(o, '<div class="svc-ico">' + svg(SVC[i][0]) + '</div>'));

/* ---------- 5. transformations ---------- */
rep('<span class="eyebrow">Before and after</span>\n      <h2 class="title">Real transformations</h2>\n      <p class="lede">Drag the handle to see how each garden started and how it was left.</p>',
    '<span class="eyebrow">During and after</span>\n      <h2 class="title">How a re-roof goes on</h2>\n      <p class="lede">Drag the handle on each one to move between the roof mid job and the finished covering.</p>');

rep('<img src="{{ASSET:t1_before.jpg}}" alt="Tired yellow paving and patchy grass before the rear garden was rebuilt">',
    '<img src="{{ASSET:t1_before.jpg}}" alt="New tiles loaded out in stacks across the battens before they are set">');
rep('<img src="{{ASSET:t1_after.jpg}}" alt="Dark slate paving, sleeper edging and new lawn after the rebuild">',
    '<img src="{{ASSET:t1_after.jpg}}" alt="The same style of hip roof finished, with the ridge bedded and the courses running true">');
rep('<img src="{{ASSET:t2_before.jpg}}" alt="Overgrown front garden with weeds and rough grass before the redesign">',
    '<img src="{{ASSET:t2_before.jpg}}" alt="Breathable membrane and treated battens laid out with the first tiles going up the hip">');
rep('<img src="{{ASSET:t2_after.jpg}}" alt="Curved gravel path and circular brick feature in the finished front garden">',
    '<img src="{{ASSET:t2_after.jpg}}" alt="Finished tiled roof with a clean hip and a bedded ridge under an open sky">');

rep('<span class="num">Project 01</span>\n          <h3>Side return rebuilt into usable outdoor space</h3>\n          <p>A narrow yard with lifting yellow slabs and worn out grass. The old paving came up, the base was dug out and relaid, and dark riven slabs went down with a charcoal setts edge and a clean strip of lawn.</p>\n          <div class="zig-tags"><span>Paving lifted and relaid</span><span>Setts edging</span><span>New lawn</span><span>Full clearance</span></div>',
    '<span class="num">Job 01</span>\n          <h3>Stripped, felted, battened and re-tiled</h3>\n          <p>The old covering comes off, the roof is felted with a breathable membrane and battened at the right gauge, then the new tiles are loaded out in stacks across the slope before a single one is set. Working off the stack is what keeps the courses straight all the way to the ridge.</p>\n          <div class="zig-tags"><span>Stripped back</span><span>Breathable membrane</span><span>Treated battens</span><span>New tiles</span></div>');

rep('<span class="num">Project 02</span>\n          <h3>Overgrown front garden given a proper shape</h3>\n          <p>Years of growth had closed this front garden in until the planting could not be seen for the weeds. It was cleared back, a sweeping gravel path set out with curved edging, and a circular brick feature laid in as the centrepiece.</p>\n          <div class="zig-tags"><span>Full clearance</span><span>Curved gravel path</span><span>Brick circle feature</span><span>Replanting</span></div>',
    '<span class="num">Job 02</span>\n          <h3>Hips, valleys and ridges given the time</h3>\n          <p>Hips and valleys are where a roof lets go first, so that is where the hours go. Tiles are cut in tight along the hip, the ridge is bedded and pointed, and the slope is left running true from the eaves to the apex rather than drifting off line halfway up.</p>\n          <div class="zig-tags"><span>Hips cut in</span><span>Bedded ridge</span><span>Lead valleys</span><span>Clean lines</span></div>');

rep('<div class="ba-lbl b">Before</div>\n            <div class="ba-lbl a">After</div>\n            <div class="ba-handle"><span class="ba-knob"><svg viewBox="0 0 24 24"><path d="m9 7-5 5 5 5"/><path d="m15 7 5 5-5 5"/></svg></span></div>\n          </div>\n        </div>\n        <div class="zig-copy">\n          <span class="num">Job 01</span>',
    '<div class="ba-lbl b">During</div>\n            <div class="ba-lbl a">Finished</div>\n            <div class="ba-handle"><span class="ba-knob"><svg viewBox="0 0 24 24"><path d="m9 7-5 5 5 5"/><path d="m15 7 5 5-5 5"/></svg></span></div>\n          </div>\n        </div>\n        <div class="zig-copy">\n          <span class="num">Job 01</span>');
rep('<div class="ba-lbl b">Before</div>\n            <div class="ba-lbl a">After</div>\n            <div class="ba-handle"><span class="ba-knob"><svg viewBox="0 0 24 24"><path d="m9 7-5 5 5 5"/><path d="m15 7 5 5-5 5"/></svg></span></div>\n          </div>\n        </div>\n        <div class="zig-copy">\n          <span class="num">Job 02</span>',
    '<div class="ba-lbl b">During</div>\n            <div class="ba-lbl a">Finished</div>\n            <div class="ba-handle"><span class="ba-knob"><svg viewBox="0 0 24 24"><path d="m9 7-5 5 5 5"/><path d="m15 7 5 5-5 5"/></svg></span></div>\n          </div>\n        </div>\n        <div class="zig-copy">\n          <span class="num">Job 02</span>');

rep('<p class="lede" style="font-size:13.5px"><span class="ph">Placeholder</span> More before and after videos drop in here as you send them.</p>',
    '<p class="lede" style="font-size:13.5px"><span class="ph">Placeholder</span> These are stage photographs of re-roofing work, not two shots of one roof. Send a genuine before and after from the same job, or a transformation video, and they replace these.</p>');

/* ---------- apply ---------- */
let fails = [];
for (const [a, b] of R) {
  const n = h.split(a).length - 1;
  if (n !== 1) { fails.push('found ' + n + 'x: ' + JSON.stringify(a.slice(0, 80))); continue; }
  h = h.replace(a, () => b);
}
if (fails.length) { console.error('UNMATCHED:\n' + fails.join('\n')); process.exit(1); }
fs.writeFileSync(P, h);
console.log('edit1: ' + R.length + ' replacements applied');
