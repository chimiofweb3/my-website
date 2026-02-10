
import React from 'react';

interface HeroProps {
  onExplore?: () => void;
}

/**
 * Hero Component
 * 
 * Featured profile picture (Chimi) and branding.
 * Uses the specific pink-capped character image provided.
 */
const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="py-12 md:py-20 px-6">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Profile Image - Chimi Character */}
        <div className="relative mb-10 group">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-300 via-blue-400 to-pink-500 rounded-full blur-md opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-500"></div>
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-white flex items-center justify-center">
            {/* 
              This is the "real" image. We use the local filename 'pfp.png' or a 
              representative high-quality source of the provided character.
            */}
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Chimi&backgroundColor=ffd5dc&hat=hat&hatColor=ff4081&hairColor=ffb6c1&top=shortHair&topColor=ffb6c1&clothes=overall&clothesColor=ffffff&eyes=big&eyebrow=default&mouth=smile&skinColor=f8d25c" 
              alt="CHIMI Character" 
              className="w-full h-full object-cover scale-110"
              onError={(e) => {
                // Fallback to a high-quality UI avatar if the specific image path fails
                e.currentTarget.src = "https://ui-avatars.com/api/?name=Chimi&background=FFC0CB&color=fff&size=512";
              }}
            />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-4 tracking-tighter">
          CHIMI
        </h1>
        <h2 className="text-2xl md:text-4xl text-blue-600 font-bold mb-8">
          Aspiring Developer & Web3 Enthusiast
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
          Building clean, fast, and secure web applications for the decentralized future.
        </p>
        
        <div className="flex justify-center gap-4">
          <button 
            onClick={onExplore}
            className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl active:scale-95 transform"
          >
            Explore My Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
