import { useState } from 'react';
import { 
  HeartPulse, 
  GraduationCap, 
  Tractor, 
  Leaf, 
  Megaphone, 
  Scale, 
  Award,
  CircleCheck,
  Zap,
  DollarSign
} from 'lucide-react';
import { programsData } from '../data/amaniData';

// Map string icon names to Lucide Icon components
const iconMap: Record<string, any> = {
  HeartPulse,
  GraduationCap,
  Tractor,
  Leaf,
  Megaphone,
  Scale
};

interface ProgramsViewProps {
  setActivePage: (page: string) => void;
  setSelectedCauseId: (id: string | null) => void;
}

export default function ProgramsView({ setActivePage, setSelectedCauseId }: ProgramsViewProps) {
  
  const handleSupportProgram = (programId: string) => {
    // Map programs to causes
    let causeId = 'cause-health';
    if (programId.includes('edu')) causeId = 'cause-edu';
    else if (programId.includes('agric')) causeId = 'cause-agric';
    else if (programId.includes('env')) causeId = 'cause-health'; // environment maps to general WASH
    else if (programId.includes('civic')) causeId = 'cause-civic';
    else if (programId.includes('legal')) causeId = 'cause-legal';

    setSelectedCauseId(causeId);
    setActivePage('donate');
    window.scrollTo(0, 0);
  };

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
          <div className="text-[11px] font-bold text-orange-605 tracking-widest uppercase font-mono bg-orange-500/15 border border-orange-500/25 px-3.5 py-1.5 rounded-full inline-block">
            Structured Committee Mandates
          </div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight uppercase ${
            useBgImage ? 'text-white' : 'text-indigo-950'
          }`}>
            Our Core Programmes
          </h1>
          <div className="w-12 h-1 bg-orange-505 rounded" />
          <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${
            useBgImage ? 'text-indigo-100' : 'text-slate-650'
          }`}>
            AMANI operates through seven statutory panels to supplemental fund local developments. Check their responsibilities, validated parameters, and live impact indicators below.
          </p>
        </div>
      </section>

      {/* 2. PROGRAMMES GRID LAYOUT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programsData.map((prog) => {
            const IconComponent = iconMap[prog.icon] || HeartPulse;
            
            // Generate visual styles based on program theme colors
            const headerBg = 
              prog.themeColor === 'green' ? 'bg-indigo-950 text-white border-b border-indigo-900' :
              prog.themeColor === 'blue' ? 'bg-indigo-900 text-white' :
              prog.themeColor === 'orange' ? 'bg-orange-600 text-white' :
              'bg-indigo-950 text-white';

            return (
              <div 
                key={prog.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:border-indigo-500/20 hover:shadow-md transition duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Styled program header band */}
                  <div className={`p-6 flex gap-4 items-center ${headerBg}`}>
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/25 flex items-center justify-center shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-wider">
                        {prog.name}
                      </h3>
                      <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest block font-sans">
                        {prog.committee}
                      </span>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed min-h-[50px]">
                      {prog.description}
                    </p>

                    {/* Performance metrics display */}
                    <div className="grid grid-cols-3 gap-2 border-y border-slate-100 py-4 my-2">
                      {prog.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center">
                          <span className="block text-sm sm:text-base font-black text-indigo-950 tracking-tight font-mono">
                            {metric.val}
                          </span>
                          <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                            {metric.lbl}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive program tag lists */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {prog.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                   <button
                    onClick={() => handleSupportProgram(prog.id)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase px-4 py-3.5 rounded-xl text-center tracking-wider transition shadow-sm cursor-pointer"
                  >
                    Support this Panel Work
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
