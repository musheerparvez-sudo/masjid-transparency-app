export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-800 pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-64 bg-emerald-700 rounded-lg animate-pulse mb-3" />
          <div className="h-4 w-96 bg-emerald-700/50 rounded-lg animate-pulse" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-3 w-full bg-gray-100 rounded animate-pulse mb-3" />
              <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse mb-4" />
              <div className="h-2 w-full bg-gray-200 rounded-full animate-pulse mb-4" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-16 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
