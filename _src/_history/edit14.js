'use strict';
/* Puts the lead beacon on the homepage - one tag, same as edit13.
 * The homepage is the only page with the quote form, so this is the tag that
 * makes form leads reach the Sheet and the CRM at all. */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'body.html');
let h = fs.readFileSync(P, 'utf8');
if (h.includes('assets/lead.js')) { console.error('lead tag already on the homepage'); process.exit(1); }
const A = '<script src="{{BASE}}assets/analytics.js" defer></script>';
if (h.split(A).length - 1 !== 1) { console.error('analytics tag anchor not found'); process.exit(1); }
h = h.replace(A, A + '\n<script src="{{BASE}}assets/lead.js" defer></script>');
fs.writeFileSync(P, h);
console.log('edit14: homepage now loads assets/lead.js (deferred)');
