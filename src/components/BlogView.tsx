import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  User, 
  Clock, 
  Calendar, 
  ChevronRight, 
  X, 
  Sparkles,
  UserCheck,
  HeartPulse,
  ChartBar,
  Info,
  Sliders,
  UploadCloud,
  Download,
  Share2,
  Copy,
  Check,
  ExternalLink,
  HelpCircle,
  FileText,
  RotateCcw,
  Maximize2,
  Eye,
  CheckCircle2,
  Filter,
  TrendingUp,
  Award,
  Database
} from 'lucide-react';
import { blogPosts } from '../data/amaniData';
import { BlogPost } from '../types';

interface TableauDatapoint {
  region: string;
  category: string;
  auditScore: number;
  fundsAllocatedGhs: number;
  completedProjects: number;
  transparencyGrade: string;
}

// Highly realistic dataset representing AMANI's audited projects for regional councils
const tableauDataset: TableauDatapoint[] = [
  { region: 'Greater Accra', category: 'Health', auditScore: 88, fundsAllocatedGhs: 450000, completedProjects: 12, transparencyGrade: 'A' },
  { region: 'Greater Accra', category: 'WASH', auditScore: 92, fundsAllocatedGhs: 320000, completedProjects: 18, transparencyGrade: 'A' },
  { region: 'Greater Accra', category: 'Education', auditScore: 84, fundsAllocatedGhs: 280000, completedProjects: 8, transparencyGrade: 'B' },
  { region: 'Ashanti', category: 'Livelihoods', auditScore: 89, fundsAllocatedGhs: 510000, completedProjects: 22, transparencyGrade: 'A' },
  { region: 'Ashanti', category: 'Health', auditScore: 82, fundsAllocatedGhs: 390000, completedProjects: 14, transparencyGrade: 'B' },
  { region: 'Ashanti', category: 'WASH', auditScore: 95, fundsAllocatedGhs: 260000, completedProjects: 19, transparencyGrade: 'A' },
  { region: 'Northern', category: 'WASH', auditScore: 94, fundsAllocatedGhs: 480000, completedProjects: 31, transparencyGrade: 'A' },
  { region: 'Northern', category: 'Livelihoods', auditScore: 78, fundsAllocatedGhs: 220000, completedProjects: 11, transparencyGrade: 'C' },
  { region: 'Eastern', category: 'Education', auditScore: 85, fundsAllocatedGhs: 310000, completedProjects: 15, transparencyGrade: 'B' },
  { region: 'Eastern', category: 'Health', auditScore: 80, fundsAllocatedGhs: 290000, completedProjects: 9, transparencyGrade: 'B' },
  { region: 'Western', category: 'Livelihoods', auditScore: 86, fundsAllocatedGhs: 350000, completedProjects: 13, transparencyGrade: 'B' },
  { region: 'Western', category: 'WASH', auditScore: 89, fundsAllocatedGhs: 210000, completedProjects: 10, transparencyGrade: 'B' },
  { region: 'Volta', category: 'Education', auditScore: 91, fundsAllocatedGhs: 240000, completedProjects: 16, transparencyGrade: 'A' },
  { region: 'Bono East', category: 'Health', auditScore: 76, fundsAllocatedGhs: 180000, completedProjects: 6, transparencyGrade: 'C' },
];

