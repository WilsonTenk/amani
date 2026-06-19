import React, { useState, useEffect, useMemo } from 'react';
import { 
  Heart, 
  MapPin, 
  Coins, 
  BadgeCheck, 
  BadgeHelp,
  ShieldAlert, 
  CheckCircle, 
  TrendingUp, 
  FileText,
  User,
  Phone,
  Mail,
  Receipt,
  ArrowRight,
  Info
} from 'lucide-react';
import { causesData } from '../data/amaniData';
import { DonationLog } from '../types';

interface DonateViewProps {
  selectedCauseId: string | null;
  setSelectedCauseId: (id: string | null) => void;
}

export default function DonateView({ selectedCauseId, setSelectedCauseId }: DonateViewProps) {
  // Donation states
  const [selectedCause, setSelectedCause] = useState<string>(selectedCauseId || 'General Community Development');
  const [amountGhs, setAmountGhs] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [refCode, setRefCode] = useState<string>('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Status check trackers
  const [refValidationMessage, setRefValidationMessage] = useState<string>('');
  const [isRefVerified, setIsRefVerified] = useState<boolean | null>(null);
  const [donationsLedger, setDonationsLedger] = useState<DonationLog[]>([]);
  const [paymentStep, setPaymentStep] = useState<'idle' | 'processing' | 'success'>('idle');
  const [newlyCreatedLog, setNewlyCreatedLog] = useState<DonationLog | null>(null);

  // Suggested amount buttons
  const predefinedAmounts = [50, 100, 200, 500];

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
    // Sync with prop from other views
    if (selectedCauseId) {
      const matched = causesData.find(c => c.id === selectedCauseId);
      if (matched) setSelectedCause(matched.name);
    }
  }, [selectedCauseId]);

  // Load donation history ledger from localStorage on load
  useEffect(() => {
    const historical = localStorage.getItem('amani_donations_ledger_v1');
    if (historical) {
      try {
        setDonationsLedger(JSON.parse(historical));
      } catch (e) {
        // Safe fail
      }
    } else {
      // Seed some starting direct logs to showcase the ledger
      const seeded: DonationLog[] = [
        {
          id: 'mock-1',
          firstName: 'Kwame',
          lastName: 'Mensah',
          email: 'k.mensah@email.com',
          phone: '+233 24 220 1199',
          causeName: 'Community Health Infrastructure Support',
          amountGhs: 150,
          refCode: 'GA-012',
          timestamp: '2026-06-14T10:15:00Z'
        },
        {
          id: 'mock-2',
          firstName: 'Akosua',
          lastName: 'Osei',
          email: 'akosua_osei@email.com',
          phone: '+233 55 981 7766',
          causeName: 'Education & Classroom Blocks retuning',
          amountGhs: 500,
          refCode: 'AR-004',
          timestamp: '2026-06-12T14:40:00Z'
        }
      ];
      localStorage.setItem('amani_donations_ledger_v1', JSON.stringify(seeded));
      setDonationsLedger(seeded);
    }
  }, []);

  // Community reference code simulation checking
  const handleRefCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.toUpperCase();
    setRefCode(code);

    if (!code) {
      setRefValidationMessage('');
      setIsRefVerified(null);
      return;
    }

    // Check specific formats
    if (code.startsWith('GA-')) {
      // Greater Accra Area
      setIsRefVerified(true);
      setRefValidationMessage('Verified Match: Ga East Constituency Development Trust (Greater Accra)');
    } else if (code.startsWith('AR-')) {
      // Ashanti Area
      setIsRefVerified(true);
      setRefValidationMessage('Verified Match: Kwadaso Constituency Trust (Ashanti Region)');
    } else if (code.startsWith('NR-')) {
      // Northern Area
      setIsRefVerified(true);
      setRefValidationMessage('Verified Match: Tamale Central Trust (Northern Region)');
    } else if (code.startsWith('VR-')) {
      // Volta Area
      setIsRefVerified(true);
      setRefValidationMessage('Verified Match: Ho West Development trust (Volta Region)');
    } else if (code.length >= 4) {
      // Default guess fallback
      setIsRefVerified(true);
      setRefValidationMessage(`Verified Match: Branch Trust Block #${code}`);
    } else {
      setIsRefVerified(false);
      setRefValidationMessage('Ref Code format not recognized. Use GA-, AR-, NR-, or VR- base keys.');
    }
  };

  const handleAmountClick = (amt: number) => {
    setAmountGhs(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val) {
      setAmountGhs(Number(val));
    }
  };

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !refCode) {
      return;
    }

    setPaymentStep('processing');

    // Simulate standard Mobile Money details handshake loading
    setTimeout(() => {
      const donationLog: DonationLog = {
        id: 'txn-' + Date.now(),
        firstName,
        lastName,
        email,
        phone: phone || '+233 00 000 0000',
        causeName: selectedCause,
        amountGhs: Number(amountGhs) || 100,
        refCode,
        timestamp: new Date().toISOString()
      };

      const updatedLedger = [donationLog, ...donationsLedger];
      setDonationsLedger(updatedLedger);
      localStorage.setItem('amani_donations_ledger_v1', JSON.stringify(updatedLedger));

      setNewlyCreatedLog(donationLog);
      setPaymentStep('success');

      // Refresh forms
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setRefCode('');
      setCustomAmount('');
      setAmountGhs(100);
      setRefValidationMessage('');
      setIsRefVerified(null);
      setSelectedCauseId(null);
    }, 2500);
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
        <div className="max-w-7xl mx-auto relative z-10 text-center max-w-2xl mx-auto space-y-4">
          <div className="text-[11px] font-bold text-orange-605 tracking-widest uppercase font-mono bg-orange-500/15 border border-orange-500/25 px-3.5 py-1.5 rounded-full inline-block">
            Secure Donation Platform
          </div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight uppercase text-center w-full ${
            useBgImage ? 'text-white' : 'text-indigo-950'
          }`}>
            Support your community
          </h1>
          <div className="w-12 h-1 bg-orange-500 mx-auto rounded" />
          <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${
            useBgImage ? 'text-indigo-100' : 'text-slate-650'
          }`}>
            Every donation is assigned directly to your constituency ledger using the transparent community code system. Tracks are audited and declared quarterly to Chiefs and Assembly councils.
          </p>
        </div>
      </section>

      {/* 2. THREE-STEP DIRECTIVES GRID */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs text-center md:text-left hover:border-indigo-505/10 transition">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold font-mono mx-auto md:mx-0 shadow-xs">
              1
            </div>
            <h4 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wide">
              Locate Constituency Code
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Find your community identification code (e.g., GA-012, AR-004) displayed on our radio schedules or provided by local desk chairs.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs text-center md:text-left hover:border-indigo-505/10 transition">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold font-mono mx-auto md:mx-0 shadow-xs">
              2
            </div>
            <h4 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wide">
              Complete Payment Form
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Designate your cause of focus, complete donor names, input the constituency ref code, and finalize standard MoMo or credit parameters.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs text-center md:text-left hover:border-indigo-505/10 transition">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold font-mono mx-auto md:mx-0 shadow-xs">
              3
            </div>
            <h4 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wide">
              Audit the Deployment
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              AMANI delivers full quarterly accounts back to regional coordinating assemblies and resident traditional rulers, blocking leakages.
            </p>
          </div>
        </div>

        {/* Community Reference Explainer Panel */}
        <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 flex flex-col md:flex-row gap-5 items-start">
          <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5 text-orange-600 shrink-0" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h4 className="text-indigo-955 font-extrabold text-sm sm:text-base uppercase tracking-wider">
              Community Reference Code Rules Checklist
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Applying a reference code ensures that 100% of your donated amount skips central administration pools and routes directly to the specific constituency ledger you select. Use <span className="font-mono font-bold bg-orange-500/10 border border-orange-200/50 px-1.5 py-0.5 rounded text-orange-700">GA-012</span>, <span className="font-mono font-bold bg-orange-500/10 border border-orange-200/50 px-1.5 py-0.5 rounded text-orange-700">AR-004</span>, or <span className="font-mono font-bold bg-orange-500/10 border border-orange-200/50 px-1.5 py-0.5 rounded text-orange-700">NR-001</span> to test our live on-screen reference verification checker inside the payment form below!
            </p>
          </div>
        </div>

        {/* 3. TRANSACTION ENGINE GRID (Form + Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Donation parameters form (Col-8) */}
          <div className="lg:col-span-12 xl:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm animate-fade-in">
            
            {paymentStep === 'idle' && (
              <form onSubmit={handleSubmitDonation} className="space-y-6">
                <h3 className="text-base sm:text-lg font-extrabold text-indigo-950 uppercase tracking-wide border-b border-slate-100 pb-3">
                  Transact supplemental community donation
                </h3>

                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold text-slate-450 uppercase tracking-wider">
                    Designated Action Cause
                  </label>
                  <select
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                    className="w-full bg-white border border-slate-200 px-3.5 py-3 rounded-xl text-xs sm:text-sm text-slate-705 font-bold focus:outline-hidden focus:border-indigo-600"
                  >
                    <option>General Community Development</option>
                    {causesData.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2.5">
                  <label className="block text-xs font-extrabold text-slate-455 uppercase tracking-wider text-left">
                    Contribution Amount (GHS)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {predefinedAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleAmountClick(amt)}
                        className={`py-2.5 rounded-xl text-xs font-black font-mono text-center border transition cursor-pointer ${
                          amountGhs === amt && !customAmount
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                  <input 
                    type="number" 
                    placeholder="Or enter custom supplemental amount (GHS)..."
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                {/* Secure Code parameters with live trigger alert */}
                <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-150">
                  <label className="block text-xs font-extrabold text-slate-450 uppercase tracking-wider">
                    Constituency Reference Code
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. GA-012, AR-004, NR-001..."
                    value={refCode}
                    onChange={handleRefCodeChange}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm uppercase font-mono font-bold focus:outline-hidden focus:border-indigo-600 focus:bg-white"
                  />
                  {refValidationMessage && (
                    <div className="flex gap-2 items-start mt-2">
                      {isRefVerified ? (
                        <BadgeCheck className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5 fill-current" />
                      ) : (
                        <BadgeHelp className="w-4 h-4 text-orange-505 shrink-0 mt-0.5" />
                      )}
                      <span className={`text-[11px] font-bold ${isRefVerified ? 'text-indigo-850 font-sans' : 'text-orange-605 font-mono'}`}>
                        {refValidationMessage}
                      </span>
                    </div>
                  )}
                </div>

                {/* Personal parameters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-450 uppercase tracking-wider">First Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Kwame"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#eaeaea] rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-600 focus:bg-white"
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
                      className="w-full px-4 py-2.5 bg-white border border-[#eaeaea] rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-455 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="name@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#eaeaea] rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-455 uppercase tracking-wider">Phone (MoMo Number)</label>
                    <input 
                      type="tel" 
                      placeholder="+233 24 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#eaeaea] rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-705 text-white font-black text-xs uppercase py-3.5 rounded-xl tracking-wider transition flex items-center justify-center gap-2 shadow-md shadow-indigo-100 cursor-pointer animate-pulse-once"
                >
                  <Heart className="w-4 h-4 text-orange-400 fill-current shrink-0" />
                  Complete Direct MoMo Contribution
                </button>
              </form>
            )}

            {paymentStep === 'processing' && (
              <div className="py-20 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <h4 className="text-base font-extrabold text-indigo-950 uppercase tracking-wider">
                  Processing MoMo Handshake...
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  Communicating with Ghana Supplemental MoMo Core nodes. Please wait.
                </p>
              </div>
            )}

            {paymentStep === 'success' && newlyCreatedLog && (
              <div className="py-10 text-center space-y-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 border border-indigo-150 flex items-center justify-center mx-auto text-3xl shadow-sm font-black">
                  ✓
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-indigo-950 uppercase tracking-wide">
                    Supplement funding complete!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Thank you, {newlyCreatedLog.firstName}! Your direct contribution maps completely to constituency block code <span className="font-mono font-bold text-indigo-800 bg-indigo-50 px-1.5 py-0.5 border border-indigo-100 rounded">{newlyCreatedLog.refCode}</span>.
                  </p>
                </div>

                {/* Printed receipt summary */}
                <div className="max-w-md mx-auto bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left space-y-3 font-mono text-xs shadow-3xs">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center border-b border-slate-200 pb-2 mb-2">
                    AMANI Supplemental Receipt Log
                  </span>
                  <div className="flex justify-between"><span>Donor Name:</span> <span className="text-indigo-950 font-bold">{newlyCreatedLog.firstName} {newlyCreatedLog.lastName}</span></div>
                  <div className="flex justify-between"><span>Registry ID:</span> <span>{newlyCreatedLog.id}</span></div>
                  <div className="flex justify-between"><span>Designated Cause:</span> <span className="truncate max-w-[200px] text-right text-slate-650">{newlyCreatedLog.causeName}</span></div>
                  <div className="flex justify-between"><span>Donation Weight:</span> <span className="text-indigo-600 font-bold">GHS {newlyCreatedLog.amountGhs}</span></div>
                  <div className="flex justify-between"><span>Reference Union Code:</span> <span className="text-indigo-700 font-bold font-mono uppercase">{newlyCreatedLog.refCode}</span></div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 text-[11px]"><span>Date Cleared:</span> <span>{newlyCreatedLog.timestamp.slice(0, 10)}</span></div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setPaymentStep('idle')}
                    className="bg-indigo-600 text-white hover:bg-indigo-700 font-black text-xs uppercase px-8 py-3.5 rounded-xl tracking-wider transition shadow-sm cursor-pointer"
                  >
                    Send another Donation
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Secure Audit Ledger Sidebar (Col-4) */}
          <div className="lg:col-span-12 xl:col-span-4 space-y-6">
            
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-3xs">
              <h3 className="text-base font-extrabold text-indigo-950 uppercase tracking-wide flex items-center gap-2 border-b border-slate-100 pb-3">
                <Receipt className="w-5 h-5 text-indigo-600 animate-fade-in" />
                Direct Donation Ledger
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Below shows real-time direct donations processed under your current browser's local state database.
              </p>

              <div className="space-y-3.5 max-h-[280px] overflow-y-auto pr-1">
                {donationsLedger.map((log) => (
                  <div key={log.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-1 shadow-3xs">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-extrabold text-indigo-950 uppercase tracking-wide">
                        {log.firstName} {log.lastName.charAt(0)}.
                      </span>
                      <span className="text-xs font-semibold text-indigo-600 font-mono">
                        GHS {log.amountGhs}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-405 font-mono">
                      <span className="truncate max-w-[140px]">{log.causeName}</span>
                      <span className="uppercase text-orange-500 font-bold">{log.refCode}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wide leading-none flex items-center gap-2">
                <Coins className="w-5 h-5 text-orange-400" />
                Resource Allocation Mean
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-500">
                <li className="flex justify-between"><span>Health compound panels:</span> <span className="font-bold text-indigo-600 font-mono select-none">35%</span></li>
                <li className="flex justify-between"><span>Education classroom builds:</span> <span className="font-bold text-indigo-600 font-mono select-none">25%</span></li>
                <li className="flex justify-between"><span>Cooperative agriculture seeds:</span> <span className="font-bold text-indigo-600 font-mono select-none">20%</span></li>
                <li className="flex justify-between"><span>Free Family & Land Mediation:</span> <span className="font-bold text-indigo-600 font-mono select-none">10%</span></li>
                <li className="flex justify-between"><span>Decentralized civic outreach:</span> <span className="font-bold text-indigo-600 font-mono select-none">10%</span></li>
              </ul>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
