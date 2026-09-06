'use client';

import React, { useState } from 'react';
import {
  MapPin, BadgeCheck, Phone, Mail, Calendar, Users, Building2,
  Wallet, FileText, Copy, CheckCircle2, AlertTriangle, Clock,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FinancialSummary } from '@/components/FinancialSummary';
import { StaffCard } from '@/components/StaffCard';
import { formatCurrency, formatDate, getScoreBgColor } from '@/lib/utils';
import FinancialCharts from '@/components/FinancialCharts';
import { MosqueMap } from '@/components/MosqueMap';

// ===== MOCK DATA =====
const mockMosque = {
  id: 'masjid-1',
  name: 'Jama Masjid Al-Falah',
  nameUrdu: 'جامع مسجد الفلاح',
  address: '123 Aminabad Road, Near Chowk',
  city: 'Lucknow',
  state: 'Uttar Pradesh',
  pinCode: '226001',
  latitude: 26.8467,
  longitude: 80.9462,
  type: 'TRUST',
  capacity: 500,
  constructionYear: 1985,
  transparencyScore: 85,
  isVerified: true,
  description:
    'Jama Masjid Al-Falah ek mashhoor masjid hai jo 1985 mein ta\'meer hui. Yahan 500 namazion ki gunjaish hai aur har namaz ke waqt badi tadaad mein log aate hain.',
};

const mockMutawalli = {
  name: 'Haji Mohammad Iqbal',
  phone: '+91 98765 43210',
  email: 'haji.iqbal@email.com',
  sinceDate: '2018-03-15',
};

const mockBankAccount = {
  bankName: 'State Bank of India',
  accountNumber: '1234567890123',
  ifscCode: 'SBIN0001234',
  accountHolderName: 'Jama Masjid Al-Falah Trust',
  upiId: 'masjidfalah@sbi',
  isVerified: true,
};

const mockStaff = [
  {
    id: 'staff-1',
    name: 'Maulana Abdul Qadir',
    role: 'IMAM',
    phone: '+91 98765 11111',
    qualification: 'Aalim, Fazil — Darul Uloom Deoband',
    experienceYears: 15,
    appointedDate: '2015-06-01',
    monthlySalary: 18000,
    isActive: true,
    recentPayments: [
      { id: 'p1', month: 8, year: 2026, amount: 18000, status: 'PAID' as const, paymentDate: '2026-08-05', paymentMethod: 'BANK_TRANSFER', proofUrl: '#' },
      { id: 'p2', month: 7, year: 2026, amount: 18000, status: 'PAID' as const, paymentDate: '2026-07-03', paymentMethod: 'BANK_TRANSFER', proofUrl: '#' },
      { id: 'p3', month: 6, year: 2026, amount: 18000, status: 'PAID' as const, paymentDate: '2026-06-05', paymentMethod: 'UPI' },
      { id: 'p4', month: 5, year: 2026, amount: 18000, status: 'PAID' as const, paymentDate: '2026-05-04', paymentMethod: 'CASH' },
      { id: 'p5', month: 4, year: 2026, amount: 15000, status: 'PARTIAL' as const, paymentDate: '2026-04-10', paymentMethod: 'CASH' },
      { id: 'p6', month: 3, year: 2026, amount: 18000, status: 'PAID' as const, paymentDate: '2026-03-06', paymentMethod: 'BANK_TRANSFER', proofUrl: '#' },
    ],
  },
  {
    id: 'staff-2',
    name: 'Bilal Ahmad',
    role: 'MUAZZIN',
    phone: '+91 98765 22222',
    qualification: 'Hafiz-e-Quran',
    experienceYears: 8,
    appointedDate: '2019-01-15',
    monthlySalary: 12000,
    isActive: true,
    recentPayments: [
      { id: 'p7', month: 8, year: 2026, amount: 12000, status: 'PAID' as const, paymentDate: '2026-08-05', paymentMethod: 'UPI', proofUrl: '#' },
      { id: 'p8', month: 7, year: 2026, amount: 12000, status: 'PAID' as const, paymentDate: '2026-07-03', paymentMethod: 'UPI' },
      { id: 'p9', month: 6, year: 2026, amount: 12000, status: 'UNPAID' as const },
      { id: 'p10', month: 5, year: 2026, amount: 12000, status: 'PAID' as const, paymentDate: '2026-05-08', paymentMethod: 'CASH' },
      { id: 'p11', month: 4, year: 2026, amount: 12000, status: 'PAID' as const, paymentDate: '2026-04-05', paymentMethod: 'CASH' },
      { id: 'p12', month: 3, year: 2026, amount: 12000, status: 'UNPAID' as const },
    ],
  },
  {
    id: 'staff-3',
    name: 'Mohammad Yusuf',
    role: 'KHADIM',
    qualification: 'Matric Pass',
    experienceYears: 5,
    appointedDate: '2021-09-01',
    monthlySalary: 8000,
    isActive: true,
    recentPayments: [
      { id: 'p13', month: 8, year: 2026, amount: 8000, status: 'PAID' as const, paymentDate: '2026-08-05', paymentMethod: 'CASH' },
      { id: 'p14', month: 7, year: 2026, amount: 8000, status: 'PAID' as const, paymentDate: '2026-07-04', paymentMethod: 'CASH' },
      { id: 'p15', month: 6, year: 2026, amount: 8000, status: 'PAID' as const, paymentDate: '2026-06-03', paymentMethod: 'CASH' },
      { id: 'p16', month: 5, year: 2026, amount: 8000, status: 'PAID' as const, paymentDate: '2026-05-05', paymentMethod: 'CASH' },
      { id: 'p17', month: 4, year: 2026, amount: 8000, status: 'PAID' as const, paymentDate: '2026-04-04', paymentMethod: 'CASH' },
      { id: 'p18', month: 3, year: 2026, amount: 8000, status: 'PAID' as const, paymentDate: '2026-03-05', paymentMethod: 'CASH' },
    ],
  },
];

