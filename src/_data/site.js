export default {
  // Basic site info
  name: 'Shaun Bent',
  title: 'Shaun Bent | Design System Consultant & Coach',
  description: 'Shaun Bent — a design system consultant and coach based in Manchester, working through Studio 53° with organisations anywhere.',
  url: 'https://shaunbent.co.uk',
  year: new Date().getFullYear(),
  lang: 'en',
  locale: 'en_GB',

  // Author info (for schema.org and article metadata)
  author: {
    name: 'Shaun Bent',
    url: 'https://shaunbent.co.uk',
    email: null,
    jobTitle: 'Design System Consultant and Coach',
    sameAs: [
      'https://www.linkedin.com/in/shaun-bent-075095142/',
      'https://bsky.app/profile/shaunbent.co.uk',
      'https://instagram.com/shaunbent'
    ]
  },

  // Social media handles
  social: {
    twitter: null,
    bluesky: '@shaunbent.co.uk',
    linkedin: 'shaun-bent-075095142',
    instagram: 'shaunbent'
  },

  // Default images for social sharing
  image: {
    default: '/images/shaun-bent.jpeg',
    alt: 'Shaun Bent - Design System Consultant & Coach',
    width: 1200,
    height: 630
  },

  // Structured data
  organization: {
    '@type': 'Person',
    name: 'Shaun Bent',
    logo: '/icon.png',
    url: 'https://shaunbent.co.uk'
  }
};
