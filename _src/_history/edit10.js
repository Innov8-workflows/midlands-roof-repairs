'use strict';
/* Removes Job 02 from the homepage transformations section, leaving Job 01 (the
 * b-a-1 video) as the only entry.
 *
 * Job 02 was the draggable before/after slider, and it was the weaker of the two:
 * its "During" and "Finished" frames were stage photographs of re-roofing work
 * rather than two shots of one roof, which is why the section carried a note
 * saying so until batch 2 arrived.
 *
 * WHAT THIS TOUCHES AND WHAT IT DOES NOT
 *   - the second .zig-row article, removed
 *   - the section lede, which referred to "the second"
 *   - t2_before.jpg / t2_after.jpg become unused and are deleted from
 *     _src/assets so they stop shipping. Nothing else references them.
 *   - the [data-ba] slider JS is LEFT IN PLACE. It is about 25 lines, it costs
 *     nothing now the homepage is file-based, forEach over an empty NodeList is
 *     a no-op, and leaving it means a future before/after row just works.
 *   - the hero, the video, section order and everything else: untouched.
 */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'body.html');
let h = fs.readFileSync(P, 'utf8');

/* ---- 1. the Job 02 article, from its <article> to its </article> ---- */
const OPEN = '      <article class="zig-row rv">';
const CLOSE = '      </article>';

const first = h.indexOf(OPEN);
if (first < 0) { console.error('no zig-row found'); process.exit(1); }
const second = h.indexOf(OPEN, first + OPEN.length);
if (second < 0) { console.error('only one zig-row - Job 02 already gone?'); process.exit(1); }
if (h.indexOf(OPEN, second + OPEN.length) >= 0) { console.error('more than two zig-rows, refusing to guess'); process.exit(1); }

const end = h.indexOf(CLOSE, second);
if (end < 0) { console.error('no closing </article> for the second row'); process.exit(1); }

const block = h.slice(second, end + CLOSE.length);
if (!block.includes('Job 02')) { console.error('the second row is not Job 02, refusing'); process.exit(1); }

/* also swallow the blank line that followed it */
let cut = end + CLOSE.length;
if (h.slice(cut, cut + 1) === '\n' && h.slice(cut + 1, cut + 2) === '\n') cut += 1;
h = h.slice(0, second) + h.slice(cut);

/* ---- 2. the lede referred to two ---- */
const oldLede = '<p class="lede">The first plays a slope being tiled from bare battens up. Drag the handle on the second to move between the roof mid job and the finished covering.</p>';
const newLede = '<p class="lede">A slope going on from bare battens through to a finished covering.</p>';
if (h.split(oldLede).length - 1 !== 1) { console.error('lede anchor not found'); process.exit(1); }
h = h.replace(oldLede, newLede);

fs.writeFileSync(P, h);

/* ---- 3. the now-unused assets ---- */
const A = path.join(__dirname, '..', 'assets');
let removed = 0;
for (const f of ['t2_before.jpg', 't2_after.jpg']) {
  const p = path.join(A, f);
  if (fs.existsSync(p)) { fs.unlinkSync(p); removed++; }
}

console.log('edit10: Job 02 removed (' + block.length + ' chars), lede reworded, ' + removed + ' unused assets deleted');
console.log('        zig-rows remaining: ' + (h.split(OPEN).length - 1));
