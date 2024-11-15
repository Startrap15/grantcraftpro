import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fetchAllBlogPosts } from '../services/blogService';
import { BlogPost } from './BlogPost';

export default function LatestPosts() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: fetchAllBlogPosts,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const latestPosts = posts.slice(0, 3);

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Latest Insights</h2>
            <p className="mt-4 text-xl text-gray-600">Stay updated with our latest grant writing tips and success stories</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
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
        </div>
      </section>
    );
  }

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Latest Insights</h2>
          <p className="mt-4 text-xl text-gray-600">Stay updated with our latest grant writing tips and success stories</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {latestPosts.map((post) => (
            <BlogPost key={`${post.source}-${post.id}`} post={post} />
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Posts
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}