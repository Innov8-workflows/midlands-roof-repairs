/* Service pages. Source: submission #17 `primaryServices`.
 *
 * WHAT THE SUBMISSION DID NOT GIVE, and therefore what is absent here:
 *   serviceDetail{}   empty - so there is NO duration, NO symptom list in the
 *                     client's words and, critically, NO price guidance. No page
 *                     below carries a price and no Offer in the schema carries
 *                     one either. An invented price is a claim.
 *   customerQuestions empty - the FAQs are written from the trade, not from
 *                     Kevin's phrasing. Worth replacing with his own words when
 *                     he has five minutes.
 *
 * Kevin listed five services. The demo homepage advertises flat roofing and
 * chimneys/leadwork as well, and the gallery plainly shows him doing both, but
 * he did not list them - so they get no page. Flagged in BUILD-REPORT.md.
 */
'use strict';

module.exports = [
  {
    slug: 'roof-repairs',
    name: 'Roof repairs',
    h1: 'Roof repairs in {{TOWN}} and across {{COUNTY}}',
    title: 'Roof Repairs in {{TOWN}} | {{BUSINESS}}',
    desc: 'Leaks, slipped tiles, storm damage and failed flashing repaired across {{TOWN}}, Hednesford, Rugeley and 20 miles around. 24 hour call out. Call {{PHONE}}.',
    lede: 'Most roofs do not fail all at once. They fail at one detail, and the damage spreads from there.',
    inShort: 'We repair pitched and flat roofs across {{TOWN}} and the surrounding towns, usually in a single visit. Slipped and cracked tiles, leaks around chimneys and valleys, failed lead flashing, storm damage and blocked or split guttering. We answer the phone 24 hours a day, and we tell you honestly whether the roof needs a repair or a re-cover rather than selling you the bigger job.',
    signsTitle: 'Signs your roof needs looking at',
    signs: [
      'A damp patch on an upstairs ceiling, or a tide mark that grows after heavy rain',
      'Tiles or slates lying in the garden, or a gap visible on the slope from the ground',
      'Water tracking down a chimney breast, which usually means the flashing has gone rather than the roof',
      'Daylight visible through the roof from inside the loft',
      'Mortar dropping out of the ridge, or ridge tiles that look out of line',
      'Guttering overflowing in a downpour, which soaks the brickwork and eventually the wall plate',
    ],
    processTitle: 'How a repair actually goes',
    steps: [
      ['We look at it properly', 'Someone comes out, gets onto the roof where it is safe to, and finds where the water is actually getting in. That is not always where the stain appears inside, which is why guessing from the ground wastes everybody\'s money.'],
      ['You get told the truth', 'If it is a repair, we say so. If the covering is at the end of its life and a repair will only buy a year, we say that too and let you decide. We photograph what we find so you can see it yourself.'],
      ['A written price before anything starts', 'Fixed, itemised, and including access. Nothing begins until you have said yes to it.'],
      ['The repair', 'Matching tiles or slates where we can, new lead dressed and fixed properly where the old work has failed, and ridges rebedded and pointed rather than smeared over.'],
      ['Checked, photographed and cleared up', 'We show you the finished work in photographs, take the waste with us, and sweep down before we leave.'],
    ],
    faqs: [
      ['How quickly can you come out for a leak?', 'We run a 24 hour phone line, so you will speak to someone whatever the hour. How fast we can be on the roof depends on the weather and where you are in the patch, and we will give you a straight answer when you call rather than a promise we cannot keep.'],
      ['Can you make it safe before a proper repair?', 'Usually yes. A temporary cover keeps the water out until the roof is dry enough to work on properly. We will always tell you which one you are getting so you are not surprised when we come back.'],
      ['Do you work in bad weather?', 'Some work can be made safe in the wet. A lasting repair needs a dry roof, particularly anything involving mortar or lead. We would rather come back than do it twice.'],
      ['Will I need scaffolding for a small repair?', 'Not always. A single slipped tile can often be done off a ladder or a tower. Anything above single storey, or anything taking more than a short visit, normally needs scaffolding for safety and for a better finish. It is priced in from the start so there is no surprise.'],
      ['Can you match my existing tiles?', 'Usually. We run our own roofing supplies shop, which means we can often lay hands on a match, including discontinued profiles, faster than a firm waiting on a merchant delivery.'],
      ['What does a repair cost?', 'It depends entirely on what has failed and how the roof is reached, so we will not quote a figure over the phone and pretend it is accurate. You get a fixed written price after we have looked, before any work starts.'],
    ],
    gallery: ['g7', 'g11', 'g9'],
  },

  {
    slug: 'roof-replacement',
    name: 'Roof replacement',
    h1: 'New roofs and re-roofing in {{TOWN}}',
    title: 'Roof Replacement and Re-Roofing in {{TOWN}} | {{BUSINESS}}',
    desc: 'Full strip and re-cover with breathable membrane, treated battens and new tiles, across {{TOWN}}, Hednesford and {{COUNTY}}. 10 year guarantee. Call {{PHONE}}.',
    lede: 'A re-roof is the one job where everything that matters is hidden by the time you see it finished.',
    inShort: 'We strip roofs back, re-felt them with a breathable membrane, batten at the correct gauge and re-cover them in new tiles or slates, across {{TOWN}} and the towns around it. The work carries a 10 year guarantee. Because the parts that decide whether a roof lasts are all covered up by the end, we photograph every stage so you can see what went on underneath rather than taking it on trust.',
    signsTitle: 'Signs a roof is past repairing',
    signs: [
      'Repairs are becoming a regular expense rather than a one off',
      'Tiles are delaminating, spalling or crumbling at the edges when handled',
      'The felt under the tiles has torn or perished, visible as sagging strips in the loft',
      'The roof line is dipping between the rafters, or the ridge has a visible sag',
      'Nail fatigue on a slate roof, where slates slip steadily with no storm to blame',
      'You are planning solar, a loft conversion or a long spell in the house and want it done once',
    ],
    processTitle: 'What a full re-roof involves',
    steps: [
      ['Survey and an honest recommendation', 'We get up and look at the deck, the battens and the felt, not just the tiles. Plenty of roofs sent to us for replacement only needed a repair, and we will say so.'],
      ['A written specification', 'Which tile, which membrane, which battens, what happens at the ridge, the hips, the valleys and the abutments, and what the access costs. All of it in writing before anything is ordered.'],
      ['Scaffold and strip', 'The roof is sheeted, the old covering comes off, and the timbers are inspected properly once they are exposed. Anything rotten gets replaced, and you see a photograph of it before it is covered again.'],
      ['Membrane, battens and dry fixings', 'Breathable membrane laid and lapped correctly, treated battens at the gauge the tile actually requires, and dry ridge and verge systems where they suit the roof better than mortar.'],
      ['Tile, finish and hand over', 'Tiles loaded out and laid course by course from the eaves up, hips and valleys cut in, ridge bedded and pointed, then the whole site cleared and the drive swept. Your guarantee and the photographs come with it.'],
    ],
    faqs: [
      ['How long does a re-roof take?', 'Kevin will give you a realistic number once he has seen the roof, and it depends far more on the shape and the access than on the size. What we will not do is start a job we cannot get back to for a fortnight.'],
      ['Do we need to move out?', 'No. It is noisy and there is scaffolding, but the house stays watertight throughout because we only ever strip what we can cover the same day.'],
      ['What guarantee do you give?', 'Ten years on the workmanship. Tile and membrane manufacturers carry their own separate warranties, which we will point you at rather than muddling the two together.'],
      ['Can you match the neighbours on a semi or a terrace?', 'Usually, yes, and it is worth doing. We run our own roofing supplies shop, so tracking down a matching profile is generally quicker for us than for a firm relying on merchant stock.'],
      ['Do you handle the scaffolding?', 'Yes, and it is in the written price from the start rather than appearing later as an extra.'],
      ['What happens if you find rotten timber?', 'We stop, photograph it, and tell you what it will cost to put right before we carry on. Nobody likes that phone call, but it is a great deal better than finding out afterwards.'],
    ],
    gallery: ['g13', 'g14', 'v2-16', 'g1'],
  },

  {
    slug: 'fascias-soffits-and-guttering',
    name: 'Fascias, soffits and guttering',
    h1: 'Fascias, soffits and guttering in {{TOWN}}',
    title: 'Fascias, Soffits and Guttering in {{TOWN}} | {{BUSINESS}}',
    desc: 'UPVC fascias, soffits and guttering replaced across {{TOWN}}, Hednesford, Rugeley and {{COUNTY}}. Stops water tracking back into the brickwork. Call {{PHONE}}.',
    lede: 'Guttering is the cheapest part of a roof and the one that does the most damage when it is ignored.',
    inShort: 'We replace fascias, soffits and guttering in UPVC across {{TOWN}} and the surrounding towns. Failed guttering does not stay a guttering problem: water runs down the wall instead of away from it, soaks the brickwork, and eventually reaches the wall plate and the rafter feet, which turns a modest job into a structural one. Replaced properly it is maintenance free for decades.',
    signsTitle: 'Signs the roofline needs replacing',
    signs: [
      'A green or black stain running down the brickwork below a gutter joint',
      'Water sheeting over the front edge of the gutter in heavy rain',
      'Fascia boards that are soft, split, or have paint lifting away in sheets',
      'Sagging gutter runs, or brackets pulling away from the fascia',
      'Birds or wasps getting in behind the soffit',
      'Damp appearing on an internal wall directly below a gutter or a downpipe',
    ],
    processTitle: 'How the job runs',
    steps: [
      ['Check what is actually wrong', 'Sometimes it is a cracked joint and a bracket, not a full replacement. We will tell you which, because a repair that genuinely solves it is better business for both of us than a replacement you did not need.'],
      ['Look behind the boards', 'The timber behind the fascia is the thing that matters. If the rafter feet or the wall plate have taken water for years, that has to be sorted before anything new goes on.'],
      ['A written price', 'Colour, profile, gutter size and whether the old timber stays or goes, all agreed before we order.'],
      ['Strip and repair', 'Old boards and guttering come off, any rotten timber is cut out and replaced, and the roof edge is made sound.'],
      ['Fit and test', 'New fascias, soffits, guttering and downpipes fitted with the correct falls, then run with water to prove the falls work rather than assuming they do.'],
    ],
    faqs: [
      ['Can you do it without scaffolding?', 'On a bungalow, often. On a two storey house we would normally scaffold or use a tower, because the finish is better and it is safer. It is priced in from the start.'],
      ['Do I have to have white?', 'No. Black, anthracite grey, rosewood and oak effect are all readily available, and black or anthracite is what most people are choosing at the moment.'],
      ['Will you replace the timber behind?', 'If it needs it. Capping over rotten timber hides the problem for a couple of years and costs more to sort out later, so we do not do it.'],
      ['Can you clear the gutters instead?', 'Yes, if that is genuinely all it needs. Plenty of overflowing gutters are just full, and we would rather clear them and tell you the roofline has years left in it.'],
      ['How long does it take?', 'Most houses are a day or two once the scaffold is up. Kevin will give you a firm answer when he has seen it.'],
    ],
    gallery: ['v2-16', 'g12', 'g4'],
  },

  {
    slug: 'roof-cleaning',
    name: 'Roof cleaning',
    h1: 'Roof cleaning and moss removal in {{TOWN}}',
    title: 'Roof Cleaning and Moss Removal in {{TOWN}} | {{BUSINESS}}',
    desc: 'Moss removal, roof cleaning and gutter clearing across {{TOWN}}, Hednesford and {{COUNTY}}. Done without damaging the tiles. Call {{PHONE}}.',
    lede: 'Moss is not just untidy. It holds water against the tile and pushes it into the laps.',
    inShort: 'We clean roofs and clear moss across {{TOWN}} and the towns around it. Moss holds water against the surface of a tile, forces it into the laps, and in a hard frost that trapped water is what breaks the tile face. Cleared off, the roof dries properly and the gutters stop filling with the debris that washes down. We do it without the high pressure washing that strips the surface off a concrete tile.',
    signsTitle: 'When a roof is worth cleaning',
    signs: [
      'Thick moss on the north facing slope, or in the shade of trees',
      'Gutters filling with grit and moss every autumn',
      'Dark streaking or a green film across the tiles',
      'Moss visibly bridging the gap between courses',
      'You are selling, and the roof is ageing the whole house from the kerb',
      'You want the roof inspected anyway and a clean is a sensible time to do it',
    ],
    processTitle: 'How we clean a roof',
    steps: [
      ['Inspect first, clean second', 'Moss hides cracked and slipped tiles. We look at the roof before we touch it so that anything underneath the growth is found rather than washed loose.'],
      ['Scrape and brush, not blast', 'Moss comes off by hand and with soft brushes. High pressure washing takes the granular surface off a concrete tile and shortens its life considerably, which is why we do not use it as a matter of course.'],
      ['Clear the gutters and downpipes', 'There is no point cleaning a roof and leaving the debris to block the guttering, so the whole run gets cleared and flushed.'],
      ['Treat where it is worth treating', 'A biocide slows regrowth on a shaded roof. On a roof that gets good sun it is often not worth the money, and we will say so.'],
      ['Clear up and report', 'Debris bagged and taken away, the ground washed down, and photographs of anything we found up there that you should know about.'],
    ],
    faqs: [
      ['Does pressure washing damage tiles?', 'It can, badly. Concrete tiles have a granular surface that gives them their weather resistance, and a strong jet takes it off. That is why we scrape and brush as the default and keep pressure for the few situations that genuinely need it.'],
      ['How often does a roof need cleaning?', 'It depends far more on shade and trees than on age. A north facing roof under trees might want doing every few years; a sunny open roof may never really need it.'],
      ['Will the moss come back?', 'Some will, eventually. A treatment slows it. Anyone promising you it will never return is selling you something.'],
      ['Can you clean and repair in the same visit?', 'Usually, and it is the sensible way to do it. Cleaning tends to reveal the cracked tiles the moss was hiding, and the access is already there.'],
      ['Do you clean solar panels too?', 'Ask when you call. If we are on the roof anyway it is often straightforward, but it depends on the array and the access.'],
    ],
    gallery: ['g5', 'g2', 'g8'],
  },

  {
    slug: 'conservatory-warm-roofs',
    name: 'Conservatory warm roofs',
    h1: 'Conservatory warm roofs in {{TOWN}}',
    title: 'Conservatory Warm Roofs in {{TOWN}} | {{BUSINESS}}',
    desc: 'Replace a cold polycarbonate or glass conservatory roof with an insulated warm roof, across {{TOWN}}, Hednesford and {{COUNTY}}. Call {{PHONE}}.',
    lede: 'The room you stopped using in January and could not sit in during July.',
    inShort: 'We replace tired polycarbonate and glass conservatory roofs with insulated warm roofs across {{TOWN}} and the surrounding area. A warm roof is a properly insulated, tiled structure built onto the existing frame, which turns a conservatory from a room you can only use in spring and autumn into one you can use all year. It also stops the drumming in heavy rain, which is the thing most people mention first.',
    signsTitle: 'Signs a conservatory needs a warm roof',
    signs: [
      'Freezing in winter and unusable in high summer',
      'Rain on the polycarbonate is loud enough to stop a conversation',
      'The panels have gone cloudy, yellowed or green along the joints',
      'Condensation running down the inside of the glazing',
      'Leaks at the box gutter where the conservatory meets the house',
      'You are heating it constantly in winter and getting nowhere',
    ],
    processTitle: 'How a warm roof conversion goes',
    steps: [
      ['Check the frame can take it', 'A warm roof is heavier than polycarbonate. The existing frame and base have to be capable of carrying it, and that gets checked before anything is quoted, not after.'],
      ['Agree the specification', 'Internal finish, whether you want roof windows, how the ceiling meets the existing house wall, and what happens at the box gutter. Building regulations are dealt with as part of the job.'],
      ['Strip the old roof', 'Old glazing and glazing bars come off and the frame is prepared. The room is kept weathertight throughout.'],
      ['Build and insulate', 'A new insulated structure goes on, tiled to match the house as closely as the roof allows, with the box gutter and the abutment to the house detailed properly. That junction is where most conservatory leaks start.'],
      ['Finish inside', 'Plastered and finished internally so it reads as a room rather than a conservatory with a lid on it.'],
    ],
    faqs: [
      ['Do I need building regulations approval?', 'A warm roof conversion normally does, and it is part of the job rather than something we leave you to sort out.'],
      ['Will my existing frame take the weight?', 'Often yes, but it is checked first. If the frame or base is not up to it we will tell you before you have spent anything.'],
      ['Will the room be dark?', 'It is darker than glass, which is rather the point in July. Most people add one or two roof windows, and we will talk through where they work best.'],
      ['Can you match the tiles to the house?', 'Usually. Having our own supplies shop helps here more than anywhere, because matching an existing roof is exactly the job that stalls on availability.'],
      ['How long does it take?', 'Most conservatories are a matter of days rather than weeks, but it depends on size and finish. You get a realistic timescale in the written quote.'],
    ],
    /* batch 2 gave this page its own subject matter - it was borrowing generic
       roof photographs before because batch 1 had no conservatory work in it */
    gallery: ['v2-2', 'v2-13', 'v2-8', 'v2-17', 'v2-4', 'v2-14'],
  },
];
