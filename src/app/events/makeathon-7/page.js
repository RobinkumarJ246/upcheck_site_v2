'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  Calendar, Clock, MapPin, ExternalLink, Sparkles, ArrowLeft,
  Building2, ArrowRight, Briefcase, GraduationCap, AlertCircle,
  Users, Phone, Copy, CheckCheck, ChevronDown, ChevronUp, Share2, Globe
} from 'lucide-react';
import Link from 'next/link';

// ─── Countdown Timer ───
function CountdownTimer({ endDate }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = new Date(endDate) - new Date();
      if (diff <= 0) { setTimeLeft({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  const Unit = ({ val, label }) => (
    <div className="flex flex-col items-center min-w-[3.5rem]">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl w-14 h-14 flex items-center justify-center">
        <span className="text-white font-black text-2xl tabular-nums leading-none">{String(val).padStart(2, '0')}</span>
      </div>
      <span className="text-white/50 text-[10px] mt-1.5 uppercase tracking-widest font-semibold">{label}</span>
    </div>
  );

  return (
    <div className="flex items-end gap-2">
      <Unit val={timeLeft.d} label="Days" />
      <span className="text-white/30 text-2xl font-light mb-7">:</span>
      <Unit val={timeLeft.h} label="Hrs" />
      <span className="text-white/30 text-2xl font-light mb-7">:</span>
      <Unit val={timeLeft.m} label="Min" />
      <span className="text-white/30 text-2xl font-light mb-7">:</span>
      <Unit val={timeLeft.s} label="Sec" />
    </div>
  );
}

// ─── Copy-to-clipboard coordinator card ───
function CoordinatorCard({ name, phone }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(phone.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="group relative bg-white border border-slate-100 rounded-2xl p-4 hover:border-teal-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-900 to-teal-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-black">{name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm leading-tight">{name}</p>
          <p className="text-slate-400 text-xs">{phone}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <a
          href={`tel:${phone.replace(/\s/g, '')}`}
          className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-900 to-teal-600 text-white text-xs font-semibold py-2 rounded-lg hover:brightness-110 transition-all"
          onClick={e => e.stopPropagation()}
        >
          <Phone className="w-3 h-3" />
          Call
        </a>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold py-2 px-3 rounded-lg hover:bg-slate-100 transition-all"
        >
          {copied ? <CheckCheck className="w-3 h-3 text-teal-500" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

// ─── Accordion (for FAQ / problem hints) ───
function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open ? 'border-teal-200 bg-teal-50/30' : 'border-slate-100 bg-white'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <span className="font-semibold text-slate-900 text-sm">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-teal-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Share button ───
function ShareButton({ title, url }) {
  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title, url }); return; } catch (_) {}
    }
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-semibold hover:border-teal-400 hover:text-teal-600 transition-all duration-200"
    >
      {copied ? <CheckCheck className="w-4 h-4 text-teal-500" /> : <Share2 className="w-4 h-4" />}
      {copied ? 'Link copied!' : 'Share'}
    </button>
  );
}

export default function Makeathon7Page() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const sectionRefs = useRef({});

  useEffect(() => { setMounted(true); }, []);

  const event = {
    title: 'Makeathon 7.0',
    subtitle: 'National Level Hardware & Software Hackathon',
    description: 'A 24-hour innovation-driven hackathon where student innovators from institutions across India tackle real-world, industry-oriented challenges.',
    longDescription: 'Makeathon 7.0 is the flagship event of the Department of Electronics and Communication Engineering at Sri Venkateswara College of Engineering. This national-level hackathon brings together hundreds of talented students to solve real-world challenges through innovative hardware and software solutions. Compete, collaborate, and create alongside the brightest minds from across India.',
    startDate: '2026-04-15T00:00:00',
    endDate: '2026-04-16T23:59:59',
    venue: 'Sri Venkateswara College of Engineering (SVCE), Sriperumbudur, Tamil Nadu',
    venueShort: 'SVCE, Sriperumbudur',
    organizer: 'Department of ECE, SVCE',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    website: 'https://make-a-thon-7.in',
    registration: 'https://forms.gle/MSiu9x7Mo2kYBmmA9',
    highlights: [
      { icon: '⏱', label: '24-Hour Sprint', desc: 'Continuous non-stop hackathon format' },
      { icon: '🏆', label: 'National Stage', desc: 'Compete with teams from all over India' },
      { icon: '🧠', label: 'Real Problems', desc: 'Industry-oriented challenge statements' },
      { icon: '🍹', label: 'Food and Beverages', desc: 'Free meals and refreshments provided throughout the event.' },
      { icon: '💼', label: 'Internships', desc: 'Opportunities from top sponsors' },
      { icon: '🤝', label: 'Networking', desc: 'Connect with industry leaders' },
    ],
    domains: ['IoT & Embedded Systems', 'AI / Machine Learning', 'Smart Cities', 'Healthcare Tech', 'Fintech', 'Open Innovation'],
    coordinators: [
      { name: 'Roshan M', phone: '98410 92274' },
      { name: 'Adarsh S', phone: '73059 70106' },
      { name: 'Yaaminy S K', phone: '63809 89594' },
      { name: 'Roobuck Rao C', phone: '81482 04922' },
      { name: 'Mohammed Raeef', phone: '91501 58647' },
      { name: 'Harinee V T', phone: '73581 20955' },
    ],
    organizingBodies: [
      { name: 'RACE', fullName: 'Research Association for Innovative Design in Communication and Electronics' },
      { name: 'IETE-SF', fullName: 'Institution of Electronics and Telecommunication Engineers – Students Forum' },
      { name: 'ECEA', fullName: 'Electronics and Communication Engineers Association' },
    ],
    faqs: [
      { q: 'Who can participate?', a: 'Any student currently enrolled in an undergraduate or postgraduate programme at a recognised college/university in India. You need a team of 4–6 members.' },
      { q: 'Is there a registration fee?', a: 'Registration fees and other details are mentioned on the official Makeathon 7.0 website. Please refer to make-a-thon-7.in for the latest information.' },
      { q: 'What should I bring?', a: 'Bring your laptop, charger, and any hardware components your project requires. Food and accommodation details will be communicated after registration.' },
      { q: 'Can teams have members from different colleges?', a: 'No. Teams must consist of members from the same college, but can include students from different departments or years of study.' },
    ],
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem', label: 'Problem Statement' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'coordinators', label: 'Coordinators' },
    { id: 'faq', label: 'FAQ' },
  ];

  const scrollToTab = (id) => {
    setActiveTab(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-28 pb-0 bg-gradient-to-br from-[#0a1628] via-[#0f2a4a] to-[#0d3d3a] overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />
        <div className="absolute top-10 left-1/3 w-96 h-96 rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-teal-500/15 blur-[80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-0">
          {/* Back */}
          <Link href="/events" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end gap-10">
            {/* Left */}
            <div className="flex-1 pb-14">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE NOW
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  Featured Event
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-4 tracking-tight">
                Makeathon<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-400">7.0</span>
              </h1>
              <p className="text-xl text-blue-200/80 mb-6">{event.subtitle}</p>

              {/* Quick meta */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-teal-400" />
                  {new Date(event.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-400" />
                  24 Hours
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  {event.venueShort}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-400" />
                  {event.teamSize}
                </span>
              </div>
            </div>

            {/* Right — Countdown card */}
            <div className="lg:w-80 bg-white/5 backdrop-blur-sm border border-white/10 rounded-t-3xl px-8 pt-8 pb-10">
              <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-4">Registration closes in</p>
              <CountdownTimer endDate={event.endDate} />
              <div className="mt-6 space-y-3">
                <a
                  href={event.registration}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-teal-400 hover:bg-teal-300 text-slate-900 py-3.5 rounded-xl font-black text-sm transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5"
                >
                  Register Now
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={event.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                >
                  <Globe className="w-4 h-4" />
                  Official Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STICKY NAV TABS ═══ */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => scrollToTab(tab.id)}
                className={`flex-shrink-0 px-5 py-4 text-sm font-semibold border-b-2 transition-all duration-200 ${activeTab === tab.id ? 'border-teal-500 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
              >
                {tab.label}
              </button>
            ))}
            <div className="ml-auto flex-shrink-0 py-2">
              <ShareButton title={event.title} url={typeof window !== 'undefined' ? window.location.href : ''} />
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Hero image */}
        <div className="relative rounded-3xl overflow-hidden h-72 md:h-96 shadow-2xl">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
            <div className="flex gap-3">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-center">
                <p className="text-white font-black text-lg">Creative</p>
                <p className="text-white/60 text-xs">Thinking</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-center">
                <p className="text-white font-black text-lg">Futuristic</p>
                <p className="text-white/60 text-xs">Technologies</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-center">
                <p className="text-white font-black text-lg">Endless</p>
                <p className="text-white/60 text-xs">Innovations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-center">
                <p className="text-white font-black text-lg">Peer</p>
                <p className="text-white/60 text-xs">Networking</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── OVERVIEW ─── */}
        <div ref={el => (sectionRefs.current['overview'] = el)} className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* About */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                About Makeathon 7.0
              </h2>
              <p className="text-slate-500 text-sm mb-5">Organised by Dept. of ECE, SVCE</p>
              <p className="text-slate-700 leading-relaxed text-base">{event.longDescription}</p>

              {/* Domains */}
              <div className="mt-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Challenge Domains</p>
                <div className="flex flex-wrap gap-2">
                  {event.domains.map(d => (
                    <span key={d} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-700 rounded-xl text-sm font-medium">{d}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* UpCheck Role */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-900 to-teal-700 rounded-3xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-black text-sm">Meet UpCheck</p>
                    <p className="text-white/60 text-xs">at Makeathon 7.0</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/10 border border-white/20 rounded-xl p-3">
                    <p className="font-bold text-sm mb-0.5">🏭 Industry Sponsor</p>
                    <p className="text-white/70 text-xs">Supporting innovation with industry resources and exposure.</p>
                  </div>
                  <div className="bg-white/10 border border-white/20 rounded-xl p-3">
                    <p className="font-bold text-sm mb-0.5">⚖️ Jury Panel</p>
                    <p className="text-white/70 text-xs">We evaluate and mentor participating teams.</p>
                  </div>
                  <div className="bg-white/10 border border-white/20 rounded-xl p-3">
                    <p className="font-bold text-sm mb-0.5">💼 Internship Paths</p>
                    <p className="text-white/70 text-xs">Top teams working on our challenge get internship opportunities.</p>
                  </div>
                </div>
              </div>

              {/* Organising bodies */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Organised by
                </p>
                <div className="space-y-3">
                  {event.organizingBodies.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 bg-gradient-to-r from-blue-900 to-teal-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md flex-shrink-0">{b.name}</span>
                      <p className="text-slate-500 text-xs leading-snug">{b.fullName}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── PROBLEM STATEMENT ─── */}
        <div ref={el => (sectionRefs.current['problem'] = el)} className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-teal-100 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Industry Problem Statement</h2>
              <p className="text-slate-500 text-sm">Presented by UpCheck</p>
            </div>
          </div>

          {/* Coming soon card */}
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-dashed border-amber-300 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-amber-200">
                <AlertCircle className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Problem Statement Coming Soon</h3>
              <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed mb-6">
                We're crafting an exciting real-world challenge in technology. Our problem statement will be revealed during the hackathon kickoff session — stay tuned!
              </p>
              <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Announced at kickoff
              </div>
            </div>
          </div>

          {/* Official college PS link */}
          <div className="mt-6 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-900 text-sm mb-1">Official College Problem Statements</p>
                <p className="text-slate-500 text-xs leading-relaxed">The organizers have published problem statements across IoT, AI/ML, Smart Cities, and more on the official website.</p>
              </div>
            </div>
            <a
              href={`${event.website}/#problems`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
            >
              View All
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ─── HIGHLIGHTS ─── */}
        <div ref={el => (sectionRefs.current['highlights'] = el)} className="scroll-mt-20">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Event Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.highlights.map((h, i) => (
              <div key={i} className="group bg-white border border-slate-100 rounded-2xl p-6 hover:border-teal-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                <div className="text-3xl mb-3">{h.icon}</div>
                <p className="font-black text-slate-900 mb-1">{h.label}</p>
                <p className="text-slate-500 text-sm">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── COORDINATORS ─── */}
        <div ref={el => (sectionRefs.current['coordinators'] = el)} className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-black text-slate-900">Student Coordinators</h2>
            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">{event.coordinators.length}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.coordinators.map((c, i) => <CoordinatorCard key={i} {...c} />)}
          </div>
        </div>

        {/* ─── FAQ ─── */}
        <div ref={el => (sectionRefs.current['faq'] = el)} className="scroll-mt-20">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-3xl">
            {event.faqs.map((f, i) => (
              <Accordion key={i} title={f.q}>
                <p className="pt-3">{f.a}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-24 relative overflow-hidden mt-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2a4a] to-[#0d3d3a]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 left-0 w-1/2 h-full bg-teal-500/5 blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-teal-300 text-sm font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Partner with us
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Want to Collaborate<br />on Your Next Event?
          </h2>
          <p className="text-blue-200/70 text-lg mb-10 max-w-2xl mx-auto">
            UpCheck loves supporting student innovation. Reach out to explore sponsorship, mentorship, or jury partnerships.
          </p>
          <a
            href="mailto:admin@upcheck.in"
            className="inline-flex items-center gap-3 bg-white text-blue-900 px-8 py-4 rounded-xl font-black text-base hover:bg-teal-50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}