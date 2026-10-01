import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { AdminNavbar } from '../../components/layout/AdminNavbar';
import { CertificateModal } from '../../components/common/CertificateModal';
import { CertificateItem, EventCategory } from '../../types';
import { Plus, Award, Eye, X, ShieldCheck } from 'lucide-react';

export const AdminCertificates: React.FC = () => {
  const { certificates, issueCertificate, events } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [viewModalCert, setViewModalCert] = useState<CertificateItem | null>(null);

  const [form, setForm] = useState({
    studentName: 'Jyoshna',
    studentId: '23951A0588',
    eventId: events[0]?.id || 'evt_hackathon_2026',
    eventName: events[0]?.title || 'Hackathon 2026',
    eventCategory: (events[0]?.category || 'Technology') as EventCategory,
    department: 'Computer Science and Engineering',
    college: 'Institute of Aeronautical Engineering (IARE)',
    participationDate: '20 September 2026',
    issuedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    gradeOrRank: 'First Class with Distinction',
    signatory: 'Dr. L. V. Narasimha Prasad',
    signatoryTitle: 'Principal & Head of Institute',
  });

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedEv = events.find(ev => ev.id === form.eventId);
    issueCertificate({
      ...form,
      eventName: selectedEv ? selectedEv.title : form.eventName,
      eventCategory: selectedEv ? selectedEv.category : form.eventCategory,
    });
    setIssueModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminNavbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title="Certificate Issuance & Verification"
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Issued University Certificates
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Generate and distribute verified digital participation & merit credentials for collegiate event participants.
              </p>
            </div>

            <button
              onClick={() => setIssueModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Issue New Certificate</span>
            </button>
          </div>

          {/* Certificates Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Certificate ID</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Event & Domain</th>
                    <th className="py-3 px-4">Merit / Rank</th>
                    <th className="py-3 px-4">Issued On</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {certificates.map(cert => (
                    <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-semibold text-indigo-700">
                        {cert.certificateNumber}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {cert.studentName}
                        <span className="block text-[11px] font-normal text-slate-400 font-mono">{cert.studentId}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-800">{cert.eventName}</p>
                        <p className="text-[11px] text-slate-500">{cert.eventCategory}</p>
                      </td>

                      <td className="py-3.5 px-4">
                        {cert.gradeOrRank ? (
                          <span className="inline-block px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-semibold text-[11px] border border-amber-200">
                            {cert.gradeOrRank}
                          </span>
                        ) : (
                          <span className="text-slate-400">Standard Participation</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {cert.issuedDate}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setViewModalCert(cert)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* Issue Certificate Modal */}
      {issueModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Issue Verified Certificate</h3>
              </div>
              <button onClick={() => setIssueModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIssueSubmit} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Name</label>
                  <input
                    type="text"
                    required
                    value={form.studentName}
                    onChange={e => setForm({ ...form, studentName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Roll Number</label>
                  <input
                    type="text"
                    required
                    value={form.studentId}
                    onChange={e => setForm({ ...form, studentId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Event</label>
                <select
                  value={form.eventId}
                  onChange={e => {
                    const ev = events.find(x => x.id === e.target.value);
                    setForm({
                      ...form,
                      eventId: e.target.value,
                      eventName: ev ? ev.title : form.eventName,
                      eventCategory: ev ? ev.category : form.eventCategory,
                      participationDate: ev ? ev.date : form.participationDate,
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                >
                  {events.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.title} ({ev.date})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Merit / Rank / Award Title (Optional)</label>
                <input
                  type="text"
                  value={form.gradeOrRank}
                  onChange={e => setForm({ ...form, gradeOrRank: e.target.value })}
                  placeholder="e.g. 1st Place Winner or Distinction"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Signatory Name</label>
                  <input
                    type="text"
                    value={form.signatory}
                    onChange={e => setForm({ ...form, signatory: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Signatory Role</label>
                  <input
                    type="text"
                    value={form.signatoryTitle}
                    onChange={e => setForm({ ...form, signatoryTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIssueModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Issue & Sign Certificate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Preview Modal */}
      <CertificateModal
        certificate={viewModalCert}
        isOpen={Boolean(viewModalCert)}
        onClose={() => setViewModalCert(null)}
      />
    </div>
  );
};
