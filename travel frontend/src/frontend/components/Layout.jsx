import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import GroupTour from '../pages/grouptour';
import FloatingWhatsApp from './FloatingWhatsApp';
import GoogleReviews from './GoogleReviews';
import NewsletterSection from '../pages/NewsletterSection';

export default function Layout() {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onGroupEnquiry={() => setIsGroupModalOpen(true)} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <NewsletterSection />
      <GoogleReviews />
      <Footer />
      <FloatingWhatsApp />

      <button
        type="button"
        onClick={() => setIsGroupModalOpen(true)}
        className="fixed bottom-5 left-5 z-40 flex h-23 w-23 items-center justify-center rounded-full bg-[#0a1b33] px-2 text-center text-xs font-semibold leading-tight text-white shadow-lg transition-colors hover:bg-[#B71E25]"
      >
        Customize Your Trip
      </button>

      {isGroupModalOpen && (
        <GroupTour onClose={() => setIsGroupModalOpen(false)} />
      )}
    </div>
  );
}
