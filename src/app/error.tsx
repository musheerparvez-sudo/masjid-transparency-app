'use client';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-red-600" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Kuch Galat Ho Gaya</h2>
        <p className="text-gray-500 mb-8">Maaf kijiye, koi masla aa gaya hai. Dobara try karein.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={reset} className="flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-3 rounded-xl font-medium transition-colors">
            <RefreshCw size={18} /> Try Again
          </button>
          <Link href="/" className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium transition-colors">
            <Home size={18} /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
