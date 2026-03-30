'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Clock, MapPin, Trophy, Sparkles, Zap, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

// ─── Bug fix: robust status helper using useMemo-compatible pure fn ───
const getEventStatus = (endDate) => {
  const now = new Date();
  const end = new Date(endDate);
  if (isNaN(end.getTime())) return { label: 'TBD', color: 'bg-slate-400', textColor: 'text-slate-500', active: false };
  if (now > end) return { label: 'Ended', color: 'bg-slate-400', textColor: 'text-slate-500', active: false };
  const daysUntil = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  if (daysUntil <= 7) return { label: 'LIVE · Ending Soon', color: 'bg-red-500', textColor: 'text-red-500', active: true, urgent: true };
  if (daysUntil <= 30) return { label: 'LIVE NOW', color: 'bg-emerald-500', textColor: 'text-emerald-600', active: true };
  return { label: 'Upcoming', color: 'bg-blue-500', textColor: 'text-blue-600', active: false };
};

// ─── Animated counter hook ───
function useCountUp(target, duration = 1200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── Countdown Timer Component ───
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
    <div className="flex flex-col items-center">
      <div className="relative w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
        <span className="text-white font-bold text-xl tabular-nums">{String(val).padStart(2, '0')}</span>
      </div>
      <span className="text-white/60 text-xs mt-1 uppercase tracking-widest">{label}</span>
    </div>
  );

  return (
    <div className="flex items-end gap-2">
      <Unit val={timeLeft.d} label="Days" />
      <span className="text-white/50 text-xl font-light mb-6">:</span>
      <Unit val={timeLeft.h} label="Hrs" />
      <span className="text-white/50 text-xl font-light mb-6">:</span>
      <Unit val={timeLeft.m} label="Min" />
      <span className="text-white/50 text-xl font-light mb-6">:</span>
      <Unit val={timeLeft.s} label="Sec" />
    </div>
  );
}

// ─── Stat Pill ───
function StatPill({ value, label, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 1000, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center" style={{ animationDelay: `${delay}ms` }}>
      <span className="text-4xl font-black text-white tabular-nums">{count}+</span>
      <span className="text-blue-200 text-sm font-medium">{label}</span>
    </div>
  );
}

