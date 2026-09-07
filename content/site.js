/* Everything that is not a service page or an area page.
 * Source: onboarding submission #17.
 *
 * EMPTY IN THE SUBMISSION and therefore absent below rather than invented:
 *   nearby{}          the villages on each area page are Claude research
 *   serviceDetail{}   no durations and NO PRICES anywhere on the site
 *   customerQuestions the FAQs are written from the trade, not Kevin's words
 *   aboutTeam         nothing about the six of them individually
 *   tagline, brand.font, brand.style, notes, scheme, schemeNumber
 *   gbp               so no reviews page, no review badges, no aggregateRating
 *
 * `story` came back as the two words "Family business". The about page below
 * builds on that plus `years`, `team` and `usp` and does not pretend to more.
 */
'use strict';

const contact = {
  address: {
    line1: 'Unit 12 Oaklands Industrial Estate',
    line2: 'Lower Road',
    town: 'Hednesford',
    region: 'Staffordshire',
    postcode: 'WS12 2UZ',
    country: 'GB',
  },
  addressOneLine: 'Unit 12 Oaklands Industrial Estate, Lower Road, Hednesford, Cannock WS12 2UZ',
  hours: '24 hours a day, 7 days a week',
  hoursSchema: 'Mo-Su 00:00-23:59',
  hoursNote: 'Kevin gave the hours as "24 hours" on the onboarding form. Worth confirming that means a genuine round the clock call out rather than an answerphone, because the site now says so on every page.',
};

/* ------------------------------------------------------------- reviews --
 * Kevin has reviews on three platforms. Jay supplied the links 2026-09-07.
 *
 * ALL THREE ARE THE SAME BUSINESS, which is not obvious from the URLs, so it is
 * written down here rather than rediscovered:
 *   - Bark  /b/everest-roofing-staffs-ltd/  - the profile itself now reads
 *     "Midland roof shield" at Hednesford, Cannock WS12 2UZ, i.e. Unit 12.
 *     VERIFIED 2026-09-07 by reading the profile.
 *   - Yell  /biz/midland-roofs-bewdley-...  - trades as "Midland Roofs" from a
 *     Kinlet, Bewdley DY12 3HB address, and carries 07411 859355, Kevin's
 *     mobile. Corroborated by a thomsonlocal listing with the same number, and
 *     by Bark reviews that call the firm "Midland Roofs" in their own words.
 *     The old midland-roofs.co.uk website no longer resolves.
 *
 * ==================== THE COUNTS ARE JAY-ATTESTED ======================
 * Bark 51 at 5/5 is verified - read off the profile. Google 6 and Yell 26 are
 * Jay's figures (2026-09-07) and could NOT be independently checked: Google
 * 429s automated requests and Yell is behind a Cloudflare bot wall. Treat them
 * the same way as claims{} - if a number is questioned, re-verify by hand.
 *
 * Bark's own headline is 5/5, but its distribution is 80% five star and 20%
 * four star, i.e. a true mean of about 4.8. The site quotes Bark's displayed
 * figure and says which platform it is from, which is defensible. Do not
 * promote it to a site-wide "5.0 rating".
 *
 * NO aggregateRating IS EMITTED, deliberately. Google's structured data
 * guidelines do not allow a business to mark up reviews collected on
 * third-party sites as its own aggregate, and doing it risks a manual action.
 * The badges link out instead, which is the honest and the safe shape. */
