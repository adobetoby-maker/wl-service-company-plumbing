export type CityData = {
  slug: string
  name: string
  county: string
  distance: string
  driveTime: string
  intro: string
  localNote: string
  nearbyCities: { name: string; slug: string }[]
}

export const cities: CityData[] = [
  {
    slug: "auto-repair-jerome-idaho",
    name: "Jerome",
    county: "Jerome County",
    distance: "17 miles",
    driveTime: "about 20 minutes",
    intro:
      "Jerome drivers have been making the short trip down Highway 93 to Junior's Auto Repair for years. We know what Magic Valley roads do to vehicles — the heat, the dust, the long stretches between stops — and we work on everything from farm trucks to family SUVs. If you need a straight answer about what's wrong with your car and a fair price to fix it, we're the shop.",
    localNote:
      "We're a quick 20-minute drive from downtown Jerome — straight down Highway 93 to Twin Falls.",
    nearbyCities: [
      { name: "Buhl", slug: "auto-repair-buhl-idaho" },
      { name: "Gooding", slug: "auto-repair-gooding-idaho" },
      { name: "Burley", slug: "auto-repair-burley-idaho" },
    ],
  },
  {
    slug: "auto-repair-buhl-idaho",
    name: "Buhl",
    county: "Twin Falls County",
    distance: "19 miles",
    driveTime: "about 25 minutes",
    intro:
      "Buhl is farm country, and farm country puts hard miles on a vehicle. At Junior's Auto Repair we work on the trucks, vans, and SUVs that Buhl families depend on every day. No fancy waiting room — just honest diagnostics, real parts, and repairs done right the first time. Pablo has been turning wrenches in the Magic Valley for over 13 years and treats every car like it's his own.",
    localNote:
      "Buhl is about 25 minutes east on US-30 to Twin Falls. We're worth the drive.",
    nearbyCities: [
      { name: "Jerome", slug: "auto-repair-jerome-idaho" },
      { name: "Gooding", slug: "auto-repair-gooding-idaho" },
      { name: "Burley", slug: "auto-repair-burley-idaho" },
    ],
  },
  {
    slug: "auto-repair-burley-idaho",
    name: "Burley",
    county: "Cassia County",
    distance: "65 miles",
    driveTime: "about 55 minutes",
    intro:
      "When Burley and Cassia County drivers need a mechanic they can actually trust — not just the closest option — they make the drive to Junior's Auto Repair in Twin Falls. We handle the jobs that smaller shops can't: transmission work, engine diagnostics, electrical problems, AC systems. Pablo gives every customer a clear explanation of what's wrong before any work starts, and he stands behind everything he fixes.",
    localNote:
      "About 55 minutes west on I-84. For major repairs, Burley customers tell us it's worth every mile.",
    nearbyCities: [
      { name: "Jerome", slug: "auto-repair-jerome-idaho" },
      { name: "Gooding", slug: "auto-repair-gooding-idaho" },
      { name: "Buhl", slug: "auto-repair-buhl-idaho" },
    ],
  },
  {
    slug: "auto-repair-gooding-idaho",
    name: "Gooding",
    county: "Gooding County",
    distance: "28 miles",
    driveTime: "about 30 minutes",
    intro:
      "Gooding area drivers know that finding an honest mechanic in a small town isn't always easy. Junior's Auto Repair in Twin Falls has been the trusted alternative for Gooding County families for over a decade. We do everything from routine oil changes to full engine repairs, and we never recommend work your vehicle doesn't need. When you call, you talk to the mechanic — not a service writer.",
    localNote:
      "About 30 minutes east on US-26 to Twin Falls. We schedule quickly so you're not waiting days for an appointment.",
    nearbyCities: [
      { name: "Jerome", slug: "auto-repair-jerome-idaho" },
      { name: "Buhl", slug: "auto-repair-buhl-idaho" },
      { name: "Burley", slug: "auto-repair-burley-idaho" },
    ],
  },
  {
    slug: "auto-repair-kimberly-idaho",
    name: "Kimberly",
    county: "Twin Falls County",
    distance: "7 miles",
    driveTime: "about 10 minutes",
    intro:
      "Kimberly is practically our backyard. Junior's Auto Repair is a 10-minute drive down the highway, and Kimberly drivers have been bringing us their cars for years — oil changes, brakes, AC, check engine lights, you name it. Small town means word travels fast, and in Kimberly people know us for giving straight answers and not padding bills. Whatever your car needs, we'll tell you exactly what it is and what it costs before we touch anything.",
    localNote:
      "We're about 10 minutes west on US-30 from downtown Kimberly. Same-day appointments available most weeks.",
    nearbyCities: [
      { name: "Hansen", slug: "auto-repair-hansen-idaho" },
      { name: "Filer", slug: "auto-repair-filer-idaho" },
      { name: "Jerome", slug: "auto-repair-jerome-idaho" },
    ],
  },
  {
    slug: "auto-repair-filer-idaho",
    name: "Filer",
    county: "Twin Falls County",
    distance: "9 miles",
    driveTime: "about 12 minutes",
    intro:
      "Filer is one of those Twin Falls County towns where everybody knows everybody — so when a mechanic does right by one customer, word spreads fast. Junior's Auto Repair has built a reputation with Filer families over 13-plus years: honest work, fair prices, no surprises on the bill. We're 12 minutes from Filer and we handle everything from quick oil changes to major engine and transmission repairs.",
    localNote:
      "Just 12 minutes east into Twin Falls on US-30. We're at 417 Main Ave E — easy to find, easy to park.",
    nearbyCities: [
      { name: "Kimberly", slug: "auto-repair-kimberly-idaho" },
      { name: "Buhl", slug: "auto-repair-buhl-idaho" },
      { name: "Hansen", slug: "auto-repair-hansen-idaho" },
    ],
  },
  {
    slug: "auto-repair-hansen-idaho",
    name: "Hansen",
    county: "Twin Falls County",
    distance: "12 miles",
    driveTime: "about 15 minutes",
    intro:
      "Hansen sits right on the Snake River Plain, and the roads around here put real wear on vehicles. Junior's Auto Repair is the shop Hansen drivers turn to when they want a mechanic who will look them in the eye and tell them the truth about their car. We're 15 minutes from Hansen and we've been fixing vehicles in Twin Falls County for over 13 years. No games, no upsells — just solid work.",
    localNote:
      "Head west on Hansen Ave to Twin Falls — about 15 minutes door to door. Call ahead and we'll get you in fast.",
    nearbyCities: [
      { name: "Kimberly", slug: "auto-repair-kimberly-idaho" },
      { name: "Jerome", slug: "auto-repair-jerome-idaho" },
      { name: "Filer", slug: "auto-repair-filer-idaho" },
    ],
  },
  {
    slug: "auto-repair-wendell-idaho",
    name: "Wendell",
    county: "Gooding County",
    distance: "27 miles",
    driveTime: "about 28 minutes",
    intro:
      "Wendell is farm and ranch country, and that means the vehicles we see from there have done serious work. Junior's Auto Repair handles the heavy stuff — transmissions, engines, electrical — along with the everyday maintenance that keeps a working truck on the road. We're a straightforward 28-minute drive on I-84, and we think you'll find it worth the trip when you see what honest shop work looks like.",
    localNote:
      "East on I-84 to Twin Falls, about 28 minutes. We're downtown at 417 Main Ave E — call us at (208) 595-2101.",
    nearbyCities: [
      { name: "Gooding", slug: "auto-repair-gooding-idaho" },
      { name: "Jerome", slug: "auto-repair-jerome-idaho" },
      { name: "Hagerman", slug: "auto-repair-hagerman-idaho" },
    ],
  },
  {
    slug: "auto-repair-shoshone-idaho",
    name: "Shoshone",
    county: "Lincoln County",
    distance: "35 miles",
    driveTime: "about 38 minutes",
    intro:
      "Shoshone is the county seat of Lincoln County, but when it comes to auto repair, the options close to home are limited. Junior's Auto Repair in Twin Falls is about 38 minutes away and gives Shoshone drivers access to a full-service shop with the diagnostic equipment and experience to handle anything from a routine service to a complex engine problem. Pablo has been at it for 13+ years and treats every customer's car like his own.",
    localNote:
      "Head southeast on US-26 to Twin Falls — a straightforward 38-minute drive. We'll have your car looked at the same day.",
    nearbyCities: [
      { name: "Gooding", slug: "auto-repair-gooding-idaho" },
      { name: "Wendell", slug: "auto-repair-wendell-idaho" },
      { name: "Jerome", slug: "auto-repair-jerome-idaho" },
    ],
  },
  {
    slug: "auto-repair-rupert-idaho",
    name: "Rupert",
    county: "Minidoka County",
    distance: "48 miles",
    driveTime: "about 45 minutes",
    intro:
      "Rupert and Minidoka County drivers looking for a shop they can actually trust make the drive to Junior's Auto Repair in Twin Falls. When local options haven't delivered honest answers or quality work, we hear about it. We don't oversell. We explain what we found, quote a fair price, and do the job right. For major repairs — transmissions, engines, AC systems — it's worth the 45-minute drive to know it's done correctly.",
    localNote:
      "West on I-84 to Twin Falls, about 45 minutes. For big jobs, Rupert customers tell us they're glad they made the trip.",
    nearbyCities: [
      { name: "Burley", slug: "auto-repair-burley-idaho" },
      { name: "Jerome", slug: "auto-repair-jerome-idaho" },
      { name: "Gooding", slug: "auto-repair-gooding-idaho" },
    ],
  },
  {
    slug: "auto-repair-hagerman-idaho",
    name: "Hagerman",
    county: "Gooding County",
    distance: "34 miles",
    driveTime: "about 38 minutes",
    intro:
      "Hagerman sits in one of the most scenic spots in Idaho, but scenic doesn't help when your car needs work and the nearest shop doesn't inspire confidence. Junior's Auto Repair in Twin Falls is about 38 minutes from Hagerman — a manageable drive for a shop that gives you an honest diagnosis, a fair quote, and work you can count on. We've been serving the Magic Valley for over 13 years and we take care of Hagerman families the same way we take care of our Twin Falls regulars.",
    localNote:
      "Head northeast on US-30 toward Twin Falls — about 38 minutes. Call (208) 595-2101 to get on the schedule.",
    nearbyCities: [
      { name: "Wendell", slug: "auto-repair-wendell-idaho" },
      { name: "Gooding", slug: "auto-repair-gooding-idaho" },
      { name: "Buhl", slug: "auto-repair-buhl-idaho" },
    ],
  },
]

export function getCity(slug: string): CityData | undefined {
  return cities.find(c => c.slug === slug)
}
