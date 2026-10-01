import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { AdminNavbar } from '../../components/layout/AdminNavbar';
import { CollegeEvent, EventCategory } from '../../types';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  SlidersHorizontal, 
  AlertCircle 
} from 'lucide-react';

export const AdminEvents: React.FC = () => {
  const { events, deleteEvent } = useApp();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [deleteModalEvent, setDeleteModalEvent] = useState<CollegeEvent | null>(null);

  const categories = ['All', 'Technology', 'Cultural', 'Sports', 'Workshop', 'Seminar', 'Competition', 'Club Activity'];
  const statuses = ['All', 'upcoming', 'ongoing', 'completed', 'cancelled'];

  const filteredEvents = events.filter(e => {
    if (categoryFilter !== 'All' && e.category !== categoryFilter) return false;
    if (statusFilter !== 'All' && e.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || e.organizer.toLowerCase().includes(q);
    }
    return true;
  });

  const handleConfirmDelete = () => {
    if (deleteModalEvent) {
      deleteEvent(deleteModalEvent.id);
      setDeleteModalEvent(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminNavbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title="Event Management"
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Manage Campus Events
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Publish, update, schedule, or remove technical symposiums and campus competitions.
              </p>
            </div>

            <Link
              to="/admin/events/new"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Event</span>
            </Link>
          </div>

          {/* Filter and Search Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search events by title, venue, or coordinator..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
              
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="flex-1 md:flex-none px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:bg-white focus:outline-hidden"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="flex-1 md:flex-none px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:bg-white focus:outline-hidden"
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Events Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Event Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Registrations</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEvents.map(event => {
                    const fillPercent = Math.round((event.registeredCount / event.capacity) * 100);

                    return (
                      <tr key={event.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={event.image}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-slate-900 leading-snug">{event.title}</p>
                              <p className="text-[11px] text-slate-400">{event.organizer}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-0.5 rounded-md font-semibold text-[11px] bg-indigo-50 text-indigo-700">
                            {event.category}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                          <p className="font-medium">{event.date}</p>
                          <p className="text-[11px] text-slate-400">{event.time}</p>
                        </td>

                        <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                          {event.location}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 tabular-nums">
                              {event.registeredCount}
                            </span>
                            <span className="text-slate-400">/ {event.capacity}</span>
                            <span className="text-[10px] text-slate-500 font-medium">({fillPercent}%)</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            event.status === 'upcoming'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : event.status === 'ongoing'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {event.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => navigate(`/events/${event.id}`)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="Preview Event"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => navigate(`/admin/events/edit/${event.id}`)}
                            className="p-1.5 rounded-lg text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 transition-colors"
                            title="Edit Event"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeleteModalEvent(event)}
                            className="p-1.5 rounded-lg text-rose-600 hover:text-rose-800 hover:bg-rose-50 transition-colors"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredEvents.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500">
                No events matched your search or filters.
              </div>
            )}
          </div>

        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-center animate-in zoom-in-95 duration-100">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Event?</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Are you sure you want to permanently delete <strong>{deleteModalEvent.title}</strong>? All registered student tickets for this event will be canceled.
            </p>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setDeleteModalEvent(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
