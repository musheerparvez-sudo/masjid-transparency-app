import { NextRequest, NextResponse } from 'next/server';

const mockBills = [
  { id: 'b1', billType: 'ELECTRICITY', amount: 4500, billDate: '2026-08-01', dueDate: '2026-08-20', status: 'UNPAID' },
  { id: 'b2', billType: 'WATER', amount: 1200, billDate: '2026-08-01', dueDate: '2026-08-15', status: 'PAID', paidDate: '2026-08-10' },
  { id: 'b3', billType: 'GAS', amount: 800, billDate: '2026-07-01', dueDate: '2026-07-20', status: 'OVERDUE' },
  { id: 'b4', billType: 'INTERNET', amount: 700, billDate: '2026-08-01', dueDate: '2026-08-25', status: 'UNPAID' },
  { id: 'b5', billType: 'ELECTRICITY', amount: 4200, billDate: '2026-07-01', dueDate: '2026-07-20', status: 'PAID', paidDate: '2026-07-18' },
];

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true, data: mockBills, total: mockBills.length });
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    if (!body.billType || !body.amount || !body.dueDate) {
      return NextResponse.json({ success: false, error: 'Bill type, amount, and due date are required' }, { status: 400 });
    }
    const newBill = { id: `b-${Date.now()}`, mosqueId: params.id, status: 'UNPAID', ...body, createdAt: new Date().toISOString() };
    return NextResponse.json({ success: true, data: newBill, message: 'Bill added successfully' }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
}
