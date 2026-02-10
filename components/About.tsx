
import React from 'react';

/**
 * About Component
 * 
 * Updated with specific CHIMI bio.
 */
const About: React.FC = () => {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <h2 className="text-5xl font-black text-slate-900 mb-8 relative">
            About Me
            <span className="block w-24 h-2 bg-pink-400 rounded-full mt-4"></span>
          </h2>
          <div className="space-y-6 text-gray-700 text-xl leading-relaxed font-medium">
            <p>
              Hi, I’m <span className="text-slate-900 font-bold">CHIMI</span> — a developer focused on building clean, fast, and secure web applications.
            </p>
            <p>
              I specialize in crafting seamless user experiences while exploring the power of decentralized technologies and Web3.
            </p>
            <p>
              Beyond development, I’m a crypto content creator, prediction market trader, and researcher — constantly analyzing trends, markets, and emerging innovations.
            </p>
            <p className="text-blue-600 font-black text-3xl pt-4 animate-pulse">
              I build, I test, I learn, and I ship.
            </p>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="relative">
            <div className="absolute inset-0 bg-pink-100 rounded-[3rem] rotate-3 -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600" 
              alt="CHIMI Web3 Space" 
              className="rounded-[3rem] shadow-2xl w-full object-cover h-[450px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
