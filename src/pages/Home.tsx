import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import LatestPosts from '../components/LatestPosts';

interface HomeProps {
  onConsultationClick: () => void;
}

export default function Home({ onConsultationClick }: HomeProps) {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Hero onConsultationClick={onConsultationClick} />
      <Services />
      <About />
      <Testimonials />
      <LatestPosts />
      <Contact />
    </>
  );
}