const mockExpenses = [
  { id: 'e1', category: 'SALARY', amount: 38000, description: 'Staff salaries - August 2026', expenseDate: '2026-08-05', isPaid: true, receiptUrl: '#' },
  { id: 'e2', category: 'UTILITIES', amount: 4500, description: 'Electricity bill - July 2026', expenseDate: '2026-07-15', isPaid: true, receiptUrl: '#' },
  { id: 'e3', category: 'MAINTENANCE', amount: 15000, description: 'Wuzu khana repair', expenseDate: '2026-07-20', isPaid: true },
  { id: 'e4', category: 'UTILITIES', amount: 1200, description: 'Water bill - July 2026', expenseDate: '2026-07-10', isPaid: true, receiptUrl: '#' },
  { id: 'e5', category: 'MISCELLANEOUS', amount: 3500, description: 'Cleaning supplies aur janamaz', expenseDate: '2026-07-25', isPaid: false },
];

const mockBills = [
  { id: 'b1', billType: 'ELECTRICITY', amount: 4500, billDate: '2026-08-01', dueDate: '2026-08-20', status: 'UNPAID' },
  { id: 'b2', billType: 'WATER', amount: 1200, billDate: '2026-08-01', dueDate: '2026-08-15', status: 'PAID', paidDate: '2026-08-10' },
  { id: 'b3', billType: 'GAS', amount: 800, billDate: '2026-07-01', dueDate: '2026-07-20', status: 'OVERDUE' },
  { id: 'b4', billType: 'INTERNET', amount: 700, billDate: '2026-08-01', dueDate: '2026-08-25', status: 'UNPAID' },
];

const mockIncomes = [
  { id: 'i1', source: 'DONATION', amount: 150000, description: 'Monthly donations — August', incomeDate: '2026-08-01' },
  { id: 'i2', source: 'RENTAL', amount: 25000, description: 'Shop rent — Ground floor', incomeDate: '2026-08-01' },
  { id: 'i3', source: 'DONATION', amount: 50000, description: 'Eid special donation drive', incomeDate: '2026-07-15' },
  { id: 'i4', source: 'LAND', amount: 15000, description: 'Agricultural land income', incomeDate: '2026-07-01' },
];

