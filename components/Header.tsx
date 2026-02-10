
import React from 'react';

interface HeaderProps {
  setView: (view: string) => void;
  currentView: string;
}

/**
 * Header Component
 * 
 * Updated to handle view switching instead of jumping to section IDs.
 */
const Header: React.FC<HeaderProps> = ({ setView, currentView }) => {
  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo / Name */}
        <button 
          onClick={() => setView('home')}
          className="text-2xl font-black tracking-tighter hover:text-blue-400 transition-colors"
        >
          CHIMI
        </button>

        {/* Navigation Menu */}
        <nav>
          <ul className="flex space-x-4 md:space-x-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button 
                  onClick={() => setView(link.id)}
                  className={`text-sm font-semibold transition-all duration-200 py-1 border-b-2 ${
                    currentView === link.id 
                      ? 'text-white border-blue-500' 
                      : 'text-gray-400 border-transparent hover:text-white'
                  }`}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
