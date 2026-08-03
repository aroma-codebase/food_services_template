import { useEffect, useState } from 'react';
import { Download, FileText, Loader2 } from 'lucide-react';
import { buildEnquiryPdfHtml } from '../utils/pdf/buildEnquiryPdfHtml';
import { downloadPdfFromHtml } from '../utils/pdf/downloadPdfFromHtml';

const mockPdfData = {
  packageTitle: 'Grand Feast Package',
  packageLabel: '₹350 to ₹500',
  guestCount: 150,
  budgetRange: '₹52,500 to ₹75,000',
  fullName: 'Test Customer',
  email: 'test.customer@example.com',
  phone: '9876543210',
  notes: 'This is a PDF generation test. Please verify the final output is readable, high contrast, and fully rendered.',
};

export default function PdfDownloadTestPage() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const runDownload = async () => {
    setStatus('generating');
    setError('');

    try {
      const html = buildEnquiryPdfHtml(mockPdfData);
      await downloadPdfFromHtml(html, 'sri-annapoorna-pdf-download-test.pdf');
      setStatus('ready');
    } catch (downloadError) {
      console.error('PDF test download failed:', downloadError);
      setError(downloadError?.message || 'PDF test download failed');
      setStatus('error');
    }
  };

  useEffect(() => {
    runDownload();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-10 text-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 dark:text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col justify-center rounded-[2rem] border border-orange-100 bg-white p-6 shadow-2xl shadow-orange-500/10 dark:border-gray-800 dark:bg-gray-900 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/25">
            <FileText size={22} />
          </div>

          <div className="flex-1">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-orange-500">PDF test mode</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ fontFamily: 'Playfair Display, serif' }}>
              Enquiry PDF generation test
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              This page feeds mock booking data into the same HTML template and PDF download helper used by the booking flow.
              It should generate a readable PDF immediately, and you can rerun it if you want to verify the output again.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-950/40">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-gray-400">Status</p>
              <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                {status === 'generating' ? 'Generating PDF...' : status === 'ready' ? 'PDF downloaded' : status === 'error' ? 'Download failed' : 'Ready'}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-gray-400">Filename</p>
              <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">sri-annapoorna-pdf-download-test.pdf</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 text-sm text-gray-600 dark:text-gray-300 sm:grid-cols-2">
            <p><span className="font-semibold text-gray-900 dark:text-white">Package:</span> {mockPdfData.packageTitle}</p>
            <p><span className="font-semibold text-gray-900 dark:text-white">Guests:</span> {mockPdfData.guestCount}</p>
            <p><span className="font-semibold text-gray-900 dark:text-white">Budget:</span> {mockPdfData.budgetRange}</p>
            <p><span className="font-semibold text-gray-900 dark:text-white">Customer:</span> {mockPdfData.fullName}</p>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={runDownload}
            disabled={status === 'generating'}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'generating' ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {status === 'generating' ? 'Generating...' : 'Download test PDF again'}
          </button>

          <p className="text-xs leading-6 text-gray-500 dark:text-gray-400 sm:max-w-md sm:self-center">
            Open this page with <span className="font-semibold text-gray-900 dark:text-white">/?pdf-test=1</span> while the app is running.
          </p>
        </div>
      </div>
    </main>
  );
}