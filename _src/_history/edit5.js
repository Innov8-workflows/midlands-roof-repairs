'use strict';
/* Replaces the FIRST transformation before/after slider with the b-a-1 video.
   This is the swap documented in the site-demo skill STEP 7: drop the
   <div class="ba"> and put a <video> inside the same .zig-media wrapper. The kit
   already styles `.zig-media video` (4/5 on desktop, 1/1 on mobile, object-fit
   cover), so no geometry moves.

   autoplay + muted + loop + playsinline and NO `controls` attribute is what
   gives an autoplaying clip with no play button - `muted` is the part that makes
   autoplay legal on iOS and Chrome, and `controls` is what would draw the
   button. The second row keeps its draggable slider. */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'body.html');
let h = fs.readFileSync(P, 'utf8');
const R = [];
const rep = (a, b) => R.push([a, b]);

/* --- the slider itself --- */
rep(`          <div class="ba" data-ba>
            <img src="{{ASSET:t1_before.jpg}}" alt="New tiles loaded out in stacks across the battens before they are set">
            <div class="after-wrap"><img src="{{ASSET:t1_after.jpg}}" alt="The same style of hip roof finished, with the ridge bedded and the courses running true"></div>
            <div class="ba-lbl b">During</div>
            <div class="ba-lbl a">Finished</div>
            <div class="ba-handle"><span class="ba-knob"><svg viewBox="0 0 24 24"><path d="m9 7-5 5 5 5"/><path d="m15 7 5 5-5 5"/></svg></span></div>
          </div>`,
`          <video class="ba-video" autoplay muted loop playsinline preload="auto"
                 aria-label="Time lapse of a roof slope being tiled, from bare membrane and battens through to a finished covering">
            <source src="{{ASSET:ba1.mp4}}" type="video/mp4">
          </video>`);

/* --- copy now describes what the clip actually shows --- */
rep('<p>The old covering comes off, the roof is felted with a breathable membrane and battened at the right gauge, then the new tiles are loaded out in stacks across the slope before a single one is set. Working off the stack is what keeps the courses straight all the way to the ridge.</p>',
    '<p>The old covering comes off, the roof is felted with a breathable membrane and battened at the right gauge, then the tiles go on course by course from the eaves up. The gauge staying constant all the way to the ridge is what keeps the courses straight and stops the slope drifting off line halfway up.</p>');

rep('<p class="lede">Drag the handle on each one to move between the roof mid job and the finished covering.</p>',
    '<p class="lede">The first plays a slope being tiled from bare battens up. Drag the handle on the second to move between the roof mid job and the finished covering.</p>');

/* --- .ba-video inherits the .zig-media video rules; this only rounds the
       corners the way the .ba slider did, and kills the inline-video gap --- */
rep('  .hero-logo{aspect-ratio:900/370}',
    '  .hero-logo{aspect-ratio:900/370}\n  /* the transformation clip sits in the same slot the .ba slider did */\n  .ba-video{display:block;width:100%;border-radius:inherit}');

let fails = [];
for (const [a, b] of R) {
  const n = h.split(a).length - 1;
  if (n !== 1) { fails.push('found ' + n + 'x: ' + JSON.stringify(a.slice(0, 90))); continue; }
  h = h.replace(a, () => b);
}
if (fails.length) { console.error('UNMATCHED:\n' + fails.join('\n')); process.exit(1); }
fs.writeFileSync(P, h);
console.log('edit5: transformation 01 is now the b-a-1 video');
