import { useState } from 'react';
import { 
  Building, 
  Map, 
  Compass, 
  Anchor, 
  Lightbulb, 
  School, 
  TreePine, 
  Droplets,
  Network,
  Users,
  Compass as ZoneIcon,
  BadgeCheck,
  BadgeAlert
} from 'lucide-react';
import { branchesData } from '../data/amaniData';

// Map string icon names to Lucide icons
const iconMap: Record<string, any> = {
  Building,
  Map,
  Compass,
  Anchor,
  Lightbulb,
  School,
  TreePine,
  Droplets
};

interface BranchesViewProps {
  setActivePage: (page: string) => void;
}

export default function BranchesView({ setActivePage }: BranchesViewProps) {
  
  const zoneStats = [
    { zone: 'Southern Coastal District Belt', count: '5 Active Regions', percentage: 80 },
    { zone: 'Middle Ashanti Forest Belt', count: '4 Active Regions', percentage: 65 },
    { zone: 'Northern Savanna District Belt', count: '4 Active Regions', percentage: 55 },
    { zone: 'Newly Formed Regions Area', count: '3 Active Regions', percentage: 40 }
  ];

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

  return (
    <div className="bg-slate-50">
      
      {/* 1. HERO DESCRIPTION */}
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
            className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-slate-950 to-indigo-900 transition-opacity duration-300 pointer-events-none"
            style={{ opacity: overlayOpacity }}
          />
        )}
        <div className="max-w-7xl mx-auto relative z-10 space-y-4 max-w-2xl">
          <div className="text-[11px] font-bold text-orange-600 tracking-widest uppercase font-mono bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full inline-block">
            Full Geopolitical Map Support
          </div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight uppercase ${
            useBgImage ? 'text-white' : 'text-indigo-950'
          }`}>
            AMANI Across Ghana
          </h1>
          <div className="w-12 h-1 bg-orange-500 rounded" />
          <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${
            useBgImage ? 'text-indigo-100' : 'text-slate-650'
          }`}>
            We maintain an operational network of appointed regional desk chairs, constituency executives, and local community trustees in all 16 regions of Ghana.
          </p>
        </div>
      </section>

      {/* 2. REGIONAL BRANCHES LAYOUT CONTAINER - Two columns (List + Sidebar) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        
        {/* Core Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-3xl text-center space-y-1 shadow-sm hover:border-indigo-505/20 transition-colors">
            <span className="block text-xl sm:text-2xl font-black text-indigo-950">16 / 16</span>
            <span className="block text-[10px] text-slate-450 font-bold uppercase tracking-wider">Regions Active</span>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-3xl text-center space-y-1 shadow-sm hover:border-indigo-505/20 transition-colors">
            <span className="block text-xl sm:text-2xl font-black text-indigo-950">275+</span>
            <span className="block text-[10px] text-slate-450 font-bold uppercase tracking-wider">Constituency Desks</span>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-3xl text-center space-y-1 shadow-sm hover:border-indigo-505/20 transition-colors">
            <span className="block text-xl sm:text-2xl font-black text-indigo-950">3 Levels</span>
            <span className="block text-[10px] text-slate-450 font-bold uppercase tracking-wider">Operational Tiers</span>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-3xl text-center space-y-1 shadow-sm hover:border-indigo-505/20 transition-colors">
            <span className="block text-xl sm:text-2xl font-black text-indigo-950">7 Panels</span>
            <span className="block text-[10px] text-slate-450 font-bold uppercase tracking-wider">Working Committees</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Branches List (Col-8) */}
          <div className="lg:col-span-8 space-y-4">
            {branchesData.map((branch) => {
              const IconComponent = iconMap[branch.icon] || Building;
              return (
                <div 
                  key={branch.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row gap-5 items-start hover:border-indigo-500/20 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 shrink-0 flex items-center justify-center shadow-sm animate-fade-in">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h4 className="text-base font-extrabold text-indigo-950 uppercase tracking-wide">
                        {branch.region}
                      </h4>
                      {branch.status === 'Active' ? (
                        <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                          <BadgeCheck className="w-3 h-3 text-indigo-600 fill-current" />
                          Active Council
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-705 border border-orange-100 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                          <BadgeAlert className="w-3 h-3 text-orange-500" />
                          Newly Framed
                        </span>
                      )}
                    </div>
                    <span className="block text-xs text-slate-400 font-mono">
                      Major Districts: {branch.cities}
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans pt-1">
                      <span className="font-bold text-slate-705">Commissions:</span> {branch.programs}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Presence by Zone Sidebar (Col-4) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6">
              <h3 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wide flex items-center gap-2 border-b border-slate-100 pb-3">
                <ZoneIcon className="w-5 h-5 text-indigo-600" />
                Presence by District Zone
              </h3>
              
              <div className="space-y-5">
                {zoneStats.map((stat, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-700 uppercase tracking-wide text-[10px]">{stat.zone}</span>
                      <span className="text-slate-400 font-mono font-bold text-[10px]">{stat.count}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 rounded-full" 
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar CTAs */}
            <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 space-y-4">
              <span className="bg-orange-500 text-white font-black text-[9px] uppercase px-2.5 py-1 rounded-full tracking-wider inline-block">
                Vacant Coordination Desks
              </span>
              <h4 className="text-indigo-950 font-extrabold text-md uppercase leading-tight">
                Apply as a Regional or District Chair Executive
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We accept applications for desk leads in the Western, Volta, Eastern and newly formed regional board zones. Partner alongside traditional rulers today.
              </p>
              <button 
                onClick={() => { setActivePage('contact'); window.scrollTo(0, 0); }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase py-3.5 rounded-xl text-center tracking-wider transition shadow-sm"
              >
                Launch application
              </button>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
