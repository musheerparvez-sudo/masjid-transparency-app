import React from 'react';
import Link from 'next/link';
import { MapPin, BadgeCheck, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, getScoreBgColor } from '@/lib/utils';

interface MasjidCardProps {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  transparencyScore: number;
  totalDonations: number;
  totalExpenses: number;
  isVerified: boolean;
}

const typeLabels: Record<string, { label: string; variant: 'success' | 'info' | 'warning' | 'neutral' }> = {
  TRUST: { label: 'Trust', variant: 'info' },
  WAQF_BOARD: { label: 'Waqf Board', variant: 'success' },
  PRIVATE: { label: 'Private', variant: 'warning' },
  COMMITTEE: { label: 'Committee', variant: 'neutral' },
};

export function MasjidCard({
  id,
  name,
  city,
  state,
  type,
  transparencyScore,
  totalDonations,
  totalExpenses,
  isVerified,
}: MasjidCardProps) {
  const typeInfo = typeLabels[type] || { label: type, variant: 'neutral' as const };

  return (
    <Link href={`/masjid/${id}`} className="block group">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🕌</span>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
              {name}
            </h3>
          </div>
          {isVerified && (
            <BadgeCheck className="text-emerald-500 flex-shrink-0" size={22} />
          )}
        </div>

        {/* Location & Type */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={14} className="text-gray-400" />
          <span className="text-sm text-gray-500">
            {city}, {state}
          </span>
          <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>
        </div>

        {/* Transparency Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-500">Transparency Score</span>
            <span className="font-bold text-gray-900">{transparencyScore}/100</span>
          </div>
          <div className="score-bar">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getScoreBgColor(transparencyScore)}`}
              style={{ width: `${transparencyScore}%` }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-emerald-50 rounded-lg p-3 text-center">
            <div className="text-xs text-emerald-600 mb-0.5">Donations</div>
            <div className="text-sm font-bold text-emerald-800">
              {formatCurrency(totalDonations)}
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-3 text-center">
            <div className="text-xs text-red-600 mb-0.5">Expenses</div>
            <div className="text-sm font-bold text-red-800">
              {formatCurrency(totalExpenses)}
            </div>
          </div>
        </div>

        {/* View Details */}
        <div className="flex items-center justify-end text-sm text-emerald-600 font-medium group-hover:text-emerald-700">
          <span>View Details</span>
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
