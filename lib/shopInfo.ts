export const shopInfo = {
  name: "Junior's Auto Repair",
  owner: "Pablo Zaldivar",
  tagline: "Honest work, fair prices, done right the first time.",
  description:
    "Serving downtown Twin Falls and the Magic Valley for over 13 years. We treat every vehicle like it's our own.",
  phone: "(208) 595-2101",
  address: "417 Main Ave E",
  city: "Twin Falls",
  state: "ID",
  zip: "83301",
  get fullAddress() {
    return `${this.address}, ${this.city}, ${this.state} ${this.zip}`;
  },
  hours: {
    weekdays: "Mon–Sat: 9:00 AM – 5:00 PM",
    sunday: "Closed",
    summary: "Mon–Sat · 9 AM – 5 PM",
  },
  rating: "4.8",
  reviewCount: "146",
  yearsInBusiness: "13",
  services: [
    "Oil Changes",
    "Brake Service & Repair",
    "Engine Diagnostics & Repair",
    "Transmission Service",
    "AC & Heating Systems",
    "Tire Service",
    "Electrical Diagnostics",
    "Preventive Maintenance",
  ],
  about:
    "Junior's Auto Repair has been a cornerstone of the Twin Falls community for over 13 years. Pablo Zaldivar and his family are dedicated to providing honest, reliable auto repair at fair prices — no surprise fees, no unnecessary work.",
  googleMapsUrl:
    "https://maps.google.com/?q=417+Main+Ave+E+Twin+Falls+ID+83301",
  serviceArea:
    "Twin Falls, Jerome, Kimberly, Filer, Buhl, Hansen, Wendell, Gooding, Shoshone, Burley, Rupert, Hagerman — all of Magic Valley",
};

export type ShopInfo = typeof shopInfo;
