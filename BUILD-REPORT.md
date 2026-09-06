# Midland Roof Shield - build-out report

Submission **#17**, fetched 2026-09-06 into `_source/`. Built 2026-09-06.
**Not deployed.**

```
node generate.js      # writes _site/
node preview.js       # then http://localhost:8080
```

For a GitHub Pages preview (served from a subfolder, noindex on every page):

```
STAGING_BASE=Midland-Roof-Shield node generate.js && STAGING_BASE=Midland-Roof-Shield node preview.js
```

---

## Pages: 36

| Type | Count | Paths |
|---|---|---|
| Homepage | 1 | `/` - the demo, preserved |
| Service | 5 | `/services/<slug>/` |
| Area | 21 | `/roofers-in-<town>/` |
| Hubs | 4 | `/services/` `/areas-we-cover/` `/our-work/` `/faqs/` |
| Company | 2 | `/about/` `/contact/` |
| Legal | 2 | `/privacy-policy/` `/terms/` |
| Error | 1 | `/404.html` |

786 words per generated page on average. 35 URLs in `sitemap.xml`.
Crawled all 56 internal URLs and assets from `/` - **no broken links**.

### Services (5) - exactly what Kevin listed

`roof-repairs` · `roof-replacement` · `fascias-soffits-and-guttering` ·
`roof-cleaning` · `conservatory-warm-roofs`

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
plenty of domestic customers ask for £1m as a minimum. It is worth checking
against the actual certificate before go-live - it reads like a missing zero. The
figure is currently in `site.config.js` `claims.insured.amount` but is **not
printed anywhere on the site**; pages say "public liability insured" without the
amount, so correcting it is a one-line change with no copy rewrite.

To pull all of this back: empty `claims` in `site.config.js` and re-run.
`check.js` then blocks every claim word site-wide.

---

## Outstanding

| # | What | Why it matters |
|---|---|---|
| 1 | **No domain.** `missing[]` lists "Preferred website address" | `origin` and `base` in `site.config.js` currently point at the GitHub Pages preview. Every canonical, `og:url` and schema `@id` builds from those two lines. Change them and re-run at go-live. |
| 2 | **Reviews are off the site entirely** | `ratings.google` says 5.0 from 50, but `gbp` is empty so there is nothing to link to. Per your call on 2026-09-06 there is no `/reviews/` page, no review badges and no `aggregateRating`. Send a live profile URL and all three come back. |
| 3 | **Services mismatch** | Kevin listed 5. The demo homepage still advertises **flat roofing** and **chimneys and leadwork**, and the gallery plainly shows him doing both, but he did not list them so they have no service page. Ask him whether they belong on the list. |
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