const reviews = {
  /* Verbatim from Bark. Spelling and punctuation are the customers' own and are
     deliberately NOT tidied up - corrected prose reads written-by-the-agency.
     `excerpt: true` marks a contiguous cut from a longer review, never a
     stitched-together one. */
  featured: [
    { name: 'Roger Stephens', date: '13 October 2024', platform: 'Bark',
      text: 'Kevin & his team worked extremely well to get my roof water tight in bad weather conditions, then came back the next day to finish off giving me peace of mind, thank full i found them' },

    { name: 'Brad Page', date: '26 January 2025', platform: 'Bark', excerpt: true,
      text: 'Kevin gave us a detailed quote and although not the cheapest, he asked for no money up front, assured us that he only uses the best materials and that he would get the job done in the timeframes that he promised. Throughout the process, Kevin stuck to his word, the lads he sent were all very pleasant and hard working, all work was completed to a high standard in the timeframes he promised.' },

    { name: 'Trevor Mountford', date: '10 October 2022', platform: 'Bark',
      text: 'Very professional, efficient and able. I throughly recommend them and would not hesitate to use them again' },

    { name: 'Michael Gregson', date: '14 June 2021', platform: 'Bark',
      text: 'Kevin was the consummate professional ready to give advice to improve the service he provides. All work carried out to an excellent standard. Thank you Kevin.' },

    { name: 'Selwyn Eglash', date: '15 January 2021', platform: 'Bark',
      text: 'Midland Roofs fully replaced my roof. Kevin and his team were at all times professional, efficient, and completed a quality job to our satisfaction. Fully recommended.' },

    { name: 'Amina Bhamjee', date: '17 November 2020', platform: 'Bark',
      text: 'OmG these guys are amazing! The whole roof plus porch and entrance roofs needed replacing. Kevin and his team were polite, punctual and super friendly. A true pleasure to work with.' },
  ],

  /* Counts drive the badge row. `verified` says whether I read the number off
     the platform myself. */
  platforms: [
    { key: 'google', name: 'Google', count: 6,  rating: null, verified: false, blurb: 'Read them on Google' },
    { key: 'bark',   name: 'Bark',   count: 51, rating: '5',  verified: true,  blurb: 'Rated 5 out of 5' },
    { key: 'yell',   name: 'Yell',   count: 26, rating: null, verified: false, blurb: 'Read them on Yell' },
  ],

  read: [], collect: [],
};

/* The three questions every area page carries, plus the two written for that
   specific town in content/areas.js. */
const sharedAreaFaqs = [
  ['Do you charge for a quote?', 'No. Someone comes out, looks at the roof properly and gives you a fixed written price. There is no charge and no obligation.'],
  ['How far do you travel?', 'We work to roughly a twenty mile radius of our yard in Hednesford, which covers Cannock Chase, most of south Staffordshire and the north of the Black Country. If you are just outside that it is still worth ringing.'],
  ['Are you insured?', 'Yes. {{BUSINESS}} carries public liability insurance and we are happy to show you the certificate before any work starts.'],
];

const generalFaqs = [
  ['Do you charge for a quote?', 'No. We come out, look at the roof properly and give you a fixed written price, at no cost and with no obligation to go ahead.'],
  ['How quickly can you come out for a leak?', 'We answer the phone 24 hours a day, so you will speak to a person whatever the time. How quickly we can get on the roof depends on the weather and where you are, and we will give you a realistic answer when you call.'],
  ['Are you insured?', 'Yes. We carry public liability insurance, and the certificate is available to see before work begins.'],
  ['Do you offer a guarantee?', 'Yes, ten years on our workmanship. Tiles, membranes and other materials carry their own manufacturer warranties, which are separate and which we will point you to rather than blurring the two together.'],
  ['How long have you been roofing?', 'Twenty five years. {{BUSINESS}} is a family business and there are six of us.'],
  ['What areas do you cover?', 'Around twenty miles from our yard in Hednesford. That takes in Cannock, Rugeley, Burntwood, Lichfield, Penkridge and Stafford, down through Brownhills, Walsall and Aldridge, and across to Wolverhampton, Tamworth and Sutton Coldfield.'],
  ['Will I need scaffolding?', 'Anything above single storey, or any job lasting more than a short visit, normally does, both for safety and for a better finish. It is included in the written price from the start rather than added later.'],
  ['Do you work in bad weather?', 'Some work can be made safe in the wet, but a lasting repair needs a dry roof, particularly anything involving mortar or lead. We will always tell you which of the two you are getting.'],
  ['Can you match my existing tiles?', 'Usually, including discontinued profiles. We run our own roofing supplies shop, so we can often source a match faster than a firm waiting on a merchant delivery.'],
  ['Do you take on commercial work as well as houses?', 'Yes. Most of what we do is for homeowners, but we take on commercial roofs too. Ring and describe it and we will tell you honestly whether it suits us.'],
  ['What happens if you find something unexpected once you start?', 'We stop, photograph it and tell you what it will cost before carrying on. Nobody enjoys that call, but it is a great deal better than finding out afterwards.'],
  ['Do you clear up afterwards?', 'Yes. Waste goes with us as we go rather than sitting in a skip on the drive for a fortnight, and the drive gets swept before we leave.'],
  ['Can I see photographs of the work?', 'Yes, and we take them as a matter of course. Most of a roof is somewhere you will never stand, so photographs of each stage are the only way you can actually see what you paid for.'],
  ['Do you do emergency call outs?', 'Yes, on a 24 hour line. If something has come off in the night we would rather make it safe first and talk about the proper repair in daylight.'],
];

