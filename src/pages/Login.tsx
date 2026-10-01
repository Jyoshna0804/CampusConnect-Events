import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Shield
} from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [emailOrId, setEmailOrId] = useState('24951A05C8');
  const [password, setPassword] = useState('student@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrId || !password) {
      setError('Please enter your Student Roll Number or College Email and Password.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      login(emailOrId, 'student');
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 400);
  };

  const handleDemoFillStudent = () => {
    setEmailOrId('24951A05C8');
    setPassword('student@123');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Form Area */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                CampusConnect
              </span>
            </Link>

            {/* Portal Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student Profile Portal</span>
            </div>

            {/* Header */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Student Sign In 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Access your student dashboard, view events, and track passes.
              </p>
            </div>

            {/* Demo Quick Fill Pill */}
            <div className="mt-4 p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-between text-xs">
              <span className="text-blue-900 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Student: <strong>Jyoshna (24951A05C8)</strong></span>
              </span>
              <button
                type="button"
                onClick={handleDemoFillStudent}
                className="text-blue-600 font-bold hover:underline"
              >
                Auto Fill
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Roll Number / College Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={emailOrId}
                    onChange={e => setEmailOrId(e.target.value)}
                    placeholder="24951A05C8 or student@iare.ac.in"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:bg-white focus:border-blue-500 focus:outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:bg-white focus:border-blue-500 focus:outline-hidden transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-slate-600 font-medium">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="font-semibold text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Signing in...' : 'Sign In as Student'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Footer: Admin Login Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-500">
              New student?{' '}
              <Link to="/register" className="font-bold text-blue-600 hover:underline">
                Create Account
              </Link>
            </span>
            <Link
              to="/admin/login"
              className="text-blue-700 font-bold hover:underline flex items-center gap-1.5 p-1.5 rounded-lg bg-blue-50 border border-blue-100"
            >
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Faculty Admin Login →</span>
            </Link>
          </div>
        </div>

        {/* Right Graphical Illustration */}
        <div className="hidden lg:flex lg:col-span-6 bg-gradient-to-br from-blue-950 via-slate-900 to-sky-950 p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md text-xs font-semibold border border-blue-400/30 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span>Student Academic Hub</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight leading-snug">
              Discover, Register & Earn Merit Certificates.
            </h3>
            <p className="mt-3 text-xs text-sky-200 leading-relaxed max-w-sm">
              Log in to view ongoing campus hackathons, sports tournaments, cultural stages, and verified participation credentials.
            </p>
          </div>

          {/* Floating graphic card */}
          <div className="relative z-10 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold">Student: Jyoshna (24951A05C8)</p>
                <p className="text-[11px] text-sky-200">
                  Department of Computer Science & Engineering · Year III
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-sky-200 pt-2 border-t border-white/10">
              <span>Verified Student Record</span>
              <span className="text-emerald-300 font-semibold">Active Enrollment</span>
            </div>
          </div>

          <div className="relative z-10 text-[11px] text-sky-300">
            Institute of Aeronautical Engineering (Autonomous)
          </div>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Reset Student Password</h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your student roll number or college email to receive password reset instructions.
            </p>
            {resetEmailSent ? (
              <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                A password reset link has been dispatched to your official college mailbox.
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="24951A05C8 or student@iare.ac.in"
                  defaultValue={emailOrId}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:outline-hidden"
                />
              </div>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => {
                  setForgotModalOpen(false);
                  setResetEmailSent(false);
                }}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Close
              </button>
              {!resetEmailSent && (
                <button
                  onClick={() => setResetEmailSent(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