export default function EventsPage() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all' | 'live' | 'upcoming' | 'ended'
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => { setMounted(true); }, []);

  const events = [
    {
      id: 1,
      slug: 'makeathon-7',
      title: 'Makeathon 7.0',
      subtitle: 'National Level Hardware & Software Hackathon',
      description: 'A 24-hour innovation-driven hackathon where student innovators from institutions across India tackle real-world, industry-oriented challenges.',
      startDate: '2026-04-15T00:00:00',
      endDate: '2026-04-16T23:59:59',
      venue: 'SVCE, Sriperumbudur, Tamil Nadu',
      duration: '24 Hours',
      organizer: 'Department of ECE, SVCE',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      accentColor: 'from-blue-600 to-teal-500',
      tags: ['Hardware', 'Software', 'AI/ML', 'IoT'],
      website: 'https://make-a-thon-7.in',
      registration: 'https://forms.gle/MSiu9x7Mo2kYBmmA9',
      status: getEventStatus('2026-04-16T23:59:59'),
    },
  ];

  const filtered = events.filter(e => {
    if (filter === 'all') return true;
    if (filter === 'live') return e.status.active;
    if (filter === 'upcoming') return e.status.label === 'Upcoming';
    if (filter === 'ended') return !e.status.active && e.status.label === 'Ended';
    return true;
  });

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-28 pb-32 bg-gradient-to-br from-[#0a1628] via-[#0f2a4a] to-[#0d3d3a] overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />
        {/* Glowing orbs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-blue-600/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-teal-500/20 blur-[80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            {/* Left */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-400/30 px-4 py-1.5 rounded-full text-teal-300 text-sm font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Where Innovation Meets Industry</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-white leading-[0.95] mb-6 tracking-tight">
                Events &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-400">Hackathons</span>
              </h1>
              <p className="text-lg text-blue-200/80 max-w-xl leading-relaxed">
                Upcheck partners with top institutions as an industrial sponsor and jury — backing the boldest student builders in India.
              </p>

              {/* CTA scroll hint */}
              <button
                onClick={() => document.getElementById('events-list')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-10 inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
              >
                <ChevronDown className="w-4 h-4 animate-bounce" />
                Explore events
              </button>
            </div>

            {/* Right — Stats
            <div className="lg:w-72 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <StatPill value={7} label="Editions" delay={0} />
                <StatPill value={500} label="Participants" delay={100} />
                <StatPill value={30} label="Colleges" delay={200} />
                <StatPill value={12} label="Industry Partners" delay={300} />
              </div>
            </div>
            */}
          </div>
        </div>
      </section>

      {/* ═══ EVENTS LIST ═══ */}
      <section id="events-list" className="py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter bar */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900">All Events</h2>
              <p className="text-slate-500 text-sm mt-1">{filtered.length} event{filtered.length !== 1 ? 's' : ''} found</p>
            </div>
            <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm border border-slate-200">
              {['all', 'live', 'upcoming', 'ended'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${filter === f ? 'bg-gradient-to-r from-blue-900 to-teal-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-6">
            {filtered.length === 0 && (
              <div className="py-24 text-center">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-400 text-lg font-medium">No events in this category yet.</p>
              </div>
            )}

            {filtered.map((event) => (
              <Link href={`/events/${event.slug}`} key={event.id} className="block group">
                <div
                  onMouseEnter={() => setHoveredId(event.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative bg-white rounded-3xl overflow-hidden border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                >
                  {/* Accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${event.accentColor}`} />

                  <div className="flex flex-col lg:flex-row">
                    {/* Image panel */}
                    <div className="relative lg:w-80 h-52 lg:h-auto overflow-hidden flex-shrink-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent lg:bg-gradient-to-t" />

                      {/* Live badge on image */}
                      {event.status.active && (
                        <div className="absolute top-4 left-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-bold ${event.status.urgent ? 'bg-red-500' : 'bg-emerald-500'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full bg-white ${event.status.urgent ? 'animate-ping' : 'animate-pulse'}`} />
                            {event.status.label}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 flex flex-col justify-between">
                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {!event.status.active && event.status.label !== 'Ended' && (
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100">
                              {event.status.label}
                            </span>
                          )}
                          {event.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-xs font-medium border border-slate-100">{tag}</span>
                          ))}
                        </div>

                        <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-1 group-hover:text-teal-600 transition-colors duration-300">
                          {event.title}
                        </h3>
                        <p className="text-slate-500 font-medium mb-3">{event.subtitle}</p>

                        {/* UpCheck role badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100 px-3 py-1.5 rounded-lg mb-5">
                          <Trophy className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">Upcheck: Industrial Partner & Jury</span>
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed max-w-xl">{event.description}</p>
                      </div>

                      {/* Bottom row */}
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            {new Date(event.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-teal-400" />
                            {event.duration}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-rose-400" />
                            {event.venue}
                          </span>
                        </div>

                        {/* Quick stats */}
                        <div className="flex items-center gap-4 text-xs font-semibold">
                          
                          <div className="w-px h-8 bg-slate-100" />
                          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900 to-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-500/25">
                            View Details
                            <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Countdown strip for active events */}
                  {event.status.active && (
                    <div className="border-t border-slate-100 bg-gradient-to-r from-[#0a1628] to-[#0d3d3a] px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-0.5">Registration closes in</p>
                        <CountdownTimer endDate={event.endDate} />
                      </div>
                      <span className="inline-flex items-center gap-2 bg-teal-400 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm">
                        <Zap className="w-4 h-4" />
                        Register on Website
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COLLABORATE CTA ═══ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2a4a] to-[#0d3d3a]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-500/5 blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-teal-300 text-sm font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Partner with us
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Want to Collaborate<br />on Your Next Event?
          </h2>
          <p className="text-blue-200/70 text-lg mb-10 max-w-2xl mx-auto">
            Upcheck loves supporting student innovation. Reach out to explore sponsorship, mentorship, or jury partnerships.
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