/* The demo gallery, reused. Alt text is what a person would describe, because
   check.js fails a client build on a missing alt and a decorative one helps
   nobody. Kevin uploaded no captioned photos with the submission (media section:
   0 of 20), so these are the demo's own captions. */
const gallery = [
  ['g1',  'Newly tiled hip roof with a bedded ridge and a chimney stack behind', 'Re-roof completed'],
  ['g2',  'Red clay tiled roof photographed along the ridge on a clear day', 'Clay tiled roof'],
  ['g3',  'Slate roof and stone chimney stacks on an older property', 'Slate and stone chimneys'],
  ['g4',  'New lead work dressed into a grey tiled roof beside a flat section', 'Leadwork and abutment'],
  ['g5',  'Finished tiled roof looking out across woodland under a grey sky', 'Tiled roof and ridge'],
  ['g6',  'Red tiled hip roof meeting a newly laid grey flat roof below it', 'Pitched and flat together'],
  ['g7',  'Lead flashing and soakers stepped into the side of a brick chimney', 'Chimney flashing renewed'],
  ['g8',  'Two red tiled roof slopes meeting along a shared ridge', 'Ridge and verge detail'],
  ['g9',  'Lead valley dressed between two slate slopes against stone brickwork', 'Lead valley'],
  ['g10', 'Grey tiled hip and valley with new lead work below the chimney', 'Hip and valley tiling'],
  ['g11', 'Stepped lead flashing at the base of a brick chimney on a red tiled roof', 'Chimney leadwork'],
  ['g12', 'Tiles cut and dressed neatly into a brick abutment wall', 'Abutment detail'],
  ['g13', 'Brown tiles run up to a brick gable with the scaffold still in place', 'Gable and scaffold'],
  ['g14', 'Freshly tiled roof slope with the scaffold boards still down', 'Tiling in progress'],
  ['g15', 'New tiles loaded out in stacks across the membrane at the end of the day', 'Loading out'],
  ['g16', 'Roof stripped back with the scaffold sheeted before the new covering goes on', 'Stripped and sheeted'],
  ['g17', 'Lead tray and flashing formed around a stone chimney above a flat roof', 'Lead tray'],
];

/* Batch 2, sent by Kevin 2026-09-06 (assets-v2/). Proper camera photographs this
 * time rather than phone screenshots, and mostly the two subjects the first batch
 * was thinnest on: conservatory roofs and flat roofing.
 *
 * `subject` routes each photo to the service page it belongs on. 'flat' has NO
 * service page - flat roofing is not one of the five services Kevin listed, even
 * though the homepage advertises it and six of these eighteen photographs are of
 * it. Flagged in BUILD-REPORT.md; those images appear on /our-work/ only until
 * that is resolved.
 *
 * Alt text describes what is visibly in the frame. Where it is not possible to
 * tell from a photograph whether a tiled conservatory roof is a full warm roof
 * build, it is described as a tiled roof rather than asserting the construction.
 */
