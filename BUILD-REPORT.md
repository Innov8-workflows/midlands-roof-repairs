# Midland Roof Shield - build-out report

Submission **#17**, fetched 2026-09-06 into `_source/`. Built 2026-09-06.

## LIVE at https://midlandroofshield.co.uk

Went live 2026-09-06 on Cloudflare Workers. GoDaddy registration, Cloudflare
nameservers (`chin` / `cleo`), assets-only Worker `midland-roof-shield`.

```bash
node generate.js && npx wrangler deploy     # the whole redeploy
```

Repo: <https://github.com/Innov8-workflows/midlands-roof-repairs>
Deploy clone: `C:\Users\Jay\Projects\midland-roof-shield`

### What changed at go-live

- `origin` moved from the GitHub Pages preview to `https://midlandroofshield.co.uk`.
  It is the only place the hostname appears, so every canonical, og:url and
  schema @id rebuilt from it.
- Both GoDaddy parking A records, the www CNAME and `_domainconnect` were deleted
  **before** deploying - that is what avoids the 100117 custom-domain conflict.
  The `_dmarc` TXT was kept: free anti-spoofing on a domain with no mail.
- Cloudflare's "block AI training in robots.txt" left OFF. The Worker serves its
  own robots.txt naming the sitemap, and the "In short" blocks exist precisely so
  answer engines can lift them.
- Always Use HTTPS turned on. It is off by default.
- www to apex 301 with **Preserve query string** ticked, so UTM tags survive on
  any ad link pointing at www. Cloudflare's "this rule may not apply, www is not
  proxied" warning is a false positive - www is proxied via the Worker custom
  domain. Its offer to create a proxied DNS record must be refused; that is the
  100117 conflict again.
- `workers_dev: false` once the apex served. The workers.dev URL now 404s.

### Verified on the live domain

23 routes 200 · http 301 to https · www 301 to apex preserving `?utm_source` ·
`/services` 307 to `/services/` · real 404 · all six security headers · cert
`CN=midlandroofshield.co.uk` from Google Trust Services, expires 2026-12-05.

14 pages through headless Chrome: one h1 each, canonicals correct, every JSON-LD
block parses, both homepage videos actually advancing, and **zero CSP violations,
zero JS errors, no 4xx subresources**.

> If it looks dead from a machine that visited while the domain was parked, that
> is local DNS cache still holding GoDaddy's parking IP, which has no certificate
> for this domain - it shows as ERR_SSL_UNRECOGNIZED_NAME_ALERT, not a 404. Fix
> with `ipconfig /flushdns`, and in Chrome `chrome://net-internals/#dns` clear
> host cache. It ages out on its own for everyone else.

```
node generate.js      # writes _site/
node preview.js       # then http://localhost:8080
```

For a GitHub Pages preview (served from a subfolder, noindex on every page):

```
STAGING_BASE=Midland-Roof-Shield node generate.js && STAGING_BASE=Midland-Roof-Shield node preview.js
```

---

## Pages: 37

| Type | Count | Paths |
|---|---|---|
| Homepage | 1 | `/` - the demo, preserved |
| Service | 6 | `/services/<slug>/` |
| Area | 21 | `/roofers-in-<town>/` |
| Hubs | 4 | `/services/` `/areas-we-cover/` `/our-work/` `/faqs/` |
| Company | 2 | `/about/` `/contact/` |
| Legal | 2 | `/privacy-policy/` `/terms/` |
| Error | 1 | `/404.html` |

786 words per generated page on average. 35 URLs in `sitemap.xml`.
Crawled all 56 internal URLs and assets from `/` - **no broken links**.

### Services (6)

`roof-repairs` · `roof-replacement` · `fascias-soffits-and-guttering` ·
`roof-cleaning` · `conservatory-warm-roofs` · `flat-roofing`

The first five are exactly what Kevin listed on submission #17. **`flat-roofing`
was added on 2026-09-06 on Jay's instruction** and is not on the form - see the
batch 2 section at the end.

### Areas (21) - `primaryAreas` was the single string "20 mile radius"

Expanded by research from the Hednesford yard, weighted to where a Cannock Chase
roofer actually drives. Miles are approximate road distance.

| Band | Towns |
|---|---|
| Cannock Chase, 0-5mi | Hednesford *(base)*, Cannock, Heath Hayes, Norton Canes, Rugeley |
| South Staffs, 5-10mi | Great Wyrley, Cheslyn Hay, Penkridge, Burntwood, Brownhills, Pelsall |
| Lichfield & Walsall, 9-12mi | Lichfield, Aldridge, Bloxwich, Walsall, Willenhall |
| Wider, 10-15mi | Wolverhampton, Wednesfield, Stafford, Tamworth, Sutton Coldfield |

