import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { AdminNavbar } from '../../components/layout/AdminNavbar';
import { StatCard } from '../../components/common/StatCard';
import { SimpleBarChart } from '../../components/charts/SimpleBarChart';
import { SimpleDonutChart } from '../../components/charts/SimpleDonutChart';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  CalendarDays, 
  Sparkles, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  Check, 
  X, 
  FileText 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { events, registrations, updateRegistrationStatus } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Statistics
  const totalEvents = events.length;
  const activeEvents = events.filter(e => e.status === 'upcoming' || e.status === 'ongoing').length;
  const totalRegistrations = registrations.length;
  const pendingApprovals = registrations.filter(r => r.status === 'Pending');
  const completedEvents = events.filter(e => e.status === 'completed').length || 4;

  // Chart data: Registrations by Month
  const monthlyData = [
    { label: 'May', value: 120, secondaryValue: 110 },
    { label: 'Jun', value: 180, secondaryValue: 165 },
    { label: 'Jul', value: 240, secondaryValue: 220 },
    { label: 'Aug', value: 310, secondaryValue: 290 },
    { label: 'Sep', value: 450, secondaryValue: 390 },
    { label: 'Oct', value: 520, secondaryValue: 460 },
  ];

  // Category distribution
  const categoryChartData = [
    { label: 'Technology', value: 4, color: '#6366f1' },
    { label: 'Cultural', value: 2, color: '#ec4899' },
    { label: 'Sports', value: 2, color: '#06b6d4' },
    { label: 'Workshop', value: 3, color: '#8b5cf6' },
    { label: 'Competition', value: 3, color: '#f97316' },
    { label: 'Seminar', value: 2, color: '#3b82f6' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminNavbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title="Campus Admin & Faculty Dashboard"
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-[11px] font-semibold text-purple-200">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Administrative Session
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                IARE Campus Event Central Control
              </h1>
              <p className="text-xs text-purple-200">
                Review pending registrations, manage event deadlines, issue verified certificates, and track student engagement.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/admin/events/new"
                className="px-4 py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-xs shadow-md hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Event</span>
              </Link>
            </div>
          </div>

          {/* 5 STATISTICS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              label="Total Events"
              value={totalEvents}
              icon={CalendarDays}
              colorScheme="purple"
              subtitle="All academic sessions"
              onClick={() => navigate('/admin/events')}
            />
            <StatCard
              label="Active Events"
              value={activeEvents}
              icon={Sparkles}
              colorScheme="indigo"
              subtitle="Upcoming & scheduled"
              onClick={() => navigate('/admin/events')}
            />
            <StatCard
              label="Total Registrations"
              value={totalRegistrations}
              icon={Users}
              colorScheme="blue"
              subtitle="Across all departments"
              onClick={() => navigate('/admin/registrations')}
            />
            <StatCard
              label="Pending Approvals"
              value={pendingApprovals.length}
              icon={Clock}
              colorScheme="amber"
              subtitle="Awaiting faculty review"
              onClick={() => navigate('/admin/registrations')}
            />
            <StatCard
              label="Completed Events"
              value={completedEvents}
              icon={CheckCircle2}
              colorScheme="emerald"
              subtitle="Conducted successfully"
            />
          </div>

          {/* VISUAL CHARTS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Monthly Registrations Chart */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Event Registrations & Attendance Growth
                    </h2>
                    <p className="text-xs text-slate-500">Student enrollment volume over the past 6 months</p>
                  </div>
                  <Link to="/admin/reports" className="text-xs font-semibold text-indigo-600 hover:underline">
                    Detailed Report →
                  </Link>
                </div>

                <div className="pt-4">
                  <SimpleBarChart
                    data={monthlyData}
                    primaryColor="#6366f1"
                    secondaryColor="#10b981"
                    primaryLabel="Registered"
                    secondaryLabel="Attended"
                    height={210}
                  />
                </div>
              </div>
            </div>

            {/* Events by Category Breakdown */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Events by Category
                    </h2>
                    <p className="text-xs text-slate-500">Curriculum & extracurricular balance</p>
                  </div>
                  <Link to="/admin/categories" className="text-xs font-semibold text-indigo-600 hover:underline">
                    Manage →
                  </Link>
                </div>

                <div className="pt-4 flex items-center justify-center">
                  <SimpleDonutChart data={categoryChartData} size={170} thickness={24} />
                </div>
              </div>
            </div>

          </div>

          {/* PENDING REGISTRATION APPROVALS WIDGET */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Pending Registrations Needing Action ({pendingApprovals.length})
                </h2>
              </div>
              <Link
                to="/admin/registrations"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>View Full Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {pendingApprovals.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3">Roll No</th>
                      <th className="py-2.5 px-3">Event</th>
                      <th className="py-2.5 px-3">Department</th>
                      <th className="py-2.5 px-3">Registered On</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pendingApprovals.slice(0, 5).map(reg => (
                      <tr key={reg.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900">{reg.studentName}</td>
                        <td className="py-3 px-3 font-mono text-slate-600">{reg.studentId}</td>
                        <td className="py-3 px-3 font-medium text-slate-800">{reg.eventTitle}</td>
                        <td className="py-3 px-3 text-slate-600">{reg.department}</td>
                        <td className="py-3 px-3 text-slate-500">{reg.registeredAt}</td>
                        <td className="py-3 px-3">
                          <StatusBadge status={reg.status} size="sm" />
                        </td>
                        <td className="py-3 px-3 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => updateRegistrationStatus(reg.id, 'Approved')}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] border border-emerald-200 transition-colors"
                          >
                            <Check className="w-3 h-3" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => updateRegistrationStatus(reg.id, 'Rejected', 'Seat capacity limit reached for this session.')}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] border border-rose-200 transition-colors"
                          >
                            <X className="w-3 h-3" />
                            <span>Reject</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-500">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                All student registrations have been reviewed and approved!
              </div>
            )}
          </div>

          {/* QUICK MANAGEMENT TILES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              to="/admin/events"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-purple-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Events</span>
                <CalendarDays className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Manage Event Schedule</h3>
              <p className="text-xs text-slate-500 mt-1">Publish, reschedule, or edit event requirements.</p>
            </Link>

            <Link
              to="/admin/certificates"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Certificates</span>
                <FileText className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Issue Certificates</h3>
              <p className="text-xs text-slate-500 mt-1">Generate signed digital credentials for participants.</p>
            </Link>

            <Link
              to="/admin/reports"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-cyan-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Analytics</span>
                <Users className="w-5 h-5 text-cyan-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Download CSV Reports</h3>
              <p className="text-xs text-slate-500 mt-1">Export attendance logs and NAAC accreditation files.</p>
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
};