const galleryV2 = [
  ['v2-1',  'flat',  'New flat roof with a glass roof lantern set into it', 'Flat roof and lantern'],
  ['v2-2',  'warm',  'Conservatory with a new tiled roof and white uPVC frames', 'Conservatory re-roofed'],
  ['v2-3',  'warm',  'Tiled conservatory roof seen from the side, run down to the gutter line', 'Conservatory roof'],
  ['v2-4',  'warm',  'Rear of a house with a newly tiled conservatory roof and block paved patio', 'Conservatory and patio'],
  ['v2-5',  'other', 'Brick porch with a new tiled roof and a white front door', 'Porch roof'],
  ['v2-6',  'other', 'Dry verge where a newly tiled roof meets the brickwork of the house', 'Dry verge detail'],
  ['v2-7',  'warm',  'Close up of a tiled conservatory roof hip against brickwork', 'Hip detail'],
  ['v2-8',  'warm',  'Tiled conservatory roof photographed from the garden', 'Finished conservatory roof'],
  ['v2-9',  'flat',  'Large commercial flat roof with dome rooflights and brick parapets', 'Commercial flat roof'],
  ['v2-10', 'flat',  'Flat roof running across a terrace of properties, seen from above', 'Flat roof from above'],
  ['v2-11', 'flat',  'Flat roof with rooflights overlooking a garden', 'Flat roof and rooflights'],
  ['v2-12', 'flat',  'Newly laid flat roof meeting the brickwork below leaded windows', 'New flat roof'],
  ['v2-13', 'warm',  'Bungalow with a bay conservatory under a new dark tiled roof', 'Bay conservatory roof'],
  ['v2-14', 'warm',  'Porch with a new tiled roof and a lit doorway', 'Porch and canopy'],
  ['v2-15', 'warm',  'Rear of a house with a white framed conservatory and a new roof', 'Conservatory rear'],
  ['v2-16', 'other', 'Roof window set into a newly tiled dark roof above new guttering', 'Roof window'],
  ['v2-17', 'warm',  'Brick garden room with a glazed gable end and insulation boards ready on the patio', 'Garden room in progress'],
  ['v2-18', 'flat',  'Modern flat roofed brick extension with dark fascia and bifold doors', 'Flat roof extension'],
];

/* every photo on the site, batch 1 then batch 2, for /our-work/ */
const galleryAll = gallery.concat(galleryV2.map(([id, , alt, cap]) => [id, alt, cap]));
const v2By = s => galleryV2.filter(x => x[1] === s).map(x => x[0]);

const about = {
  lede: 'A family roofing business working out of Hednesford, twenty five years in and six of us on the books.',
  paras: [
    '{{BUSINESS}} is a family business. {{OWNER_FULL}} has been roofing for twenty five years, and there are six of us working out of our yard on Oaklands Industrial Estate in Hednesford, just outside Cannock. We cover roughly twenty miles from there, which takes in most of Cannock Chase and south Staffordshire and reaches down into the north of the Black Country.',
    'The thing that makes us slightly unusual is that we run our own roofing supplies shop. That sounds like a detail until you are the customer waiting on a discontinued tile profile, because it means we can generally lay hands on a match ourselves rather than joining a queue behind every other roofer waiting on a merchant delivery. On a repair where matching the existing roof is the whole job, that is often the difference between a week and a month.',
    'We take on repairs, full re-roofs, fascias and guttering, roof cleaning and conservatory warm roofs, mostly for homeowners. The work carries a ten year guarantee and we are covered by public liability insurance, and you are welcome to see the certificate before anything starts rather than after.',
    'Most of a roof is somewhere you are never going to stand, which is exactly why it is easy to cut corners on. We photograph each stage as we go, so what went on under the tiles is something you can look at rather than something you have to take on trust.',
  ],
  /* usp verbatim: "We have our own roofing supplie shop & were part of the roofing outlaw"
     Roofing Outlaw is a roofing community brand, NOT an accreditation or a trade
     body. It appears once, described as what it is, and never in a trust strip
     or beside anything that reads as certification. */
  /* CORRECTED 2026-09-06. This previously described Roofing Outlaw as "a community
     of roofers", which was a misreading of the onboarding USP. The Roofing Outlaw
     is a roofing products supplier with trade counters.
     Kevin runs its CANNOCK BRANCH. He is NOT a director of The Roofing Outlaw
     Supplies Ltd (company 15133261, Leeds - directors Nevin Lupton and Geoffrey
     Michael Smith), and nothing on this site may imply he owns the brand. */
  outlaw: 'Kevin also runs the Cannock branch of The Roofing Outlaw, the roofing products supplier, from the same yard. It means the roofing side and the merchant side sit under one roof, and that trade customers around Cannock can collect the range locally. There is more on that on our <a href="{{BASE}}roofing-supplies/" style="color:var(--accent)">roofing supplies</a> page.',
};

