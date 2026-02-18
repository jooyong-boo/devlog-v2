export const siteConfig = {
  name: 'Jooyong DevLog',
  description: 'A fullstack blog built with Next.js, React 19, and TypeScript',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: {
    name: 'Jooyong',
    email: 'qnwndydfe@gmail.com',
    github: 'https://github.com/jooyong-boo',
  },
  links: {
    github: 'https://github.com/jooyong-boo',
  },
} as const;

export type SiteConfig = typeof siteConfig;
