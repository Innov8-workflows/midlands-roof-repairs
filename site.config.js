/* The site is built for a DOMAIN ROOT. For the GitHub Pages preview, which is
   served from a subfolder, run:  STAGING_BASE=Midland-Roof-Shield node generate.js
   That writes _staging/ and rewrites these paths. Never hardcode the subfolder
   here - check.js resolves root-absolute links against the output root and every
   one of them reads as dead. */
const BASE = '/';

// copy library: C:\Users\Jay\.claude\site-kit\copy\roofing.js
// build-out source: onboarding submission #17, fetched 2026-09-06 into _source/
module.exports = {
  name: 'Midland Roof Shield',
  trade: 'roofing',

  /* 'client' so check.js validates _site/ at full strength: placeholders,
     undeclared claims and unlinked review badges all become failures.
     check.js prefers _site/ when it exists, so the base64 demo homepage at the
     project root is no longer the thing being validated. */
  mode: 'client',

  direction: 'contractor-bold',

  /* ---------------------------------------------------------------- ORIGIN --
     The live domain. This is the ONLY place the hostname appears - canonicals,
     og:url and every schema @id build from it. Registered 2026-09-02, went live
     2026-09-06 on Cloudflare Workers. */
  origin: 'https://midlandroofshield.co.uk',
  base: BASE,

  title: 'Midland Roof Shield | Roofers in Cannock and Staffordshire',
  description: 'Roof repairs, re-roofing, fascias and guttering, roof cleaning and conservatory warm roofs across Cannock, Hednesford and 20 miles around. Call 07411 859355.',

  palette: {
    brand: '#3FB000', 'brand-rgb': '63,176,0',
    'brand-lt': '#66D42B',
    'brand-dp': '#2C7D00',
    brand2: '#33414B', 'brand2-rgb': '51,65,75',
    'brand2-lt': '#9DB2BF',
    'brand2-dk': '#212C34',
    'on-brand2': '#E9F1EE',

    ink: '#0D1411', 'ink-rgb': '13,20,17',
    'ink-1': '#141D19',
    'ink-2': '#1E2A24',
    'ink-deep': '#060A08', 'ink-deep-rgb': '6,10,8',

    'on-ink': '#EAF1EC',
    'on-ink-2': '#CBD8CF',
    'on-ink-muted': '#92A398',
    'on-ink-faint': '#6B7B71',

    'on-paper': '#14231C',
    'on-paper-2': '#3C4F45',
    'on-paper-muted': '#5D6F65',
    'on-paper-faint': '#8A9891',
    'paper-line': '#E8EEEA',
    'star-muted': '#AFBCB4',
    'dot-idle': '#B7C4BC',

    'band-bg': '#0A1512',
    'band-g1': '#12211B',
    'band-g2': '#0F2409',
    'chip-core-bg': '#22332B',

    /* hero rhythm - the centre lockup at 2x, paired with the .hero-logo
       aspect-ratio override in _src/body.html */
    'hero-logo': 'clamp(420px,62vw,760px)',
    'hero-logo-sm': 'min(90vw,360px)',
    'hero-logo-gap': '34px',
    'hero-logo-gap-sm': '22px',
  },

  /* ---------------------------------------------------------------- CLAIMS --
     A claim here means the evidence has been seen. The submission returned all
     four of these under `confirm[]` with `certificate_attached: false` - Kevin's
     own words, no document uploaded.
     JAY ATTESTED ON 2026-09-06 that he has seen all of it and instructed that
     they be declared. That attestation is the authority for publishing them,
     NOT the form. If the paperwork is ever in doubt, empty this object and
     re-run: check.js then blocks every claim word site-wide. */
  claims: {
    insured: {
      value: 'Public liability insurance',
      amount: '1000000',
      evidence: 'Jay attested 2026-09-06, amount corrected by Jay 2026-09-07. No certificate attached to submission #17.',
      /* Submission #17 said 100000, which looked like a missing zero - trade
         public liability is normally 1m-5m and many customers ask for 1m as a
         minimum. Jay confirmed 2026-09-07 that it is one million.

         STILL NOT PRINTED ANYWHERE. The pages say "public liability insured"
         and never name a figure, which is why the wrong number did no harm.
         Naming a sum is a bigger claim than declaring cover, so it stays
         unprinted until Jay asks for it. Grep _site for the figure before
         assuming otherwise. */
    },
    years_trading: {
      value: '25',
      evidence: 'Jay attested 2026-09-06. No certificate attached to submission #17.',
    },
    guarantee: {
      value: '10 years',
      evidence: 'Jay attested 2026-09-06. No certificate attached to submission #17.',
    },
  },

  /* GA4. Supplied by Jay 2026-09-08.
   *
   * Loaded ONLY after an explicit Accept on the cookie banner - see
   * analytics-src.js. Under UK PECR the tag must not run and ask afterwards.
   *
   * Blank this and the whole thing disappears: no gtag, no banner, no cookies.
   * analytics-src.js returns early on an empty id rather than shipping a
   * banner asking permission for something that is not happening. */
  analytics: {
    ga4: 'G-E33FMGV73W',
  },

  /* Where each fact came from, so provenance survives into the next session. */
  facts: {
    OWNER:   { value: 'Kevin Clee', source: 'submission #17', seen: '2026-09-06' },
    ADDRESS: { value: 'Unit 12 Oaklands Industrial Estate, Lower Road, Hednesford, WS12 2UZ', source: 'submission #17', seen: '2026-09-06' },
    TOWN:    { value: 'Cannock', source: 'submission #17. Replaces the "the Midlands" guess of 2026-08-27.', seen: '2026-09-06' },
    COUNTY:  { value: 'Staffordshire', source: 'submission #17', seen: '2026-09-06' },
    PHONE:   { value: '07411 859355', source: 'submission #17, matches the van wrap', seen: '2026-09-06' },
    EMAIL:   { value: 'midlandroofs@gmail.com', source: 'submission #17, matches the van wrap', seen: '2026-09-06' },
    HOURS:   { value: '24 hours', source: 'submission #17 (openingHours "24hours")', seen: '2026-09-06' },
    TEAM:    { value: '6', source: 'submission #17', seen: '2026-09-06' },
    AREAS:   { value: '20 mile radius of Hednesford WS12', source: 'submission #17. The 21 town pages are Claude research - nearby{} came back empty.', seen: '2026-09-06' },
    BADGE:   { value: 'Roofing Outlaw', source: 'submission #17 usp, and the van door. A roofing community brand, NOT an accreditation. Never listed beside a trade body.', seen: '2026-09-06' },
    REVIEWS: { value: 'Google 5.0 from 50 - NOT PUBLISHED', source: 'submission #17 ratings.google, but the gbp URL is empty so nothing is linkable. Jay decided 2026-09-06 to leave reviews off until there is a profile to link to.', seen: '2026-09-06' },
  },

  tokens: {
    BUSINESS: 'Midland Roof Shield',
    BUSINESS_SHORT: 'Midland',
    TOWN: 'Cannock',
    COUNTY: 'Staffordshire',
    BASE_TOWN: 'Hednesford',
    PHONE: '07411 859355',
    PHONE_TEL: '+447411859355',
    PHONE_WA: '447411859355',
    EMAIL: 'midlandroofs@gmail.com',
    OWNER: 'Kevin',
    OWNER_FULL: 'Kevin Clee',
    BASE,
  },
};
