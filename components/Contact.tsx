
import React, { useState, useEffect, useRef } from 'react';

interface GuestEntry {
  id: string;
  name: string;
  message: string;
  pfp: string | null;
  rank: string;
  timestamp: number;
}

const RANKS = ["Legendary", "Rising Star", "Innovator", "Visionary", "Trailblazer", "Bright Spark", "Game Changer", "Pioneer"];

const Contact: React.FC = () => {
  // Guestbook State
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [pfp, setPfp] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [rollingRank, setRollingRank] = useState(RANKS[0]);
  const [isSending, setIsSending] = useState(false);
  
  // Ref for rank animation
  const rankIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Load existing entries from local storage
    const saved = localStorage.getItem('chimi_guestbook');
    if (saved) setEntries(JSON.parse(saved));

    // Start rank rolling animation for the FORM only
    rankIntervalRef.current = window.setInterval(() => {
      setRollingRank(prev => {
        const idx = RANKS.indexOf(prev);
        return RANKS[(idx + 1) % RANKS.length];
      });
    }, 120); // Fast rolling effect to gamify the "assignment"

    return () => {
      if (rankIntervalRef.current) clearInterval(rankIntervalRef.current);
    };
  }, []);

  const handlePfpUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPfp(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSending(true);

    // CRITICAL: The rank is "locked in" at this exact moment. 
    // It is stored in the entry object so it remains unaltered forever on the wall.
    const finalAssignedRank = rollingRank;

    const newEntry: GuestEntry = {
      id: Date.now().toString(),
      name,
      message,
      pfp,
      rank: finalAssignedRank, 
      timestamp: Date.now()
    };

    // Immediately update local list and persistent storage
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('chimi_guestbook', JSON.stringify(updated));

    // Form cleanup after a small visual confirmation delay
    setTimeout(() => {
      setName('');
      setMessage('');
      setPfp(null);
      setIsSending(false);
      alert(`Message Locked! 🔒\n\nYour permanent rank: ${finalAssignedRank}\nCheck the wall below to see your entry.`);
    }, 600);
  };

  // Search filter and display logic
  // Ranks on the wall remain static because they are read from the entry object itself.
  const displayEntries = entries
    .filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      // Legendary entries always float to the top
      if (a.rank === 'Legendary' && b.rank !== 'Legendary') return -1;
      if (b.rank === 'Legendary' && a.rank !== 'Legendary') return 1;
      return b.timestamp - a.timestamp;
    });

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Contact Info with Icons */}
          <div className="space-y-10">
            <div>
              <h2 className="text-5xl font-black text-slate-900 mb-6">Let's Connect</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-md">
                Reach out if you're building in Web3, trading, or just want to say hi!
              </p>
            </div>

            <div className="space-y-6">
              {/* Email Block */}
              <div className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Email Me</h3>
                  <p className="text-lg font-bold text-slate-900 break-all">stephendauda001@gmail.com</p>
                </div>
              </div>

              {/* Social Block */}
              <div className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Socials</h3>
                  <p className="text-lg font-bold text-slate-900">@chimiofweb3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Guestbook Widget */}
          <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl border border-gray-50 relative overflow-hidden">
            {isSending && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-center flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-black text-blue-600 uppercase tracking-widest">Locking Entry...</p>
              </div>
            )}
            
            <h3 className="text-3xl font-black text-slate-900 mb-2">Say Hello</h3>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-gray-500 font-medium text-sm italic">Rank Assignment:</span>
              <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-pink-500 text-white text-xs font-black rounded-full uppercase tracking-widest shadow-lg min-w-[120px] text-center">
                {rollingRank}
              </span>
            </div>

            <form onSubmit={handleSend} className="space-y-6">
              <div className="flex gap-4 items-end">
                <div className="flex-grow">
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-2 tracking-wider">Username</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Satoshi" 
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 font-bold placeholder:text-gray-300 transition-all"
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2 tracking-wider text-center">PFP</label>
                  <label className="cursor-pointer w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-400 overflow-hidden transition-all active:scale-95">
                    {pfp ? <img src={pfp} className="w-full h-full object-cover" /> : <span className="text-2xl text-gray-400">+</span>}
                    <input type="file" className="hidden" accept="image/*" onChange={handlePfpUpload} />
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-2 tracking-wider">Your Message</label>
                <textarea 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave an unaltered note for the wall..." 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 h-32 focus:ring-2 focus:ring-blue-500 font-medium resize-none placeholder:text-gray-300 transition-all"
                />
              </div>

              <button 
                type="submit"
                disabled={isSending}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-600 transition-all shadow-xl active:scale-95 disabled:opacity-50"
              >
                Send & Claim Permanent Rank
              </button>
            </form>
          </div>
        </div>

        {/* Guestbook Wall */}
        <div className="mt-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-black text-slate-900">Guest Wall</h2>
              <p className="text-gray-500 font-medium">All messages and ranks are stored permanently.</p>
            </div>
            
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search usernames..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayEntries.length > 0 ? (
              displayEntries.map((entry) => (
                <div 
                  key={entry.id} 
                  className={`bg-white p-8 rounded-[2.5rem] shadow-lg border-t-8 transition-all hover:-translate-y-2 group animate-fade-in ${
                    entry.rank === 'Legendary' ? 'border-yellow-400' : 'border-blue-400'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0 shadow-inner">
                      {entry.pfp ? (
                        <img src={entry.pfp} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-blue-300 font-black text-2xl bg-blue-50">
                          {entry.name[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-lg leading-none">{entry.name}</h4>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mt-2 inline-block shadow-sm ${
                        entry.rank === 'Legendary' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {entry.rank}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-medium italic text-lg line-clamp-4">
                    "{entry.message}"
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-4 border-dashed border-gray-100">
                <p className="text-gray-300 font-black text-xl uppercase tracking-widest">Be the first to leave a message.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
