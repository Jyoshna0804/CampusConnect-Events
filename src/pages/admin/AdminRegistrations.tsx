import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { AdminNavbar } from '../../components/layout/AdminNavbar';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Registration, RegistrationStatus } from '../../types';
import { Search, Check, X, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const AdminRegistrations: React.FC = () => {
  const { registrations, updateRegistrationStatus } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [rejectingReg, setRejectingReg] = useState<Registration | null>(null);
  const [rejectReason, setRejectReason] = useState('Seat limit exceeded for this department.');
  const [viewingReg, setViewingReg] = useState<Registration | null>(null);

  const statuses = ['All', 'Pending', 'Approved', 'Rejected', 'Completed'];

  const filteredRegistrations = registrations.filter(r => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        r.studentName.toLowerCase().includes(q) ||
        r.studentId.toLowerCase().includes(q) ||
        r.eventTitle.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleApprove = (id: string) => {
    updateRegistrationStatus(id, 'Approved');
  };

  const handleConfirmReject = () => {
    if (rejectingReg) {
      updateRegistrationStatus(rejectingReg.id, 'Rejected', rejectReason);
      setRejectingReg(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminNavbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title="Registration Management"
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Student Event Registrations
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Review submitted participant passes, approve departmental allocations, and manage attendance.
              </p>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by student name, roll number, or event title..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {statuses.map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    statusFilter === st
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Registrations Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Roll Number</th>
                    <th className="py-3 px-4">Event</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Registered Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRegistrations.map(reg => (
                    <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {reg.studentName}
                        <span className="block text-[11px] font-normal text-slate-400">{reg.studentEmail}</span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                        {reg.studentId}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 line-clamp-1">{reg.eventTitle}</span>
                        <span className="text-[11px] text-indigo-600">{reg.eventCategory}</span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        {reg.department}
                        <span className="block text-[11px] text-slate-400">{reg.year}</span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {reg.registeredAt}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <StatusBadge status={reg.status} size="sm" />
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setViewingReg(reg)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                          title="View Registration Pass"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {reg.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(reg.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] border border-emerald-200 transition-colors"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => setRejectingReg(reg)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] border border-rose-200 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </>
                        )}

                        {reg.status === 'Approved' && (
                          <button
                            onClick={() => updateRegistrationStatus(reg.id, 'Completed')}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] border border-indigo-200 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mark Attended</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredRegistrations.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500">
                No student registrations found for this filter.
              </div>
            )}
          </div>

        </main>
      </div>

      {/* Reject Modal */}
      {rejectingReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Reject Registration?</h3>
            <p className="text-xs text-slate-500 mt-1">
              Provide reason for rejecting {rejectingReg.studentName}&apos;s registration for {rejectingReg.eventTitle}.
            </p>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Reason</label>
              <textarea
                rows={2}
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              />
            </div>

            <div className="mt-5 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setRejectingReg(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Pass Modal */}
      {viewingReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Student Entry Pass</h3>
              </div>
              <button onClick={() => setViewingReg(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                <p className="font-bold text-sm text-slate-900">{viewingReg.eventTitle}</p>
                <p className="text-slate-500 mt-0.5">{viewingReg.eventDate} · {viewingReg.eventTime}</p>
                <p className="text-slate-600 mt-1 font-medium">{viewingReg.eventLocation}</p>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Student Name:</span>
                  <span className="font-bold text-slate-900">{viewingReg.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Roll Number:</span>
                  <span className="font-mono text-slate-800">{viewingReg.studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Department & Year:</span>
                  <span className="font-medium text-slate-800">{viewingReg.department} ({viewingReg.year})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span className="text-slate-800">{viewingReg.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Approval Status:</span>
                  <StatusBadge status={viewingReg.status} size="sm" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setViewingReg(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
              >
                Close Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