**Deliberately excluded**: Birmingham (~18mi, inside the radius but a Cannock
roofer bidding for Birmingham reads as a stretch and it is the page that would
look like spam), plus Burton, Stoke, Telford and Dudley.

**No service x area matrix.** `topServices` was just "Repairs" and Cannock is not
the competitive urban market that justifies Roof Care of London's 134 pages.
Worth revisiting once the site has some history.

---

## From the submission vs researched

| From submission #17 | Researched by Claude |
|---|---|
| Owner **Kevin Clee** | Every area page's local paragraph |
| Address, Hednesford WS12 2UZ | Every `nearby` village list (`nearby{}` was empty) |
| Town **Cannock**, county Staffordshire | Which towns are in a 20 mile radius |
| Phone, email, 24 hour opening | All service page content (`serviceDetail{}` empty) |
| The 5 services | All FAQs (`customerQuestions` empty) |
| 25 years, team of 6, "Family business" | Legal page wording |
| USP: own supplies shop, Roofing Outlaw | |

**`nearby{}`, `serviceDetail{}`, `customerQuestions` and `aboutTeam` all came
back empty.** Those are the four richest inputs on the form. Everything they
would have supplied is my research instead, and Kevin should read the area pages
in particular - he will know which towns he genuinely works in.

---

## Claims - READ THIS

All four credentials came back under `confirm[]` with
**`certificate_attached: false`**. They are Kevin's own words with no document
uploaded.

**Jay attested on 2026-09-06 that he has seen all of it** and instructed that
they be declared. That attestation, not the form, is the authority under which
these are published. They now appear on every page:

| Claim | Value | Certificate on file |
|---|---|---|
| Public liability insurance | Yes | **No** - Jay attested |
| Cover amount | £100,000 | **No** - Jay attested |
| Years trading | 25 | **No** - Jay attested |
| Guarantee | 10 years | **No** - Jay attested |

**£100,000 public liability looks wrong.** Trade cover is normally £1m-£5m and
plenty of domestic customers ask for £1m as a minimum. It reads like a missing
zero, and the site is now live and indexable, so this wants checking against the
actual certificate. The
figure is currently in `site.config.js` `claims.insured.amount` but is **not
printed anywhere on the site**; pages say "public liability insured" without the
amount, so correcting it is a one-line change with no copy rewrite.

To pull all of this back: empty `claims` in `site.config.js` and re-run.
`check.js` then blocks every claim word site-wide.

---

## Outstanding

| # | What | Why it matters |
|---|---|---|
| 1 | ~~No domain~~ **RESOLVED** | Live on `midlandroofshield.co.uk` since 2026-09-06. `origin` now points at it. |
| 2 | **Reviews are off the site entirely** | `ratings.google` says 5.0 from 50, but `gbp` is empty so there is nothing to link to. Per your call on 2026-09-06 there is no `/reviews/` page, no review badges and no `aggregateRating`. Send a live profile URL and all three come back. |
| 3 | **Services mismatch, partly resolved** | `flat-roofing` now has a page. **Chimneys and leadwork still does not** - the homepage advertises it and batch 1 shows plenty of it, but it is not on Kevin's list. The real fix is confirming the full service list with him rather than inferring it from photographs. |
| 4 | **"24 hours" needs confirming** | Every page now says 24 hours a day, 7 days a week, because that is what the form said. Worth checking it means a genuine call out and not an answerphone. |
| 5 | **Kevin's story is two words** | `story` was "Family business". The about page builds on that plus years, team size and the supplies shop, and does not pretend to more. Ten minutes on the phone would improve it a lot. |
| 6 | **No logo or photos were uploaded** | `missing[]` lists both. Not a problem - the demo already had them and the build-out reuses them - but it is why there are no new images. |
| 7 | **FAQs are not in Kevin's words** | `customerQuestions` was empty, so they are written from the trade. Better ones exist in whatever he actually gets asked. |

**"Roofing Outlaw" is not an accreditation.** Kevin gives it as a USP and it is on
the van door. It appears once, on `/about/`, described as the roofing community
it is, and never beside anything that reads as certification or a trade body.

---

## Validation

`node check.js` in **client mode**, 36 pages:

```
PROBLEMS (2)
  payload 4.45 MB exceeds the 2 MB client budget
  index.html: 2 base64 video(s) - a client build serves video as real files
```

**Both are the homepage, and both are the accepted exception.** You chose on
2026-09-06 to leave `index.html` alone rather than extract its media. The
homepage is 3.85 MB of the 4.45 MB total; the other 35 pages come to 816 KB
between them, about 23 KB each.

Everything else passes: no placeholders anywhere (the homepage had 13, now zero),
no undeclared claim words, no unlinked review badges, canonical on every page, one
`h1` per page, alt text on every image, no dead internal links.

