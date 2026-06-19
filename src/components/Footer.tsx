import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, BadgeHelp, Heart, Landmark } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-slate-800 pt-16 pb-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <div 
              onClick={() => setActivePage('home')} 
              className="flex items-center gap-3 cursor-pointer group mb-6"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <strong className="text-lg font-bold tracking-tight font-sans uppercase text-indigo-900 leading-none">
                  AMANI
                </strong>
                <span className="text-[9px] text-slate-500 font-bold tracking-wide uppercase mt-1">
                  Ghana Nationwide NGO
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Empowering people, strengthening local traditional platforms, and mobilizing technical, physical, legal, and financial resources for sustainable transformation across all 16 regions of Ghana.
            </p>
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wide block mb-1">
                Community Access Codes:
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Remember to specify your unique Regional or Sector Reference Code during donation checkpoints.
              </p>
            </div>
          </div>

          {/* Quick Navigate */}
          <div>
            <h5 className="text-indigo-900 text-xs font-extrabold tracking-widest uppercase mb-6 pb-2 border-b border-slate-100">
              Navigate
            </h5>
            <ul className="space-y-3">
              {[
                { id: 'about-what', label: 'What we do' },
                { id: 'about-leadership', label: 'Leadership' },
                { id: 'programs', label: 'Programs' },
                { id: 'branches', label: 'Branches' },
                { id: 'ratings', label: 'Ratings' },
                { id: 'radio', label: 'Radio' },
                { id: 'blog', label: 'Reports' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => { setActivePage(item.id); window.scrollTo(0, 0); }}
                    className="text-sm text-slate-600 hover:text-indigo-600 transition flex items-center gap-2"
                  >
                    <span className="text-indigo-600 font-bold">›</span> {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Engagement */}
          <div>
            <h5 className="text-indigo-900 text-xs font-extrabold tracking-widest uppercase mb-6 pb-2 border-b border-slate-100">
              Get Involved
            </h5>
            <ul className="space-y-3">
              {[
                { id: 'donate', label: 'Support a Community' },
                { id: 'contact', label: 'Apply for Executive Desk' },
                { id: 'programs', label: 'Register as PIP Partner' },
                { id: 'contact', label: 'Volunteer Scheme' },
                { id: 'contact', label: 'Initiate Legal Aid Clinic' }
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => { setActivePage(item.id); window.scrollTo(0, 0); }}
                    className="text-sm text-slate-600 hover:text-indigo-600 transition flex items-center gap-2"
                  >
                    <span className="text-orange-500 font-bold">✦</span> {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h5 className="text-indigo-900 text-xs font-extrabold tracking-widest uppercase mb-6 pb-2 border-b border-slate-100">
              National Secretariat
            </h5>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  AMANI National HQ Suite 4B,<br />
                  Independence Avenue, Airport Residential,<br />
                  Accra, Ghana
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="font-mono font-bold">+233 (0) 30 200 8822</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="hover:text-indigo-600 font-semibold transition">info@amani.org.gh</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Socials & Disclaimer */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center">
          <p className="text-xs text-slate-500 font-mono">
            © {currentYear} AMANI Organization. Incorporating Civil Trust & Legal Support. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <a href="https://facebook.com/amani" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 flex items-center justify-center text-slate-500 transition shadow-sm">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://twitter.com/amani" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 flex items-center justify-center text-slate-500 transition shadow-sm">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/amani" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 flex items-center justify-center text-slate-500 transition shadow-sm">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com/amani" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 flex items-center justify-center text-slate-500 transition shadow-sm">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
