import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/common/EventCard';
import { EventCategory } from '../types';
import { Search, SlidersHorizontal, Calendar, X, Sparkles, Plus, Shield } from 'lucide-react';

export const Events: React.FC = () => {
  const { events, currentRole } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ongoing' | 'upcoming' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'upcoming' | 'popular' | 'newest'>('upcoming');

  const categories: (EventCategory | 'All')[] = [
    'All',
    'Technology',
    'Cultural',
    'Sports',
    'Workshop',
    'Seminar',
    'Competition',
    'Club Activity',
  ];

  // Update query params when category changes
  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  // Counts by status
  const ongoingCount = events.filter(e => e.status === 'ongoing').length;
  const upcomingCount = events.filter(e => e.status === 'upcoming').length;
  const completedCount = events.filter(e => e.status === 'completed').length;

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    return events
      .filter(event => {
        // Status filter (Ongoing, Upcoming, Completed)
        if (statusFilter !== 'all' && event.status !== statusFilter) {
          return false;
        }
        // Category filter
        if (selectedCategory !== 'All' && event.category !== selectedCategory) {
          return false;
        }
        // Search query filter (title, description, location, organizer)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = event.title.toLowerCase().includes(q);
          const matchDesc = event.shortDescription.toLowerCase().includes(q) || event.description.toLowerCase().includes(q);
          const matchLoc = event.location.toLowerCase().includes(q);
          const matchOrg = event.organizer.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchLoc && !matchOrg) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') {
          return b.registeredCount - a.registeredCount;
        }
        if (sortBy === 'newest') {
          return b.id.localeCompare(a.id);
        }
        // 'upcoming' by date order
        return a.date.localeCompare(b.date);
      });
  }, [events, selectedCategory, statusFilter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white p-8 sm:p-12 shadow-lg border border-blue-900/60">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-xs font-semibold backdrop-blur-md text-sky-200 border border-blue-400/30">
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                IARE Collegiate Calendar 2026
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Explore Campus Events
              </h1>
              <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed">
                Find ongoing live contests, upcoming hackathons, sports meets, and completed symposiums.
              </p>
            </div>

            {currentRole === 'admin' && (
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to="/admin/events/new"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 shrink-0 self-start md:self-auto"
                >
                  <Plus className="w-4 h-4 text-blue-600" />
                  <span>+ Post New Event</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* STATUS QUICK TABS (Ongoing, Upcoming, Completed) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            <span>All Events</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${statusFilter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {events.length}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('ongoing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              statusFilter === 'ongoing'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Live & Ongoing Today</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${statusFilter === 'ongoing' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
              {ongoingCount}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('upcoming')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              statusFilter === 'upcoming'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-blue-700 hover:bg-blue-50 border border-blue-200'
            }`}
          >
            <span>Upcoming Events</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${statusFilter === 'upcoming' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'}`}>
              {upcomingCount}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              statusFilter === 'completed'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>Completed Events</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${statusFilter === 'completed' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-800'}`}>
              {completedCount}
            </span>
          </button>

          {currentRole === 'admin' && (
            <div className="ml-auto shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Mode Active</span>
            </div>
          )}
        </div>

        {/* SEARCH & CONTROLS BAR */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search events by title, keyword, department, or venue..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-hidden transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-slate-500" />
              <label htmlFor="event-sort-by" className="text-xs font-semibold text-slate-600 whitespace-nowrap">Sort:</label>
              <select
                id="event-sort-by"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'upcoming' | 'popular' | 'newest')}
                className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:bg-white focus:border-blue-500 focus:outline-hidden"
              >
                <option value="upcoming">Upcoming</option>
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills (Functional interactive filter buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-xs font-bold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* RESULTS INFO BAR */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <p>
            Showing <strong className="text-slate-900 tabular-nums">{filteredEvents.length}</strong> events
            {statusFilter !== 'all' && ` (${statusFilter})`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
          {(selectedCategory !== 'All' || statusFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setStatusFilter('all');
                setSearchQuery('');
                searchParams.delete('category');
                setSearchParams(searchParams);
              }}
              className="text-blue-600 hover:underline font-semibold"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* EVENTS GRID */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 text-blue-400 flex items-center justify-center">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No events found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              We couldn&apos;t find any events matching your selected criteria. Try adjusting your status or category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
