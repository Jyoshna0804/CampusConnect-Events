import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Menu, Plus, User as UserIcon } from 'lucide-react';

interface AdminNavbarProps {
  onToggleSidebar: () => void;
  title?: string;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ onToggleSidebar, title = 'Admin Overview' }) => {
  const { currentUser } = useApp();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle admin sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/admin/events/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Event</span>
        </Link>

        {/* Admin profile snippet */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
            <UserIcon className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight">Dr. K. S. Rao</p>
            <p className="text-[10px] text-slate-500 leading-tight">Dean of Student Affairs</p>
          </div>
        </div>
      </div>
    </header>
  );
};
