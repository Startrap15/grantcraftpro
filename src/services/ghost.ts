import axios from 'axios';
import type { BlogPost } from '../types/blog';

const GHOST_URL = import.meta.env.VITE_GHOST_URL;
const GHOST_KEY = import.meta.env.VITE_GHOST_CONTENT_KEY;

interface GhostPost {
  id: string;
  title: string;
  excerpt: string;
  html: string;
  published_at: string;
  url: string;
  feature_image: string | null;
}

export async function fetchGhostPosts(): Promise<BlogPost[]> {
  if (!GHOST_URL || !GHOST_KEY) {
    console.log('Ghost API not configured');
    return [];
  }

  try {
    const response = await axios.get<{ posts: GhostPost[] }>(
      `${GHOST_URL}/ghost/api/v3/content/posts/`,
      {
        params: {
          key: GHOST_KEY,
          include: 'feature_image',
          limit: 10
        }
      }
    );

    return response.data.posts.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.html,
      date: post.published_at,
      link: post.url,
      image: post.feature_image || undefined,
      source: 'ghost' as const
    }));
  } catch (error) {
    console.log('Ghost fetch error:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}