export default function BlogView() {
  // Navigation tabs of the reports section
  const [activeTab, setActiveTab] = useState<'all' | 'tableau' | 'upload'>('all');

  // Search, categories, posts state management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customBlogPosts, setCustomBlogPosts] = useState<BlogPost[]>(() => {
    const cached = localStorage.getItem('amani_uploaded_reports_v1');
    return cached ? JSON.parse(cached) : [];
  });

  // State to hold active reading post
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Drag and Drop files upload helper states
  const [dragOver, setDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reading Options for Single Page Reading view
  const [readFontSize, setReadFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [readTheme, setReadTheme] = useState<'light' | 'cream' | 'dark'>('light');

  // Sharing system states
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharePost, setSharePost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Tableau parameters state
  const [tableauRegion, setTableauRegion] = useState<string>('All');
  const [tableauCategory, setTableauCategory] = useState<string>('All');
  const [tableauPublicUrl, setTableauPublicUrl] = useState<string>(
    'https://public.tableau.com/views/WorldDevelopmentIndicators_16788220038850/Overview?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableau.com%2F&:embed_code_version=3&:tabs=no&:toolbar=yes&:animate_transition=yes&:share_your_views=no'
  );
  const [isTableauEditing, setIsTableauEditing] = useState(false);
  const [tableauInputVal, setTableauInputVal] = useState(tableauPublicUrl);

  // Simple elegant toast notifier
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const categories = ['All', 'Community Dev', 'Health', 'Governance', 'Reports'];

  const iconMap: Record<string, any> = {
    BookOpen,
    UserCheck,
    Pulse: HeartPulse,
    ChartBar
  };

  // Combine default database posts with user's uploaded reports
  const allPostsCombined = useMemo(() => {
    return [...blogPosts, ...customBlogPosts];
  }, [customBlogPosts]);

  const filteredPosts = useMemo(() => {
    return allPostsCombined.filter(post => {
      const matchSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [allPostsCombined, searchQuery, selectedCategory]);

  // Read customized background credentials
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

  // Handle Drag & Drop uploaded CSV/PDF
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const processUploadedFile = (file: File) => {
    if (!file) return;
    
    // Validate file is PDF/CSV
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (extension !== '.pdf' && extension !== '.csv') {
      triggerToast('Only official PDF or CSV files are indexable.');
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      const generatedPost: BlogPost = {
        id: `uploaded-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ""), // Strip extension
        category: 'Reports',
        excerpt: `Citizen-uploaded development file. Mapped size: ${(file.size / 1024).toFixed(1)} KB. Stamped for verification under secure reference protocols.`,
        content: `### Executive Summary & Indexing Report\n\nThis single-page reading dashboard represents content extracted from your uploaded civil file (**${file.name}**).\n\nUnder secure regional decentralization programs, this report is classified as **Verified Community Resource Aid**. The technical attributes are logged below to facilitate review matching:\n\n* **File Metadata Name**: ${file.name}\n* **File Footprint Scale**: ${(file.size / 1024).toFixed(2)} Kilobytes (KB)\n* **Index Authority Pin**: CAD-ACC-${Math.floor(1000 + Math.random() * 9000)}\n* **Audit Stamp**: UTC - ${new Date().toISOString()}\n\n### Core Audit Guidelines For File Reading\nAll items in this report are subject to the dual co-signature checks. In order for any local physical funds associated with these structures to release:\n1. The traditional Paramount Chief of the district must physically verify the build parameters on-ground.\n2. The elected District Assembly Member must submit matching digital GPS photos into the AMANI central ledger.\n3. The certified Project Implementation Partner (PIP) must produce invoice receipts matching national pricing directories.\n\n### Analytical Observations\nThis report demonstrates that direct citizen engagement effectively counters traditional developmental bottlenecks. By uploading files into local public indices, citizens maintain pressure on contractors, resulting in an estimated 85% drop in project execution delays.`,
        author: 'Authorized Resident (CAD Upload)',
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        readTime: `${Math.max(3, Math.ceil(file.size / 100000))} min read`,
        icon: 'BookOpen'
      };

      const updatedList = [generatedPost, ...customBlogPosts];
      setCustomBlogPosts(updatedList);
      localStorage.setItem('amani_uploaded_reports_v1', JSON.stringify(updatedList));
      setIsUploading(false);
      setDragOver(false);
      triggerToast(`Successfully indexed "${file.name}" as an active report!`);
    }, 1200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  // Delete uploaded report
  const handleDeleteUploaded = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customBlogPosts.filter(p => p.id !== id);
    setCustomBlogPosts(updated);
    localStorage.setItem('amani_uploaded_reports_v1', JSON.stringify(updated));
    triggerToast('Report removed from local catalog.');
  };

  // Dynamic calculus for the interactive Tableau dataset 
  const filteredTableauData = useMemo(() => {
    return tableauDataset.filter(d => {
      const matchRegion = tableauRegion === 'All' || d.region === tableauRegion;
      const matchCategory = tableauCategory === 'All' || d.category === tableauCategory;
      return matchRegion && matchCategory;
    });
  }, [tableauRegion, tableauCategory]);

  const tableauStats = useMemo(() => {
    let totalFunds = 0;
    let completed = 0;
    let totalScore = 0;
    
    filteredTableauData.forEach(d => {
      totalFunds += d.fundsAllocatedGhs;
      completed += d.completedProjects;
      totalScore += d.auditScore;
    });

    const averageScore = filteredTableauData.length > 0 ? Math.round(totalScore / filteredTableauData.length) : 0;

    return {
      totalFundsGhs: totalFunds,
      totalCompleted: completed,
      avgAuditScore: averageScore
    };
  }, [filteredTableauData]);

  // Generate dynamic TXT file for download
  const downloadReport = (post: BlogPost, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    const fileText = `========================================================================
   AMANI CO-OPERATIVE PLATFORM FOR GHANAIAN TOWN ADVANCION
         OFFICIAL CITIZEN REPORT CLEARANCE LICENSE & SPEC
========================================================================
REPORT ID:      ${post.id}
DOCUMENT TITLE: ${post.title.toUpperCase()}
CATEGORY:       ${post.category.toUpperCase()}
PUBLISH DATE:   ${post.date}
AUTHOR BLOCK:   ${post.author}
READ ESTIMATE:  ${post.readTime}
SECURITY STATE: CERTIFIED BY NATIONAL AUDIT SECRETARIAT

---------------------- DETAILED ABSTRACT ----------------------
${post.excerpt}

---------------------- STATEMENT CONTENT ----------------------
${post.content.replace(/### /g, '\n[SECTION] ').replace(/\* /g, '  - ')}

------------------------------------------------------------------------
Verification Stamp CRC V1: SECURED LEDGER INTEGRITY SEAL.
Downloaded on simulated device at: ${new Date().toLocaleString()}
AMANI National Secretariat, Accra, Ghana.
========================================================================`;

    const blob = new Blob([fileText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `AMANI_Report_${post.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    triggerToast('Secure Report file downloaded successfully.');
  };

  // Copy sharing link with dynamic feedback
  const handleCopyShareLink = () => {
    if (!sharePost) return;
    const dummyLink = `https://amani.org.gh/report/${sharePost.id}?token=CAD_${sharePost.category.substring(0, 3).toUpperCase()}_${sharePost.id.substring(0,6)}`;
    navigator.clipboard.writeText(dummyLink);
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
      setIsShareModalOpen(false);
      triggerToast('Document secure link carbon-copied to clipboard!');
    }, 1500);
  };

  const triggerSharePost = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    setSharePost(post);
    setIsShareModalOpen(true);
  };

  const handleApplyCustomTableau = () => {
    if (tableauInputVal.trim() === '') {
      triggerToast('Tableau URL cannot be blank.');
      return;
    }
    setTableauPublicUrl(tableauInputVal);
    setIsTableauEditing(false);
    triggerToast('Tableau Public frame refreshed successfully.');
  };

  return (
    <div className="bg-slate-50 min-h-screen relative">
      
      {/* Dynamic Toast System */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-55 bg-indigo-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-indigo-805/40 text-xs font-semibold flex items-center gap-2.5 max-w-sm"
          >
            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO DESCRIPTION GENERAL */}
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
            Decentralized Audit Center
          </div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight uppercase ${
            useBgImage ? 'text-white' : 'text-indigo-950'
          }`}>
            Blog, Reports & Tableau Insights
          </h1>
          <div className="w-12 h-1 bg-orange-500 rounded" />
          <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${
            useBgImage ? 'text-indigo-100' : 'text-slate-650'
          }`}>
            Explore our verified on-site project analysis sheets, upload external regional audit files, and digest interactive Tableau visualization channels built with radical transparency.
          </p>
        </div>
      </section>

      {/* 2. SUB NAVIGATION CHANNEL */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex gap-1">
            <button
              id="all-reports-tab-btn"
              onClick={() => { setActiveTab('all'); setSelectedPost(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wide transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-indigo-950 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Reports Directory ({allPostsCombined.length})
            </button>
            <button
              id="tableau-viz-tab-btn"
              onClick={() => { setActiveTab('tableau'); setSelectedPost(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wide transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'tableau'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-indigo-950 hover:bg-slate-50'
              }`}
            >
              <ChartBar className="w-3.5 h-3.5" />
              Tableau Studio
            </button>
            <button
              id="admin-upload-tab-btn"
              onClick={() => { setActiveTab('upload'); setSelectedPost(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wide transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-indigo-950 hover:bg-slate-50'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              Upload Desk
            </button>
          </div>

          <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold hidden sm:block">
            Secure Node Pin: CAD-GH-3000
          </div>
        </div>
      </section>

      {/* 3. MAIN TAB CONTENT PANELS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* TABS A: ALL ARTICLES & AUDITS */}
        {activeTab === 'all' && (
          <div className="space-y-8">
            
            {/* Search and Category Pill Filters */}
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-2xs">
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Query keywords, authors, or files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition shrink-0 cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 font-black text-white'
                        : 'bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-500'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Screen Single-Page Reading Container if one post is selected */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Post Directory (Adjust styles if post selected to form a split list) */}
              <div className={`space-y-6 ${selectedPost ? 'lg:col-span-4 max-h-[140vh] overflow-y-auto pr-2' : 'lg:col-span-12'}`}>
                
                {selectedPost && (
                  <div className="bg-indigo-950 text-white rounded-2xl p-4 flex items-center justify-between border border-indigo-900 shadow-sm animate-fade-in/10">
                    <div className="space-y-0.5">
                      <span className="block text-[10px] uppercase text-orange-400 font-black">Active Workspace</span>
                      <h4 className="text-xs font-bold uppercase truncate max-w-xs">{selectedPost.title}</h4>
                    </div>
                    <button 
                      onClick={() => setSelectedPost(null)}
                      className="bg-white/10 hover:bg-orange-500 hover:text-white p-2 text-indigo-200 rounded-lg transition"
                      aria-label="Exit Split View"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Grid format shifts dynamically if viewing detailed document inline */}
                <div className={`grid gap-4 ${selectedPost ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                  
                  {filteredPosts.length === 0 ? (
                    <div className="col-span-full bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
                      <HelpCircle className="w-12 h-12 text-slate-350 mx-auto animate-bounce" />
                      <h4 className="text-sm font-extrabold uppercase tracking-wide text-indigo-950">No Reports Cataloged</h4>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto">
                        No articles match search parameters. You may upload direct CSV/PDF coordinates in the **Upload Desk** tab to expand this index.
                      </p>
                      <button 
                        onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                        className="bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition cursor-pointer"
                      >
                        Reset Controls
                      </button>
                    </div>
                  ) : (
                    filteredPosts.map((post) => {
                      const IconComponent = iconMap[post.icon || 'BookOpen'] || BookOpen;
                      const isPostActive = selectedPost?.id === post.id;
                      const isDynamicPdf = post.id.startsWith('uploaded-');

                      return (
                        <div 
                          key={post.id}
                          onClick={() => setSelectedPost(post)}
                          className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-3xs group ${
                            isPostActive 
                              ? 'border-indigo-600 ring-2 ring-indigo-500/10 scale-[0.99] translate-x-1' 
                              : 'border-slate-200 hover:border-slate-350 hover:shadow-xs'
                          }`}
                        >
                          <div>
                            {/* Short category tag line */}
                            <div className={`px-4 py-3 flex items-center justify-between border-b ${
                              isPostActive ? 'bg-indigo-50/50 border-indigo-100' : 'bg-slate-50 border-slate-100'
                            }`}>
                              <span className="flex items-center gap-1.5">
                                <IconComponent className={`w-3.5 h-3.5 ${isPostActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                                <span className={`text-[10px] font-extrabold uppercase tracking-widest ${
                                  isPostActive ? 'text-indigo-700' : 'text-slate-500'
                                }`}>
                                  {post.category}
                                </span>
                              </span>
                              
                              {isDynamicPdf && (
                                <span className="bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded-sm font-mono text-[8px] uppercase font-black">
                                  Citizen File
                                </span>
                              )}
                            </div>

                            <div className="p-5 space-y-2">
                              <h3 className={`text-xs sm:text-sm font-extrabold uppercase tracking-wide leading-snug group-hover:text-indigo-600 transition ${
                                isPostActive ? 'text-indigo-700 font-black' : 'text-indigo-950'
                              }`}>
                                {post.title}
                              </h3>
                              <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                                {post.excerpt}
                              </p>
                            </div>
                          </div>

                          <div className="px-5 pb-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-slate-400">
                              {post.date}
                            </span>
                            
                            {/* Download & Share Actions on Card */}
                            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                              <button 
                                onClick={(e) => triggerSharePost(post, e)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition"
                                title="Share Document Link"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={(e) => downloadReport(post, e)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition"
                                title="Download Safe Report"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}

                </div>
              </div>

              {/* Right Column: Immersive Single-Page Document Reader */}
              {selectedPost && (
                <div className="lg:col-span-8 bg-white border border-indigo-100 rounded-3xl overflow-hidden shadow-xl sticky top-48 pr-1 animate-scale-in">
                  
                  {/* Reader Control Header Bar */}
                  <div className="bg-indigo-950 text-white p-5 flex flex-wrap gap-4 items-center justify-between border-b border-indigo-900">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-orange-400">AMANI Immersive document reader</span>
                        <span className="block text-xs font-serif text-slate-300 italic">{selectedPost.author}</span>
                      </div>
                    </div>

                    {/* Controls adjustments (font size, reading background tint) */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-white/5 border border-white/10 p-1 rounded-xl gap-1">
                        <button
                          onClick={() => setReadTheme('light')}
                          className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase transition ${
                            readTheme === 'light' ? 'bg-white text-indigo-950' : 'text-indigo-200 hover:text-white'
                          }`}
                        >
                          Light
                        </button>
                        <button
                          onClick={() => setReadTheme('cream')}
                          className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase transition ${
                            readTheme === 'cream' ? 'bg-[#fdf6e3] text-[#5b4636]' : 'text-indigo-200 hover:text-white'
                          }`}
                        >
                          Cream
                        </button>
                        <button
                          onClick={() => setReadTheme('dark')}
                          className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase transition ${
                            readTheme === 'dark' ? 'bg-slate-800 text-orange-300' : 'text-indigo-200 hover:text-white'
                          }`}
                        >
                          Dark
                        </button>
                      </div>

                      <div className="flex items-center bg-white/5 border border-white/10 text-xs font-semibold px-2 py-1.5 rounded-xl gap-2">
                        <button 
                          onClick={() => {
                            if (readFontSize === 'xl') setReadFontSize('lg');
                            else if (readFontSize === 'lg') setReadFontSize('base');
                            else if (readFontSize === 'base') setReadFontSize('sm');
                          }}
                          className="hover:text-orange-400 transition cursor-pointer"
                        >
                          A-
                        </button>
                        <span className="font-mono text-[9px] bg-white/10 px-1.5 py-0.5 rounded uppercase leading-none">{readFontSize}</span>
                        <button 
                          onClick={() => {
                            if (readFontSize === 'sm') setReadFontSize('base');
                            else if (readFontSize === 'base') setReadFontSize('lg');
                            else if (readFontSize === 'lg') setReadFontSize('xl');
                          }}
                          className="hover:text-orange-400 transition cursor-pointer"
                        >
                          A+
                        </button>
                      </div>

                      <button 
                        onClick={() => setSelectedPost(null)}
                        className="p-1 px-2.5 rounded-xl text-xs bg-orange-500 hover:bg-orange-600 text-white font-extrabold uppercase transition cursor-pointer"
                      >
                        Exit
                      </button>
                    </div>
                  </div>

                  {/* Scrolling Reading Canvas with customized font-family and palette styling */}
                  <div className={`p-8 max-h-[110vh] overflow-y-auto leading-relaxed transition-all duration-300 ${
                    readTheme === 'light' ? 'bg-[#f8fafc] text-slate-800' :
                    readTheme === 'cream' ? 'bg-[#fdf6e3] text-[#5c4a3b]' :
                    'bg-[#0f172a] text-slate-200'
                  }`}>
                    <div className="max-w-xl mx-auto space-y-6">
                      
                      <div className="space-y-2">
                        <span className={`text-[10px] font-extrabold uppercase tracking-widest block font-mono ${
                          readTheme === 'dark' ? 'text-orange-300' : 'text-indigo-600'
                        }`}>
                          Verified Section Post: {selectedPost.category} · {selectedPost.readTime}
                        </span>
                        <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight leading-snug">
                          {selectedPost.title}
                        </h2>
                        
                        <div className="flex flex-wrap gap-4 pt-2 text-[10px] font-bold uppercase font-mono tracking-wider opacity-60">
                          <span>By: {selectedPost.author}</span>
                          <span>·</span>
                          <span>Timestamp: {selectedPost.date}</span>
                        </div>
                      </div>

                      <div className="w-full h-px bg-slate-250 opacity-40" />

                      {/* Render formatted blocks of text with headers dynamically */}
                      <div className={`space-y-5 font-sans ${
                        readFontSize === 'sm' ? 'text-xs' :
                        readFontSize === 'base' ? 'text-sm' :
                        readFontSize === 'lg' ? 'text-base' :
                        'text-lg'
                      }`}>
                        {selectedPost.content.split('\n\n').map((block, bIdx) => {
                          if (block.startsWith('### ')) {
                            return (
                              <h3 key={bIdx} className={`font-serif tracking-wide italic font-extrabold uppercase border-l-4 pl-3 block pt-4 ${
                                readTheme === 'dark' ? 'text-orange-300 border-orange-400' : 'text-indigo-900 border-indigo-600'
                              }`}>
                                {block.replace('### ', '')}
                              </h3>
                            );
                          }
                          return (
                            <p key={bIdx} className="leading-relaxed whitespace-pre-line text-justify">
                              {block}
                            </p>
                          );
                        })}
                      </div>

                      <div className="w-full h-px bg-slate-250 opacity-40 mt-10" />

                      {/* Document Utility Actions */}
                      <div className="pt-6 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => downloadReport(selectedPost, e)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] uppercase px-4 py-2.5 rounded-xl tracking-wider transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            Download Printout
                          </button>
                          <button
                            onClick={(e) => triggerSharePost(selectedPost, e)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-indigo-950 font-extrabold text-[10px] uppercase px-4 py-2.5 rounded-xl tracking-wider transition flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
                          >
                            <Share2 className="w-4 h-4" />
                            Secure Node Share
                          </button>
                        </div>

                        <span className="text-[9px] font-mono tracking-wider opacity-50 block uppercase">
                          System Signature ID: CAD-{selectedPost.id.substring(0, 10)}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Bottom static bar of reader */}
                  <div className="bg-slate-50 p-5 px-8 flex items-center justify-between border-t border-slate-100 shrink-0">
                    <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-orange-500" />
                      Audited & verified by resident assembly divisions.
                    </span>
                    <button 
                      onClick={() => setSelectedPost(null)}
                      className="text-xs font-black text-indigo-600 hover:text-orange-550 uppercase tracking-wide cursor-pointer flex items-center gap-0.5"
                    >
                      Close Split View
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

        {/* TABS B: TABLEAU ANALYTICS WORKSPACE */}
        {activeTab === 'tableau' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Tableau Workspace Title and Controls */}
            <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="space-y-1">
                  <span className="bg-orange-50 text-orange-600 text-[9px] font-black px-2.5 py-1 rounded-full border border-orange-100 uppercase tracking-widest inline-block">
                    Live Analytical Frame
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-indigo-950 uppercase tracking-wide">
                    AMANI Tableau Insights Studio
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    Review live metrics, financial streams, project development status and institutional audit scores dynamically.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setTableauRegion('All');
                      setTableauCategory('All');
                      triggerToast('Analytical parameters restored to factory settings.');
                    }}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-indigo-950 rounded-xl transition flex items-center gap-1.5 text-xs font-bold uppercase cursor-pointer"
                    title="Reset dashboard"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                  <button 
                    onClick={() => setIsTableauEditing(!isTableauEditing)}
                    className="p-2 px-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide cursor-pointer"
                  >
                    <Sliders className="w-4 h-4" />
                    Custom Embed URL
                  </button>
                </div>
              </div>

              {/* Tableau Public custom Iframe paste panel */}
              {isTableauEditing && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 animate-scale-in">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-indigo-950 block tracking-wider">
                      Paste Official Tableau Public Embed Link
                    </label>
                    <p className="text-[10px] text-slate-400 leading-none">
                      Extract the link from Tableau Public’s core Share popup and paste the specific frame URL here.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                      value={tableauInputVal}
                      onChange={(e) => setTableauInputVal(e.target.value)}
                    />
                    <button
                      onClick={handleApplyCustomTableau}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase px-4 py-2 rounded-xl"
                    >
                      Update Embed
                    </button>
                    <button
                      onClick={() => setIsTableauEditing(false)}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs uppercase px-3 py-2 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Filtering Controls representing Tableau live parameter filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4.5 bg-slate-50 rounded-2xl border border-slate-200/50">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                    Region Focus Selector
                  </span>
                  <select
                    value={tableauRegion}
                    onChange={(e) => setTableauRegion(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-indigo-950 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="All">All 16 Regions</option>
                    <option value="Greater Accra">Greater Accra Region</option>
                    <option value="Ashanti">Ashanti Region</option>
                    <option value="Northern">Northern Region</option>
                    <option value="Eastern">Eastern Region</option>
                    <option value="Western">Western Region</option>
                    <option value="Volta">Volta Region</option>
                    <option value="Bono East">Bono East Region</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                    Infrastructure Panel Category
                  </span>
                  <select
                    value={tableauCategory}
                    onChange={(e) => setTableauCategory(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-indigo-950 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="All">All Categories</option>
                    <option value="WASH">WASH (Deep-borehole Water)</option>
                    <option value="Health">Health Clinics (CHPs)</option>
                    <option value="Education">Education Resources ( GES Classrooms )</option>
                    <option value="Livelihoods">Livelihoods & Seed Grants</option>
                  </select>
                </div>

                {/* Static indicator metadata tile 1 */}
                <div className="bg-indigo-950 text-white p-3 rounded-xl border border-indigo-850 flex flex-col justify-between">
                  <span className="text-[9px] text-orange-400 uppercase font-black font-mono tracking-widest">
                    Tableau Calculated Allocation
                  </span>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-sm font-extrabold text-white">GHS {tableauStats.totalFundsGhs.toLocaleString()}</span>
                    <span className="text-[9px] text-slate-350 shrink-0 font-mono">Matched Funds</span>
                  </div>
                </div>

                {/* Static indicator metadata tile 2 */}
                <div className="bg-indigo-950 text-white p-3 rounded-xl border border-indigo-850 flex flex-col justify-between">
                  <span className="text-[9px] text-teal-400 uppercase font-black font-mono tracking-widest">
                    Tableau verified Status
                  </span>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-sm font-extrabold text-white">{tableauStats.avgAuditScore}% Score</span>
                    <span className="text-[9px] text-slate-350 shrink-0 font-mono">{tableauStats.totalCompleted} Projects</span>
                  </div>
                </div>
              </div>

              {/* Interactive Dashboard Workspace splits */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                
                {/* Visual SVG Tableau charts representing regional audit status */}
                <div className="lg:col-span-6 border border-slate-150 rounded-2xl p-5 space-y-4 bg-slate-50/45">
                  <div className="flex justify-between items-center border-b border-slate-200/80 pb-2">
                    <span className="text-[10px] font-extrabold uppercase text-indigo-950 tracking-wide flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-indigo-600" />
                      Tableau Stream: Funds Allocation vs Regions (GHS)
                    </span>
                    <span className="text-[8px] font-mono text-slate-400 font-bold uppercase">Dynamic Metric</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    {filteredTableauData.slice(0, 6).map((data, idx) => {
                      const maxAllocationVal = 550000;
                      const sizePercentage = Math.round((data.fundsAllocatedGhs / maxAllocationVal) * 100);

                      return (
                        <div key={idx} className="space-y-1 text-xs">
                          <div className="flex justify-between text-[10px] font-extrabold uppercase text-slate-650">
                            <span>{data.region} · {data.category}</span>
                            <span className="font-mono text-indigo-700">GHS {data.fundsAllocatedGhs.toLocaleString()}</span>
                          </div>
                          <div className="h-3 w-full bg-slate-200/80 rounded-full overflow-hidden relative">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 bg-linear-to-r ${
                                idx % 3 === 0 ? 'from-indigo-600 to-indigo-500' :
                                idx % 3 === 1 ? 'from-orange-550 to-orange-450' :
                                'from-teal-600 to-teal-500'
                              }`}
                              style={{ width: `${sizePercentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Score transparency ledger matrix */}
                <div className="lg:col-span-6 border border-slate-150 rounded-2xl p-5 space-y-4 bg-slate-50/45 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-200/80 pb-2">
                      <span className="text-[10px] font-extrabold uppercase text-indigo-950 tracking-wide flex items-center gap-1.5">
                        <Database className="w-4 h-4 text-orange-500" />
                        Tableau Audit Merit Matrix Scores
                      </span>
                      <span className="text-[8px] font-mono text-slate-400 font-bold uppercase">Compliance list</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[10px] border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-400 font-black uppercase">
                            <th className="pb-2">Region Block</th>
                            <th className="pb-2">Sector Focus</th>
                            <th className="pb-2">Audit Score</th>
                            <th className="pb-2 text-right">M. Grade</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                          {filteredTableauData.slice(0, 5).map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-indigo-50/40 transition">
                              <td className="py-2 capitalize font-semibold">{row.region}</td>
                              <td className="py-2 text-indigo-850 font-black">{row.category}</td>
                              <td className="py-2">
                                <div className="flex items-center gap-1.5">
                                  <div className="h-2 w-12 bg-slate-200 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full ${row.auditScore >= 85 ? 'bg-teal-500' : row.auditScore >= 75 ? 'bg-orange-450' : 'bg-red-400'}`} 
                                      style={{ width: `${row.auditScore}%` }}
                                    />
                                  </div>
                                  <span className="font-mono">{row.auditScore}%</span>
                                </div>
                              </td>
                              <td className="py-2 text-right">
                                <span className={`px-2 py-0.5 rounded-sm text-[8px] font-black uppercase ${
                                  row.transparencyGrade === 'A' ? 'bg-teal-50 text-teal-700 border border-teal-100' :
                                  row.transparencyGrade === 'B' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                                  'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                  {row.transparencyGrade}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-indigo-900 text-white rounded-xl p-3 flex justify-between items-center text-[10px] border border-indigo-950 mt-4.5">
                    <span className="font-semibold flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      Showing {filteredTableauData.length} active matching Tableau datasets
                    </span>
                    <span className="font-mono text-orange-400 font-extrabold">CAD AUDIT v1.4</span>
                  </div>
                </div>

              </div>

              {/* Direct Tableau public canvas wrapper iframe */}
              <div className="pt-6 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-extrabold uppercase tracking-wide text-indigo-950 flex items-center gap-1.5">
                      <Maximize2 className="w-4 h-4 text-indigo-600" />
                      Live Tableau Embedded Workbook Frame
                    </h3>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Tableau frame renders public global accountability metrics dynamically below.
                    </p>
                  </div>
                  <a 
                    href="https://public.tableau.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[10px] uppercase tracking-wide font-black text-indigo-650 hover:text-indigo-800 transition flex items-center gap-1"
                  >
                    View Tableau Public
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="bg-slate-100 rounded-3xl border border-slate-200 shadow-inner overflow-hidden relative">
                  {/* Decorative workspace chrome outline for the Tableau embedding */}
                  <div className="bg-slate-200/60 px-4 py-2 flex items-center gap-1.5 border-b border-slate-200">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400 shrink-0" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shrink-0" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 shrink-0" />
                    <div className="bg-slate-50 border border-slate-200/80 rounded-md px-3 py-0.5 text-[9px] text-slate-500 font-mono tracking-wide w-full max-w-md mx-auto truncate select-all">
                      {tableauPublicUrl}
                    </div>
                  </div>

                  <div className="relative aspect-video sm:aspect-4/3 lg:aspect-21/9 min-h-[460px] w-full bg-white flex flex-col justify-between">
                    <iframe 
                      id="tableau-live-workbook-frame"
                      src={tableauPublicUrl}
                      title="AMANI Tableau Audit Index"
                      className="absolute inset-0 w-full h-full border-0 select-none"
                      sandbox="allow-same-origin allow-scripts"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TABS C: ADMIN UPLOAD DESK */}
        {activeTab === 'upload' && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
              <div className="space-y-1 text-center max-w-xl mx-auto">
                <div className="w-12 h-12 bg-orange-50 border border-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <UploadCloud className="w-6 h-6 shrink-0" />
                </div>
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-indigo-100 uppercase tracking-widest inline-block">
                  Citizen Submission Port
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-indigo-950 uppercase tracking-wide">
                  Secure Report & PDF Index Desk
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm">
                  Upload localized infrastructure blueprints, physical audit spreadsheets (CSV), or contractor budget files (PDF) to catalogue them as readable items instantly.
                </p>
              </div>

              {/* Advanced Drag & Drop dropzone box area */}
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-10 py-16 text-center cursor-pointer transition-all ${
                  dragOver 
                    ? 'border-indigo-650 bg-indigo-50/20 scale-[0.99] ring-2 ring-indigo-500/10' 
                    : 'border-slate-305 hover:border-indigo-600 hover:bg-slate-50/50'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChoose}
                  accept=".pdf,.csv"
                  className="hidden"
                />

                <div className="space-y-4 max-w-sm mx-auto">
                  <UploadCloud className={`w-10 h-10 mx-auto transition-transform ${dragOver ? 'scale-110 text-indigo-650' : 'text-slate-400'}`} />
                  
                  {isUploading ? (
                    <div className="space-y-2">
                      <div className="w-6 h-6 border-2 border-indigo-650 border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-xs font-bold uppercase tracking-wider text-indigo-950">Indexing file credentials...</p>
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-xs">
                      <span className="block font-extrabold uppercase tracking-wide text-indigo-950">
                        Drag and drop your report PDF / CSV here
                      </span>
                      <span className="block text-slate-500 text-[11px] leading-relaxed">
                        or click to browse local folders. File is analyzed for direct community lookup reference parameters instantly.
                      </span>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap gap-2 items-center justify-center text-[9px] font-mono tracking-wider uppercase text-slate-400 font-bold">
                    <span>Supported: PDF</span>
                    <span>·</span>
                    <span>Supported: CSV</span>
                    <span>·</span>
                    <span>Max Size: 10MB</span>
                  </div>
                </div>
              </div>

              {/* Informative advice callout */}
              <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl flex gap-3.5 items-start">
                <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm">
                  <h4 className="font-extrabold text-indigo-950 uppercase tracking-wide">Secure Local State Sandbox Storage</h4>
                  <p className="text-slate-500 leading-relaxed text-[11px]">
                    To comply with non-partisan protocols, uploads remain secure and isolated within your workspace. They can be read instantly using our single-page text reader, exported back as clean plain-text data logs, and are fully structured for offline downloads.
                  </p>
                </div>
              </div>

              {/* Custom uploaded index catalog list */}
              <div className="space-y-3.5 pt-4">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-450 border-b border-slate-105 pb-2">
                  Uploaded & Cataloged citizen files ({customBlogPosts.length})
                </h3>

                {customBlogPosts.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50/45 rounded-2xl border border-slate-205/50 border-dashed text-slate-400 text-xs">
                    No custom files uploaded yet. Drag a PDF report above to populate this catalog table.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {customBlogPosts.map((post) => (
                      <div 
                        key={post.id}
                        onClick={() => { setSelectedPost(post); setActiveTab('all'); }}
                        className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between hover:border-indigo-500/40 hover:shadow-2xs transition cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-extrabold text-indigo-950 uppercase truncate max-w-sm sm:max-w-md">
                              {post.title}
                            </h4>
                            <span className="block text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                              Uploaded: {post.date} · Calculated: {post.readTime}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => { setSelectedPost(post); setActiveTab('all'); }}
                            className="p-1 px-3 rounded-lg text-xs font-extrabold uppercase tracking-wide bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
                          >
                            Read inline
                          </button>
                          <button
                            onClick={(e) => downloadReport(post, e)}
                            className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition"
                            title="Download document output text"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteUploaded(post.id, e)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                            title="Purge report file"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </main>

      {/* 4. SHARE DOCUMENT OVERLAY MODAL */}
      <AnimatePresence>
        {isShareModalOpen && sharePost && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-xs animate-fade-in" onClick={() => setIsShareModalOpen(false)} />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-md p-6 relative border border-slate-205 shadow-2xl z-10 space-y-5 animate-scale-in"
            >
              <button 
                onClick={() => setIsShareModalOpen(false)}
                className="absolute p-2 rounded-full hover:bg-slate-100 top-4 right-4 text-slate-400 hover:text-indigo-950 transition cursor-pointer"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="bg-indigo-50 text-indigo-700 text-[9px] font-black px-2 py-0.5 rounded-full border border-indigo-100 uppercase tracking-widest inline-block">
                  Document Dispatch Control
                </span>
                <h3 className="text-base font-black text-indigo-950 uppercase tracking-wide">
                  Secure Amani Report Share
                </h3>
                <p className="text-slate-550 text-xs leading-relaxed">
                  Make civil data accessible by sharing secure local references. Select a direct network channel below:
                </p>
              </div>

              {/* Secure Document Reference Summary Panel */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-extrabold text-indigo-950 uppercase truncate">
                    {sharePost.title}
                  </h4>
                  <span className="block text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                    Category: {sharePost.category} · Timestamp: {sharePost.date}
                  </span>
                </div>
              </div>

              {/* Interactive SVG QR Code visualization mock */}
              <div className="py-4 flex flex-col items-center justify-center space-y-2 bg-slate-50/40 rounded-2xl border border-dashed border-slate-200/80">
                <svg className="w-24 h-24 text-indigo-900" viewBox="0 0 100 100" fill="currentColor">
                  {/* Decorative QR code mockup lines */}
                  <path d="M5,5 h20 v20 h-20 z M5,9 M9,9 h12 v12 h-12 z M65,5 h20 v20 h-20 z M69,9 h12 v12 h-12 z M5,65 h20 v20 h-20 z M9,69 h12 v12 h-12 z" />
                  <rect x="35" y="10" width="10" height="15" />
                  <rect x="50" y="5" width="5" height="5" />
                  <rect x="35" y="32" width="15" height="5" />
                  <rect x="35" y="45" width="30" height="8" />
                  <rect x="75" y="35" width="10" height="20" />
                  <rect x="5" y="35" width="22" height="10" />
                  <rect x="52" y="22" width="10" height="12" />
                  <rect x="35" y="65" width="15" height="15" />
                  <rect x="55" y="65" width="20" height="5" />
                  <rect x="55" y="75" width="10" height="10" />
                  <rect x="75" y="75" width="10" height="15" />
                </svg>
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-black">
                  Secured SHA256 Token QR
                </span>
              </div>

              {/* Share actions controls */}
              <div className="space-y-3 pt-1">
                <button
                  onClick={handleCopyShareLink}
                  className="w-full bg-indigo-650 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase py-3.5 rounded-xl tracking-wider transition text-center flex items-center justify-center gap-2 cursor-pointer shadow-3xs"
                >
                  {copiedLink ? <Check className="w-4 h-4 animate-scale-in" /> : <Copy className="w-4 h-4" />}
                  {copiedLink ? 'Copied Secure Token' : 'Carbon Copy Access URL'}
                </button>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-black uppercase text-slate-600">
                  <a
                    href={`https://twitter.com/intent/tweet?text=Review the verified AMANI Civil Report: ${sharePost.title}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-slate-205 text-center bg-slate-50 hover:bg-slate-100 transition whitespace-nowrap block"
                  >
                    Share on Twitter
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=AMANI Verified Audit Report: ${sharePost.title}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-slate-205 text-center bg-slate-50 hover:bg-slate-100 transition whitespace-nowrap block"
                  >
                    Send to WhatsApp
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
