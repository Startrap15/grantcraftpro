import type { BlogPost } from '../types/blog';
import { fetchWordPressPosts } from './wordpress';
import { fetchMediumPosts } from './medium';
import { fetchGhostPosts } from './ghost';

const DEMO_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Federal Grant Requirements',
    excerpt: 'A comprehensive guide to navigating federal grant requirements and ensuring compliance throughout the application process.',
    content: 'Full content here...',
    date: new Date().toISOString(),
    link: '#',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    source: 'wordpress'
  },
  {
    id: '2',
    title: 'Best Practices for Grant Writing Success',
    excerpt: 'Learn the proven strategies and techniques that can help increase your chances of securing grant funding.',
    content: 'Full content here...',
    date: new Date().toISOString(),
    link: '#',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    source: 'medium'
  },
  {
    id: '3',
    title: 'Grant Management and Reporting Tips',
    excerpt: 'Essential tips for effectively managing grant funds and meeting reporting requirements after securing funding.',
    content: 'Full content here...',
    date: new Date().toISOString(),
    link: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    source: 'ghost'
  }
];

export async function fetchAllBlogPosts(): Promise<BlogPost[]> {
  const [wordPressPosts, mediumPosts, ghostPosts] = await Promise.allSettled([
    fetchWordPressPosts(),
    fetchMediumPosts(),
    fetchGhostPosts()
  ]);

  const posts: BlogPost[] = [];

  if (wordPressPosts.status === 'fulfilled') posts.push(...wordPressPosts.value);
  if (mediumPosts.status === 'fulfilled') posts.push(...mediumPosts.value);
  if (ghostPosts.status === 'fulfilled') posts.push(...ghostPosts.value);

  if (posts.length === 0) {
    console.log('No posts fetched from APIs, using demo posts');
    return DEMO_POSTS;
  }

  return posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}