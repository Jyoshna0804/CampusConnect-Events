import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Award, 
  Info 
} from 'lucide-react';

export const Notifications: React.FC = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    deleteNotification,
    unreadNotificationCount 
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'completion':
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      case 'certificate':
        return <Award className="w-5 h-5 text-indigo-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <Bell className="w-4 h-4" />
              <span>Campus Alerts</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Notification Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Stay informed about approvals, schedule changes, upcoming deadlines, and certificates.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={markAllNotificationsAsRead}
              disabled={unreadNotificationCount === 0}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCheck className="w-4 h-4 text-indigo-600" />
              <span>Mark All as Read</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            All Alerts ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'unread'
                ? 'bg-slate-900 text-white'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            Unread ({unreadNotificationCount})
          </button>
        </div>

        {/* Notifications List */}
        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map(item => (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  !item.read
                    ? 'bg-white border-indigo-200 shadow-sm ring-1 ring-indigo-500/10'
                    : 'bg-slate-50/80 border-slate-200 text-slate-600'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${
                  !item.read ? 'bg-indigo-50' : 'bg-slate-200/60'
                }`}>
                  {getIconForType(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-sm font-bold ${!item.read ? 'text-slate-900' : 'text-slate-700'}`}>
                        {item.title}
                      </h3>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">{item.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>

                  <div className="mt-3 flex items-center gap-3">
                    {item.link && (
                      <Link
                        to={item.link}
                        onClick={() => markNotificationAsRead(item.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        <span>View details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}

                    {!item.read && (
                      <button
                        onClick={() => markNotificationAsRead(item.id)}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                      >
                        Mark as read
                      </button>
                    )}

                    <button
                      onClick={() => deleteNotification(item.id)}
                      className="text-xs text-slate-400 hover:text-rose-600 transition-colors ml-auto p-1"
                      aria-label="Delete notification"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
              <Bell className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              You are all caught up with campus events and approvals.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