const mockProperties = [
  { id: 'pr1', type: 'SHOP', area: 250, areaUnit: 'SQFT', location: 'Ground floor, main road side', legalStatus: 'Trust registered', monthlyIncome: 25000 },
  { id: 'pr2', type: 'AGRICULTURAL', area: 2, areaUnit: 'ACRE', location: 'Village Khatoli, 5km from masjid', legalStatus: 'Waqf property', monthlyIncome: 15000 },
  { id: 'pr3', type: 'HALL', area: 1500, areaUnit: 'SQFT', location: 'First floor, masjid compound', legalStatus: 'Trust registered', monthlyIncome: 0 },
];

const mockDonations = [
  { id: 'd1', donorName: 'Ahmad Khan', amount: 50000, isAnonymous: false, donatedAt: '2026-08-15' },
  { id: 'd2', donorName: null, amount: 25000, isAnonymous: true, donatedAt: '2026-08-10' },
  { id: 'd3', donorName: 'Fatima Begum', amount: 10000, isAnonymous: false, donatedAt: '2026-08-05' },
  { id: 'd4', donorName: null, amount: 100000, isAnonymous: true, donatedAt: '2026-07-28' },
  { id: 'd5', donorName: 'Dr. Yusuf Ali', amount: 30000, isAnonymous: false, donatedAt: '2026-07-20' },
];

// ===== TABS =====
const tabs = [
  { id: 'overview', label: 'Overview', icon: Building2 },
  { id: 'finances', label: 'Finances', icon: Wallet },
  { id: 'staff', label: 'Staff & Salary', icon: Users },
  { id: 'properties', label: 'Properties', icon: Building2 },
  { id: 'donate', label: 'Donate', icon: Wallet },
];

const billStatusIcon = {
  PAID: <CheckCircle2 size={16} className="text-green-500" />,
  UNPAID: <Clock size={16} className="text-yellow-500" />,
  OVERDUE: <AlertTriangle size={16} className="text-red-500" />,
};

const categoryColors: Record<string, string> = {
  SALARY: 'bg-blue-100 text-blue-700',
  UTILITIES: 'bg-yellow-100 text-yellow-700',
  MAINTENANCE: 'bg-orange-100 text-orange-700',
  CONSTRUCTION: 'bg-purple-100 text-purple-700',
  EVENTS: 'bg-pink-100 text-pink-700',
  MISCELLANEOUS: 'bg-gray-100 text-gray-700',
};

