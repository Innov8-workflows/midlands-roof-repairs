/* Area pages. Source: submission #17 gave `primaryAreas: ["20 mile radius"]` and
 * an address of Unit 12 Oaklands Industrial Estate, Hednesford WS12 2UZ.
 *
 * `nearby{}` came back EMPTY, so every village list and every local paragraph
 * below is Claude research, not the client's words. Kevin should read these -
 * he will know which towns he actually works in and which villages matter.
 *
 * Distances are approximate road miles from the Hednesford yard. Everything here
 * is inside the 20 mile radius he gave.
 *
 * DELIBERATELY EXCLUDED, though technically inside 20 miles:
 *   Birmingham   ~18mi. A Cannock roofer bidding for Birmingham reads as a
 *                stretch, and it is the page that would look like spam.
 *   Burton, Stoke, Telford, Dudley - either over the radius or on the far side
 *                of a city, which amounts to the same thing.
 *
 * NEVER write one paragraph and swap the town name. Each `local` below is about
 * that specific place: its housing stock, roughly when it was built, and the
 * roofing work that follows from it.
 */
'use strict';

module.exports = [
  {
    slug: 'roofers-in-hednesford', name: 'Hednesford', miles: 0, base: true,
    nearby: ['Chadsmoor', 'Hazelslade', 'Rawnsley', 'Wimblebury', 'Pye Green'],
    inShort: 'Hednesford is where we are based. Our yard is on Oaklands Industrial Estate off Lower Road, so this is the patch we reach fastest, and where we do most of our emergency call outs.',
    local: 'Hednesford grew on coal, and the housing still shows it. The older streets are Victorian and Edwardian terraces put up for the collieries, most of them carrying natural slate or plain clay tile, and they are now at the age where nail fatigue and perished felt tend to arrive together. Spreading out towards Rawnsley, Hazelslade and Pye Green are the interwar and post-war estates, almost all concrete interlocking tile and much of it still original. Exposure matters more here than a few miles south: the town sits on the northern edge of Cannock Chase, the Chase side catches the weather, and moss on north facing slopes is noticeably heavier. Our yard is minutes away on Lower Road.',
    faqs: [
      ['Are you actually based in Hednesford?', 'Yes. Our yard and our roofing supplies shop are on Oaklands Industrial Estate off Lower Road. It is not a mailing address on a website, it is where the vans and the materials are.'],
      ['Why is there so much moss on my roof here?', 'The Chase side of Hednesford is shaded and damp, and north facing slopes hold moisture far longer than they do out towards Norton Canes. It is the single most common thing we get called about in this town.'],
    ],
  },
  {
    slug: 'roofers-in-cannock', name: 'Cannock', miles: 2,
    nearby: ['Bridgtown', 'Chadsmoor', 'Huntington', 'Wedges Mills', 'Hatherton'],
    inShort: 'We cover Cannock from our yard two miles away in Hednesford. Repairs, full re-roofs, roofline and roof cleaning, on everything from the terraces near the town centre to the post-war estates out towards Huntington.',
    local: 'Cannock is the district town, and its roofs come in three distinct generations. Around the centre and Bridgtown there is Victorian and Edwardian terracing, largely slate. Then come the very large interwar and post-war estates that make up most of the town, almost entirely concrete interlocking tile, a great deal of it now fifty or sixty years old and at the point where the granular surface has weathered away and moss gets a grip. Newer development around Huntington and the fringes makes up the third. The town sits hard against Cannock Chase, and that tree cover drives a lot of what we do here: moss, blocked guttering and debris, far more than in the open country west of the A34.',
    faqs: [
      ['How quickly can you get to Cannock?', 'Cannock is about two miles from the yard, so it is one of the quickest places on our patch to reach. That matters most when something has come off in a storm.'],
      ['My estate roof has never been touched since it was built. Is that a problem?', 'Not automatically, but a concrete tile roof from the 1960s or 70s is at the age where the felt underneath has usually perished even when the tiles look sound. It is worth a look before it announces itself through a bedroom ceiling.'],
    ],
  },
  {
    slug: 'roofers-in-heath-hayes', name: 'Heath Hayes', miles: 2,
    nearby: ['Wimblebury', 'Five Ways', 'Norton Canes', 'Hednesford'],
    inShort: 'Heath Hayes is two miles from our yard. A lot of what we do here is roofline and re-roofing on the post-war estates, plus bungalow work where the access is straightforward.',
    local: 'Heath Hayes is another of the villages that grew on mining and then spread into a suburb of Cannock. Almost nothing here predates the twentieth century: it is interwar semis, post-war estates and a notably high proportion of bungalows, running out towards Wimblebury and Five Ways. That means concrete interlocking tile more or less throughout, much of it original and now due. The bungalows change the economics of a job in a useful way, because a single storey roofline can often be reached with a tower rather than a full scaffold, which keeps fascia, soffit and guttering work considerably cheaper here than on the two storey stock a mile up the road in Hednesford.',
    faqs: [
      ['Do I need scaffolding on a bungalow?', 'Often not. A lot of Heath Hayes roofline work can be done safely off a tower, which takes a real chunk out of the price. We will tell you which when we look.'],
      ['Can you match the tiles on my estate?', 'Usually. We run our own roofing supplies shop, and the concrete tile profiles used across these estates are ones we deal with constantly.'],
    ],
  },
  {
    slug: 'roofers-in-norton-canes', name: 'Norton Canes', miles: 4,
    nearby: ['Brownhills West', 'Chasewater', 'Wyrley Common', 'Heath Hayes'],
    inShort: 'We cover Norton Canes, four miles south of the yard. The newer estates here tend to need storm repairs, dry verge work and guttering rather than full re-roofs.',
    local: 'Norton Canes sits between the M6 Toll and Chasewater, and it is a village that has grown a great deal in the last fifty years. There is an older core of cottages and terraces, but most of the housing is estate development from the 1970s onward, with new building still going on. That younger stock changes the work: full re-roofs are comparatively rare, and what comes up instead is storm damage, dry verge and dry ridge systems failing at the fixings, and guttering. The Chasewater side is open and exposed, and after a windy night this is one of the parts of the patch we hear from first, usually about tiles lifted along a verge or a ridge.',
    faqs: [
      ['My house is only 20 years old. Why is the verge failing?', 'Dry verge and dry ridge systems are held on by fixings and clips, and those are usually what let go first rather than the tile. It is a common and fairly quick repair on the newer Norton Canes estates.'],
      ['Do you come out after storms?', 'Yes, and we run a 24 hour phone line. The exposed side towards Chasewater is normally where we get called first.'],
    ],
  },
  {
    slug: 'roofers-in-rugeley', name: 'Rugeley', miles: 5,
    nearby: ['Brereton', 'Armitage', 'Handsacre', 'Slitting Mill', 'Etchinghill'],
    inShort: 'We cover Rugeley and the villages along the Trent, five miles from the yard. Slate repair on the older terraces, re-roofing on the post-war estates, and a lot of moss work in the valley.',
    local: 'Rugeley was a colliery and power station town, and the demolition of the B and C stations has left a large redevelopment site that is steadily filling with new housing. The existing stock splits fairly neatly: Victorian terracing in and around the centre, mostly slate and now at nail fatigue age, and substantial post-war estates in concrete tile. Brereton and Armitage run on from the town and behave much the same. What marks Rugeley out is its position down in the Trent valley, which keeps roofs damper for longer than the higher ground at Hednesford, so moss growth and the gutter blockages that follow it are a steadier part of the work here than anywhere else on the patch.',
    faqs: [
      ['My slates keep slipping and there has been no storm. Why?', 'That is usually nail fatigue. The slates are sound but the nails holding them have corroded through, so they let go one at a time. On a Rugeley terrace of that age it is very common, and it is the point at which patching stops being economic.'],
      ['Do you cover Brereton and Armitage?', 'Yes, both, along with Handsacre and Slitting Mill. They are all within a few minutes of Rugeley itself.'],
    ],
  },
  {
    slug: 'roofers-in-great-wyrley', name: 'Great Wyrley', miles: 5,
    nearby: ['Landywood', 'Cheslyn Hay', 'Essington', 'Churchbridge'],
    inShort: 'Great Wyrley is five miles south of the yard on the A34 corridor. Mostly concrete tile re-roofs and roofline work on twentieth century semis and bungalows.',
    local: 'Great Wyrley runs along the A34 between Cannock and Walsall, and it joins onto Landywood so completely that most people treat them as one place. The housing is overwhelmingly twentieth century, semis and bungalows, with comparatively little older stock. That gives a lot of simple gable roofs in concrete interlocking tile, most of it original, much of it now at the age where the felt beneath has gone even though the tiles still look serviceable. Straightforward shapes make for straightforward re-roofs here, and the prices tend to reflect that: there are far fewer hips, valleys and stacks to detail than on the bigger housing over at Aldridge or Sutton Coldfield.',
    faqs: [
      ['Is a simple roof cheaper to replace?', 'Genuinely, yes. Most Great Wyrley roofs are plain gables with few cut details, and that means less labour than a hipped roof with valleys and multiple stacks of the same floor area.'],
      ['Do you cover Landywood as well?', 'Yes. Landywood and Great Wyrley run together and we treat them as one area.'],
    ],
  },
  {
    slug: 'roofers-in-cheslyn-hay', name: 'Cheslyn Hay', miles: 6,
    nearby: ['Great Wyrley', 'Landywood', 'Saredon', 'Wedges Mills'],
    inShort: 'Cheslyn Hay is six miles from the yard, adjoining Great Wyrley. Re-roofing, repairs and guttering on the post-war housing, plus older cottage work around the village core.',
    local: 'Cheslyn Hay adjoins Great Wyrley closely enough that the boundary means little on the ground, but it holds onto more of an old village centre than its neighbour does. Around that core there are older cottages and some Victorian building, generally slate or plain clay tile, while the bulk of the village is post-war semis and bungalows in concrete tile of much the same generation as Great Wyrley. The failures follow the stock: perished felt under tiles that still look sound, nail fatigue on the older slate roofs, and ridge mortar that has broken down and started letting go a bedding joint at a time after decades of frost.',
    faqs: [
      ['My ridge tiles have started lifting. Is that urgent?', 'It is worth dealing with promptly. Once the mortar bedding has broken down the ridge relies on very little, and a ridge tile coming off in a gale is both a repair and a hazard.'],
      ['Can you repoint a ridge rather than replace it?', 'Sometimes, but rebedding is usually the honest answer on a roof of this age. Pointing over failed bedding looks tidy for a winter and then does the same thing again.'],
    ],
  },
  {
    slug: 'roofers-in-penkridge', name: 'Penkridge', miles: 7,
    nearby: ['Acton Trussell', 'Dunston', 'Bednall', 'Coppenhall', 'Levedale'],
    inShort: 'We cover Penkridge, seven miles west of the yard. Two very different jobs here: sensitive repair on the listed and conservation area stock, and straightforward re-roofing on the modern estates.',
    local: 'Penkridge is really two roofing villages in one. The old core along the Penk is a conservation area with a good number of listed buildings, where natural slate, handmade clay tile and properly dressed lead are what is already there and what has to go back. Work in that part of the village is about matching materials and detailing rather than speed, and it is worth checking consent before anything is changed. Ring that core is extensive estate development from the 1970s onward, plus newer building again, which is ordinary concrete tile and behaves like any other modern estate. Knowing which of the two you are standing in front of changes the quote entirely.',
    faqs: [
      ['My house is listed. Can you still work on it?', 'Yes, but the materials and the detailing have to match what is there, and listed building consent may be needed before anything changes. We will tell you honestly if a job needs that conversation with the council first.'],
      ['Can you get hold of matching handmade clay tiles?', 'Often. Running our own supplies shop helps most on exactly this kind of job, where the hold up is usually availability rather than labour.'],
    ],
  },
  {
    slug: 'roofers-in-burntwood', name: 'Burntwood', miles: 7,
    nearby: ['Chasetown', 'Chase Terrace', 'Boney Hay', 'Highfields'],
    inShort: 'Burntwood is seven miles south east of the yard. Almost all of our work here is re-roofing and roofline on the post-war estates that make up the town.',
    local: 'Burntwood is one of the largest villages in the country, made up of Chasetown, Chase Terrace, Boney Hay and Highfields grown together into a single sprawl. It is overwhelmingly a post-war place: big estates, semis and bungalows, with very little older housing to speak of. That makes it unusually uniform from a roofing point of view, concrete interlocking tile more or less everywhere, largely original, and much of it now arriving at replacement age at roughly the same time. We see the same handful of tile profiles here again and again, which does at least mean matching one is rarely the problem it can be elsewhere.',
    faqs: [
      ['Everyone on my street seems to be having their roof done. Why now?', 'Because the estates went up together, so the roofs are the same age and reach the end of their life together. It is very noticeable across Burntwood at the moment.'],
      ['Do you cover Chasetown and Chase Terrace?', 'Yes, along with Boney Hay and Highfields. We treat the whole of Burntwood as one area.'],
    ],
  },
  {
    slug: 'roofers-in-lichfield', name: 'Lichfield', miles: 9,
    nearby: ['Streethay', 'Boley Park', 'Whittington', 'Shenstone', 'Armitage'],
    inShort: 'We cover Lichfield, nine miles from the yard. Careful repair and matching on the conservation area and listed stock in the centre, and straightforward re-roofing on the modern estates around it.',
    local: 'Lichfield divides sharply. The cathedral city centre carries Georgian and Victorian building across several conservation areas, with a large number of listed properties, and the roofs there are natural slate, handmade clay tile and a great deal of lead. Work in that part of the city is about matching what is there and detailing it properly, and consent is often part of the conversation. Out at Boley Park, Streethay and the newer fringes the picture is completely different: modern estate housing, concrete tile, conventional shapes and conventional re-roofs. Quoting Lichfield without knowing which of those two a house sits in is how firms end up either badly underpriced or laughed at.',
    faqs: [
      ['Do you work on period and listed properties?', 'Yes. It needs matching materials, proper leadwork and, on listed buildings, the right consent before anything changes. We will say plainly if a job needs that step first.'],
      ['Is a slate roof more expensive than tile?', 'Natural slate costs more as a material and takes longer to lay well. On a period Lichfield property it is usually the right answer anyway, both for how it looks and for what the conservation area expects.'],
    ],
  },
  {
    slug: 'roofers-in-brownhills', name: 'Brownhills', miles: 8,
    nearby: ['Walsall Wood', 'Clayhanger', 'Shire Oak', 'Chasewater'],
    inShort: 'Brownhills is eight miles south of the yard. Storm repairs, re-roofing and guttering on the interwar and post-war housing, with a lot of wind damage work near Chasewater.',
    local: 'Brownhills sits on the A5 where the old canal and mining town meets the edge of Walsall borough, running on into Walsall Wood, Clayhanger and Shire Oak. The housing is mainly interwar and post-war, concrete tile predominating, with some older terracing left from the pit days. What shapes the work here more than the age of the stock is exposure: Chasewater and the open ground around it leave a lot of these roofs with very little shelter, and after a bad night this is reliably one of the first parts of the patch to ring. Lifted verges, ridge tiles off and slipped tiles along an exposed gable are the standard call.',
    faqs: [
      ['Why does my roof lose tiles every winter?', 'Exposure. The open ground around Chasewater gives these roofs very little shelter, and if the verges and ridge are already weak the wind will keep finding them until they are properly refixed.'],
      ['Do you cover Walsall Wood and Clayhanger?', 'Yes, both, along with Shire Oak. They are all a few minutes from Brownhills.'],
    ],
  },
  {
    slug: 'roofers-in-pelsall', name: 'Pelsall', miles: 8,
    nearby: ['Rushall', 'Shelfield', 'High Heath', 'Walsall Wood'],
    inShort: 'We cover Pelsall, eight miles from the yard. Re-roofing, repairs and roofline on the mix of interwar semis, post-war estates and newer infill around the Common.',
    local: 'Pelsall is built around its Common, and that open ground shapes the place. The housing is a mix: interwar semis, post-war estate building, and a fair amount of more recent infill squeezed between them, so unlike Burntwood there is no single generation of roof here. Concrete tile predominates, with some older slate on the earlier stock. The streets that face the Common get an open aspect and the wind that comes with it, and those tend to be the ones where verges and ridges give trouble first, while the more sheltered streets behind them are more likely to be calling about moss and blocked guttering than about storm damage.',
    faqs: [
      ['Two houses on my street had re-roofs and mine seems fine. Why?', 'Pelsall is mixed rather than uniform, so neighbouring houses can easily be twenty or thirty years apart in roof age. It is worth having a look rather than assuming either way.'],
      ['Do you cover Rushall and Shelfield?', 'Yes, both, and High Heath. They are all within a couple of miles of Pelsall.'],
    ],
  },
  {
    slug: 'roofers-in-aldridge', name: 'Aldridge', miles: 10,
    nearby: ['Streetly', 'Little Aston', 'Walsall Wood', 'Shenstone'],
    inShort: 'Aldridge is ten miles from the yard. Larger roofs here, with more hips, valleys and stacks to detail, and customers who tend to plan a re-roof rather than react to a leak.',
    local: 'Aldridge is one of the more affluent parts of Walsall borough, and the housing reflects it: large interwar and post-war detached and semi-detached properties with generous roof areas, running on into Streetly and Little Aston. These are not the plain gables of Great Wyrley. There are hips, valleys, dormers and multiple chimney stacks to detail, and that is where both the cost and the quality of a job actually live, because a valley or an abutment done badly will leak long before a plain slope does. People here also tend to approach a roof differently, planning a replacement and asking for a specification rather than ringing because a ceiling has stained.',
    faqs: [
      ['Why is my roof more expensive than my friend\'s in Cannock?', 'Usually because it is a bigger and more complicated roof. Hips, valleys, dormers and stacks all take skilled time to cut in and detail, and a large Aldridge roof can have several of each where an estate semi has none.'],
      ['Can I get a full written specification rather than a price?', 'Yes, and on this kind of roof we would encourage it. Which tile, which membrane, what happens at every valley and abutment, all in writing so you can compare quotes like for like.'],
    ],
  },
  {
    slug: 'roofers-in-bloxwich', name: 'Bloxwich', miles: 9,
    nearby: ['Blakenall Heath', 'Little Bloxwich', 'Leamore', 'Short Heath'],
    inShort: 'We cover Bloxwich, nine miles from the yard. Slate repair on the older terraces around the High Street and re-roofing across the post-war estates.',
    local: 'Bloxwich splits between the older centre and the estates. Around the High Street there is Victorian terracing, mostly natural slate, now well into the age where nail fatigue starts dropping slates one at a time with no storm to blame. Out at Blakenall Heath and Leamore the picture changes completely to very large post-war council built estates in concrete tile, much of it original. Terraced runs matter here in a practical way: roofs are continuous across several houses, party walls and shared valleys are involved, and matching the tile or slate your neighbour already has is not cosmetic fussiness but the difference between a repair that disappears and one you can see from the street.',
    faqs: [
      ['My neighbour and I share a roof. Who is responsible?', 'Generally each of you owns your own section, but on a terrace the work often makes far more sense done together, and access usually needs a conversation either way. We are happy to quote both sides so it is clear.'],
      ['Can you match a Victorian slate?', 'Usually. Reclaimed and new slate in the right sizes is something we keep an eye on through our own supplies shop, which is normally the bottleneck on this kind of repair.'],
    ],
  },
  {
    slug: 'roofers-in-walsall', name: 'Walsall', miles: 10,
    nearby: ['Palfrey', 'Caldmore', 'Bescot', 'Rushall', 'Darlaston'],
    inShort: 'Walsall is ten miles from the yard. Every kind of roof in one town, from dense Victorian terraces to post-war estates, so the honest answer usually needs a look first.',
    local: 'Walsall carries just about every generation of housing the region has produced. There are dense Victorian terraces at Palfrey and Caldmore in slate, interwar semis in the middle ring, post-war estates and blocks further out in concrete tile, and modern infill scattered through all of it. That variety is genuinely why we will not price a Walsall roof over the phone: two houses a street apart can be sixty years and an entirely different construction apart. The terracing also brings practical constraints that the estates do not, with shared gutters, party wall junctions and access that often has to be arranged through a neighbour before anything can start.',
    faqs: [
      ['Why will you not quote over the phone?', 'Because Walsall housing varies so much street to street that a phone figure would be a guess. We would rather come and look and give you a fixed written price we can stand behind.'],
      ['Do you need access through my neighbour\'s garden?', 'On some terraces, yes. We will tell you at the survey rather than turning up on the day and discovering it, and we are used to asking politely.'],
    ],
  },
  {
    slug: 'roofers-in-willenhall', name: 'Willenhall', miles: 11,
    nearby: ['New Invention', 'Short Heath', 'Bentley', 'Portobello'],
    inShort: 'We cover Willenhall, eleven miles from the yard. Slate work on the older terraces and workshops in the centre, and concrete tile re-roofing on the estates around it.',
    local: 'Willenhall was the lock making town, and the tight older core still shows that history in its terraces and former workshop buildings, most of them slate and many of them at the point where the nails rather than the slates have failed. Around that centre sit the post-war estates at New Invention and Short Heath, ordinary concrete tile of the usual generation. The older industrial buildings throw up work you do not get on an estate: long unbroken slopes, valley gutters between ranges, and parapet and abutment detailing where a roof meets a wall rather than simply ending at a verge. Those junctions are where the leaks almost always start.',
    faqs: [
      ['Do you work on old workshop and industrial roofs?', 'Yes. Valley gutters, parapets and abutments are the usual trouble spots on those buildings, and they need proper leadwork rather than a mastic repair.'],
      ['My roof meets a neighbouring wall. Why does it leak there?', 'Abutments are the most common leak point on this kind of property. If the flashing was never dressed and fixed properly, or has been patched with mastic, water will keep tracking behind it.'],
    ],
  },
  {
    slug: 'roofers-in-wednesfield', name: 'Wednesfield', miles: 11,
    nearby: ['Ashmore Park', 'Wood End', 'Heath Town', 'New Cross'],
    inShort: 'Wednesfield is eleven miles from the yard. Mostly re-roofing and roofline work on the post-war estates, with some older property around the village centre.',
    local: 'Wednesfield keeps a recognisable old village centre, but the great bulk of it is post-war estate housing, with Ashmore Park and Wood End making up much of the total. That means concrete interlocking tile almost throughout, largely original, and now well into the age where the felt underneath has perished even where the tiles are sound. The older core has some slate and clay tile that needs a different approach. Because so much of the housing went up in a short period, the roofs are ageing together, and it is not unusual to be quoting three or four houses within a few streets of each other in the same month.',
    faqs: [
      ['How do I know if the felt under my tiles has gone?', 'From inside the loft. Perished felt sags between the rafters and tears along the laps, and you can often see daylight through it. It is worth a look with a torch before it starts showing up on a ceiling.'],
      ['Do you cover Ashmore Park and Wood End?', 'Yes, both, and the rest of Wednesfield along with them.'],
    ],
  },
  {
    slug: 'roofers-in-wolverhampton', name: 'Wolverhampton', miles: 13,
    nearby: ['Tettenhall', 'Penn', 'Bushbury', 'Whitmore Reans', 'Wednesfield'],
    inShort: 'We cover Wolverhampton, thirteen miles from the yard. The range here is enormous, from large Victorian villas at Tettenhall and Penn to post-war estates at Bushbury.',
    local: 'Wolverhampton has more variety than anywhere else on our patch. Tettenhall and Penn hold substantial Victorian and Edwardian villas with large, complicated roofs, deep valleys, dormers and several stacks apiece, most of them originally slate. Closer in, Whitmore Reans and the surrounding streets are dense terracing. Further out, Bushbury and the other post-war estates are ordinary concrete tile in conventional shapes. Those are three quite different trades on one town, and the first thing worth establishing on any Wolverhampton enquiry is which of them we are talking about, because the survey, the materials and the price bear almost no relation to each other across the three.',
    faqs: [
      ['Is Wolverhampton too far for you?', 'No. It is about thirteen miles from the yard, comfortably inside the twenty mile radius we work to, and we are over there regularly.'],
      ['My Victorian roof has several chimney stacks. Does that add much?', 'It does. Every stack needs its flashing dressed and fixed properly, and stacks are the most common leak point on a roof of that age. It is worth doing them at the same time as the covering rather than going back later.'],
    ],
  },
  {
    slug: 'roofers-in-stafford', name: 'Stafford', miles: 11,
    nearby: ['Weeping Cross', 'Baswich', 'Castlefields', 'Doxey', 'Rising Brook'],
    inShort: 'Stafford is eleven miles north west of the yard. Conservation area and period work in the centre, and very straightforward re-roofing across the large modern estates.',
    local: 'Stafford is the county town, and the centre carries Georgian and Victorian building with conservation areas where slate and lead are what belong on the roof and what should go back on it. The interwar suburbs ring that, and beyond them sit the very extensive modern estates at Weeping Cross, Baswich, Doxey and Rising Brook, which between them account for a large share of the town\'s housing. Those newer estates are conventional concrete tile on conventional shapes, and the work there is predictable. It is a similar split to Lichfield, and it means Stafford quotes vary far more by which part of town you are in than by the size of the house.',
    faqs: [
      ['Do you charge extra to come out to Stafford?', 'No. It is inside our normal working radius and we are there regularly, so it is priced the same as anywhere else on the patch.'],
      ['Is my house in a conservation area?', 'Stafford has several around the centre. The council can confirm it, and it matters because it can affect what materials are acceptable. We will flag it if we think it applies.'],
    ],
  },
  {
    slug: 'roofers-in-tamworth', name: 'Tamworth', miles: 15,
    nearby: ['Amington', 'Glascote', 'Wilnecote', 'Belgrave', 'Dosthill', 'Kettlebrook'],
    inShort: 'We cover Tamworth, fifteen miles east of the yard. The overspill estates here were built together and their roofs are reaching the end of their lives together.',
    local: 'Tamworth has a medieval core around the castle, but the town as most people experience it is the 1960s and 70s overspill development built to take families out of Birmingham. Glascote, Amington, Wilnecote and Belgrave went up quickly and in volume, and they are almost entirely concrete interlocking tile of a single generation. That is the defining fact about roofing in Tamworth: those roofs were all laid within a few years of each other, they are all now somewhere between fifty and sixty years old, and they are consequently arriving at the end of their service life more or less simultaneously. Whole streets are due at once.',
    faqs: [
      ['Is fifteen miles too far for a call out?', 'No, it is within the radius we work to. For an emergency we will be straight with you about how long we will be rather than saying twenty minutes and taking an hour.'],
      ['Half my street has scaffolding up. Is that a coincidence?', 'Not really. The overspill estates were built together, so the roofs are the same age and fail together. It is the single most common thing we get asked about in Tamworth.'],
    ],
  },
  {
    slug: 'roofers-in-sutton-coldfield', name: 'Sutton Coldfield', miles: 15,
    nearby: ['Four Oaks', 'Wylde Green', 'Boldmere', 'Mere Green', 'Streetly', 'Walmley'],
    inShort: 'Sutton Coldfield is fifteen miles from the yard. Large period roofs with real slate and complex detailing, plus steady moss and gutter work from the tree cover.',
    local: 'Sutton Coldfield holds some of the largest and most involved roofs we work on. Four Oaks and Wylde Green carry substantial Victorian and Edwardian villas, generally in natural slate, with deep valleys, dormers and several chimney stacks each. Boldmere is mainly interwar semis, and Mere Green has newer development alongside. Sutton Park sits in the middle of all of it, and that tree cover matters more than people expect: shaded slopes stay damp, moss establishes readily, and gutters fill with leaf litter every autumn, so cleaning and clearing is a far steadier part of the work here than it is out on the open estates west of Cannock.',
    faqs: [
      ['Do you work on large period properties?', 'Yes. Slate, complex valleys, dormers and multiple stacks are the norm on the older Sutton Coldfield housing, and they need detailing properly rather than quickly.'],
      ['Why do my gutters block every year?', 'The tree cover around Sutton Park. Leaf litter fills gutters faster here than almost anywhere else on our patch, and a clear out each autumn is usually cheaper than the damp it causes if you leave it.'],
    ],
  },
];
