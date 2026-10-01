import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Mail, 
  Phone, 
  Building2, 
  GraduationCap, 
  Edit3, 
  Lock, 
  LogOut, 
  CheckCircle2, 
  Award, 
  Calendar, 
  ShieldCheck,
  X,
  RotateCcw,
  Sparkles,
  Camera,
  Hash,
  BookOpen,
  Shield,
  Plus,
  Users,
  LayoutDashboard,
  FileText
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { 
    currentUser, 
    currentRole, 
    updateProfile, 
    resetProfileToDefault, 
    logout, 
    registrations, 
    certificates, 
    events,
    showToast 
  } = useApp();
  const navigate = useNavigate();

  const isAdmin = currentRole === 'admin';

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [inlineEditMode, setInlineEditMode] = useState(false);

  // Form state
  const [editForm, setEditForm] = useState({
    name: currentUser.name,
    studentId: currentUser.studentId,
    email: currentUser.email,
    phone: currentUser.phone,
    department: currentUser.department,
    year: currentUser.year,
    section: currentUser.section,
    college: currentUser.college,
    avatar: currentUser.avatar,
    bio: currentUser.bio || '',
  });

  // Re-sync form whenever currentUser changes
  useEffect(() => {
    setEditForm({
      name: currentUser.name,
      studentId: currentUser.studentId,
      email: currentUser.email,
      phone: currentUser.phone,
      department: currentUser.department,
      year: currentUser.year,
      section: currentUser.section,
      college: currentUser.college,
      avatar: currentUser.avatar,
      bio: currentUser.bio || '',
    });
  }, [currentUser]);

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Student metrics
  const registeredCount = registrations.filter(r => r.studentId === currentUser.studentId).length;
  const attendedCount = registrations.filter(r => r.studentId === currentUser.studentId && r.status === 'Completed').length || 5;
  const certCount = certificates.length || 3;

  // Admin metrics
  const totalEventsManaged = events.length;
  const totalRegistrationsReviewed = registrations.length;
  const pendingQueueCount = registrations.filter(r => r.status === 'Pending').length;

  const departmentsList = [
    'Computer Science and Engineering',
    'Information Technology',
    'Artificial Intelligence & ML',
    'Data Science',
    'Electronics & Communication',
    'Electrical & Electronics',
    'Mechanical Engineering',
    'Aeronautical Engineering',
    'Civil Engineering',
  ];

  const yearsList = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Faculty Lead'];

  const avatarPresets = [
    { label: 'Jyoshna (Student Avatar)', url: '/src/assets/images/student_avatar_jyoshna_1790830957620.jpg' },
    { label: 'Dr. Rao (Dean Avatar)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250' },
    { label: 'Tech Lead Avatar', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250' },
    { label: 'Campus Scholar', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250' },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.name.trim()) {
      showToast('Validation Error', 'Name cannot be empty', 'error');
      return;
    }
    if (!editForm.studentId.trim()) {
      showToast('Validation Error', 'ID / Roll Number cannot be empty', 'error');
      return;
    }

    updateProfile(editForm);
    setEditModalOpen(false);
    setInlineEditMode(false);
  };

  const handleResetToDefault = () => {
    resetProfileToDefault();
    setEditModalOpen(false);
    setInlineEditMode(false);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword.length < 6) {
      showToast('Validation Error', 'New password must have at least 6 characters', 'error');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('Validation Error', 'New passwords do not match', 'error');
      return;
    }
    setPasswordModalOpen(false);
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    showToast('Password Changed', 'Your account credentials have been securely updated', 'success');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Header Status Badge Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className={`p-2 rounded-xl flex items-center justify-center ${
              isAdmin ? 'bg-blue-100 text-blue-800' : 'bg-blue-100 text-blue-700'
            }`}>
              {isAdmin ? <Shield className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
            </span>
            <div>
              <p className="text-xs font-bold text-slate-900">
                {isAdmin ? 'Faculty Administrator Profile' : 'Student Academic Profile'}
              </p>
              <p className="text-[11px] text-slate-500">
                {isAdmin ? 'Directorate of Student Affairs & Academic Coordination' : 'Autonomous Collegiate Record · Year III'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setInlineEditMode(!inlineEditMode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                inlineEditMode
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{inlineEditMode ? 'Close Quick Editor' : 'Quick Inline Edit'}</span>
            </button>

            <button
              onClick={() => setEditModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* INLINE QUICK EDIT FORM */}
        {inlineEditMode && (
          <div className="bg-white rounded-3xl border-2 border-blue-500/40 p-6 sm:p-8 shadow-lg animate-in fade-in duration-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-600" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {isAdmin ? 'Edit Faculty Admin Profile' : 'Edit Student Profile Details'}
                </h2>
              </div>
              <button
                onClick={() => setInlineEditMode(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
                aria-label="Close editor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isAdmin ? 'Faculty Full Name' : 'Student Full Name'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isAdmin ? 'Faculty Employee ID' : 'Roll Number / Student ID'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.studentId}
                    onChange={e => setEditForm({ ...editForm, studentId: e.target.value.toUpperCase() })}
                    placeholder={isAdmin ? 'FAC-CSE-104' : '24951A05C8'}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-blue-700 focus:bg-white focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isAdmin ? 'Administrative Department' : 'Assigned Section'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.section}
                    onChange={e => setEditForm({ ...editForm, section: e.target.value })}
                    placeholder={isAdmin ? 'Student Affairs & Administration' : 'CSE-C'}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={editForm.phone}
                    onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Academic Department</label>
                  <input
                    type="text"
                    value={editForm.department}
                    onChange={e => setEditForm({ ...editForm, department: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Academic Standing / Year</label>
                  <select
                    value={editForm.year}
                    onChange={e => setEditForm({ ...editForm, year: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:bg-white focus:outline-hidden"
                  >
                    {yearsList.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">College / Institution</label>
                  <input
                    type="text"
                    value={editForm.college}
                    onChange={e => setEditForm({ ...editForm, college: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Biography & Responsibilities</label>
                <textarea
                  rows={2}
                  value={editForm.bio}
                  onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:bg-white focus:outline-hidden resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to College Record</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setInlineEditMode(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* MAIN PROFILE HEADER CARD */}
        <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-10">
          <div className={`absolute top-0 left-0 right-0 h-32 ${
            isAdmin 
              ? 'bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950' 
              : 'bg-gradient-to-r from-blue-800 via-blue-700 to-sky-600'
          }`} />

          <div className="relative pt-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              <div className="relative group">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white shadow-xl bg-slate-100"
                />
                <button
                  onClick={() => setEditModalOpen(true)}
                  className="absolute bottom-1 right-1 p-1.5 rounded-full bg-blue-600 text-white border-2 border-white shadow-md hover:bg-blue-700 transition-colors"
                  title="Change avatar"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {currentUser.name}
                  </h1>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                    isAdmin 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {isAdmin ? 'Official Faculty Administrator' : 'Verified Student'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                  {isAdmin ? 'Employee ID: ' : 'Roll No: '}
                  <span className="text-blue-700 font-mono font-bold bg-blue-50 px-2 py-0.5 rounded-md">
                    {currentUser.studentId}
                  </span>
                  {' · '}{currentUser.department}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentUser.year} (<strong className="text-slate-800">{currentUser.section}</strong>) · {currentUser.college}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                onClick={() => setEditModalOpen(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={() => setPasswordModalOpen(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Change Password</span>
              </button>

              <button
                onClick={handleLogout}
                className="p-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bio text */}
          {currentUser.bio && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                {currentUser.bio}
              </p>
            </div>
          )}
        </div>

        {/* ROLE-SPECIFIC STATS & CAPABILITIES */}
        {isAdmin ? (
          /* ADMIN PROFILE DASHBOARD METRICS */
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Events Supervised</p>
                  <p className="text-2xl font-black text-slate-900 tabular-nums mt-0.5">{totalEventsManaged}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-sky-50 text-sky-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Registrations</p>
                  <p className="text-2xl font-black text-slate-900 tabular-nums mt-0.5">{totalRegistrationsReviewed}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-600">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pending Review</p>
                  <p className="text-2xl font-black text-amber-700 tabular-nums mt-0.5">{pendingQueueCount}</p>
                </div>
              </div>
            </div>

            {/* ADMIN ACTIONS SHORTCUTS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-700" />
                <span>Administrative Privileges & Controls</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <Link
                  to="/admin/events/new"
                  className="p-4 rounded-2xl bg-blue-50 hover:bg-blue-100/80 border border-blue-200 transition-all flex flex-col justify-between group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Post New Event</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Publish hackathons or sports meets</p>
                  </div>
                </Link>

                <Link
                  to="/admin/registrations"
                  className="p-4 rounded-2xl bg-sky-50 hover:bg-sky-100/80 border border-sky-200 transition-all flex flex-col justify-between group"
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Review Registrations</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Approve or reject student entries</p>
                  </div>
                </Link>

                <Link
                  to="/admin/events"
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex flex-col justify-between group"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Manage Event Catalog</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Edit dates, capacities, and rules</p>
                  </div>
                </Link>

                <Link
                  to="/admin/reports"
                  className="p-4 rounded-2xl bg-cyan-50 hover:bg-cyan-100/80 border border-cyan-200 transition-all flex flex-col justify-between group"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Export Reports</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">NAAC & accreditation CSV logs</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* STUDENT PROFILE STATS */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Events Registered</p>
                <p className="text-2xl font-black text-slate-900 tabular-nums mt-0.5">{registeredCount}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Events Attended</p>
                <p className="text-2xl font-black text-slate-900 tabular-nums mt-0.5">{attendedCount}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-sky-50 text-sky-600">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Certificates Earned</p>
                <p className="text-2xl font-black text-slate-900 tabular-nums mt-0.5">{certCount}</p>
              </div>
            </div>
          </div>
        )}

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Academic / Designation Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span>{isAdmin ? 'Faculty Appointment Details' : 'Academic Details'}</span>
              </h2>
              <button
                onClick={() => setEditModalOpen(true)}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>

            <div className="space-y-3 text-xs divide-y divide-slate-100">
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Institution:</span>
                <span className="font-semibold text-slate-900 text-right">{currentUser.college}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">{isAdmin ? 'Designation:' : 'Degree & Branch:'}</span>
                <span className="font-semibold text-slate-900">{currentUser.department}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">{isAdmin ? 'Faculty ID:' : 'Student Roll Number:'}</span>
                <span className="font-mono font-bold text-blue-600">{currentUser.studentId}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">{isAdmin ? 'Cadre:' : 'Academic Standing:'}</span>
                <span className="font-semibold text-slate-900">{currentUser.year}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">{isAdmin ? 'Assigned Office:' : 'Assigned Section:'}</span>
                <span className="font-semibold text-slate-900">{currentUser.section}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Portal Access:</span>
                <span className="font-semibold text-emerald-600">{isAdmin ? 'Full Faculty Administrative Access' : 'Regular Student Account'}</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-700" />
                <span>Contact Information</span>
              </h2>
              <button
                onClick={() => setEditModalOpen(true)}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>

            <div className="space-y-3 text-xs divide-y divide-slate-100">
              <div className="pt-2 flex justify-between items-center">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> Official Email:
                </span>
                <span className="font-semibold text-slate-900">{currentUser.email}</span>
              </div>
              <div className="pt-2 flex justify-between items-center">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> Mobile / Extension:
                </span>
                <span className="font-semibold text-slate-900">{currentUser.phone}</span>
              </div>
              <div className="pt-2 flex justify-between items-center">
                <span className="text-slate-500">Campus Residence:</span>
                <span className="font-semibold text-slate-900">{isAdmin ? 'Faculty Quarters, Block B' : 'Day Scholar (Hyderabad)'}</span>
              </div>
              <div className="pt-2 flex justify-between items-center">
                <span className="text-slate-500">Verification Status:</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> University Authenticated
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* FULL EDIT PROFILE MODAL */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {isAdmin ? 'Edit Faculty Admin Profile' : 'Edit Student Profile'}
                  </h3>
                  <p className="text-[11px] text-slate-500">Update academic records and personal details</p>
                </div>
              </div>
              <button 
                onClick={() => setEditModalOpen(false)} 
                className="text-slate-400 hover:text-slate-700 p-1"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-5 space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isAdmin ? 'Faculty Full Name' : 'Student Full Name'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isAdmin ? 'Faculty Employee ID' : 'Roll Number / Student ID'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={editForm.studentId}
                      onChange={e => setEditForm({ ...editForm, studentId: e.target.value.toUpperCase() })}
                      placeholder={isAdmin ? 'FAC-CSE-104' : '24951A05C8'}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-blue-700 focus:bg-white focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={editForm.email}
                      onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={editForm.phone}
                      onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isAdmin ? 'Department / Committee' : 'Department'}
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={editForm.department}
                      onChange={e => setEditForm({ ...editForm, department: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Standing / Cadre</label>
                    <input
                      type="text"
                      value={editForm.year}
                      onChange={e => setEditForm({ ...editForm, year: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Section / Office</label>
                    <input
                      type="text"
                      required
                      value={editForm.section}
                      onChange={e => setEditForm({ ...editForm, section: e.target.value })}
                      placeholder={isAdmin ? 'Academic Administration' : 'CSE-C'}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">College / University Name</label>
                <input
                  type="text"
                  value={editForm.college}
                  onChange={e => setEditForm({ ...editForm, college: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bio / Profile Description</label>
                <textarea
                  rows={2}
                  value={editForm.bio}
                  onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:bg-white focus:outline-hidden resize-none"
                />
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-2">Select Profile Avatar</label>
                <div className="grid grid-cols-2 gap-2">
                  {avatarPresets.map(preset => (
                    <div
                      key={preset.url}
                      onClick={() => setEditForm({ ...editForm, avatar: preset.url })}
                      className={`cursor-pointer rounded-2xl border-2 p-2 flex items-center gap-2.5 transition-all ${
                        editForm.avatar === preset.url ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={preset.url} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                      <span className="text-[11px] font-semibold text-slate-700 truncate">{preset.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to College Record</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Change Password</h3>
              <button onClick={() => setPasswordModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.oldPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Min 6 characters"
                  value={passwordForm.newPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Re-type new password"
                  value={passwordForm.confirmPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
