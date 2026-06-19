/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ProgramsView from './components/ProgramsView';
import BranchesView from './components/BranchesView';
import RatingsView from './components/RatingsView';
import RadioView from './components/RadioView';
import BlogView from './components/BlogView';
import DonateView from './components/DonateView';
import ContactView from './components/ContactView';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedCauseId, setSelectedCauseId] = useState<string | null>(null);

  // Router handler mapping page IDs to components
  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomeView 
            setActivePage={setActivePage} 
            setSelectedCauseId={setSelectedCauseId} 
          />
        );
      case 'about':
      case 'about-what':
        return <AboutView initialSection="what" />;
      case 'about-leadership':
        return <AboutView initialSection="leadership" />;
      case 'programs':
        return (
          <ProgramsView 
            setActivePage={setActivePage} 
            setSelectedCauseId={setSelectedCauseId} 
          />
        );
      case 'branches':
        return <BranchesView setActivePage={setActivePage} />;
      case 'ratings':
        return <RatingsView />;
      case 'radio':
        return <RadioView />;
      case 'blog':
        return <BlogView />;
      case 'donate':
        return (
          <DonateView 
            selectedCauseId={selectedCauseId} 
            setSelectedCauseId={setSelectedCauseId} 
          />
        );
      case 'contact':
        return <ContactView />;
      default:
        return (
          <HomeView 
            setActivePage={setActivePage} 
            setSelectedCauseId={setSelectedCauseId} 
          />
        );
    }
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-orange-500/20 selection:text-indigo-900">
      
      {/* Premium Header navigation */}
      <Header activePage={activePage} setActivePage={handlePageChange} />

      {/* Main Container with smooth fade effects */}
      <main className="flex-1 w-full bg-slate-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full h-full"
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global premium footer */}
      <Footer setActivePage={handlePageChange} />

    </div>
  );
}

