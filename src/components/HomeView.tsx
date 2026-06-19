import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  CircleAlert, 
  ArrowRight, 
  Users, 
  MapPin, 
  Building, 
  TrendingUp, 
  Eye, 
  Flag, 
  Briefcase, 
  Globe, 
  Award, 
  ShieldAlert, 
  CheckCircle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Megaphone,
  X,
  Info,
  Mail
} from 'lucide-react';
import { causesData } from '../data/amaniData';
import NewsletterPopup from './NewsletterPopup';

interface HomeViewProps {
  setActivePage: (page: string) => void;
  setSelectedCauseId: (id: string | null) => void;
}

export default function HomeView({ setActivePage, setSelectedCauseId }: HomeViewProps) {
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'backstory' | 'history' | 'gallery'>('backstory');
  const [forceNewsletter, setForceNewsletter] = useState(false);

  // Customisable transparent/image background state for the hero section
  const [heroBgImage, setHeroBgImage] = useState<string>(() => {
    return localStorage.getItem('amani_hero_bg') || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600';
  });
  const [useBgImage, setUseBgImage] = useState<boolean>(() => {
    const saved = localStorage.getItem('amani_use_hero_bg');
    return saved !== 'false'; // default to true
  });
  const [overlayOpacity, setOverlayOpacity] = useState<number>(() => {
    const saved = localStorage.getItem('amani_hero_opacity');
    return saved ? parseFloat(saved) : 0.85;
  });
  const [isBgCustomizerOpen, setIsBgCustomizerOpen] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  
  const stats = [
    { value: '16', label: 'Regions Active', desc: 'Full coordination' },
    { value: '275+', label: 'Constituencies', desc: 'Grassroots reach' },
    { value: '3', label: 'Tier Framework', desc: 'National to community' },
    { value: 'GHS 4.8M', label: 'Mobilized', desc: 'Local direct audits' }
  ];

  const stripFeatures = [
    {
      icon: Eye,
      title: 'Our Vision',
      desc: 'Transparent, decentralized communities driving sustainable resource development in Ghana.'
    },
    {
      icon: Flag,
      title: 'Our Mission',
      desc: 'Mobilizing technical, financial, social, and human resources to supplement state projects.'
    },
    {
      icon: Briefcase,
      title: 'Active Operations',
      desc: 'Working through appointed executives at regional and constituency levels to track needs.'
    },
    {
      icon: Globe,
      title: 'Traditional Synergy',
      desc: 'Coordinating directly with Chiefs and Assembly Members to build local trust frameworks.'
    },
    {
      icon: Award,
      title: 'Audited Delivery',
      desc: 'Publishing quarterly financial and project trackers transparently to all stakeholders.'
    }
  ];

  const coreValues = [
    { title: 'Community-Centered Delivery', desc: 'All local strategies are proposed and evaluated by the resident Community Trust.' },
    { title: 'Absolute Audit Transparency', desc: 'Quarterly transaction accounts are presented to Chiefs, Assembly members, and donors.' },
    { title: 'Inter-Agency Synergy', desc: 'We do not run paralleled states; we supplement governmental and traditional structures.' },
    { title: 'Sustained Local Sourcing', desc: 'Investing in local skills, workers, and materials to ensure long-term community value.' }
  ];

  const organizationTiers = [
    {
      level: 'National Level',
      title: 'National Secretariat',
      desc: 'Provides policy design, strategic fundraising, and full-audit program supervision nationwide.',
      theme: 'border-l-4 border-blue-500 bg-[#1e293b12]'
    },
    {
      level: 'Regional Level',
      title: 'Regional Development Councils',
      desc: 'Present in all 16 regions. Directs district desks and monitors stakeholder relations.',
      theme: 'border-l-4 border-emerald-500 bg-[#05966912]'
    },
    {
      level: 'District Level',
      title: 'District & Constituency Councils',
      desc: 'Operates in 275+ constituencies. Pinpoints critical infrastructural and dry-farming lacks.',
      theme: 'border-l-4 border-amber-500 bg-[#d9770612]'
    }
  ];

  const workingCommittees = [
    { title: 'Humanitarian & Healthcare Panel', icon: Heart, color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    { title: 'Agriculture & Livelihood Panel', icon: Sparkles, color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
    { title: 'Employee & Skills Panel', icon: Users, color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    { title: 'Finance & Resource Management', icon: TrendingUp, color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
    { title: 'Environment, WASH & Climate', icon: Globe, color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' },
    { title: 'Civic Education & Outreach', icon: Megaphone, color: 'bg-rose-500/10 text-rose-500 border-rose-500/20' },
    { title: 'Free Legal Aid & Family Mediation', icon: ShieldAlert, color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' },
    { title: 'Implementation Partners (PIPs)', icon: CheckCircle, color: 'bg-slate-500/10 text-slate-600 border-slate-500/20' }
  ];

  const chronologicalInterventions = [
    { year: '2024', title: 'Upper West borehole networks', tag: 'WASH', desc: 'Facilitated drilling 12 solar deepwater wells, providing safe access to 3,200 residents.' },
    { year: '2024', title: 'Central schools upgrade panels', tag: 'Education', desc: 'Equipped two community primary schools with storm-proof roofing and modular desks.' },
    { year: '2023', title: 'Volta legal assistance outreach', tag: 'Legal Aid', desc: 'Hosted 6 free family law and land boundary clinics assisting over 1,800 citizens.' },
    { year: '2023', title: 'Ashanti cocoa seedling boost', tag: 'Agriculture', desc: 'Distributed smart bio-fertilizers and organic training support to 420 smallholder farmers.' }
  ];

  const galleryImages = [
    { id: 1, label: 'Community water launch' },
    { id: 2, label: 'Traditional council briefing' },
    { id: 3, label: 'Healthcare compounds delivery' },
    { id: 4, label: 'Farmers cooperative summit' },
    { id: 5, label: 'Civic training booklets guide' },
    { id: 6, label: 'Assembly coordination meet' }
  ];

  const handleDonateClick = (causeId: string) => {
    setSelectedCauseId(causeId);
    setActivePage('donate');
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-slate-50">
      
      {/* 1. HERO SECTION */}
      <section 
        className={`relative overflow-hidden py-20 xl:py-28 px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
          useBgImage ? 'text-white' : 'text-slate-900 bg-transparent'
        }`}
        style={useBgImage ? {
          backgroundImage: `url(${heroBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : {}}
      >
        {/* Dynamic Overlay for Unsplash Image */}
        {useBgImage && (
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-slate-950 to-indigo-900 transition-opacity duration-300 pointer-events-none"
            style={{ opacity: overlayOpacity }}
          />
        )}
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            
            <h1 className={`text-3xl sm:text-4xl xl:text-5xl font-sans font-black tracking-tight leading-tight uppercase ${
              useBgImage ? 'text-white' : 'text-indigo-950'
            }`}>
              Supporting the Growth <br />
              <span className="text-orange-500">of Ghanaian Towns.</span>
            </h1>
            
            <p className={`text-base sm:text-lg max-w-xl leading-relaxed ${
              useBgImage ? 'text-indigo-100' : 'text-slate-600'
            }`}>
              AMANI connects traditional rulers, elected regional coordination councils, and progressive donors to execute audited local projects. Choose a specific community and see your support deployed with absolute transparency.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => setActivePage('donate')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all active:translate-y-0.5 cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-current" />
                Support your Town
              </button>
              <button 
                onClick={() => setActivePage('about')}
                className={`border px-6 py-3.5 rounded-xl flex items-center gap-2 transition cursor-pointer ${
                  useBgImage 
                    ? 'border-indigo-500 hover:border-orange-400 hover:text-orange-400 text-indigo-200 bg-white/5' 
                    : 'border-slate-300 hover:border-indigo-600 text-slate-700 hover:text-indigo-600 bg-white'
                }`}
              >
                Explore Who We Are
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                id="open-hero-customizer-btn"
                onClick={() => setIsBgCustomizerOpen(true)}
                className={`border px-5 py-3.5 rounded-xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  useBgImage
                    ? 'border-indigo-500/30 hover:border-orange-400 hover:text-orange-400 text-indigo-200 bg-white/5'
                    : 'border-slate-300 hover:border-indigo-600 text-slate-700 hover:text-indigo-600 bg-white'
                }`}
              >
                <Eye className="w-4 h-4" />
                Configure Hero BG
              </button>
            </div>

            {/* Micro Stats inside Hero */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t ${
              useBgImage ? 'border-indigo-800' : 'border-slate-200'
            }`}>
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#f97316]">{stat.value}</span>
                  <span className={`block text-xs font-semibold uppercase tracking-wider ${
                    useBgImage ? 'text-white' : 'text-slate-800'
                  }`}>{stat.label}</span>
                  <span className={`block text-[10px] ${
                    useBgImage ? 'text-indigo-300' : 'text-slate-500'
                  }`}>{stat.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hierarchy preview container */}
          <div className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 shadow-2xl relative transition-all duration-300 ${
            useBgImage 
              ? 'bg-white/5 backdrop-blur-md border border-white/10' 
              : 'bg-white border border-slate-200'
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-5 blur-3xl pointer-events-none" />
            <span className={`block text-xs font-bold tracking-widest uppercase mb-4 ${
              useBgImage ? 'text-orange-400' : 'text-orange-600'
            }`}>
              AMANI Operational Infrastructure
            </span>
            <div className="space-y-3">
              <div className={`flex items-start gap-3.5 p-3.5 rounded-xl ${
                useBgImage ? 'bg-white/5 border border-white/10' : 'bg-slate-50 border border-slate-100'
              }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base ${
                  useBgImage 
                    ? 'bg-indigo-500/30 border border-indigo-500/50 text-indigo-300' 
                    : 'bg-indigo-50 border border-indigo-100 text-indigo-600'
                }`}>
                  N
                </div>
                <div>
                  <h4 className={`text-sm font-bold leading-none ${useBgImage ? 'text-white' : 'text-indigo-950'}`}>National Secretariat</h4>
                  <span className={`text-[11px] block mt-1 ${useBgImage ? 'text-indigo-200' : 'text-slate-550'}`}>Audit protocols, major grants lobby & legal aid supervision</span>
                </div>
              </div>
              <div className={`flex items-start gap-3.5 p-3.5 rounded-xl ${
                useBgImage ? 'bg-white/5 border border-white/10' : 'bg-slate-50 border border-slate-100'
              }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base ${
                  useBgImage 
                    ? 'bg-orange-500/20 border border-orange-500/40 text-orange-400' 
                    : 'bg-orange-50 border border-orange-100 text-orange-600'
                }`}>
                  R
                </div>
                <div>
                  <h4 className={`text-sm font-bold leading-none ${useBgImage ? 'text-white' : 'text-indigo-950'}`}>Regional Development Councils</h4>
                  <span className={`text-[11px] block mt-1 ${useBgImage ? 'text-indigo-200' : 'text-slate-550'}`}>16 regional executive desks coordinating constituency requests</span>
                </div>
              </div>
              <div className={`flex items-start gap-3.5 p-3.5 rounded-xl ${
                useBgImage ? 'bg-white/5 border border-white/10' : 'bg-slate-50 border border-slate-100'
              }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base ${
                  useBgImage 
                    ? 'bg-teal-500/20 border border-teal-500/40 text-teal-305' 
                    : 'bg-teal-50 border border-teal-100 text-teal-600'
                }`}>
                  C
                </div>
                <div>
                  <h4 className={`text-sm font-bold leading-none ${useBgImage ? 'text-white' : 'text-indigo-950'}`}>Community Development Trusts</h4>
                  <span className={`text-[11px] block mt-1 ${useBgImage ? 'text-indigo-200' : 'text-slate-550'}`}>Direct local coordination through Assembly Members & traditional Chiefs</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. STORY SLEEK SLIDE STRIP */}
      <section className="bg-slate-900 border-t border-slate-800 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-xs font-bold text-orange-400 uppercase tracking-wider mb-3">
            <ChevronRight className="w-4 h-4 animate-bounce" />
            AMANI Core Pillars Scroll
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-teal-900">
            {stripFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={idx}
                  className="min-w-[240px] md:min-w-[280px] bg-slate-850 border border-slate-800 rounded-2xl p-5 hover:border-orange-500/40 transition duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <h4 className="text-white text-sm font-bold font-display uppercase tracking-wide mb-1 select-none">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed select-none">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Consolidated Backstory & Values Summary with Popup Modal */}
      <section className="bg-white border-y border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest block font-mono">
            Bridging Governments & Traditional Towns
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-950 uppercase tracking-tight">
            Our Supplemental Local Development Model
          </h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto rounded" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            AMANI operates as a transparent financial and technical catalyst in Ghana. We coordinate directly with local traditional Chiefs and regional desks to execute audited community projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              id="view-backstory-btn"
              onClick={() => setIsStoryOpen(true)}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs uppercase px-5 py-3 rounded-xl tracking-wider transition cursor-pointer border border-indigo-100 flex items-center gap-2"
            >
              <Info className="w-4 h-4" />
              Read Our Full Story, Values & Milestones
            </button>
            <button
              id="trigger-newsletter-btn"
              onClick={() => setForceNewsletter(true)}
              className="bg-orange-55 hover:bg-orange-100 text-orange-600 font-bold text-xs uppercase px-5 py-3 rounded-xl tracking-wider transition cursor-pointer border border-orange-100 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Subscribe to Dispatch
            </button>
          </div>
        </div>
      </section>

      {/* DE-CLUTTER STORY MODAL */}
      {isStoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs animate-fade-in" onClick={() => setIsStoryOpen(false)} />
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-2xl p-6 sm:p-8 relative shadow-2xl z-10 border border-slate-200 max-h-[90vh] flex flex-col justify-between animate-scale-in">
            
            <button 
              onClick={() => setIsStoryOpen(false)}
              className="absolute p-2 rounded-full hover:bg-slate-100 top-4 right-4 text-slate-400 hover:text-slate-800 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 overflow-y-auto pr-2">
              {/* Header */}
              <div className="space-y-1">
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-indigo-100 uppercase tracking-widest inline-block">
                  About AMANI Platform
                </span>
                <h3 className="text-xl font-extrabold text-indigo-950 uppercase tracking-wide">
                  Mission, Values & Historical Milestones
                </h3>
              </div>

              {/* Modal Tabs switcher */}
              <div className="flex gap-2 p-1 bg-slate-100/50 rounded-2xl w-full border border-slate-200">
                <button
                  onClick={() => setModalTab('backstory')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                    modalTab === 'backstory' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Our Backstory & Values
                </button>
                <button
                  onClick={() => setModalTab('history')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                    modalTab === 'history' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Timeline Trace
                </button>
                <button
                  onClick={() => setModalTab('gallery')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                    modalTab === 'gallery' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Photo Logs
                </button>
              </div>

              {/* Tab Contents */}
              {modalTab === 'backstory' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-extrabold text-[#f97316] uppercase tracking-wide">
                      Bridging Traditional Authorities to Communities
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                      Ghanaian communities frequently encounter operational gaps in supplemental financing. AMANI functions as an executive catalyst. By integrating traditional authorities directly with community trusts, we coordinate funding pathways, prevent budget leakages, and implement projects through accredited experts.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      We focus on six operational categories, from community clinics and primary water units to educational blocks, cocoa farming inputs, and mobile legal aid services.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    <h4 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wide">
                      Our Operating Core Compass
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {coreValues.map((value, idx) => (
                        <div key={idx} className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                          <div>
                            <h5 className="font-extrabold text-indigo-950 text-xs sm:text-sm uppercase tracking-wide">
                              {value.title}
                            </h5>
                            <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                              {value.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modalTab === 'history' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-extrabold text-[#f97316] uppercase tracking-wide">
                    Regional Interventions Accomplished
                  </h4>
                  <div className="space-y-3.5">
                    {chronologicalInterventions.map((item, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex gap-4 items-start">
                        <span className="text-lg font-black font-mono text-indigo-600 shrink-0">
                          {item.year}
                        </span>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-indigo-950 uppercase">
                              {item.title}
                            </span>
                            <span className="bg-indigo-50 border border-indigo-100 text-[9px] text-[#2563eb] select-none font-bold px-1.5 py-0.5 rounded-md uppercase">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalTab === 'gallery' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-extrabold text-[#f97316] uppercase tracking-wide">
                    Live Record Logs
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {galleryImages.map((img) => (
                      <div key={img.id} className="relative h-28 bg-indigo-950 rounded-xl flex items-center justify-center border border-slate-100 overflow-hidden group">
                        <div className="absolute inset-0 bg-indigo-900/90 group-hover:scale-105 transition duration-300" />
                        <div className="relative text-center p-2 z-10 space-y-1">
                          <Globe className="w-5 h-5 text-orange-400 mx-auto opacity-80" />
                          <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-wide text-slate-100 leading-tight">
                            {img.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            <div className="pt-4 border-t border-slate-100 mt-4">
              <button
                onClick={() => setIsStoryOpen(false)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase py-3.5 rounded-xl tracking-wider transition text-center cursor-pointer shadow-sm"
              >
                Close Story & Values
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. ACTIVE CAUSES SHOWCASE */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest block font-mono">
              Supplemental Funding Budgets
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-indigo-950 uppercase">
              Targeted Financing Causes Tracking
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded" />
            <p className="text-sm text-slate-500 leading-relaxed">
              Every card below represents an audited operational bucket. Use any Community Reference Code to assign your support directly to a chosen village or zone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {causesData.map((cause) => {
              const percentage = Math.round((cause.raisedAmount / cause.goalAmount) * 100);
              return (
                <div 
                  key={cause.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Fake illustration placeholder with gradient theme */}
                    <div className="h-28 bg-indigo-900 relative flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-850 to-indigo-950 opacity-80" />
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <Heart className="w-5 h-5 text-orange-400 fill-current" />
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h4 className="text-base font-extrabold text-indigo-950 min-h-[40px] uppercase tracking-wide">
                        {cause.name}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed min-h-[64px]">
                        {cause.description}
                      </p>

                      {/* Progress bar tracking */}
                      <div className="space-y-1.5 pt-2">
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-600 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-400">
                          <span>GHS {cause.raisedAmount.toLocaleString()} Raised</span>
                          <span className="text-indigo-600">{percentage}% Goal</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <button
                      onClick={() => handleDonateClick(cause.id)}
                      className="w-full bg-indigo-600 hover:bg-orange-500 text-white font-extrabold text-xs uppercase px-4 py-3 border border-transparent rounded-xl text-center tracking-wider transition-all duration-150 shadow-md shadow-indigo-100 hover:shadow-orange-50"
                    >
                      Fund this Cause
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* APPLICATION SECTION */}

      {/* 8. PIP & LEADER APPLICATION CARDS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        <div className="bg-indigo-900 text-white p-8 sm:p-10 rounded-3xl border border-indigo-950 relative overflow-hidden shadow-xl flex flex-col justify-between">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl" />
          
          <div className="space-y-4 relative z-10">
            <span className="text-orange-450 text-xs font-bold uppercase tracking-widest block font-mono">
              For Registered Experts
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
              Become a Project Implementation Partner (PIP)
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded" />
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Once donations are mobilized, project allocation goes strictly to registered PIPs. We enroll licensed local borehole drillers, school structural carpenters, professional clinicians, and volunteer attorneys to implement safe community-directed works.
            </p>
          </div>

          <div className="pt-6 relative z-10">
            <button 
              onClick={() => setActivePage('contact')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase px-6 py-3 rounded-full tracking-widest shadow-md transition"
            >
              Submit PIP Dossier
            </button>
          </div>
        </div>

        <div className="bg-orange-50 p-8 sm:p-10 rounded-3xl border border-orange-100 relative overflow-hidden shadow-xl flex flex-col justify-between">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl" />
          
          <div className="space-y-4 relative z-10">
            <span className="text-orange-600 text-xs font-bold uppercase tracking-widest block font-mono">
              For Patriotic Officials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-indigo-950 uppercase">
              Lead Your Community Secretariat Desk
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded" />
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
              Are you an Assembly Member, progressive municipal planner, or local traditional ruler? Join our expanding network as a regional coordinator or constituency executive. Guide priority audits for your local jurisdiction.
            </p>
          </div>

          <div className="pt-6 relative z-10">
            <button 
              onClick={() => setActivePage('contact')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase px-6 py-3 rounded-full tracking-widest shadow-md transition"
            >
              Apply as Local Leader
            </button>
          </div>
        </div>

      </section>

      {/* 9. DONATE FAST CALL VALUE BAND */}
      <section className="bg-orange-500 px-6 sm:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-white font-black text-xl sm:text-2xl uppercase tracking-wider">
            Ready to Supplemental Fund a Ghana Town?
          </h2>
          <p className="text-indigo-950/95 font-medium text-sm">
            Our transparent reference tracking code routes 100% of your contributions directly to designated municipal blocks.
          </p>
        </div>
        <button 
          onClick={() => setActivePage('donate')}
          className="bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs uppercase px-8 py-3.5 rounded-full tracking-wider transition shrink-0 shadow-lg flex items-center gap-2"
        >
          <Heart className="w-4 h-4 text-orange-400 fill-current" />
          Donate to a Cause
        </button>
      </section>

      {/* BACKGROUND IMAGE CONFIGURATION MODAL */}
      {isBgCustomizerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setIsBgCustomizerOpen(false)} />
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-md p-6 relative shadow-2xl z-10 border border-slate-200 animate-scale-in">
            
            <button 
              onClick={() => setIsBgCustomizerOpen(false)}
              className="absolute p-2 rounded-full hover:bg-slate-100 top-4 right-4 text-slate-400 hover:text-slate-800 transition cursor-pointer"
              aria-label="Close background configuration"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="space-y-1">
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-indigo-100 uppercase tracking-widest inline-block">
                  Aesthetic Controls
                </span>
                <h3 className="text-lg font-extrabold text-indigo-950 uppercase tracking-wide">
                  Hero Background Customiser
                </h3>
                <p className="text-slate-500 text-xs">
                  Make the hero background fully transparent (exposing the site canvas) or configure an un-copyrighted backdrop image of your choice.
                </p>
              </div>

              {/* Toggle switch for Image vs Transparent Mode */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/60 rounded-2xl">
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wide text-indigo-950">
                    Use Background Image
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    If off, background is 100% transparent.
                  </span>
                </div>
                <button
                  onClick={() => {
                    const nextVal = !useBgImage;
                    setUseBgImage(nextVal);
                    localStorage.setItem('amani_use_hero_bg', String(nextVal));
                  }}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                    useBgImage ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    useBgImage ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {useBgImage && (
                <div className="space-y-4 animate-scale-in">
                  
                  {/* Slider for opacity */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                        Overlay Dark Tint Opacity
                      </span>
                      <span className="font-mono font-bold text-indigo-600">
                        {Math.floor(overlayOpacity * 100)}%
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05"
                      value={overlayOpacity}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setOverlayOpacity(val);
                        localStorage.setItem('amani_hero_opacity', String(val));
                      }}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  {/* Preset selections */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                      Stunning Presets (1-Click)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'Ghana Lush Valley', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600' },
                        { name: 'Warm Savannah', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600' },
                        { name: 'Earthy Golden', url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1600' },
                        { name: 'Minimalist Wave Mesh', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600' },
                      ].map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => {
                            setHeroBgImage(preset.url);
                            setCustomUrlInput(preset.url);
                            localStorage.setItem('amani_hero_bg', preset.url);
                          }}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            heroBgImage === preset.url 
                              ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-bold' 
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                          }`}
                        >
                          <span className="block text-[10px] truncate uppercase tracking-wide">{preset.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Manual input */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                      Custom Image URL
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="https://example.com/photo.jpg"
                        value={customUrlInput || heroBgImage}
                        onChange={(e) => setCustomUrlInput(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          if (customUrlInput) {
                            setHeroBgImage(customUrlInput);
                            localStorage.setItem('amani_hero_bg', customUrlInput);
                          }
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase px-3 py-2 rounded-xl"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                </div>
              )}

              <button
                onClick={() => setIsBgCustomizerOpen(false)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase py-3.5 rounded-xl tracking-wider transition text-center cursor-pointer shadow-sm"
              >
                Done
              </button>

            </div>
          </div>
        </div>
      )}

      {/* Newsletter dialog popup modal */}
      <NewsletterPopup 
        forceShow={forceNewsletter} 
        onClose={() => setForceNewsletter(false)} 
      />

    </div>
  );
}