If you later want a clean pass, extract the homepage media to real files - the
videos are already sitting in `_site/assets/` as files for the other pages to
use, so it is a change to how the homepage references them, not a re-encode.

### Verified in headless Chrome

12 representative pages loaded over HTTP through `preview.js`. Every one: HTTP
200, exactly one `h1`, every JSON-LD block parses, no missing alt, no horizontal
overflow, **no console errors**. Then crawled all 56 internal URLs and assets
from `/` - nothing broken.

---

## The homepage

It **did** change, by agreement, and here is exactly how.

**Unchanged and verified:** section order identical, hero markup identical, and
both videos byte-identical and still dated 27 August - `hero.mp4` 542,130 bytes
and `ba1.mp4` 518,226 bytes. Nothing re-encoded, re-cropped or replaced. Theme,
art direction, transformations and gallery all untouched.

**Changed:**

1. **Nav, drawer and footer now link to the new pages.** Without this the 35 new
   pages have no crawl path from the homepage and the build-out does nothing for
   search. This is what the Fairmont generator does too, for the same reason.
2. **"the Midlands" became Cannock** throughout - my 27 August value was inferred
   from the trading name, and the submission gives the real town. You approved.
3. **All 13 placeholders filled with real facts**: opening hours, the areas
   chips, the accreditation strip, Kevin's story and surname, the footer areas
   and services lists.
4. **A canonical and a `LocalBusiness` + `WebPage` + `BreadcrumbList` schema
   block were injected.** The kit template emits neither - it was only ever
   building one page - which left the most important page on the site as the only
   one without structured data. Injected at generate time, not hand-edited, so
   `node build.js` cannot lose it.
5. The Facebook rows came out. No page URL has ever been given.

Deliberately **no** `FAQPage` schema on the homepage: it has no FAQ section by
design, and a `FAQPage` block whose questions are not visible on the page is
cloaking.

---

## Files

```
site.config.js        origin, base, palette, claims, facts
content/site.js       about, contact, FAQs, gallery captions, shared area FAQs
content/services.js   the 5 services
content/areas.js      the 21 towns, each with its own local paragraph
generate.js           CSS extraction, chrome, shell, schema helpers
build-pages.js        the page writers
preview.js            local server, with mp4 range support
_site/                output - NEVER hand-edit, it is regenerated
```

---

## Batch 2 and the homepage media, 2026-09-06

Kevin sent 18 more photographs (`assets-v2/`), camera files this time rather than
phone screenshots, and mostly the two subjects batch 1 was thinnest on.

**Flat roofing is now a service page.** `/services/flat-roofing/` was added on
Jay's instruction. It was never on submission #17, but the homepage advertised it,
batch 1 showed it and six of these eighteen photographs are of it, including a
commercial roof with dome rooflights. **The full service list is still worth
confirming with Kevin rather than inferring from photographs** - chimneys and
leadwork is in exactly the same position and still has no page.

Where the photographs went:

| Page | Photos |
|---|---|
| `/our-work/` | all 18, taking it from 17 to 35 |
| `/services/conservatory-warm-roofs/` | 6 - it was borrowing generic roof shots because batch 1 had no conservatory work at all |
| `/services/flat-roofing/` | 6 |
| `/services/roof-replacement/`, `/services/fascias-soffits-and-guttering/` | one each that actually shows the subject |
| Homepage gallery | all 18, as `.more` |

`.more` is hidden in the homepage grid but still cloned into the "View all our
work" panel and counted, so the grid keeps exactly the 10 visible photographs it
converted on while the panel goes 17 to 35. Promoting any of the new photographs
into the visible 10 is a deliberate change to that layout and has not been done.

### The homepage media was extracted from base64

This is the change that made the rest possible. The kit inlines every asset as a
data: URI, which is right for a demo you email and wrong for a live site: the
homepage was 3.85 MB, over the client budget, neither video could be range-seeked,
and every photograph added cost 1.3x its size in page weight.

`build-pages.js` now swaps each data: URI back to its file path by matching on
content. Nothing is re-encoded and no video is replaced - the same bytes,
addressed differently.

| | before | after |
|---|---|---|
| Homepage | 3.85 MB | **0.09 MB** |
| Whole site | 4.45 MB | **0.91 MB** of a 2 MB budget |
| `check.js` client mode | 2 problems | **passes** |

Verified rather than assumed: the extracted homepage was rendered against the
original base64 one at the same viewport and compared - identical page height
(8675px), identical image counts, **SSIM 0.9909**, and zero failed requests. The
residual is two video frames not decoding bit-identically between runs. Live load
time is now about 1.0s for the homepage.
