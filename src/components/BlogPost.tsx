import React from 'react';
import { CalendarDays, ExternalLink } from 'lucide-react';
import type { BlogPost as BlogPostType } from '../types/blog';

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.image && (
        <div className="relative h-48">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              post.source === 'wordpress' ? 'bg-blue-100 text-blue-800' :
              post.source === 'medium' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {post.source}
            </span>
          </div>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            <time>{new Date(post.date).toLocaleDateString()}</time>
          </div>
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            Read more
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}