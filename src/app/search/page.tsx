'use client';

import React, { useState } from 'react';
import { Search, Filter, LayoutGrid, Map, X } from 'lucide-react';
import { MasjidCard } from '@/components/MasjidCard';
import { Button } from '@/components/ui/Button';

// Mock data for demo
const mockMosques = [
  {
    id: 'masjid-1',
    name: 'Jama Masjid Al-Falah',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    type: 'TRUST',
    transparencyScore: 85,
    totalDonations: 1250000,
    totalExpenses: 980000,
    isVerified: true,
  },
  {
    id: 'masjid-2',
    name: 'Masjid-e-Noor',
    city: 'Delhi',
    state: 'Delhi',
    type: 'WAQF_BOARD',
    transparencyScore: 72,
    totalDonations: 850000,
    totalExpenses: 720000,
    isVerified: true,
  },
  {
    id: 'masjid-3',
    name: 'Bilal Masjid',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'COMMITTEE',
    transparencyScore: 60,
    totalDonations: 540000,
    totalExpenses: 480000,
    isVerified: false,
  },
  {
    id: 'masjid-4',
    name: 'Masjid Al-Huda',
    city: 'Hyderabad',
    state: 'Telangana',
    type: 'PRIVATE',
    transparencyScore: 45,
    totalDonations: 320000,
    totalExpenses: 290000,
    isVerified: false,
  },
  {
    id: 'masjid-5',
    name: 'Masjid-e-Ibrahim',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    type: 'TRUST',
    transparencyScore: 92,
    totalDonations: 1800000,
    totalExpenses: 1400000,
    isVerified: true,
  },
  {
    id: 'masjid-6',
    name: 'Madina Masjid',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'WAQF_BOARD',
    transparencyScore: 78,
    totalDonations: 960000,
    totalExpenses: 830000,
    isVerified: true,
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Filter mosques based on search query and filters
  const filteredMosques = mockMosques.filter((mosque) => {
    const matchesQuery =
      !query ||
      mosque.name.toLowerCase().includes(query.toLowerCase()) ||
      mosque.city.toLowerCase().includes(query.toLowerCase());
    const matchesCity =
      !cityFilter || mosque.city.toLowerCase().includes(cityFilter.toLowerCase());
    const matchesType = !typeFilter || mosque.type === typeFilter;
    return matchesQuery && matchesCity && matchesType;
  });

  const clearFilters = () => {
    setQuery('');
    setCityFilter('');
    setTypeFilter('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-emerald-800 pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-2">Search Mosques</h1>
          <p className="text-emerald-200 mb-6">
            Apne ilaqe ki masjid talash karein aur uski mukammal jankari dekhein
          </p>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by mosque name or city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-base"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium transition-colors ${
                showFilters
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter size={18} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Filter by city..."
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none text-sm"
              />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg text-gray-900 focus:outline-none text-sm bg-white"
              >
                <option value="">All Types</option>
                <option value="TRUST">Trust</option>
                <option value="WAQF_BOARD">Waqf Board</option>
                <option value="PRIVATE">Private</option>
                <option value="COMMITTEE">Committee</option>
              </select>
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-4 py-2.5 rounded-lg bg-red-500/20 text-white hover:bg-red-500/30 text-sm font-medium"
              >
                <X size={16} />
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* View Toggle & Count */}
        <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">
            <span className="font-bold text-gray-900">{filteredMosques.length}</span>{' '}
            mosques found
          </p>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white shadow-sm text-emerald-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'map'
                  ? 'bg-white shadow-sm text-emerald-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Map size={18} />
            </button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <>
            {filteredMosques.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                {filteredMosques.map((mosque) => (
                  <MasjidCard key={mosque.id} {...mosque} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🕌</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No mosques found
                </h3>
                <p className="text-gray-500 mb-6">
                  Koi masjid nahi mili. Search ya filters change karke dekhein.
                </p>
                <Button onClick={clearFilters} variant="secondary">
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}

        {/* Map View Placeholder */}
        {viewMode === 'map' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center py-20 mb-12">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Map View</h3>
            <p className="text-gray-500">
              Interactive map with Leaflet will be integrated here. Nearby
              mosques will appear as pins on the map.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
