import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CollegeEvent } from '../../types';
import { useApp } from '../../context/AppContext';
import { RegistrationModal } from './RegistrationModal';
import { Calendar, Clock, MapPin, Users, CheckCircle2, ArrowRight, Edit, Shield } from 'lucide-react';

interface EventCardProps {
  event: CollegeEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { isRegisteredForEvent, currentRole } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isRegistered = isRegisteredForEvent(event.id);
  const isFull = event.registeredCount >= event.capacity;
  const isAdmin = currentRole === 'admin';

  const categoryColorClass = {
    Technology: 'bg-blue-50 text-blue-700 border-blue-200',
    Cultural: 'bg-pink-50 text-pink-700 border-pink-200',
    Sports: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    Workshop: 'bg-sky-50 text-sky-700 border-sky-200',
    Seminar: 'bg-blue-50 text-blue-700 border-blue-200',
    Competition: 'bg-orange-50 text-orange-700 border-orange-200',
    'Club Activity': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  }[event.category] || 'bg-slate-100 text-slate-700 border-slate-200';

  // Status tag styling
  const statusBadge = {
    ongoing: {
      label: 'Live Today',
      class: 'bg-emerald-600 text-white animate-pulse',
      dot: 'bg-white',
    },
    upcoming: {
      label: 'Upcoming',
      class: 'bg-blue-600 text-white',
      dot: 'bg-sky-200',
    },
    completed: {
      label: 'Completed',
      class: 'bg-slate-700 text-white',
      dot: 'bg-slate-400',
    },
    cancelled: {
      label: 'Cancelled',
      class: 'bg-rose-700 text-white',
      dot: 'bg-rose-300',
    },
  }[event.status] || {
    label: 'Upcoming',
    class: 'bg-blue-600 text-white',
    dot: 'bg-white',
  };

  return (
    <>
      <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        
        {/* Event Thumbnail Container */}
        <div className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden">
          {!imgError ? (
            <img
              src={event.image}
              alt={event.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 via-sky-600 to-indigo-700 flex flex-col items-center justify-center p-6 text-white text-center">
              <span className="text-3xl font-extrabold tracking-tight opacity-90">{event.category}</span>
              <span className="text-xs opacity-75 mt-1">{event.location}</span>
            </div>
          )}

          {/* Floating category badge & Status Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border backdrop-blur-md shadow-xs ${categoryColorClass}`}>
              {event.category}
            </span>

            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[11px] font-bold shadow-xs backdrop-blur-md ${statusBadge.class}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
              {statusBadge.label}
            </span>
          </div>

          {/* Top Right Registered Badge or Admin Indicator */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {isRegistered && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-600/90 text-white shadow-xs backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Registered
              </span>
            )}
            {isAdmin && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-900/80 text-sky-200 border border-sky-400/40 backdrop-blur-md">
                <Shield className="w-3 h-3 text-sky-300" />
                Admin
              </span>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-1 p-5">
          <Link to={`/events/${event.id}`} className="group-hover:text-blue-600 transition-colors">
            <h3 className="text-base font-bold text-slate-900 tracking-tight line-clamp-1">
              {event.title}
            </h3>
          </Link>

          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {event.shortDescription}
          </p>

          {/* Event Details Grid */}
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="font-medium">{event.date}</span>
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{event.time}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="flex items-center gap-1.5 text-slate-600">
                <Users className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>
                  <strong className="text-slate-900 tabular-nums">{event.registeredCount}</strong> / {event.capacity} enrolled
                </span>
              </span>
              <span className="text-[11px] text-slate-500">
                Deadline: <span className="font-medium text-slate-700">{event.registrationDeadline}</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
            <Link
              to={`/events/${event.id}`}
              className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors text-center inline-flex items-center justify-center gap-1"
            >
              <span>{isAdmin ? 'View & Manage' : 'View Details'}</span>
              <ArrowRight className="w-3 h-3 text-slate-500" />
            </Link>

            {isAdmin ? (
              <Link
                to={`/admin/events/edit/${event.id}`}
                className="py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold inline-flex items-center gap-1"
              >
                <Edit className="w-3 h-3" />
                <span>Edit</span>
              </Link>
            ) : isRegistered ? (
              <span className="py-2 px-3.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold inline-flex items-center gap-1 cursor-default">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Registered ✓
              </span>
            ) : isFull ? (
              <button
                disabled
                className="py-2 px-3.5 rounded-xl bg-slate-100 text-slate-400 text-xs font-semibold cursor-not-allowed"
              >
                Seats Full
              </button>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="py-2 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all active:scale-98"
              >
                Register
              </button>
            )}
          </div>
        </div>
      </div>

      <RegistrationModal
        event={event}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
