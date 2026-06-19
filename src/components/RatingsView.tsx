import { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search, 
  Filter, 
  Database, 
  Calendar, 
  Users, 
  Building, 
  CheckCircle2, 
  ArrowUpRight,
  Sparkles,
  Info,
  X,
  XCircle,
  Clock
} from 'lucide-react';
import { officialsRatings, institutionsRatings } from '../data/amaniData';
import { RatingEntity } from '../types';

export default function RatingsView() {
  const [activeTab, setActiveTab] = useState<'officials' | 'institutions'>('officials');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [selectedEntity, setSelectedEntity] = useState<RatingEntity | null>(null);

  // Derive unique sectors for filter selection
  const sectors = useMemo(() => {
    const list = activeTab === 'officials' ? officialsRatings : institutionsRatings;
    const unique = Array.from(new Set(list.map(item => item.sector)));
    return ['All Sectors', ...unique];
  }, [activeTab]);

  // Filter items based on searchQuery & selectedSector selector
  const filteredRatings = useMemo(() => {
    const list = activeTab === 'officials' ? officialsRatings : institutionsRatings;
    return list.filter(item => {
      const matchSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSector = selectedSector === 'All Sectors' || item.sector === selectedSector;
      return matchSearch && matchSector;
    });
  }, [activeTab, searchQuery, selectedSector]);

  // Aggregate stats
  const aggregateStats = useMemo(() => {
    const list = activeTab === 'officials' ? officialsRatings : institutionsRatings;
    const count = list.length;
    const avgScore = Math.round(list.reduce((sum, item) => sum + item.score, 0) / count);
    
    // Top performer
    const top = list.reduce((prev, curr) => (curr.score > prev.score ? curr : prev), list[0]);
    // Lowest performer
    const low = list.reduce((prev, curr) => (curr.score < prev.score ? curr : prev), list[0]);

    return { count, avgScore, top, low };
  }, [activeTab]);

  const handleDisplayTab = (tab: 'officials' | 'institutions') => {
    setActiveTab(tab);
    setSearchQuery('');
    setSelectedSector('All Sectors');
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
        <div className="max-w-7xl mx-auto relative z-10 space-y-4">
          <div className="text-[11px] font-bold text-orange-605 tracking-widest uppercase font-mono bg-orange-500/15 border border-orange-500/25 px-3.5 py-1.5 rounded-full inline-block">
            Bloomberg-Style Civil Audit index
          </div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight uppercase ${
            useBgImage ? 'text-white' : 'text-indigo-950'
          }`}>
            Institutional & Official Performance Index
          </h1>
          <div className="w-12 h-1 bg-orange-500 rounded" />
          <p className={`text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed ${
            useBgImage ? 'text-indigo-100' : 'text-slate-650'
          }`}>
            Independent, data-driven, non-partisan performance ratings of major Ghanaian public officers and state institutions—updated quarterly using field audits, public responses, and financial reports.
          </p>
          
          <div className="flex flex-wrap gap-3 pt-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              useBgImage ? 'bg-white/5 border border-white/10 text-indigo-205' : 'bg-slate-100 border border-slate-200 text-slate-700'
            }`}>
              <Calendar className="w-3.5 h-3.5" /> Q2 Updated Index
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              useBgImage ? 'bg-white/5 border border-white/10 text-indigo-205' : 'bg-slate-100 border border-slate-200 text-slate-700'
            }`}>
              <Database className="w-3.5 h-3.5" /> 147 Entities Reviewed
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold animate-pulse ${
              useBgImage ? 'bg-white/5 border border-white/10 text-orange-400' : 'bg-orange-50 border border-orange-105 text-orange-600'
            }`}>
              <Users className="w-3.5 h-3.5" /> 12,400+ Citizen Surveys
            </span>
          </div>
        </div>
      </section>

      {/* 2. INDEX MATRIX STATS DECK */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* Aggregated Quick Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-1 shadow-sm">
            <span className="block text-3xl font-black text-indigo-950">{aggregateStats.count}</span>
            <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Reviewed Index Pool</span>
            <span className="block text-[10px] text-slate-450 mt-1">Both national and district blocks</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-1 shadow-sm">
            <span className="block text-3xl font-black text-orange-500">{aggregateStats.avgScore} / 100</span>
            <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Average Index Score</span>
            <span className="block text-[10px] text-slate-450 mt-1">Weighted performance mean</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-1 shadow-sm border-l-4 border-l-indigo-600">
            <span className="block text-xs text-indigo-600 font-extrabold uppercase tracking-wide">Top Performer</span>
            <span className="block text-sm font-bold text-slate-850 line-clamp-1">{aggregateStats.top.name}</span>
            <span className="block text-xs text-slate-400 font-mono mt-0.5">Score: {aggregateStats.top.score} (Grade {aggregateStats.top.grade})</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-1 shadow-sm border-l-4 border-l-orange-500">
            <span className="block text-xs text-orange-505 font-extrabold uppercase tracking-wide">Needs Improvement</span>
            <span className="block text-sm font-bold text-slate-850 line-clamp-1">{aggregateStats.low.name}</span>
            <span className="block text-xs text-slate-400 font-mono mt-0.5">Score: {aggregateStats.low.score} (Grade {aggregateStats.low.grade})</span>
          </div>
        </div>

        {/* 3. BLOOMBERG GRID PLATFORM */}
        <div className="space-y-6">
          
          {/* Tab buttons switcher */}
          <div className="flex gap-2 p-1 bg-slate-100/50 rounded-2xl w-fit border border-slate-200">
            <button
              onClick={() => handleDisplayTab('officials')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === 'officials'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Government Officials
            </button>
            <button
              onClick={() => handleDisplayTab('institutions')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === 'institutions'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Public Agencies & Institutions
            </button>
          </div>

          {/* Interactive controls (Search & Sector filter) */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search index by entity name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-605"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full md:w-30 px-3.5 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-700 font-bold focus:outline-hidden focus:border-indigo-605"
              >
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
          </div>

          {/* SPREADSHEET TABLE GRID */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-indigo-950 border-b border-indigo-900 text-left">
                    <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-indigo-200 text-center w-16">
                      Rank
                    </th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-indigo-200">
                      Assessed Entity
                    </th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-indigo-200">
                      Category
                    </th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-indigo-200">
                      Supplemental Weight Score
                    </th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-indigo-200 text-center w-24">
                      Grade
                    </th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-indigo-200 text-center w-24">
                      Trend
                    </th>
                    <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-indigo-200 text-center w-36">
                      Index Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRatings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-sm text-slate-400 font-semibold font-mono">
                        No index results matched your query parameters.
                      </td>
                    </tr>
                  ) : (
                    filteredRatings.map((item) => {
                      // Score classification
                      const isHigh = item.score >= 75;
                      const isWarn = item.score >= 50 && item.score < 75;
                      
                      const scoreColorClass = isHigh ? 'text-indigo-600' : isWarn ? 'text-orange-600' : 'text-rose-600';
                      const barColorClass = isHigh ? 'bg-indigo-600' : isWarn ? 'bg-orange-500' : 'bg-rose-500';
                      
                      // Grade pill styling
                      const gradeStyle = 
                        item.grade === 'A' ? 'bg-indigo-50 border border-indigo-100/50 text-indigo-700' :
                        item.grade === 'B' ? 'bg-blue-50 border border-blue-500/20 text-blue-700' :
                        item.grade === 'C' ? 'bg-orange-50 border border-orange-500/10 text-orange-700' :
                        'bg-rose-50 border border-rose-500/20 text-rose-700';

                      // Sector tag color
                      const sectorTagStyle = 
                        item.sector === 'Finance' ? 'bg-purple-50 text-purple-700 border-purple-500/10' :
                        item.sector === 'Health' ? 'bg-emerald-50 text-emerald-700 border-emerald-500/10' :
                        item.sector === 'Education' ? 'bg-blue-50 text-blue-700 border-blue-500/10' :
                        item.sector === 'Judiciary' ? 'bg-rose-50 text-rose-700 border-rose-500/10' :
                        'bg-slate-50 text-slate-700 border-slate-500/10';

                      return (
                        <tr 
                          key={item.id}
                          className="hover:bg-slate-50/50 transition duration-150"
                        >
                          {/* Rank badge */}
                          <td className="py-4 px-6 text-center">
                            <span className={`inline-flex w-7 h-7 rounded-full items-center justify-center text-xs font-black font-mono shadow-3xs ${
                              item.rank === 1 ? 'bg-orange-500 text-white' :
                              item.rank === 2 ? 'bg-slate-400 text-white' :
                              item.rank === 3 ? 'bg-orange-700 text-white' :
                              'bg-slate-100 text-slate-500'
                            }`}>
                              {item.rank}
                            </span>
                          </td>

                          {/* Profile entity */}
                          <td className="py-4 px-6">
                            <div className="flex gap-3 items-center">
                              <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100/50">
                                {activeTab === 'officials' ? (
                                  <Users className="w-4 h-4 text-indigo-600" />
                                ) : (
                                  <Building className="w-4 h-4 text-indigo-600" />
                                )}
                              </div>
                              <div className="space-y-0.5">
                                <span className="block font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wide leading-tight">
                                  {item.name}
                                </span>
                                <span className="block text-[10px] text-slate-400 font-semibold leading-none">
                                  {item.subtitle}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Sector */}
                          <td className="py-4 px-6">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border rounded-full ${sectorTagStyle}`}>
                              {item.sector}
                            </span>
                          </td>

                          {/* Interactive Score/Progress Bar */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3.5 min-w-[120px]">
                              <span className={`text-sm sm:text-base font-extrabold font-mono shrink-0 ${scoreColorClass}`}>
                                {item.score}
                              </span>
                              <div className="h-1.5 bg-slate-100 rounded-full w-full overflow-hidden">
                                <div className={`h-full rounded-full ${barColorClass}`} style={{ width: `${item.score}%` }} />
                              </div>
                            </div>
                          </td>

                          {/* Grade Badge */}
                          <td className="py-4 px-6 text-center">
                            <span className={`text-xs font-black font-mono w-7 h-7 inline-flex items-center justify-center rounded-lg ${gradeStyle}`}>
                              {item.grade}
                            </span>
                          </td>

                          {/* Trend indicators */}
                          <td className="py-4 px-6 text-center">
                            <div className="inline-flex items-center justify-center gap-1 text-xs font-bold">
                              {item.trend.type === 'up' && (
                                <span className="text-emerald-700 flex items-center gap-0.5">
                                  <TrendingUp className="w-3.5 h-3.5" /> +{item.trend.value}
                                </span>
                              )}
                              {item.trend.type === 'down' && (
                                <span className="text-rose-600 flex items-center gap-0.5">
                                  <TrendingDown className="w-3.5 h-3.5" /> -{item.trend.value}
                                </span>
                              )}
                              {item.trend.type === 'flat' && (
                                <span className="text-slate-400 flex items-center gap-0.5">
                                  <Minus className="w-3.5 h-3.5" /> 0
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Trigger action */}
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => setSelectedEntity(item)}
                              className="text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:text-orange-500 border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-50 bg-white transition shadow-3xs cursor-pointer hover:border-orange-500/20"
                            >
                              Audit Detail
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </section>

      {/* 4. PERFORMANCE RATINGS ANALYSIS INFORMATION AND METHODOLOGY MODAL */}
      {selectedEntity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 shadow-2xl">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs animate-fade-in" onClick={() => setSelectedEntity(null)} />
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-lg p-8 relative shadow-2xl z-10 border border-slate-200 max-h-[85vh] flex flex-col justify-between animate-scale-in">
            
            <button 
              onClick={() => setSelectedEntity(null)}
              className="absolute p-2 rounded-full hover:bg-slate-100 top-4 right-4 text-slate-400 hover:text-slate-800 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6 overflow-y-auto pr-1">
              {/* Header */}
              <div className="space-y-2">
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-indigo-100 uppercase tracking-widest inline-block">
                  Verified Audit Assessment
                </span>
                <h3 className="text-xl font-extrabold text-indigo-950 uppercase tracking-wide">
                  {selectedEntity.name}
                </h3>
                <span className="block text-xs text-slate-400 font-mono font-semibold">
                  {selectedEntity.subtitle} · {selectedEntity.reviewedDate || 'Q1 2026 Audit'}
                </span>
              </div>

              {/* Assessment details stats mapping */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center space-y-0.5 shadow-3xs">
                  <span className="block text-xl font-black text-indigo-950 font-mono">{selectedEntity.score} / 100</span>
                  <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-widest">Weighted Score</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center space-y-0.5 shadow-3xs">
                  <span className="block text-xl font-black text-indigo-950 font-mono">Grade {selectedEntity.grade}</span>
                  <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-widest">Evaluation Class</span>
                </div>
              </div>

              {/* Comprehensive detail texts */}
              <div className="border-t border-slate-150 pt-4 space-y-2">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block">
                  Assessment Narrative & Feedback
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium">
                  {selectedEntity.details}
                </p>
              </div>

              {/* Methodology details */}
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4.5 flex gap-3.5 items-start">
                <Info className="w-5 h-5 text-orange-500 shrink-0 mt-0.5 animate-pulse" />
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-orange-850 uppercase tracking-wide">
                    How We Evaluated This
                  </span>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    Evaluations reflect 5 core fields: statutory delays, project audits transparency, local accessibility blocks, direct citizen surveys, and PIP contract performance data. Ratings are updated quarterly.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-4 shrink-0">
              <button
                onClick={() => setSelectedEntity(null)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase py-3.5 rounded-xl tracking-wider transition text-center cursor-pointer shadow-sm"
              >
                Close Audit View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
