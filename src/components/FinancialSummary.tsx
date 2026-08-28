import React from 'react';
import { TrendingUp, TrendingDown, Wallet, Heart } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface FinancialSummaryProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  totalDonations: number;
}

export function FinancialSummary({
  totalIncome,
  totalExpenses,
  balance,
  totalDonations,
}: FinancialSummaryProps) {
  const cards = [
    {
      label: 'Total Income',
      value: totalIncome,
      icon: TrendingUp,
      color: 'bg-green-50 text-green-700 border-green-200',
      iconColor: 'bg-green-100 text-green-600',
    },
    {
      label: 'Total Expenses',
      value: totalExpenses,
      icon: TrendingDown,
      color: 'bg-red-50 text-red-700 border-red-200',
      iconColor: 'bg-red-100 text-red-600',
    },
    {
      label: 'Balance',
      value: balance,
      icon: Wallet,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      iconColor: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Donations Received',
      value: totalDonations,
      icon: Heart,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      iconColor: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`rounded-xl border p-5 ${card.color}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium opacity-80">{card.label}</span>
              <div className={`p-2 rounded-lg ${card.iconColor}`}>
                <Icon size={18} />
              </div>
            </div>
            <div className="text-2xl font-bold">{formatCurrency(card.value)}</div>
          </div>
        );
      })}
    </div>
  );
}
