export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  link: string;
  image?: string;
  source: 'wordpress' | 'medium' | 'ghost';
}