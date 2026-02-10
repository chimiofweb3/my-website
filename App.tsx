
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

/**
 * App Component
 * 
 * Manages the "routing" state to show different sections as separate pages.
 */
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');

  // Scroll to top whenever the view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderContent = () => {
    switch (currentView) {
      case 'about':
        return <About />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects setView={setCurrentView} />;
      case 'contact':
        return <Contact />;
      case 'home':
      default:
        return <Hero onExplore={() => setCurrentView('about')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header setView={setCurrentView} currentView={currentView} />

      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full animate-fade-in">
          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