/* ------------------------------------------------------- roofing supplies --
 * A supplier and rep facing page. Not for homeowners - it does not use the
 * homeowner side card or the free-quote CTA.
 *
 * THE RULE THIS PAGE IS WRITTEN UNDER
 *   Kevin runs the Roofing Outlaw CANNOCK BRANCH. He does not own the brand.
 *   THE ROOFING OUTLAW SUPPLIES LTD is company 15133261, registered in Leeds,
 *   directors Nevin Lupton and Geoffrey Michael Smith. Nothing here may say or
 *   imply that Kevin owns, founded or directs it. That is checkable in thirty
 *   seconds on Companies House and it is somebody else's brand.
 *
 * Company facts below are from the Companies House record for MIDLAND ROOF
 * SHIELD LIMITED, 15537075, verified 2026-09-06.
 *
 * Product ranges are described at CATEGORY level only. The Roofing Outlaw
 * catalogue is not evidence of what Kevin's counter actually stocks, and no
 * brand is named until he confirms one.
 */
const supplies = {
  h1: 'Roofing supplies and trade counter in Cannock',
  lede: 'A roofing contractor and a roofing merchant, working out of the same yard in Hednesford.',
  inShort: '{{BUSINESS}} runs a roofing merchant and a roofing contracting business from one yard on Oaklands Industrial Estate in Hednesford. The counter is the Cannock branch of The Roofing Outlaw, so trade customers across Cannock Chase and south {{COUNTY}} can collect the range locally rather than wait on a national delivery. If you supply roofing products and want to talk about stocking, a trade account or a rep visit, {{OWNER_FULL}} is the person to speak to.',

  sections: [
    ['Contractor and merchant under one roof',
     ['Most roofing merchants have never laid a roof, and most roofers do not run a counter. We do both, from one unit. There are six of us, and the contracting side works across {{TOWN}}, Hednesford and roughly twenty miles around, so stock moves through our own jobs as well as over the counter.',
      'For a supplier that is worth something specific: a customer who sells your product and then fits it, and can tell you how it actually behaved on a roof in February rather than only how many pallets moved.']],

    ['The Roofing Outlaw Cannock branch',
     ['Our counter is the Cannock branch of The Roofing Outlaw, the roofing products supplier. To be clear about it, The Roofing Outlaw is a separate company based in Leeds. We run the Cannock branch; we do not own the brand.',
      'What that means locally is that roofers in {{COUNTY}} and the north of the Black Country can collect the range here instead of waiting on a delivery from Yorkshire.']],

    ['What we carry',
     ['Flat roofing systems, pitched roofing, membranes and underlays, roofing timber, and the tools and consumables that go with them.',
      'If you supply something in those categories and think it belongs on the counter, ring and say so. We would rather look at a product than read a brochure about it.']],
  ],

  /* Public record. A supplier assessing a trade account will look this up anyway,
     and the former name matters: they may already hold Kevin on their books under
     it. It is also the company detail a UK limited company's site should carry. */
  company: [
    ['Registered name', 'Midland Roof Shield Limited'],
    ['Company number', '15537075, registered in England and Wales'],
    ['Registered office', 'Unit 12 Oaklands Industrial Estate, Lower Road, Hednesford, Cannock WS12 2UZ'],
    ['Director', 'Kevin Clee'],
    ['Previously', 'Staffordshire Roofing Supplies Limited, so you may hold us on your books under that name'],
  ],

  ctaTitle: 'Trade and supplier enquiries',
  ctaBody: 'Stocking, trade accounts and rep visits all go direct to {{OWNER}} rather than through a call centre.',
};

