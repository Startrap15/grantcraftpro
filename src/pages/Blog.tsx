import React from 'react';
import { BlogList } from '../components/BlogList';

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Blog Posts</h1>
      <BlogList />
    </div>
  );
}