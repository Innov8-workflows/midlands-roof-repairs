'use strict';
/* Adds the house honeypot to the homepage quote form.
 *
 * A hidden `botcheck` input that a person never sees or reaches, and a bot
 * filling every field it finds will. lead.js sends its value with the lead;
 * Code.gs already returns before the Sheet, the email and the CRM when
 * `botcheck` is set, so nothing else needs changing.
 *
 * Hidden by position rather than display:none or type="hidden" - bots skip
 * those two because they are the obvious tells. aria-hidden + tabindex="-1"
 * keep it away from screen readers and keyboard users, and autocomplete="off"
 * with a name no browser recognises keeps autofill from tripping it on a real
 * customer, which would silently drop a genuine lead.
 *
 * Re-runnable: refuses if the field is already there.
 */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'body.html');
let h = fs.readFileSync(P, 'utf8');

if (h.includes('name="botcheck"')) { console.error('honeypot already present'); process.exit(1); }

const OPEN = '<form id="quoteForm" class="rv" novalidate>';
if (h.split(OPEN).length - 1 !== 1) { console.error('quote form opening tag not found exactly once'); process.exit(1); }

const field =
  '\n        <div aria-hidden="true" style="position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden">' +
  '<label>Leave this empty<input type="text" name="botcheck" tabindex="-1" autocomplete="off" value=""></label></div>';

h = h.replace(OPEN, () => OPEN + field);
fs.writeFileSync(P, h);
console.log('edit15: botcheck honeypot added to #quoteForm');
