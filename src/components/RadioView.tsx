import React, { useState, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Radio, 
  Volume2, 
  Clock, 
  Calendar, 
  Bell, 
  Rss, 
  ChevronRight,
  Sparkles,
  Search,
  CheckCircle
} from 'lucide-react';
import { podcastEpisodes, radioSchedule } from '../data/amaniData';
import { PodcastEpisode } from '../types';

export default function RadioView() {
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode>(podcastEpisodes[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Wave elements for the dynamic media player
  const waveBarsCount = 38;
  const bars = useMemo(() => {
    return Array.from({ length: waveBarsCount }).map((_, idx) => {
      const h = Math.floor(Math.random() * 24) + 6; // Random heights
      const d = (Math.random() * 0.6 + 0.4).toFixed(2); // Random durations
      const delay = (Math.random() * 0.4).toFixed(2); // Delays
      return { id: idx, h, d, delay };
    });
  }, []);

  // Load customisable hero background settings from localStorage
  const [heroBgImage] = useState<string>(() => {
    return localStorage.getItem('amani_hero_bg') || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600';
  });
  const [useBgImage] = useState<boolean>(() => {
    const saved = localStorage.getItem('amani_use_hero_bg');
    return saved !== 'false';
  });
  const [overlayOpacity] = useState<number>(() => {
    const saved = localStorage.getItem('amani_hero_opacity');
    return saved ? parseFloat(saved) : 0.85;
  });

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectEpisode = (ep: PodcastEpisode) => {
    setCurrentEpisode(ep);
    setIsPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeEmail.trim()) {
      setSubscribeSuccess(true);
      setTimeout(() => {
        setSubscribeEmail('');
        setSubscribeSuccess(false);
      }, 4000);
    }
  };

  const filteredEpisodes = useMemo(() => {
    return podcastEpisodes.filter(ep => 
      ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="bg-slate-50">
      
      {/* 1. HERO DESCRIPTION WITH PULSATING LIVE BLOCK */}
      <section 
        className={`relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 transition-all duration-505 ${
          useBgImage ? 'text-white' : 'text-slate-900 bg-transparent'
        }`}
        style={useBgImage ? {
          backgroundImage: `url(${heroBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : {}}
      >
        {useBgImage && (
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-indigo-950 to-slate-955 transition-opacity duration-300 pointer-events-none"
            style={{ opacity: overlayOpacity }}
          />
        )}
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-600 text-[10px] font-bold tracking-widest uppercase mb-1">
              <span className={`w-2 h-2 rounded-full bg-orange-550 ${isPlaying ? 'animate-ping' : ''}`} />
              Live Broadcast — Community Development Hour
            </div>

            <h1 className={`text-3xl sm:text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight uppercase ${
              useBgImage ? 'text-white' : 'text-indigo-950'
            }`}>
              AMANI Community Radio
            </h1>
            <div className="w-12 h-1 bg-orange-500 rounded" />
            
            <p className={`text-sm sm:text-base leading-relaxed max-w-xl ${
              useBgImage ? 'text-indigo-100' : 'text-slate-650'
            }`}>
              Broadcasting development programs, traditional councils news, local government ratings analyses, and public policy updates to listeners across Ghana.
            </p>
          </div>

          {/* 2. THE AUDIO PLAYER INTERACTIVE CARD */}
          <div className={`lg:col-span-12 xl:col-span-5 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 transition-all duration-300 ${
            useBgImage 
              ? 'bg-white/10 backdrop-blur-md border border-white/20' 
              : 'bg-white border border-slate-200'
          }`}>
            <div className="space-y-1">
              <span className="text-[10px] text-orange-600 font-black uppercase tracking-widest">
                Now Airing On-Demand
              </span>
              <h3 className={`text-base sm:text-lg font-bold uppercase tracking-wide truncate ${
                useBgImage ? 'text-white' : 'text-indigo-950'
              }`}>
                {currentEpisode.title}
              </h3>
              <span className={`text-xs font-semibold flex items-center gap-1 ${
                useBgImage ? 'text-indigo-200' : 'text-slate-500'
              }`}>
                Episode {currentEpisode.episodeNumber} · {currentEpisode.category}
              </span>
            </div>

            {/* Simulated Animated Waveform aligned with play status */}
            <div className={`h-10 flex gap-0.5 items-end justify-between px-2 py-1 rounded-xl ${
              useBgImage ? 'bg-white/5' : 'bg-slate-50 border border-slate-100'
            }`}>
              {bars.map((bar) => (
                <div 
                  key={bar.id}
                  className="w-1 rounded-t-xs bg-orange-400"
                  style={{
                    height: `${bar.h}px`,
                    animation: isPlaying ? `wave ${bar.d}s ease-in-out infinite alternate` : 'none',
                    animationDelay: `${bar.delay}s`,
                    opacity: isPlaying ? 0.95 : 0.45
                  }}
                />
              ))}
            </div>

            {/* Time labels and slider track */}
            <div className="space-y-1.5">
              <div className={`flex justify-between items-center text-[10px] font-mono font-bold ${
                useBgImage ? 'text-indigo-200' : 'text-slate-500'
              }`}>
                <span>12:45 Played</span>
                <span>{currentEpisode.duration} Duration</span>
              </div>
              <div className={`h-1 w-full rounded-full relative cursor-pointer group ${
                useBgImage ? 'bg-white/15' : 'bg-slate-100'
              }`}>
                <div className="h-full bg-orange-400 rounded-full w-[38%]" />
                <div className="w-2.5 h-2.5 rounded-full bg-orange-300 absolute top-1/2 -translate-y-1/2 left-[38%] shadow-md opacity-0 group-hover:opacity-100 transition" />
              </div>
            </div>

            {/* Sound Controls buttons */}
            <div className="flex items-center justify-center gap-5 pt-2">
              <button aria-label="Skip Back" className={`p-2 hover:scale-105 transition hover:text-orange-500 ${
                useBgImage ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-indigo-950'
              }`}>
                <SkipBack className="w-5 h-5 shrink-0" />
              </button>
              
              <button 
                onClick={handleTogglePlay}
                className="w-14 h-14 rounded-full bg-orange-500 text-indigo-950 flex items-center justify-center shadow-lg hover:bg-orange-400 hover:scale-105 transition shrink-0 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
              </button>

              <button aria-label="Skip Forward" className={`p-2 hover:scale-105 transition hover:text-orange-500 ${
                useBgImage ? 'text-white/70 hover:text-white' : 'text-slate-605 hover:text-indigo-955'
              }`}>
                <SkipForward className="w-5 h-5 shrink-0" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CO-SECTION LIST OF BROADCASTS & Broadcast schedule SIDEBAR */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Episodes Directory (Col-8) */}
        <div className="lg:col-span-12 xl:col-span-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase block">
              Recent Broadcast Library
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-950 uppercase tracking-wide">
              Recent Broadcast Episodes
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded" />
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search category, themes (e.g., Livelihoods, WASH, Health)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-650"
            />
          </div>

          <div className="space-y-3.5">
            {filteredEpisodes.length === 0 ? (
              <p className="text-center py-8 text-xs sm:text-sm font-bold text-slate-400 font-mono">
                No episodes matched your search query in the library.
              </p>
            ) : (
              filteredEpisodes.map((ep) => {
                const isActive = ep.id === currentEpisode.id;
                
                // Colors based on categories
                const catPill = 
                  ep.category === 'Health' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                  ep.category === 'Governance' ? 'bg-pink-50 text-pink-700 border-pink-100' :
                  ep.category === 'Civic Ed' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                  ep.category === 'Agriculture' ? 'bg-orange-50/70 text-amber-700 border-orange-150' :
                  'bg-blue-50 text-blue-700 border-blue-500/10';

                return (
                  <div 
                    key={ep.id}
                    onClick={() => handleSelectEpisode(ep)}
                    className={`rounded-2xl border p-4.5 grid grid-cols-12 gap-4 items-center cursor-pointer transition ${
                      isActive 
                        ? 'border-indigo-600 bg-indigo-50/10 shadow-xs' 
                        : 'border-slate-200 bg-white hover:border-indigo-500/30 hover:shadow-3xs'
                    }`}
                  >
                    <div className="col-span-1 flex items-center justify-center shrink-0">
                      {isActive && isPlaying ? (
                        <div className="w-9 h-9 rounded-xl bg-indigo-950 flex items-center justify-center text-orange-400">
                          <Pause className="w-3.5 h-3.5 fill-current" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-505 border border-slate-100 flex items-center justify-center font-bold text-xs font-mono">
                          {ep.episodeNumber}
                        </div>
                      )}
                    </div>

                    <div className="col-span-9 space-y-1.5 pl-2.5">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 border rounded-full inline-block ${catPill}`}>
                        {ep.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-extrabold text-indigo-950 uppercase tracking-wide leading-snug line-clamp-2">
                        {ep.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                        {ep.date} · {ep.duration} Duration
                      </span>
                    </div>

                    <div className="col-span-2 flex justify-end shrink-0">
                      <button 
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center transition cursor-pointer ${
                          isActive 
                            ? 'bg-indigo-600 text-white border-indigo-650' 
                            : 'border-slate-200 text-slate-500 hover:bg-indigo-950 hover:text-white hover:border-indigo-950'
                        }`}
                        aria-label="Play Track"
                      >
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Timetable schedule sidebar (Col-4) */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-3xs">
            <h3 className="text-base font-extrabold text-indigo-950 uppercase tracking-wide flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-5 h-5 text-indigo-600 animate-fade-in" />
              Weekly Program Schedule
            </h3>

            <div className="space-y-4">
              {radioSchedule.map((sched, idx) => (
                <div key={idx} className="flex gap-4 items-start pb-3.5 border-b border-slate-100 last:border-b-0 last:pb-0">
                  <div className="text-center shrink-0">
                    <span className="block text-xs font-black text-orange-500 uppercase">
                      {sched.day}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono font-bold uppercase mt-0.5">
                      {sched.time}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="font-extrabold text-indigo-950 text-xs sm:text-sm uppercase tracking-wide leading-tight">
                      {sched.show}
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                      {sched.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-3xs">
            <h3 className="text-base font-extrabold text-indigo-950 uppercase tracking-wide flex items-center gap-2">
              <Rss className="w-5 h-5 text-indigo-600" />
              Podcast Support Desks
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Listen and subscribe to our verified feeds across directories for weekly updates.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <a href="https://spotify.com" target="_blank" rel="noreferrer" className="border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 p-2.5 rounded-xl text-xs font-bold text-center transition">Spotify</a>
              <a href="https://apple.com" target="_blank" rel="noreferrer" className="border border-slate-200 hover:border-orange-500 hover:text-orange-500 p-2.5 rounded-xl text-xs font-bold text-center transition">Apple Podcasts</a>
            </div>
          </div>

          {/* Subscribe Desk notifications form */}
          <div className="bg-orange-500/5 border border-orange-500/10 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-black text-indigo-950 uppercase tracking-wider flex items-center gap-2 leading-none">
              <Bell className="w-4 h-4 text-orange-500 shrink-0" /> Get Broadcast Alerts
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never miss our rating assessment reviews or panel programs. Enter your registry email directly below.
            </p>
            
            {subscribeSuccess ? (
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl p-3 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                Alert enrollment complete! Check inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email" 
                  required
                  placeholder="name@email.com" 
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  className="bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs text-slate-800 flex-1 focus:outline-hidden focus:border-indigo-600 focus:bg-white"
                />
                <button 
                  type="submit"
                  className="bg-indigo-600 text-white hover:bg-[#133e2b] font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl tracking-wider transition cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

      </section>

      {/* Styled animation keyframes inside style sheet injection block */}
      <style>{`
        @keyframes wave {
          0% { height: 4px; }
          100% { height: 100%; }
        }
      `}</style>

    </div>
  );
}
