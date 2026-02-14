export const siteConfig = {
  name: 'Jooyong DevLog',
  description: 'A fullstack blog built with Next.js, React 19, and TypeScript',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: {
    name: 'Jooyong',
    email: 'jooyong@example.com',
    github: 'https://github.com/yourusername',
  },
  links: {
    github: 'https://github.com/yourusername',
  },
} as const;

export type SiteConfig = typeof siteConfig;
