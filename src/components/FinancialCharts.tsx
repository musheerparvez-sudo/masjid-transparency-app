'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend
} from 'recharts';

interface FinancialChartsProps {
  monthlyData?: { month: string; income: number; expenses: number }[];
  expenseByCategory?: { category: string; amount: number }[];
  donationTrend?: { month: string; amount: number }[];
}

const defaultMonthlyData = [
  { month: 'Mar', income: 180000, expenses: 140000 },
  { month: 'Apr', income: 200000, expenses: 160000 },
  { month: 'May', income: 175000, expenses: 150000 },
  { month: 'Jun', income: 220000, expenses: 170000 },
  { month: 'Jul', income: 240000, expenses: 180000 },
  { month: 'Aug', income: 195000, expenses: 155000 },
];

const defaultExpenseByCategory = [
  { category: 'Maintenance', amount: 45000 },
  { category: 'Utilities', amount: 25000 },
  { category: 'Salaries', amount: 65000 },
  { category: 'Charity', amount: 30000 },
  { category: 'Events', amount: 15000 },
];

const defaultDonationTrend = [
  { month: 'Mar', amount: 150000 },
  { month: 'Apr', amount: 180000 },
  { month: 'May', amount: 140000 },
  { month: 'Jun', amount: 190000 },
  { month: 'Jul', amount: 210000 },
  { month: 'Aug', amount: 160000 },
];

const COLORS = ['#10b981', '#34d399', '#059669', '#6ee7b7', '#047857'];

export default function FinancialCharts({
  monthlyData = defaultMonthlyData,
  expenseByCategory = defaultExpenseByCategory,
  donationTrend = defaultDonationTrend
}: FinancialChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      {/* Monthly Income vs Expenses - Full Width */}
      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Monthly Income vs Expenses</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
              <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend iconType="circle" />
              <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donation Trends */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Donation Trends</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={donationTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Categories */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Expenses by Category</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseByCategory}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={5}
                dataKey="amount"
              >
                {expenseByCategory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
