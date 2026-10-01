import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { AdminNavbar } from '../../components/layout/AdminNavbar';
import { Search, Mail, Phone } from 'lucide-react';

export const AdminStudents: React.FC = () => {
  const { registrations, currentUser } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  // Build a roster of students based on currentUser and registrations
  const studentsRoster = [
    {
      id: currentUser.id,
      name: currentUser.name,
      studentId: currentUser.studentId,
      email: currentUser.email,
      phone: currentUser.phone,
      department: currentUser.department,
      year: currentUser.year,
      section: currentUser.section,
      avatar: currentUser.avatar,
      eventsCount: registrations.filter(r => r.studentId === currentUser.studentId).length,
      status: 'Active',
    },
    {
      id: 'usr_rahul_02',
      name: 'Rahul Verma',
      studentId: '23951A0542',
      email: 'rahul.v@iare.ac.in',
      phone: '+91 98123 44556',
      department: 'Information Technology',
      year: '4th Year',
      section: 'IT-A',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      eventsCount: 3,
      status: 'Active',
    },
    {
      id: 'usr_sneha_03',
      name: 'Sneha Patel',
      studentId: '23951A0577',
      email: 'sneha.p@iare.ac.in',
      phone: '+91 97234 55667',
      department: 'Computer Science and Engineering',
      year: '2nd Year',
      section: 'CSE-C',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      eventsCount: 2,
      status: 'Active',
    },
    {
      id: 'usr_vikram_04',
      name: 'Vikram Singh',
      studentId: '23951A0412',
      email: 'vikram.ece@iare.ac.in',
      phone: '+91 98450 67890',
      department: 'Electronics & Communication',
      year: '3rd Year',
      section: 'ECE-B',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150',
      eventsCount: 1,
      status: 'Active',
    },
    {
      id: 'usr_ananya_05',
      name: 'Ananya Roy',
      studentId: '23951A6620',
      email: 'ananya.aiml@iare.ac.in',
      phone: '+91 98980 12345',
      department: 'Artificial Intelligence & ML',
      year: '3rd Year',
      section: 'AIML-A',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
      eventsCount: 4,
      status: 'Active',
    },
  ];

  const departments = ['All', 'Computer Science and Engineering', 'Information Technology', 'Electronics & Communication', 'Artificial Intelligence & ML'];

  const filtered = studentsRoster.filter(s => {
    if (deptFilter !== 'All' && s.department !== deptFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q) || s.department.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminNavbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title="Student Roster & Profiles"
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Enrolled Students Directory
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Overview of students actively enrolled in college technical events, hackathons, and sports meets.
              </p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search students by name, roll number, or department..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <select
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:bg-white focus:outline-hidden"
            >
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Roll Number</th>
                    <th className="py-3 px-4">Department & Class</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Events Registered</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map(st => (
                    <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={st.avatar}
                            alt={st.name}
                            referrerPolicy="no-referrer"
                            className="w-9 h-9 rounded-lg object-cover bg-slate-100"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{st.name}</p>
                            <p className="text-[11px] text-slate-400">{st.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                        {st.studentId}
                      </td>

                      <td className="py-3.5 px-4 text-slate-700">
                        <p className="font-medium">{st.department}</p>
                        <p className="text-[11px] text-slate-400">{st.year} · {st.section}</p>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        <div className="space-y-0.5 text-[11px]">
                          <p className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" /> {st.email}
                          </p>
                          <p className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" /> {st.phone}
                          </p>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md tabular-nums">
                          {st.eventsCount} Events
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {st.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};
