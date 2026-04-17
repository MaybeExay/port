import { Profile, SocialLink, Skill, Project, NavItem } from '@/types';

export const PROFILE: Profile = {
  name: 'MAUBE EXAU',
  role: 'вайб кодер',
  location: 'Сочи, Россия',
  email: 'eydonfry@example.com',
  bio: {
    short: 'Создаю современные веб-приложения на React и Next.js',
    full: `Я frontend-разработчик с более чем 3-летним опытом создания сложных веб-приложений. 
    Специализируюсь на React, Next.js и TypeScript. Моя страсть — создавать быстрые, 
    доступные и красивые интерфейсы, которые приносят пользу пользователям.
    
    В свободное время contribyte в open-source проекты и изучаю новые технологии.`,
  },
  experience: '3+ года',
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/MaybeExay',
    icon: 'github',
  },
  {
    name: 'Telegram',
    url: 'https://t.me/maybeexay',
    icon: 'telegram',
  },
  {
    name: 'VK',
    url: 'https://vk.com/maybeexay',
    icon: 'vk',
  },
  {
    name: 'Email',
    url: `mailto:${PROFILE.email}`,
    icon: 'email',
  },
];

export const SKILLS: Skill[] = [
  { name: 'Next.js', level: -12, category: 'frontend' },
  { name: 'React', level: 0, category: 'frontend' },
  { name: 'TypeScript', level: 0, category: 'frontend' },
  { name: 'JavaScript', level: 0, category: 'frontend' },
  { name: 'Tailwind CSS', level: 0, category: 'frontend' },
  { name: 'Node.js', level: 0, category: 'backend' },
  { name: 'Git', level: 5, category: 'tools' },
  { name: 'Figma', level: 65, category: 'design' },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Portfolio',
    description: 'Полнофункциональное пробное портфолио',
    fullDescription: `Жестокость ради жестокости, для тестового портыолио`,
    technologies: ['TypeScript'],
    codeUrl: 'https://github.com/MaybeExay/port',
    image: 'projects/ecommerce.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'PlaceHolder',
    description: 'PlaceHolder',
    fullDescription: `PlaceHolder`,
    technologies: ['React', 'TypeScript', 'Dnd-kit', 'Firebase'],
    liveUrl: 'https://rutube.ru/video/b3f49e955aad9c12e7963bd0e0a5eca6/',
    codeUrl: 'https://rutube.ru/video/b3f49e955aad9c12e7963bd0e0a5eca6/',
    image: 'projects/task-manager.jpg',
    featured: true,
  },
  {
    id: 3,
    title: 'PlaceHolder',
    description: 'PlaceHolder',
    fullDescription: `PlaceHolder`,
    technologies: ['Next.js', 'OpenWeatherMap API', 'Mapbox', 'Chart.js'],
    liveUrl: 'https://rutube.ru/video/b3f49e955aad9c12e7963bd0e0a5eca6/',
    codeUrl: 'https://rutube.ru/video/b3f49e955aad9c12e7963bd0e0a5eca6/',
    image: 'projects/weather.jpg',
    featured: false,
  },
  {
    id: 4,
    title: 'PlaceHolder',
    description: 'PlaceHolder',
    fullDescription: `PlaceHolder`,
    technologies: ['Next.js', 'MDX', 'Prisma', 'PostgreSQL'],
    liveUrl: 'https://rutube.ru/video/b3f49e955aad9c12e7963bd0e0a5eca6/',
    codeUrl: 'https://rutube.ru/video/b3f49e955aad9c12e7963bd0e0a5eca6/',
    image: 'projects/blog.png',
    featured: false,
  },
];

export const NAV_ITEMS: NavItem[] = [
  { href: '#home', labelKey: 'nav.home' },
  { href: '#about', labelKey: 'nav.about' },
  { href: '#projects', labelKey: 'nav.projects' },
  { href: '#contacts', labelKey: 'nav.contacts' },
];

export const SITE_CONFIG = {
  url: 'https://username.github.io/port',
  author: 'Эксийка',
  themeColor: '#3B82F6',
  ogImage: '/og-image.png',
};
