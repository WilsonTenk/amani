import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Linkedin, 
  Twitter, 
  Mail, 
  User, 
  ChevronRight, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Award,
  BookOpen,
  Eye,
  Flag,
  CalendarCheck,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { leadersData } from '../data/amaniData';
import { LeaderProfile } from '../types';

const amaniFaqs = [
  {
    q: "How does AMANI ensure that 100% of my donation reaches my selected town?",
    a: "AMANI operates through a secure, designated Community Reference Code (CRC) system. Every developmental town has its specific identifier (e.g. GA-012 for Ga East, AR-004 for Kwadaso). When you support a cause and select your township, the fund is locked directly to that community trust ledger, monitored continuously by local rulers and accessible only for authorized work co-signed by verified Assembly Members."
  },
  {
    q: "Is AMANI a political or government-run body?",
    a: "No, AMANI is a registered, 100% non-partisan and non-profit organization. While we coordinate closely with elected Regional Councils and District Assemblies to align auxiliary project priorities, we operate completely independently of government controls. Our direct-scoring rating indices for public officials are entirely unbiased, performance-based, and driven by raw on-site citizen feedback."
  },
  {
    q: "Who manages the local Community Development Trusts?",
    a: "Each Trust has co-operative leadership, composed of three core groups of trustees: traditional Chiefs representing cultural heritage, elected local Assembly Members representing town residents, and certified Project Implementation Partner (PIP) technical supervisors. This balance blocks single-party or political dominance of any community development budget."
  },
  {
    q: "Can I verify receipts, contractor details, or active status of completed projects?",
    a: "Absolutely. Transparency is our foundational mandate. We publish quarterly, audited financial records of all projects. You can view contractor names, on-site photographs, actual brick-and-mortar receipts, and technical inspection co-signature sheets in our public repository. We believe local developmental tracking should be as robust as a public corporate treasury."
  },
  {
    q: "How are regional project contractors (PIPs) selected & vetted?",
    a: "Contractors must hold a certified national engineering/construction license, pass a local trust background security scan, and verify successful local builds. Local working committees recommend bids, which are checked independently by structural engineers at the AMANI National Secretariat. Payment is released progressively only upon physical milestone sign-offs."
  },
  {
    q: "What types of supplemental projects does AMANI prioritize?",
    a: "We address six critical localized pillars where main institutional budgets face delayed execution: community-level health clinics (CHPs), basic primary school roof repairs and furniture retooling, clean deep-borehole drilling (WASH), micro-trading seed grants for women-led cooperatives (e.g. Shea butter extraction), public civic briefing outlets, and free mobile legal mediation clinics."
  }
];

interface AboutViewProps {
  initialSection?: 'what' | 'leadership';
}

