import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { AdminNavbar } from '../../components/layout/AdminNavbar';
import { Save, Building, Bell, Shield, CheckCircle2 } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { showToast } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [settings, setSettings] = useState({
    collegeName: 'Institute of Aeronautical Engineering (IARE)',
    collegeCode: 'IARE-HYD-500043',
    academicYear: '2026 - 2027',
    deanEmail: 'dean.events@iare.ac.in',
    deanPhone: '+91 (040) 29705852',
    maxEventsPerStudent: 10,
    enableAutoApproveWorkshops: true,
    enableEmailReminders: true,
    requireMedicalFitnessForSports: true,
    certificateSignatoryName: 'Dr. L. V. Narasimha Prasad',
    certificateSignatoryRole: 'Principal & Head of Institution',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    showToast('Settings Saved', 'CampusConnect configuration successfully updated', 'success');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminNavbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title="Campus Portal Configuration"
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl w-full mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                System & Event Settings
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure institution branding, registration limits, certificate signatories, and automated alerts.
              </p>
            </div>
          </div>

          {saved && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All portal preferences have been successfully updated and applied.</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6 text-xs">
            
            {/* Institution Profile */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-600" />
                <span>Institution & Academic Profile</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">College / University Name</label>
                  <input
                    type="text"
                    value={settings.collegeName}
                    onChange={e => setSettings({ ...settings, collegeName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">College Code / AISHE Code</label>
                  <input
                    type="text"
                    value={settings.collegeCode}
                    onChange={e => setSettings({ ...settings, collegeCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Academic Session</label>
                  <input
                    type="text"
                    value={settings.academicYear}
                    onChange={e => setSettings({ ...settings, academicYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dean / Convener Email</label>
                  <input
                    type="email"
                    value={settings.deanEmail}
                    onChange={e => setSettings({ ...settings, deanEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Campus Helpdesk Phone</label>
                  <input
                    type="text"
                    value={settings.deanPhone}
                    onChange={e => setSettings({ ...settings, deanPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Registration Policies */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-600" />
                <span>Registration Rules & Policies</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Max Events Allowed Per Student</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={settings.maxEventsPerStudent}
                    onChange={e => setSettings({ ...settings, maxEventsPerStudent: parseInt(e.target.value) || 10 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableAutoApproveWorkshops}
                    onChange={e => setSettings({ ...settings, enableAutoApproveWorkshops: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700 font-medium">
                    Auto-approve free open workshop registrations without manual faculty queue review
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.requireMedicalFitnessForSports}
                    onChange={e => setSettings({ ...settings, requireMedicalFitnessForSports: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700 font-medium">
                    Enforce physical medical clearance confirmation for athletic sports meets
                  </span>
                </label>
              </div>
            </div>

            {/* Certificate Signatories */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                <span>Default Certificate Signatories</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Default Signatory Name</label>
                  <input
                    type="text"
                    value={settings.certificateSignatoryName}
                    onChange={e => setSettings({ ...settings, certificateSignatoryName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Designation Title</label>
                  <input
                    type="text"
                    value={settings.certificateSignatoryRole}
                    onChange={e => setSettings({ ...settings, certificateSignatoryRole: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </button>
            </div>

          </form>

        </main>
      </div>
    </div>
  );
};
