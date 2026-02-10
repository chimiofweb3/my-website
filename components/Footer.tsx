
import React from 'react';

/**
 * Footer Component
 * 
 * Standard copyright footer.
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-10 px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 font-medium">
          &copy; 2026 CHIMI
        </p>
        <div className="flex gap-6">
          <span className="text-gray-400 text-sm italic">Designed for the future.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