export default function AboutView({ initialSection = 'what' }: AboutViewProps) {
  const [selectedLeader, setSelectedLeader] = useState<LeaderProfile | null>(null);
  const [activeTab, setActiveTab ] = useState<'what' | 'leadership'>(initialSection);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  useEffect(() => {
    setActiveTab(initialSection);
  }, [initialSection]);

  return (
    <div className="bg-slate-50">
      
      {/* Subpage Sticky Navigator */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('what')}
              className={`py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
                activeTab === 'what'
                  ? 'border-indigo-600 text-indigo-600 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-indigo-600'
              }`}
            >
              What we do
            </button>
            <button
              onClick={() => setActiveTab('leadership')}
              className={`py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
                activeTab === 'leadership'
                  ? 'border-indigo-600 text-indigo-600 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-indigo-605'
              }`}
            >
              Leadership
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'what' && (
        <>
      
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
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="text-[11px] font-bold text-orange-600 tracking-widest uppercase font-mono bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full inline-block">
              About our Foundation
            </div>
            <h1 className={`text-3xl sm:text-4xl xl:text-5xl font-serif italic leading-tight tracking-tight ${
              useBgImage ? 'text-white' : 'text-indigo-950'
            }`}>
              Supplementing Governance, <br />
              <span className="text-orange-500 not-italic font-sans font-black uppercase">Enabling Citizen Progress.</span>
            </h1>
            <div className="w-12 h-1 bg-orange-500 rounded" />
            <p className={`text-sm sm:text-base leading-relaxed ${
              useBgImage ? 'text-indigo-100' : 'text-slate-600'
            }`}>
              Founded in 2018, AMANI was instituted to counter a persistent development bottleneck in Sub-Saharan communities: local citizens being detached from state opportunities and private development aids.
            </p>
            <p className={`text-sm leading-relaxed ${
              useBgImage ? 'text-indigo-100' : 'text-slate-600'
            }`}>
              By launching registered Community Trusts overseen by local Assembly Members and Traditional Rulers, AMANI has successfully bridged the coordination gap. Today, AMANI coordinates financial resources, directs targeted civil aid works, and audits local execution to supplement ministerial goals in all 16 regions of Ghana.
            </p>
          </div>

          <div className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm ${
            useBgImage ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'
          }`}>
            <span className="text-xs font-bold text-orange-600 tracking-widest uppercase block">
              Our Vision Statement
            </span>
            <p className={`text-sm leading-relaxed italic ${
              useBgImage ? 'text-indigo-105' : 'text-slate-600'
            }`}>
              "We envision self-sustaining, empowered Ghanaian communities driving their own infrastructure, with full municipal accountability, transparent funds tracking, and progressive local synergy."
            </p>
            <div className={`pt-4 flex gap-4 text-xs font-semibold ${
              useBgImage ? 'border-t border-white/10 text-white' : 'border-t border-slate-200 text-slate-800'
            }`}>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-orange-500" /> 100% Non-Partisan</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Traditional Synergy</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CORE OPERATIONAL ROADMAPS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest block font-mono">
            Executive Commitments
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-indigo-950 uppercase">
            Strategic Delivery Roadmaps
          </h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm hover:border-indigo-500/20 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="text-base font-extrabold text-indigo-950 uppercase tracking-wide">
              Supplemental Funding Core
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Lobbying the state and international grantors to supplement isolated community water systems, rural clinics, educational storm roofs, and farm cooperative stores.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm hover:border-indigo-500/20 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Flag className="w-5 h-5" />
            </div>
            <h4 className="text-base font-extrabold text-indigo-950 uppercase tracking-wide">
              Decentralized Civic Education
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Disseminating government guidelines (policies, sanitation alerts, student loan applications, health insurance registrations) to our high-density interior communities.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm hover:border-indigo-500/20 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-extrabold text-indigo-950 uppercase tracking-wide">
              Direct Civil Audits
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Publishing independent quarterly assessments of region, district, and national services (such as our Bloomberg-feel rating indices) to boost general civic transparency.
            </p>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE FAQ ACCORDION COMPONENT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-205 bg-slate-100/30" id="amani-faq-accordion-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left FAQ Sidebar Column */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-36">
              <div className="space-y-4">
                <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest block font-mono">
                  Everything you should know
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-950 uppercase tracking-tight">
                  Frequently Asked Questions
                </h2>
                <div className="w-12 h-1 bg-orange-500 rounded" />
                <p className="text-slate-600 text-sm leading-relaxed">
                  We maintain radical transparency. Read through answers concerning our fiscal ledgers, non-partisan operations, community reference keys, and how we empower local traditional structures.
                </p>
              </div>

              {/* Informative Help callout card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wide">
                    Still have questions?
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Our national secretariat team and region-based executive officers are happy to address specific questions directly.
                </p>
                <a 
                  href="mailto:secretariat@amani.org.gh"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-650 hover:text-orange-550 transition uppercase tracking-wide"
                >
                  Message our Secretariat
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right FAQ Accordion Column */}
            <div className="lg:col-span-7 space-y-3">
              {amaniFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className={`bg-white rounded-2xl border transition duration-300 ${
                      isOpen ? 'border-indigo-500 shadow-md ring-1 ring-indigo-500/10' : 'border-slate-200 hover:border-slate-350 shadow-3xs'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <h4 className={`text-xs sm:text-sm font-extrabold uppercase tracking-wide transition-colors ${
                        isOpen ? 'text-indigo-600 font-black' : 'text-indigo-950 hover:text-indigo-600'
                      }`}>
                        {faq.q}
                      </h4>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-indigo-50 text-indigo-650 rotate-180' : 'bg-slate-50 text-slate-400'
                      }`}>
                        <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium border-t border-slate-100 pt-3.5 bg-slate-50/40 rounded-b-2xl">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

        </>
      )}

      {activeTab === 'leadership' && (
        <section id="leaders-board" className="bg-slate-100/50 py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-4 max-w-2xl">
            <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest block font-mono">
              AMANI Leadership Board
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-indigo-950 uppercase">
              National & Regional Executive Board Profiles
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded" />
            <p className="text-sm text-slate-500 leading-relaxed">
              Click any picture or card block to toggle the comprehensive executive profile modal overlay. Explore stats, responsibilities, and secure contacts.
            </p>
          </div>

          {/* Leaders board list broken into tiers */}
          <div className="space-y-12">
            
            {/* National Execs */}
            <div className="space-y-6">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase block border-b border-slate-200 pb-2">
                Executive Leadership Desk
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {leadersData.filter(l => l.role.includes('National')).map((leader) => (
                  <div 
                    key={leader.id}
                    onClick={() => setSelectedLeader(leader)}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Interactive banner block */}
                      <div className="h-20 bg-indigo-950 relative">
                        <div className="absolute h-1.5 bottom-0 left-0 right-0 bg-orange-500" />
                        <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-full bg-indigo-900 border-4 border-white flex items-center justify-center shadow-md">
                          <User className="w-7 h-7 text-orange-400" />
                        </div>
                      </div>

                      <div className="pt-10 px-6 pb-6 space-y-2">
                        <span className="text-[10px] text-indigo-650 font-extrabold uppercase tracking-widest block">
                          {leader.role}
                        </span>
                        <h4 className="text-base font-extrabold text-indigo-950 hover:text-orange-500 transition">
                          {leader.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">{leader.since}</span>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed pt-2">
                          {leader.bio}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 flex justify-between items-center text-xs font-bold uppercase text-indigo-600 border-t border-slate-100 pt-4">
                      <span>View Bio & Stats</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Chairs */}
            <div className="space-y-6">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase block border-b border-slate-200 pb-2">
                Regional Development Chairs Desk
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {leadersData.filter(l => l.role.includes('Regional')).map((leader) => (
                  <div 
                    key={leader.id}
                    onClick={() => setSelectedLeader(leader)}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Interactive banner block */}
                      <div className="h-20 bg-indigo-950 relative">
                        <div className="absolute h-1.5 bottom-0 left-0 right-0 bg-orange-505" />
                        <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-full bg-indigo-900 border-4 border-white flex items-center justify-center shadow-md">
                          <User className="w-7 h-7 text-orange-400" />
                        </div>
                      </div>

                      <div className="pt-10 px-6 pb-6 space-y-2">
                        <span className="text-[10px] text-indigo-650 font-extrabold uppercase tracking-widest block">
                          {leader.role}
                        </span>
                        <h4 className="text-base font-extrabold text-indigo-950 hover:text-orange-505 transition">
                          {leader.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">{leader.since}</span>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed pt-2">
                          {leader.bio}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 flex justify-between items-center text-xs font-bold uppercase text-indigo-600 border-t border-slate-100 pt-4">
                      <span>View Bio & Stats</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>
      )}

      {/* 4. MODAL POPUP FOR LEADERS PROFILE DETAILED VIEW */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLeader(null)}
              className="absolute inset-0 bg-black animate-fade-in"
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-xl relative shadow-2xl z-10 border border-slate-200 max-h-[90vh] flex flex-col"
            >
              {/* Header Banner */}
              <div className="h-24 bg-indigo-950 relative shrink-0">
                <div className="absolute h-1.5 bottom-0 left-0 right-0 bg-orange-500" />
                <div className="absolute -bottom-8 left-8 w-18 h-18 rounded-full bg-indigo-900 border-4 border-white flex items-center justify-center shadow-md animate-scale-up">
                  <User className="w-8 h-8 text-orange-400" />
                </div>
                <button 
                  onClick={() => setSelectedLeader(null)}
                  className="absolute p-2 rounded-full hover:bg-white/10 top-4 right-4 text-white hover:text-orange-400 transition"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Contents */}
              <div className="pt-12 px-8 pb-8 overflow-y-auto space-y-6">
                <div>
                  <span className="text-xs font-bold text-indigo-650 tracking-wider uppercase block">
                    {selectedLeader.role}
                  </span>
                  <h3 className="text-2xl font-extrabold text-indigo-950 uppercase tracking-wide">
                    {selectedLeader.name}
                  </h3>
                  <span className="text-xs text-slate-405 block font-semibold uppercase font-mono mt-1">
                    {selectedLeader.since}
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block mb-1">
                    Direct Responsibilities & Mandates
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {selectedLeader.bio}
                  </p>
                </div>

                {/* Regional Metrics / Dynamic Stats */}
                <div className="grid grid-cols-2 gap-3.5 pt-2">
                  {selectedLeader.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center space-y-0.5 shadow-3xs">
                      <span className="block text-base sm:text-lg font-black text-indigo-955">
                        {stat.val}
                      </span>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        {stat.lbl}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Social Handles & Direct Email */}
                <div className="pt-4 border-t border-slate-250 flex flex-wrap gap-3">
                  {selectedLeader.linkedinUrl && (
                    <a 
                      href={selectedLeader.linkedinUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 rounded-xl text-xs font-semibold text-slate-500 transition bg-white shadow-3xs"
                    >
                      <Linkedin className="w-3.5 h-3.5 shrink-0" />
                      LinkedIn Profile
                    </a>
                  )}
                  {selectedLeader.twitterUrl && (
                    <a 
                      href={selectedLeader.twitterUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 rounded-xl text-xs font-semibold text-slate-500 transition bg-white shadow-3xs"
                    >
                      <Twitter className="w-3.5 h-3.5 shrink-0" />
                      Twitter Handle
                    </a>
                  )}
                  {selectedLeader.email && (
                    <a 
                      href={`mailto:${selectedLeader.email}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 border border-transparent bg-indigo-50 hover:bg-indigo-100 rounded-xl text-xs font-bold text-indigo-700 transition shadow-3xs"
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      {selectedLeader.email}
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
