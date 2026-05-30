// WL Service Company — Brand Config
// Replaces all JRS-specific values with client brand
// Edit this file to configure for a new client

export interface ServiceBrand {
  // Company identity
  name: string          // e.g. "Mountain Ridge Plumbing"
  shortName: string     // e.g. "Mountain Ridge"
  tagline: string       // e.g. "Fast. Local. Trusted."
  phone: string         // e.g. "(208) 555-0123"
  email: string
  address: string
  city: string
  state: string
  zip: string
  serviceArea: string[] // cities served

  // Visual
  primaryColor: string  // e.g. "#1e40af"
  logoPath: string      // e.g. "/logo.svg"

  // Service type
  serviceType: 'plumbing' | 'electrical' | 'hvac' | 'general-contractor' | 'auto-repair' | 'custom'
  services: string[]    // list of offered services

  // Social
  googleMapsUrl: string
  facebookUrl: string

  // SEO
  metaTitle: string
  metaDescription: string

  // Features
  enableMembershipPortal: boolean
  enableCrewTracker: boolean
  enableBlog: boolean
}

// [DEMO] — Replace all values with real client data before launch
const brand: ServiceBrand = {
  name:         'Mountain Ridge Plumbing',
  shortName:    'Mountain Ridge',
  tagline:      'Fast. Local. Trusted.',
  phone:        '(xxx) 555-0100',       // [DEMO]
  email:        'hello@example.com',    // [DEMO]
  address:      '123 Main Street',      // [DEMO]
  city:         'Twin Falls',
  state:        'ID',
  zip:          '83301',
  serviceArea:  ['Twin Falls', 'Jerome', 'Burley', 'Buhl', 'Kimberly'],

  primaryColor: '#1e40af',
  logoPath:     '',                     // [DEMO] set to /logo.svg once logo uploaded

  serviceType:  'plumbing',
  services: [
    'Emergency Plumbing',
    'Drain Cleaning',
    'Water Heater Installation',
    'Leak Repair',
    'Sewer Line Service',
    'Fixture Installation',
    'Pipe Repair',
    'Water Softener',
  ],

  googleMapsUrl: 'https://maps.google.com',  // [DEMO]
  facebookUrl:   '',

  metaTitle:       'Mountain Ridge Plumbing — Twin Falls, ID',  // [DEMO]
  metaDescription: 'Licensed plumbers serving Twin Falls and the Magic Valley. 24/7 emergency service.',  // [DEMO]

  enableMembershipPortal: true,
  enableCrewTracker:      true,
  enableBlog:             true,
}

export default brand
