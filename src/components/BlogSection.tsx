import React from 'react';
import { useQuery } from 'react-query';
import { ExternalLink } from 'lucide-react';
import { fetchAllBlogPosts } from '../services/blogService';

export default function BlogSection() {
  const { data: posts, isLoading, error } = useQuery('blog-posts', fetchAllBlogPosts);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading blog posts. Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Insights</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="text-sm text-blue-600 font-medium capitalize">
                    {post.source}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <time className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a
                  href={post.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}