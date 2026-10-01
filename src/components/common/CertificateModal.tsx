import React, { useRef } from 'react';
import { CertificateItem } from '../../types';
import { X, Download, Printer, Award, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, isOpen, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate a printable window or trigger print
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top actions bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-bold text-slate-800">Certificate Verification & Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas Sheet */}
        <div ref={printRef} className="p-8 sm:p-12 bg-white">
          <div className="relative p-8 sm:p-10 border-8 border-double border-indigo-900/40 rounded-2xl bg-gradient-to-b from-amber-50/20 via-white to-indigo-50/20 text-center shadow-xs">
            
            {/* Corner filigree accents */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-indigo-700"></div>
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-indigo-700"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-indigo-700"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-indigo-700"></div>

            {/* University Crest / Title */}
            <div className="mb-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-700">
                {certificate.college}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                CERTIFICATE OF PARTICIPATION
              </h2>
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-amber-500 to-indigo-600 rounded-full mt-2" />
            </div>

            <p className="text-xs text-slate-500 italic mt-6">This is proudly presented to</p>

            <h3 className="text-3xl sm:text-4xl font-black text-indigo-950 tracking-tight mt-2 font-serif">
              {certificate.studentName}
            </h3>

            <p className="text-xs font-mono text-slate-500 mt-1">
              Roll No: {certificate.studentId} · {certificate.department}
            </p>

            <p className="text-sm text-slate-700 max-w-xl mx-auto mt-6 leading-relaxed">
              for outstanding participation and commendable demonstration of skills in <span className="font-bold text-slate-900">{certificate.eventName}</span> held at {certificate.college} on <span className="font-semibold">{certificate.participationDate}</span>.
            </p>

            {certificate.gradeOrRank && (
              <div className="inline-block mt-4 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold tracking-wide">
                🏆 {certificate.gradeOrRank}
              </div>
            )}

            {/* Signatures & Seal */}
            <div className="mt-12 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
              <div className="text-left text-xs">
                <p className="font-mono text-slate-400">ID: {certificate.certificateNumber}</p>
                <p className="text-slate-500 mt-0.5">Issued on: {certificate.issuedDate}</p>
              </div>

              {/* Official Gold Foil Seal Simulation */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 border-4 border-amber-200 shadow-md flex flex-col items-center justify-center text-amber-950">
                <ShieldCheck className="w-7 h-7 text-amber-950" />
                <span className="text-[9px] font-black uppercase tracking-tighter mt-0.5">OFFICIAL SEAL</span>
              </div>

              <div className="text-right text-xs">
                <div className="font-serif italic text-base font-bold text-slate-800 border-b border-slate-400 pb-1">
                  {certificate.signatory}
                </div>
                <p className="text-slate-600 font-semibold mt-1">{certificate.signatoryTitle}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer info note */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 print:hidden">
          Official cryptographically signed credential issued by CampusConnect Events.
        </div>
      </div>
    </div>
  );
};
