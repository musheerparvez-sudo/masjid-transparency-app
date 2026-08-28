'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Building2, CheckCircle, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// Mock data
const volunteerData = {
  name: 'Ahmad Khan',
  level: 'VERIFIED',
  mosquesAdded: 3,
  updatesMade: 15,
};

const managedMosques = [
  { id: 'masjid-1', name: 'Jama Masjid Al-Falah', city: 'Lucknow', status: 'verified', lastUpdated: '2026-08-25' },
  { id: 'masjid-5', name: 'Masjid-e-Ibrahim', city: 'Bhopal', status: 'verified', lastUpdated: '2026-08-20' },
  { id: 'masjid-7', name: 'Masjid Bilal', city: 'Lucknow', status: 'pending', lastUpdated: '2026-08-28' },
];

const recentActivity = [
  { action: 'Updated staff salary records', mosque: 'Jama Masjid Al-Falah', date: '2026-08-25', type: 'update' },
  { action: 'Added electricity bill', mosque: 'Masjid-e-Ibrahim', date: '2026-08-20', type: 'update' },
  { action: 'Registered new mosque', mosque: 'Masjid Bilal', date: '2026-08-28', type: 'create' },
  { action: 'Updated Mutawalli info', mosque: 'Jama Masjid Al-Falah', date: '2026-08-15', type: 'update' },
];

export default function VolunteerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-emerald-800 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                Assalamu Alaikum, {volunteerData.name}! 👋
              </h1>
              <p className="text-emerald-200">
                Aap ek verified volunteer hain. Masjidon ki khidmat mein aapka shukriya!
              </p>
            </div>
            <Badge variant="success" className="text-sm px-4 py-1.5">
              ✅ Verified Volunteer
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Building2 className="text-emerald-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{volunteerData.mosquesAdded}</p>
            <p className="text-sm text-gray-500">Mosques Added</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Edit className="text-blue-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{volunteerData.updatesMade}</p>
            <p className="text-sm text-gray-500">Updates Made</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="text-purple-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{volunteerData.level}</p>
            <p className="text-sm text-gray-500">Volunteer Level</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link href="/masjid/register">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-emerald-200 transition-all flex items-center gap-4 group">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                <Plus className="text-emerald-600 group-hover:text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Add New Mosque</h3>
                <p className="text-sm text-gray-500">Apne ilaqe ki nayi masjid register karein</p>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-emerald-500" size={20} />
            </div>
          </Link>
          <Link href="/search">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-blue-200 transition-all flex items-center gap-4 group">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <Edit className="text-blue-600 group-hover:text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Update Existing Mosque</h3>
                <p className="text-sm text-gray-500">Kisi masjid ki jankari update karein</p>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-blue-500" size={20} />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Managed Mosques */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Your Mosques</h2>
            <div className="space-y-3">
              {managedMosques.map((mosque) => (
                <Link key={mosque.id} href={`/masjid/${mosque.id}`}>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-emerald-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🕌</span>
                      <div>
                        <p className="font-medium text-gray-900">{mosque.name}</p>
                        <p className="text-xs text-gray-400">{mosque.city} • Updated {mosque.lastUpdated}</p>
                      </div>
                    </div>
                    <Badge variant={mosque.status === 'verified' ? 'success' : 'warning'}>
                      {mosque.status === 'verified' ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    activity.type === 'create' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {activity.type === 'create' ? (
                      <Plus className="text-green-600" size={14} />
                    ) : (
                      <Edit className="text-blue-600" size={14} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-400">{activity.mosque} • {activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
