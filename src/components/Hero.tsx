import React from 'react';
import { ArrowRight, Award, CheckCircle, TrendingUp } from 'lucide-react';

interface HeroProps {
  onConsultationClick: () => void;
}

export default function Hero({ onConsultationClick }: HeroProps) {
  const scrollToTestimonials = () => {
    const element = document.getElementById('testimonials');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Expert Grant Writing & Government Contract Solutions
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Professional grant writing and government proposal services backed by decades of experience and proven expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onConsultationClick}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                Start Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={scrollToTestimonials}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
              >
                View Success Stories
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">
              <Award className="h-10 w-10 text-yellow-400 mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">Proven Track Record</h3>
              <p className="text-blue-100">Consistent success in securing funding</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">
              <CheckCircle className="h-10 w-10 text-green-400 mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">Expert Team</h3>
              <p className="text-blue-100">Former grant reviewers & proposal writers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">
              <TrendingUp className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">15+ Years</h3>
              <p className="text-blue-100">Of industry expertise</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">
              <Award className="h-10 w-10 text-orange-400 mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">500+ Clients</h3>
              <p className="text-blue-100">Across various sectors</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}