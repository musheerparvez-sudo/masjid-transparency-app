import { NextRequest, NextResponse } from 'next/server';

const mockExpenses = [
  { id: 'e1', category: 'SALARY', amount: 38000, description: 'Staff salaries - August 2026', expenseDate: '2026-08-05', isPaid: true, receiptUrl: '#' },
  { id: 'e2', category: 'UTILITIES', amount: 4500, description: 'Electricity bill - July 2026', expenseDate: '2026-07-15', isPaid: true, receiptUrl: '#' },
  { id: 'e3', category: 'MAINTENANCE', amount: 15000, description: 'Wuzu khana repair', expenseDate: '2026-07-20', isPaid: true },
  { id: 'e4', category: 'UTILITIES', amount: 1200, description: 'Water bill - July 2026', expenseDate: '2026-07-10', isPaid: true, receiptUrl: '#' },
  { id: 'e5', category: 'MISCELLANEOUS', amount: 3500, description: 'Cleaning supplies aur janamaz', expenseDate: '2026-07-25', isPaid: false },
  { id: 'e6', category: 'EVENTS', amount: 12000, description: 'Eid Milad-un-Nabi program', expenseDate: '2026-06-15', isPaid: true },
  { id: 'e7', category: 'CONSTRUCTION', amount: 50000, description: 'Boundary wall extension', expenseDate: '2026-05-10', isPaid: true, receiptUrl: '#' },
];

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true, data: mockExpenses, total: mockExpenses.length });
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    if (!body.category || !body.amount || !body.description) {
      return NextResponse.json({ success: false, error: 'Category, amount, and description are required' }, { status: 400 });
    }
    const newExpense = { id: `e-${Date.now()}`, mosqueId: params.id, ...body, createdAt: new Date().toISOString() };
    return NextResponse.json({ success: true, data: newExpense, message: 'Expense recorded successfully' }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
}
