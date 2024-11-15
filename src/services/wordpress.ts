import axios from 'axios';
import type { BlogPost } from '../types/blog';

const WORDPRESS_API = import.meta.env.VITE_WORDPRESS_API_URL;
const USERNAME = import.meta.env.VITE_WORDPRESS_USERNAME;
const APP_PASSWORD = import.meta.env.VITE_WORDPRESS_APP_PASSWORD;

interface WordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
  };
}

export async function fetchWordPressPosts(): Promise<BlogPost[]> {
  if (!WORDPRESS_API) {
    console.log('WordPress API not configured');
    return [];
  }

  try {
    const response = await axios.get<WordPressPost[]>(`${WORDPRESS_API}/posts`, {
      params: {
        _embed: 'wp:featuredmedia',
        per_page: 10,
        status: 'publish'
      },
      auth: USERNAME && APP_PASSWORD ? {
        username: USERNAME,
        password: APP_PASSWORD
      } : undefined
    });

    return response.data.map(post => ({
      id: String(post.id),
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
      content: post.content.rendered,
      date: post.date,
      link: post.link,
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      source: 'wordpress' as const
    }));
  } catch (error) {
    console.log('WordPress fetch error:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}