import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Phone, 
  Mail, 
  ExternalLink, 
  Send, 
  CheckCircle,
  MessageSquareCode,
  Globe,
  MapPin,
  HelpCircle,
  BadgeCheck
} from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactView() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');

  // Status hooks
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionsList, setSubmissionsList] = useState<ContactMessage[]>([]);

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
    const history = localStorage.getItem('amani_contact_submissions_v1');
    if (history) {
      try {
        setSubmissionsList(JSON.parse(history));
      } catch (e) {
        // Safe fail
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !message) {
      return;
    }

    const newMessage: ContactMessage = {
      id: 'msg-' + Date.now(),
      firstName,
      lastName,
      email,
      phone: phone || 'Not provided',
      subject,
      message,
      timestamp: new Date().toISOString()
    };

    const updated = [newMessage, ...submissionsList];
    setSubmissionsList(updated);
    localStorage.setItem('amani_contact_submissions_v1', JSON.stringify(updated));

    setSubmitSuccess(true);

    // Reset fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubject('General Enquiry');

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

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
            Get in touch
          </div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight uppercase ${
            useBgImage ? 'text-white' : 'text-indigo-950'
          }`}>
            Connect with AMANI
          </h1>
          <div className="w-12 h-1 bg-orange-500 rounded" />
          <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${
            useBgImage ? 'text-indigo-100' : 'text-slate-650'
          }`}>
            Reach out to our National Secretariat, register your interest for local coordinating councils, or inquire about open PIP implementations.
          </p>
        </div>
      </section>

      {/* 2. REGULAR CONTACT INFORMATION GRID */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact details list (Col-5) */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-extrabold text-indigo-950 uppercase tracking-wide">
              Official Channels Details
            </h3>
            <div className="w-8 h-px bg-slate-200" />
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 shrink-0 flex items-center justify-center shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="block font-bold text-indigo-950 text-xs sm:text-sm uppercase tracking-wider">
                  National Secretariat
                </span>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Suite 4B, Independence Avenue, Airport Residential Area, Accra, Ghana
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 shrink-0 flex items-center justify-center shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="block font-bold text-indigo-950 text-xs sm:text-sm uppercase tracking-wider">
                  Direct Telephone Ports
                </span>
                <p className="text-xs text-slate-600 leading-none font-mono font-bold">
                  +233 (0) 30 200 8822
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 shrink-0 flex items-center justify-center shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="block font-bold text-indigo-950 text-xs sm:text-sm uppercase tracking-wider">
                  Direct E-mail Directory
                </span>
                <p className="text-xs text-indigo-600 font-mono font-bold underline hover:text-indigo-805">
                  info@amani.org.gh
                </p>
              </div>
            </div>
          </div>

          {/* Social connections cards */}
          <div className="space-y-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-3xs">
            <h4 className="text-indigo-950 font-extrabold text-xs uppercase tracking-wide">
              Follow and sync with AMANI updates
            </h4>
            <div className="flex flex-wrap gap-2.5">
              <a href="#" className="border border-slate-200 text-xs font-semibold px-3.5 py-2 hover:border-indigo-650 hover:text-indigo-650 bg-white rounded-xl transition shadow-3xs">Facebook</a>
              <a href="#" className="border border-slate-200 text-xs font-semibold px-3.5 py-2 hover:border-[#ffffff] hover:bg-black hover:text-white bg-white rounded-xl transition shadow-3xs">Twitter (X)</a>
              <a href="#" className="border border-slate-200 text-xs font-semibold px-3.5 py-2 hover:border-orange-500 hover:text-orange-555 bg-white rounded-xl transition shadow-3xs">Instagram</a>
              <a href="#" className="border border-slate-200 text-xs font-semibold px-3.5 py-2 hover:border-orange-500 hover:text-orange-555 bg-white rounded-xl transition shadow-3xs">YouTube</a>
            </div>
          </div>

          {/* Inquiries log */}
          {submissionsList.length > 0 && (
            <div className="space-y-3 pt-2">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">
                Logged Local Submissions (Local Storage)
              </span>
              <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1">
                {submissionsList.map((log) => (
                  <div key={log.id} className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl space-y-1 shadow-3xs">
                    <div className="flex justify-between items-center bg-indigo-5/20 px-2 py-1 rounded">
                      <span className="text-xs font-extrabold text-indigo-955 uppercase tracking-wide">
                        {log.firstName} - {log.subject}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono font-semibold">
                        {log.timestamp.slice(11, 16)} GMT
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug pt-1">
                      "{log.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Messaging parameter form (Col-7) */}
        <div className="lg:col-span-12 xl:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-base sm:text-lg font-extrabold text-indigo-950 uppercase tracking-wide border-b border-slate-100 pb-3">
              Send us an operational message
            </h3>

            {submitSuccess && (
              <div className="bg-emerald-50 border border-emerald-500/25 text-emerald-800 rounded-2xl p-4 text-xs font-bold flex items-center gap-2.5 shadow-sm">
                <CheckCircle className="w-5 h-5 text-emerald-750 shrink-0" />
                Your message has been safely persisted inside the local registry database!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-450 uppercase tracking-wider">First Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Kwame"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-600 focus:bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-450 uppercase tracking-wider">Last Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Mensah"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-450 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-600 focus:bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-450 uppercase tracking-wider">Phone number</label>
                <input 
                  type="tel" 
                  placeholder="+233 24 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-slate-450 uppercase tracking-wider">Subject area</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-white border border-slate-200 px-3.5 py-3 rounded-xl text-xs sm:text-sm text-slate-705 font-bold focus:outline-hidden focus:border-indigo-600"
              >
                <option>General Enquiry</option>
                <option>Donate & supplementary support</option>
                <option>Register as community PIP</option>
                <option>Constituency executive desk application</option>
                <option>Initiate legal clinic coordination</option>
                <option>Media Inquiry</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-slate-450 uppercase tracking-wider">Inquiry Message</label>
              <textarea 
                required
                rows={4}
                placeholder="Detail exactly how the AMANI secretariat can coordinates resources with your community..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase py-3.5 rounded-xl tracking-wider transition flex items-center justify-center gap-2 shadow-md shadow-indigo-100 animate-pulse-once"
            >
              <Send className="w-4 h-4 text-orange-400 shrink-0 fill-current" />
              Transmit Inquiry to Secretariat
            </button>
          </form>

        </div>

      </section>

    </div>
  );
}
