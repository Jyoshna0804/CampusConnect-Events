import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CollegeEvent } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, Calendar, MapPin, Sparkles, AlertCircle } from 'lucide-react';

interface RegistrationModalProps {
  event: CollegeEvent;
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ event, isOpen, onClose }) => {
  const { currentUser, registerForEvent } = useApp();
  const navigate = useNavigate();

  const [phone, setPhone] = useState(currentUser.phone || '');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('Please agree to the event rules and guidelines to continue.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const result = registerForEvent(event.id, { phone });
      setIsSubmitting(false);
      if (result.success) {
        setIsSuccess(true);
      } else {
        setError(result.message);
      }
    }, 400);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setAgreed(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header gradient banner */}
        <div className="relative p-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="pr-8">
            <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-md bg-white/25 text-white backdrop-blur-xs mb-2">
              {event.category}
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white leading-snug">
              {isSuccess ? 'Registration Confirmed!' : `Register for ${event.title}`}
            </h3>
            <p className="text-xs text-white/80 mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
            </p>
          </div>
        </div>

        {isSuccess ? (
          /* SUCCESS SCREEN */
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Successfully Registered
            </span>
            <h4 className="text-2xl font-bold text-slate-900 tracking-tight">
              🎉 Registration Successful!
            </h4>
            <p className="mt-2 text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              You are successfully registered for <span className="font-semibold text-slate-900">{event.title}</span>. Your ticket pass and schedule details are saved in your account.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs text-slate-600 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Participant:</span>
                <span className="font-semibold text-slate-900">{currentUser.name} ({currentUser.studentId})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Department:</span>
                <span className="font-medium text-slate-800">{currentUser.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-semibold text-amber-600">Pending Review</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  handleResetAndClose();
                  navigate('/my-registrations');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-md hover:from-purple-700 hover:to-indigo-700 transition-all"
              >
                View My Registration
              </button>
              <button
                onClick={() => {
                  handleResetAndClose();
                  navigate('/events');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-all"
              >
                Back to Events
              </button>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student Full Name</label>
                <input
                  type="text"
                  readOnly
                  value={currentUser.name}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-medium cursor-not-allowed focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student ID / Roll No</label>
                <input
                  type="text"
                  readOnly
                  value={currentUser.studentId}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-medium cursor-not-allowed focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">College Email Address</label>
                <input
                  type="email"
                  readOnly
                  value={currentUser.email}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-medium cursor-not-allowed focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-medium focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  readOnly
                  value={currentUser.department}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-medium cursor-not-allowed focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Academic Year</label>
                <input
                  type="text"
                  readOnly
                  value={currentUser.year}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-medium cursor-not-allowed focus:outline-hidden"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs text-slate-600 leading-normal">
                  I agree to the event rules, campus conduct guidelines, and confirm attendance for <strong>{event.title}</strong>.
                </span>
              </label>
            </div>

            <div className="pt-3 flex gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-semibold text-xs shadow-md hover:opacity-95 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Registration'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
