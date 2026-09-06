'use strict';
/* Replaces the three-slide hero photo slider with the hero-01 video.
   The kit already carries `.hero-video` CSS and the slider JS already hides the
   dots when it finds fewer than two .hero-slide elements, so nothing else moves.

   `muted` + `playsinline` are what let it autoplay on iOS. The video is
   deliberately NOT gated on prefers-reduced-motion - hiding or pausing the hero
   there is the bug HOUSE-RULES warns about, not the fix. */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'body.html');
let h = fs.readFileSync(P, 'utf8');

const OLD = `  <!-- HERO MEDIA: swap the slides below for a single <video class="hero-video" autoplay muted loop playsinline poster="..."><source src="data:video/mp4;base64,..." type="video/mp4"></video> -->
  <div class="hero-media" id="heroMedia">
    <div class="hero-slide on" style="background-image:url('{{ASSET:hero1.jpg}}')"></div>
    <div class="hero-slide" style="background-image:{{VAR:hero2.jpg}}"></div>
    <div class="hero-slide" style="background-image:url('{{ASSET:hero3.jpg}}')"></div>
  </div>`;

const NEW = `  <!-- HERO MEDIA: hero-01, a slow orbit of the van, crossfaded end-to-start so it
       loops without a jump. To go back to a photo slider, restore three
       .hero-slide divs here and the dots rebuild themselves. -->
  <div class="hero-media" id="heroMedia">
    <video class="hero-video" autoplay muted loop playsinline preload="auto"
           poster="{{ASSET:hero_poster.jpg}}"
           aria-label="The {{BUSINESS}} van parked outside a house being re-roofed">
      <source src="{{ASSET:hero.mp4}}" type="video/mp4">
    </video>
  </div>`;

if (h.split(OLD).length - 1 !== 1) { console.error('hero media block not found exactly once'); process.exit(1); }
h = h.replace(OLD, () => NEW);
fs.writeFileSync(P, h);
console.log('edit4: hero slider replaced with hero-01 video');
