'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, getMonthName } from '@/lib/utils';

interface SalaryPayment {
  id: string;
  month: number;
  year: number;
  amount: number;
  status: 'PAID' | 'UNPAID' | 'PARTIAL';
  paymentDate?: string;
  paymentMethod?: string;
  proofUrl?: string;
}

interface StaffCardProps {
  id: string;
  name: string;
  role: string;
  phone?: string;
  qualification?: string;
  experienceYears?: number;
  appointedDate: string;
  monthlySalary: number;
  isActive: boolean;
  recentPayments: SalaryPayment[];
}

const roleLabels: Record<string, { label: string; variant: 'success' | 'info' | 'warning' | 'neutral' }> = {
  IMAM: { label: 'Imam', variant: 'success' },
  MUAZZIN: { label: 'Muazzin', variant: 'info' },
  KHADIM: { label: 'Khadim', variant: 'warning' },
  NAIB_IMAM: { label: 'Naib Imam', variant: 'neutral' },
};

const statusConfig = {
  PAID: { color: 'bg-green-500', label: 'Paid', variant: 'success' as const },
  UNPAID: { color: 'bg-red-500', label: 'Unpaid', variant: 'danger' as const },
  PARTIAL: { color: 'bg-yellow-500', label: 'Partial', variant: 'warning' as const },
};

export function StaffCard({
  name,
  role,
  phone,
  qualification,
  experienceYears,
  appointedDate,
  monthlySalary,
  isActive,
  recentPayments,
}: StaffCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const roleInfo = roleLabels[role] || { label: role, variant: 'neutral' as const };

  // Get initials for avatar
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5">
        {/* Header: Avatar + Name + Role */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
              <Badge variant={roleInfo.variant}>{roleInfo.label}</Badge>
              {!isActive && <Badge variant="danger">Inactive</Badge>}
            </div>
            {qualification && (
              <p className="text-sm text-gray-500 mt-0.5">{qualification}</p>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div>
            <span className="text-gray-400">Monthly Salary</span>
            <p className="font-bold text-emerald-700">{formatCurrency(monthlySalary)}</p>
          </div>
          <div>
            <span className="text-gray-400">Experience</span>
            <p className="font-semibold text-gray-700">
              {experienceYears ? `${experienceYears} years` : 'N/A'}
            </p>
          </div>
          <div>
            <span className="text-gray-400">Appointed</span>
            <p className="font-semibold text-gray-700">
              {new Date(appointedDate).toLocaleDateString('en-IN', {
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
          <div>
            <span className="text-gray-400">Contact</span>
            <p className="font-semibold text-gray-700">{phone || 'N/A'}</p>
          </div>
        </div>

        {/* Last 6 months salary status dots */}
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-2">Last 6 Months Salary Status</p>
          <div className="flex items-center gap-2">
            {recentPayments.slice(0, 6).map((payment) => {
              const config = statusConfig[payment.status];
              return (
                <div key={payment.id} className="flex flex-col items-center gap-1">
                  <div
                    className={`status-dot ${config.color}`}
                    title={`${getMonthName(payment.month)} ${payment.year}: ${config.label}`}
                  />
                  <span className="text-[10px] text-gray-400">
                    {getMonthName(payment.month).slice(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              Hide Salary History
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              View Salary History
            </>
          )}
        </button>
      </div>

      {/* Expanded: Salary Payment History Table */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Month
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Method
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Proof
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentPayments.map((payment) => {
                  const config = statusConfig[payment.status];
                  return (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">
                        {getMonthName(payment.month)} {payment.year}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={config.variant}>{config.label}</Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {payment.paymentDate
                          ? new Date(payment.paymentDate).toLocaleDateString('en-IN')
                          : '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {payment.paymentMethod?.replace('_', ' ') || '—'}
                      </td>
                      <td className="px-4 py-3">
                        {payment.proofUrl ? (
                          <a
                            href={payment.proofUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700"
                          >
                            <ExternalLink size={14} />
                          </a>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
