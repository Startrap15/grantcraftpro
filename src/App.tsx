import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Blog from './pages/Blog';
import Pricing from './pages/Pricing';
import Checkout from './pages/Checkout';
import Portal from './pages/Portal';
import ConsultationModal from './components/ConsultationModal';
import Chatbot from './components/Chatbot';

const queryClient = new QueryClient();

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConsultationClick = () => {
    setIsModalOpen(true);
  };

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-white">
          <TopBar />
          <Navigation onConsultationClick={handleConsultationClick} />
          <Routes>
            <Route path="/" element={<Home onConsultationClick={handleConsultationClick} />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/portal" element={<Portal />} />
          </Routes>
          <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <Chatbot />
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}