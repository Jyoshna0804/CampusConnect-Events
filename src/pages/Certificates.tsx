import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CertificateModal } from '../components/common/CertificateModal';
import { CertificateItem } from '../types';
import { Award, Download, Eye, ShieldCheck, Sparkles, Calendar, FileText } from 'lucide-react';

export const Certificates: React.FC = () => {
  const { certificates, showToast } = useApp();
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenCertificate = (cert: CertificateItem) => {
    setSelectedCert(cert);
    setModalOpen(true);
  };

  const handleDownload = (cert: CertificateItem) => {
    setSelectedCert(cert);
    setModalOpen(true);
    showToast('Certificate Prepared', `Opening printable credential for ${cert.eventName}`, 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Verified Credentials</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Certificates
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Official university certificates awarded for participation, winning hackathons, and technical workshops.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Cryptographically Verified</span>
          </div>
        </div>

        {/* Certificates Grid */}
        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map(cert => (
              <div
                key={cert.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top gold ribbon bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-indigo-600" />

                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 font-mono">
                      {cert.certificateNumber}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wide">
                      {cert.eventCategory}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug mt-0.5">
                      {cert.eventName}
                    </h3>
                  </div>

                  {cert.gradeOrRank && (
                    <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-200/60 text-[11px] font-semibold text-amber-900">
                      🏆 {cert.gradeOrRank}
                    </div>
                  )}

                  <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Participation: <strong className="text-slate-800">{cert.participationDate}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Issued: {cert.issuedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenCertificate(cert)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 inline-flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Certificate</span>
                  </button>

                  <button
                    onClick={() => handleDownload(cert)}
                    className="py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center justify-center gap-1.5"
                    aria-label="Download certificate"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Certificates Issued Yet</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Complete registered campus events and hackathons to unlock authenticated university digital certificates.
            </p>
          </div>
        )}

      </div>

      <CertificateModal
        certificate={selectedCert}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
