import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { RegistrationStatus } from '../types';
import { Calendar, MapPin, Clock, ArrowRight, Trash2, AlertCircle, Sparkles } from 'lucide-react';

export const MyRegistrations: React.FC = () => {
  const { registrations, currentUser, cancelRegistration } = useApp();
  const [filterStatus, setFilterStatus] = useState<RegistrationStatus | 'All'>('All');
  const [cancelModalId, setCancelModalId] = useState<string | null>(null);

  // Filter registrations for current student
  const studentRegistrations = registrations.filter(r => r.studentId === currentUser.studentId);

  const filtered = studentRegistrations.filter(r => {
    if (filterStatus === 'All') return true;
    return r.status === filterStatus;
  });

  const statuses: (RegistrationStatus | 'All')[] = ['All', 'Approved', 'Pending', 'Rejected', 'Completed'];

  const getStatusCount = (st: RegistrationStatus | 'All') => {
    if (st === 'All') return studentRegistrations.length;
    return studentRegistrations.filter(r => r.status === st).length;
  };

  const handleConfirmCancel = () => {
    if (cancelModalId) {
      cancelRegistration(cancelModalId);
      setCancelModalId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Student Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Registrations
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your event passes, check faculty approval status, and view participation records.
            </p>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md transition-all self-start sm:self-auto"
          >
            <span>Register for New Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {statuses.map(st => {
            const active = filterStatus === st;
            const count = getStatusCount(st);
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                }`}
              >
                <span>{st}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] tabular-nums ${
                  active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Registrations List */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(reg => {
              const borderAccent = {
                Approved: 'border-l-4 border-l-emerald-500',
                Pending: 'border-l-4 border-l-amber-500',
                Rejected: 'border-l-4 border-l-rose-500',
                Completed: 'border-l-4 border-l-indigo-500',
              }[reg.status];

              return (
                <div
                  key={reg.id}
                  className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between ${borderAccent}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                          {reg.eventCategory}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 leading-snug mt-0.5">
                          {reg.eventTitle}
                        </h3>
                      </div>
                      <StatusBadge status={reg.status} />
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span className="font-medium text-slate-800">{reg.eventDate}</span>
                        {reg.eventTime && (
                          <span className="text-slate-400">· {reg.eventTime}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="line-clamp-1">{reg.eventLocation}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                        <Clock className="w-3 h-3 shrink-0" />
                        <span>Registered on: {reg.registeredAt}</span>
                      </div>
                    </div>

                    {reg.rejectionReason && (
                      <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs">
                        <strong>Reason:</strong> {reg.rejectionReason}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      to={`/events/${reg.eventId}`}
                      className="py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 inline-flex items-center gap-1 transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </Link>

                    {reg.status !== 'Completed' && (
                      <button
                        onClick={() => setCancelModalId(reg.id)}
                        className="py-1.5 px-3 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel Registration</span>
                      </button>
                    )}

                    {reg.status === 'Completed' && (
                      <Link
                        to="/certificates"
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        View Certificate →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Registrations in this View</h3>
            <p className="text-xs text-slate-500 mt-1">
              {filterStatus === 'All'
                ? "You haven't registered for any events yet. Check out the upcoming campus events!"
                : `You don't have any events with status "${filterStatus}".`}
            </p>
            <Link
              to="/events"
              className="mt-5 inline-block px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
            >
              Browse Campus Events
            </Link>
          </div>
        )}

      </div>

      {/* Cancel Confirmation Dialog */}
      {cancelModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-center animate-in zoom-in-95 duration-100">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Cancel Event Registration?</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Are you sure you want to withdraw your registration? Your seat will be returned to the open campus pool.
            </p>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setCancelModalId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Keep Seat
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