export default function MasjidProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedUPI, setCopiedUPI] = useState(false);

  const copyUPI = () => {
    navigator.clipboard.writeText(mockBankAccount.upiId || '');
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-800 pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  🕌 {mockMosque.name}
                </h1>
                {mockMosque.isVerified && (
                  <BadgeCheck className="text-emerald-300" size={28} />
                )}
              </div>
              {mockMosque.nameUrdu && (
                <p className="text-emerald-200 text-xl mb-2 font-light" dir="rtl">
                  {mockMosque.nameUrdu}
                </p>
              )}
              <div className="flex items-center gap-3 text-emerald-200 text-sm flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {mockMosque.address}, {mockMosque.city}, {mockMosque.state} - {mockMosque.pinCode}
                </span>
                <Badge variant="info">Trust</Badge>
              </div>
            </div>

            {/* Transparency Score */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 text-center border border-white/20">
              <p className="text-emerald-200 text-xs uppercase tracking-wide mb-1">
                Transparency Score
              </p>
              <p className="text-4xl font-bold text-white">
                {mockMosque.transparencyScore}
                <span className="text-lg text-emerald-200">/100</span>
              </p>
              <div className="w-32 h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${getScoreBgColor(mockMosque.transparencyScore)}`}
                  style={{ width: `${mockMosque.transparencyScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="pb-12">
          {/* ===== OVERVIEW TAB ===== */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* About */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{mockMosque.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400">Capacity</p>
                    <p className="text-lg font-bold text-gray-900">{mockMosque.capacity}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400">Built</p>
                    <p className="text-lg font-bold text-gray-900">{mockMosque.constructionYear}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400">Type</p>
                    <p className="text-lg font-bold text-gray-900">Trust</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400">Staff</p>
                    <p className="text-lg font-bold text-gray-900">{mockStaff.length}</p>
                  </div>
                </div>

                {/* Interactive Map */}
                <div className="mt-6">
                  <MosqueMap
                    latitude={mockMosque.latitude}
                    longitude={mockMosque.longitude}
                    name={mockMosque.name}
                    address={`${mockMosque.address}, ${mockMosque.city}`}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Mutawalli Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users size={20} className="text-emerald-600" />
                    Mutawalli (Trustee)
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Name</p>
                      <p className="font-semibold text-gray-900">{mockMutawalli.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-gray-400" />
                      <p className="text-sm text-gray-700">{mockMutawalli.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-gray-400" />
                      <p className="text-sm text-gray-700">{mockMutawalli.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      <p className="text-sm text-gray-700">
                        Since {formatDate(mockMutawalli.sinceDate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bank Account Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Wallet size={20} className="text-emerald-600" />
                    Bank Account
                    {mockBankAccount.isVerified && (
                      <Badge variant="success">Verified</Badge>
                    )}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bank</span>
                      <span className="font-medium text-gray-900">{mockBankAccount.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account</span>
                      <span className="font-mono text-gray-900">{mockBankAccount.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">IFSC</span>
                      <span className="font-mono text-gray-900">{mockBankAccount.ifscCode}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">UPI</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-emerald-700">{mockBankAccount.upiId}</span>
                        <button onClick={copyUPI} className="text-emerald-600 hover:text-emerald-700">
                          {copiedUPI ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== FINANCES TAB ===== */}
          {activeTab === 'finances' && (
            <div className="space-y-6">
              <FinancialSummary
                totalIncome={1250000}
                totalExpenses={980000}
                balance={270000}
                totalDonations={1050000}
              />

              {/* Financial Charts */}
              <FinancialCharts />

              {/* Expenses Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Recent Expenses</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {mockExpenses.map((exp) => (
                        <tr key={exp.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-gray-500">{formatDate(exp.expenseDate)}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${categoryColors[exp.category] || 'bg-gray-100'}`}>
                              {exp.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-700">{exp.description}</td>
                          <td className="px-6 py-4 font-bold text-gray-900">{formatCurrency(exp.amount)}</td>
                          <td className="px-6 py-4">
                            <Badge variant={exp.isPaid ? 'success' : 'danger'}>
                              {exp.isPaid ? 'Paid' : 'Unpaid'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            {exp.receiptUrl ? (
                              <a href={exp.receiptUrl} className="text-emerald-600 hover:underline flex items-center gap-1">
                                <FileText size={14} /> View
                              </a>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bills Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Utility Bills</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {mockBills.map((bill) => (
                    <div key={bill.id} className="px-6 py-4 flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        {billStatusIcon[bill.status as keyof typeof billStatusIcon]}
                        <div>
                          <p className="font-medium text-gray-900">{bill.billType} Bill</p>
                          <p className="text-xs text-gray-400">
                            Due: {formatDate(bill.dueDate)}
                            {bill.paidDate && ` • Paid: ${formatDate(bill.paidDate)}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900">{formatCurrency(bill.amount)}</span>
                        <Badge
                          variant={
                            bill.status === 'PAID' ? 'success' : bill.status === 'OVERDUE' ? 'danger' : 'warning'
                          }
                        >
                          {bill.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Income Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Income Sources</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {mockIncomes.map((inc) => (
                        <tr key={inc.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-gray-500">{formatDate(inc.incomeDate)}</td>
                          <td className="px-6 py-4">
                            <Badge variant="info">{inc.source}</Badge>
                          </td>
                          <td className="px-6 py-4 text-gray-700">{inc.description}</td>
                          <td className="px-6 py-4 font-bold text-green-700">{formatCurrency(inc.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===== STAFF & SALARY TAB ===== */}
          {activeTab === 'staff' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Mosque Staff & Salary Records
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Imam, Muazzin aur staff ki profile, unki salary amount, payment status (paid/unpaid),
                  aur payment proof — sab kuch yahan dekhein.
                </p>

                {/* Staff Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-emerald-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-emerald-600">Total Staff</p>
                    <p className="text-2xl font-bold text-emerald-800">{mockStaff.length}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-blue-600">Monthly Salary Total</p>
                    <p className="text-2xl font-bold text-blue-800">
                      {formatCurrency(mockStaff.reduce((sum, s) => sum + s.monthlySalary, 0))}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-green-600">This Month Paid</p>
                    <p className="text-2xl font-bold text-green-800">
                      {mockStaff.filter((s) => s.recentPayments[0]?.status === 'PAID').length}/{mockStaff.length}
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-red-600">Pending Salaries</p>
                    <p className="text-2xl font-bold text-red-800">
                      {mockStaff.filter((s) => s.recentPayments[0]?.status !== 'PAID').length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Staff Cards */}
              <div className="space-y-4">
                {mockStaff.map((staff) => (
                  <StaffCard key={staff.id} {...staff} />
                ))}
              </div>
            </div>
          )}

          {/* ===== PROPERTIES TAB ===== */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Masjid Properties & Land
                </h2>
                <p className="text-gray-500 text-sm">
                  Masjid se judi tamam zameen aur jaydaad ki jankari
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Building2 className="text-emerald-600" size={20} />
                      <Badge variant="info">{prop.type}</Badge>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-400">Area</span>
                        <p className="font-semibold text-gray-900">
                          {prop.area} {prop.areaUnit}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Location</span>
                        <p className="font-semibold text-gray-900">{prop.location}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Legal Status</span>
                        <p className="font-semibold text-gray-900">{prop.legalStatus}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Monthly Income</span>
                        <p className="font-bold text-emerald-700">
                          {prop.monthlyIncome > 0 ? formatCurrency(prop.monthlyIncome) : 'No income'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== DONATE TAB ===== */}
          {activeTab === 'donate' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Donation Form */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  💰 Donate to {mockMosque.name}
                </h2>

                {/* Bank Details */}
                <div className="bg-emerald-50 rounded-xl p-5 mb-6 border border-emerald-100">
                  <h3 className="font-bold text-emerald-800 mb-3">Bank Account Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-emerald-600">Bank</span>
                      <span className="font-semibold text-emerald-900">{mockBankAccount.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-600">Account No.</span>
                      <span className="font-mono font-semibold text-emerald-900">{mockBankAccount.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-600">IFSC Code</span>
                      <span className="font-mono font-semibold text-emerald-900">{mockBankAccount.ifscCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-600">Account Holder</span>
                      <span className="font-semibold text-emerald-900">{mockBankAccount.accountHolderName}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-emerald-200">
                      <span className="text-emerald-600">UPI ID</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-900">{mockBankAccount.upiId}</span>
                        <button onClick={copyUPI} className="text-emerald-700 hover:text-emerald-800">
                          {copiedUPI ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-200 mb-6">
                  <p className="text-4xl mb-2">📱</p>
                  <p className="text-gray-500 text-sm">QR Code for UPI Payment</p>
                  <p className="text-xs text-gray-400 mt-1">Scan with any UPI app to donate</p>
                </div>

                {/* Donation Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    />
                    <div className="flex gap-2 mt-2">
                      {[500, 1000, 5000, 10000].map((amt) => (
                        <button
                          key={amt}
                          className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-sm font-medium hover:bg-emerald-100 transition-colors"
                        >
                          ₹{amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Anonymous donation"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message (optional)
                    </label>
                    <textarea
                      placeholder="Your message..."
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none resize-y"
                    />
                  </div>
                  <Button size="lg" className="w-full">
                    Donate Now
                  </Button>
                </div>
              </div>

              {/* Recent Donors */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Donors</h3>
                <div className="space-y-3">
                  {mockDonations.map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                          {donation.isAnonymous ? '?' : donation.donorName?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {donation.isAnonymous ? 'Anonymous Donor' : donation.donorName}
                          </p>
                          <p className="text-xs text-gray-400">{formatDate(donation.donatedAt)}</p>
                        </div>
                      </div>
                      <p className="font-bold text-emerald-700">{formatCurrency(donation.amount)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