/* -------------------------------------------------- review landing page --
 * The one-card page Kevin texts a customer the day a job finishes. It is NOT a
 * public /reviews/ page, which this site does not have.
 *
 * ==================== THIS PAGE DOES NOT BUILD YET ======================
 * `google` is empty because Kevin has no Google Business Profile. Confirmed with
 * Jay 2026-09-06. Submission #17 claimed "5.0 from 50" but `gbp` was blank, and
 * no profile is findable under "Midland Roof Shield" or the former name
 * "Staffordshire Roofing Supplies".
 *
 * pages-review.js WILL NOT WRITE THE PAGE while `google` is empty, so it cannot
 * ship pointing at nowhere. Paste the link in and it appears on the next build.
 *
 * IT MUST BE THE ASK-FOR-REVIEWS LINK, from the Business Profile dashboard:
 *     Business Profile -> Ask for reviews -> copy link
 * It looks like  https://g.page/r/XXXXXXXX/review  and opens the write dialog.
 * NOT the profile URL, which lands on the listing where people READ reviews.
 * Verify with `curl -sIL` before shipping - a dead review link is worse than no
 * button at all.
 *
 * `secondary` is empty on purpose. There is still no Facebook page URL and no
 * Checkatrade or MyBuilder profile has ever been mentioned. Google-only is a
 * legitimate shape, and Google is the only one that moves the local ranking. */
/* READ vs WRITE. These are different links and mixing them up is the single
 * most common way a review funnel quietly fails:
 *   googleRead  - the listing, where a visitor READS reviews. Homepage badge.
 *   googleWrite - the Ask-for-reviews link, which opens the WRITE dialog. This
 *                 is what /review/ needs, and ONLY Kevin can produce it:
 *                 Business Profile -> Ask for reviews -> copy link. It looks
 *                 like https://g.page/r/XXXXXXXX/review
 *
 * googleWrite IS STILL EMPTY, so pages-review.js keeps routing the ask to
 * WhatsApp. Jay's 2026-09-07 link was a google.com/search URL carrying his own
 * session (authuser=3, and a mat= state blob), which is not a review link and
 * would not have worked for a customer. The session parameters are stripped
 * from googleRead below.
 *
 * googleRead could NOT be verified end to end - Google 302s to consent.google
 * for an automated fetch and 429s a headless browser. The 302 proves the URL is
 * accepted, not that it lands on the right panel. A Maps share link would be
 * sturdier than a stick= parameter; ask Kevin for one.
 *
 * `secondary` stays empty: still no Facebook page URL, no Checkatrade, no
 * MyBuilder. */
const reviewLinks = {
  googleRead:  'https://www.google.com/search?q=Midland+roof+shield&stick=H4sIAAAAAAAA_-NgU1I1qDCxME80SEqxSEsyTDIzMzG3MqhIMzSzMEszNDUzTU20MLKwXMQq7JuZkpOYl6JQlJ-fplCckZmakwIAj07dxD8AAAA&hl=en',
  googleWrite: '',
  bark: 'https://www.bark.com/en/gb/b/everest-roofing-staffs-ltd/Yn9qL/',
  yell: 'https://www.yell.com/biz/midland-roofs-bewdley-9176728/',
  secondary: [],   // e.g. { name: 'Facebook', url: 'https://...' }
};

