import React from 'react';
import { Star } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-gray-100 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="Google Reviews"
                className="h-6"
              />
              <div className="flex ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="ml-1 text-sm text-gray-600">5.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}