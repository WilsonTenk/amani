import { useState } from 'react';
import { Heart, Menu, X, Landmark, Globe } from 'lucide-react';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Header({ activePage, setActivePage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { 
      id: 'about', 
      label: 'About',
      subLinks: [
        { id: 'about-what', label: 'What we do' },
        { id: 'about-leadership', label: 'Leadership' }
      ]
    },
    { id: 'programs', label: 'Programs' },
    { id: 'branches', label: 'Branches' },
    { id: 'ratings', label: 'Ratings' },
    { id: 'radio', label: 'Radio' },
    { id: 'blog', label: 'Reports' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Wordmark */}
          <div 
            onClick={() => { setActivePage('home'); setIsOpen(false); }} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md group-hover:bg-indigo-700 transition">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <strong className="text-xl font-extrabold tracking-tight font-sans uppercase text-indigo-900 leading-none">
                AMANI
              </strong>
              <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase mt-1">
                Mobilizing Resources. Empowering People.
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.subLinks) {
                const isSubActive = activePage === 'about-what' || activePage === 'about-leadership' || activePage === 'about';
                return (
                  <div key={link.id} className="relative group py-2">
                    <button
                      onClick={() => setActivePage('about-what')}
                      className={`px-3 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-150 flex items-center gap-1 cursor-pointer ${
                        isSubActive
                          ? 'text-indigo-600 border-b-2 border-indigo-600'
                          : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-md'
                      }`}
                    >
                      {link.label}
                      <svg className="w-3 h-3 text-slate-500 group-hover:text-indigo-600 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Hover Dropdown panel */}
                    <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white border border-slate-200 rounded-2xl shadow-xl py-2 w-48 text-left z-55 animate-fade-in">
                      {link.subLinks.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => setActivePage(sub.id)}
                          className={`block w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                            activePage === sub.id
                              ? 'text-indigo-600 bg-indigo-50/50'
                              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => setActivePage(link.id)}
                  className={`px-3 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-150 cursor-pointer ${
                    activePage === link.id
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-md'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            
            <button
              onClick={() => setActivePage('donate')}
              className="ml-4 bg-orange-500 text-white hover:bg-orange-600 active:translate-y-0.5 font-bold text-xs uppercase px-6 py-2.5 rounded-full flex items-center gap-2 tracking-widest transition-all shadow-md shadow-orange-100 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              DONATE NOW
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            if (link.subLinks) {
              return (
                <div key={link.id} className="space-y-1 py-1">
                  <div className="px-4 py-2 text-xs font-black uppercase text-indigo-900 tracking-wider">
                    {link.label}
                  </div>
                  <div className="pl-4 space-y-1 border-l-2 border-slate-100 ml-4 py-1">
                    {link.subLinks.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setActivePage(sub.id);
                          setIsOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                          activePage === sub.id
                            ? 'text-indigo-600 bg-indigo-50 font-extrabold'
                            : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  activePage === link.id
                    ? 'text-indigo-600 bg-indigo-50 font-extrabold'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={() => {
                setActivePage('donate');
                setIsOpen(false);
              }}
              className="w-full bg-orange-500 text-white font-bold text-xs uppercase py-3 rounded-full flex items-center justify-center gap-2 tracking-widest shadow-md cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current" />
              DONATE NOW
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
