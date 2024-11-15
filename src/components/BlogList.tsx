import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllBlogPosts } from '../services/blogService';
import { BlogPost } from './BlogPost';

export function BlogList() {
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: fetchAllBlogPosts,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-t-lg"></div>
            <div className="p-4 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Unable to load blog posts at the moment.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No blog posts available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogPost key={`${post.source}-${post.id}`} post={post} />
      ))}
    </div>
  );
}