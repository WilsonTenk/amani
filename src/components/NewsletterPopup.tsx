import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X, Check, ArrowRight, Bell, Sparkles } from 'lucide-react';

interface NewsletterPopupProps {
  forceShow?: boolean;
  onClose?: () => void;
}

export default function NewsletterPopup({ forceShow = false, onClose }: NewsletterPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState({
    reports: true,
    radio: false,
    interventions: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check local storage to see if user has already dismissed or subscribed
    const hasDismissed = localStorage.getItem('amani_newsletter_dismissed');
    
    if (forceShow) {
      setIsOpen(true);
    } else if (!hasDismissed) {
      // Trigger with a subtle delay to let the page load first
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [forceShow]);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('amani_newsletter_dismissed', 'true');
    if (onClose) onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // Simulate real server-side submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      localStorage.setItem('amani_newsletter_dismissed', 'true');
      
      // Keep open temporarily to showcase the success state before closing
      setTimeout(() => {
        setIsOpen(false);
        if (onClose) onClose();
      }, 3500);
    }, 1200);
  };

  const togglePreference = (key: 'reports' | 'radio' | 'interventions') => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4" id="newsletter-popup-container">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Popup card modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white rounded-3xl overflow-hidden w-full max-w-lg relative border border-slate-200 shadow-2xl z-10 max-h-[90vh] flex flex-col"
            id="newsletter-popup-card"
          >
            {/* Top accent color bar */}
            <div className="h-2 bg-gradient-to-r from-indigo-600 via-orange-500 to-amber-500 w-full" />

            {/* Dismiss trigger */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition cursor-pointer z-20"
              aria-label="Dismiss subscription"
              id="newsletter-dismiss-btn"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 sm:p-8 overflow-y-auto">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Visual Header */}
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                      <Bell className="w-6 h-6 animate-pulse" />
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-orange-600 text-[10px] font-bold uppercase tracking-widest block font-mono">
                        Direct Grassroots Intel
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-indigo-950 uppercase tracking-tight leading-tight">
                        AMANI Dispatch
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                        Stay connected with verified quarterly reports, radio broadcasts, and transparent regional tracking, delivered directly.
                      </p>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kwame Mensah"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition font-medium"
                        id="newsletter-input-name"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if(error) setError('');
                        }}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition font-medium"
                        id="newsletter-input-email"
                      />
                    </div>
                  </div>

                  {/* Preferences Checklist */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                      Choose Your Interests
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        type="button"
                        onClick={() => togglePreference('reports')}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border transition text-left cursor-pointer ${
                          preferences.reports 
                            ? 'bg-indigo-50/50 border-indigo-200 text-indigo-950 font-semibold' 
                            : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-500'
                        }`}
                        id="preference-btn-reports"
                      >
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center border transition ${
                          preferences.reports ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                        }`}>
                          {preferences.reports && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="text-left font-display">
                          <span className="block text-[11px] uppercase tracking-wide">Quarterly Audits & Reports</span>
                          <span className="block text-[10px] text-slate-400 font-normal mt-0.5">Project outcomes & local expenses.</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => togglePreference('radio')}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border transition text-left cursor-pointer ${
                          preferences.radio 
                            ? 'bg-indigo-50/50 border-indigo-200 text-indigo-950 font-semibold' 
                            : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-500'
                        }`}
                        id="preference-btn-radio"
                      >
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center border transition ${
                          preferences.radio ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                        }`}>
                          {preferences.radio && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="text-left font-display">
                          <span className="block text-[11px] uppercase tracking-wide">Radio & Community Airings</span>
                          <span className="block text-[10px] text-slate-400 font-normal mt-0.5">Broadcast highlights and upcoming town halls.</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => togglePreference('interventions')}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border transition text-left cursor-pointer ${
                          preferences.interventions 
                            ? 'bg-indigo-50/50 border-indigo-200 text-indigo-950 font-semibold' 
                            : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-500'
                        }`}
                        id="preference-btn-interventions"
                      >
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center border transition ${
                          preferences.interventions ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                        }`}>
                          {preferences.interventions && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="text-left font-display">
                          <span className="block text-[11px] uppercase tracking-wide">Local Branch Interventions</span>
                          <span className="block text-[10px] text-slate-400 font-normal mt-0.5">Boreholes, primary classroom structures, and clinics.</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Submission triggers & Error line */}
                  <div className="space-y-3 pt-2">
                    {error && (
                      <p className="text-rose-500 text-xs text-center font-bold uppercase tracking-wider" id="newsletter-error-text">
                        {error}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        onClick={handleDismiss}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs uppercase py-3.5 rounded-xl tracking-wider transition text-center cursor-pointer order-last sm:order-first"
                        id="newsletter-dismiss-secondary"
                      >
                        Keep Browsing
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase py-3.5 rounded-xl tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-100 disabled:opacity-50"
                        id="newsletter-submit-btn"
                      >
                        {isSubmitting ? 'submitting...' : 'Sign Me Up'}
                        {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    <span className="block text-center text-[9px] text-slate-400 font-mono tracking-normal">
                      We value your privacy. Unsubscribe at any time. Zero spam guarantee.
                    </span>
                  </div>
                </form>
              ) : (
                <div className="py-12 text-center space-y-6 animate-scale-in" id="newsletter-success-container">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-1.5 text-orange-600">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-[10px] font-extrabold uppercase tracking-widest block font-mono">
                        Subscription Active
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-indigo-950 uppercase tracking-tight">
                      Welcome to AMANI Dispatch!
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you for subscribing{name ? `, ${name}` : ''}. You will receive our upcoming quarterly dispatch sent directly to <strong className="text-indigo-950">{email}</strong>.
                    </p>
                  </div>
                  
                  <div className="text-[10px] text-slate-400 font-medium">
                    This window will auto-close in a few seconds...
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
