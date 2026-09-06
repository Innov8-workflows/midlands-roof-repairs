# Midland Roof Shield

Live at **https://midlandroofshield.co.uk** on Cloudflare Workers.

Family roofing business in Hednesford, Cannock. Built from onboarding
submission #17 with the innov8 site-kit (`contractor-bold`) plus a project-level
multi-page generator.

## Build and deploy

```bash
node build.js        # rebuilds the single-file homepage (index.html)
node generate.js     # rebuilds _site/ - 36 pages
node preview.js      # http://localhost:8080
npx wrangler deploy  # ships _site/ to the Worker
```

`CSP=1 node preview.js` serves with the real Content-Security-Policy from
`_site/_headers` applied, which is how the policy gets proved before a deploy.

## Do not

- **Hand-edit anything in `_site/`.** It is wiped and rewritten by
  `node generate.js`. Edit `content/*`, `_src/*` or the generator.
- **Hand-edit `index.html`.** It is built from `_src/body.html` +
  `site.config.js` by `node build.js`.
- **Hand-add DNS records for the apex or www.** Cloudflare manages them as
  Worker custom domains; adding one by hand produces the 100117 conflict and
  breaks the custom domain.
- **Deploy a `STAGING_BASE=` build.** That writes `_staging/`, is noindexed and
  is path-prefixed for GitHub Pages. `wrangler` deploys `_site/`.

## Structure

| Path | What |
|---|---|
| `site.config.js` | origin, base, palette, claims, provenance for every fact |
| `content/site.js` | about, contact, FAQs, gallery captions |
| `content/services.js` | the 5 services |
| `content/areas.js` | the 21 towns, each with its own local paragraph |
| `generate.js` | CSS extraction, chrome, page shell, schema |
| `build-pages.js` | the page writers, `_headers` and the sitemap |
| `_src/` | homepage body and the optimised assets |
| `_site/` | build output, deployed by wrangler |

See `BUILD-REPORT.md` for what came from the client and what is still outstanding.