const review = {
  eyebrow: 'Job complete',
  title: 'Thank you',
  /* Names Kevin, not the company. "having Kevin out" reads like a person;
     "choosing Midland Roof Shield Limited" does not. */
  thanks: 'We really appreciate you having {{OWNER}} and the team out, and we hope you are pleased with how the roof has come out.',
  askTitle: 'Could you spare thirty seconds?',
  ask: 'We are a family business and we do not advertise much. Almost everyone who rings us found us through somebody else, so a few words from you genuinely decides whether the next person gives us a go.',
  button: 'Leave a Google review',
  buttonNote: 'Opens Google, about thirty seconds',
  steps: [
    'Tap the green button above.',
    'Sign in if Google asks. On a phone you almost certainly already are.',
    'Pick a star rating, add a few words about the job, and post it.',
  ],
  /* The reason this section exists: it gives an unhappy customer somewhere to go
     that is not a public one star. */
  putRightTitle: 'Not quite happy?',
  putRight: 'If something is not right we would much rather hear it from you first and put it straight. Ring {{OWNER}} on {{PHONE}} or send a message on WhatsApp, and we will come back out.',
  /* Only claims declared in site.config.js claims{}. */
  reassure: 'Public liability insured. Ten year workmanship guarantee.',

  /* ---- used ONLY while reviewLinks.google is empty ----
     Kevin has no Google Business Profile yet, so there is nowhere for a customer
     to leave a Google review. Rather than ship a button that goes nowhere, or a
     404, the page goes live with the ask routed to WhatsApp so feedback can
     still be collected from day one.
     The MOMENT a Google link is added, the page switches to the Google version
     automatically and none of this is used. */
  fallbackButton: 'Tell us how we did',
  fallbackNote: 'Opens WhatsApp, about thirty seconds',
  fallbackAsk: 'We are a family business and we do not advertise much. Almost everyone who rings us found us through somebody else, so hearing how we did genuinely helps, good or bad.',
  /* the WhatsApp button is removed from this section in fallback mode, because
     WhatsApp is already the primary button, so the copy must not offer it here */
  fallbackPutRight: 'If something is not right we would much rather hear it from you first and put it straight. Ring {{OWNER}} on {{PHONE}} and we will come back out.',
};

/* ------------------------------------------------- WhatsApp prefill text --
 * Kevin takes most of his enquiries on WhatsApp, and a bare wa.me link opens
 * an empty thread - he gets a message from an unknown number with no idea
 * whether it came off the website, a van, a Bark lead or a neighbour.
 *
 * Every WhatsApp link on the site therefore opens with a line that says so.
 * It is written in the CUSTOMER'S voice, not as a system tag, because the
 * customer is the one who presses send and a line reading "SOURCE: WEB" would
 * be both odd to send and easy to delete.
 *
 * `where` is optional page context: the service they were reading, or the town
 * page they were on. Callers that have neither pass nothing and get the plain
 * line, which still names the website.
 *
 * Prefill is a suggestion, not a guarantee - WhatsApp puts the text in the
 * compose box and the customer can clear it before sending. Most do not. Do
 * not build anything that DEPENDS on the line being present. */
const whatsapp = {
  opener: (where) =>
    'Hi ' + '{{BUSINESS}}' + ', I found you on your website and I would like a quote' +
    (where ? ' ' + where : '') + '.',

  /* The quote form already sends name, phone, area and service, so it needs a
     source line rather than context - it says which form, not just which site. */
  formOpener: 'Hi {{BUSINESS}}, I found you on your website and I would like a quote.',
  /* Host written out rather than tokenised - there is no {{ORIGIN}} token, and
     site.config.js origin is a full URL. If the domain ever changes, this and
     site.config.js origin both need it. */
  formSource: 'Sent from the quote form on midlandroofshield.co.uk',
};
module.exports = { whatsapp, contact, reviews, sharedAreaFaqs, generalFaqs, gallery, galleryV2, galleryAll, v2By, about, supplies, reviewLinks, review };
