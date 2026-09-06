import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <span className="text-8xl block mb-4">🕌</span>
        <h1 className="text-6xl font-bold text-emerald-800 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          Ye page nahi mila. Ho sakta hai link galat ho ya page hata diya gaya ho.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-3 rounded-xl font-medium transition-colors">
            <Home size={18} /> Go Home
          </Link>
          <Link href="/search" className="flex items-center gap-2 bg-white text-emerald-700 border-2 border-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-xl font-medium transition-colors">
            <Search size={18} /> Search Mosques
          </Link>
        </div>
      </div>
    </div>
  );
}
