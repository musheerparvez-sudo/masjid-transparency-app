import { NextRequest, NextResponse } from 'next/server';

// GET /api/masjid/[id]/salary - Get salary payments
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const payments = [
    { id: 'p1', staffId: 'staff-1', staffName: 'Maulana Abdul Qadir', role: 'IMAM', month: 8, year: 2026, amount: 18000, status: 'PAID', paymentDate: '2026-08-05', paymentMethod: 'BANK_TRANSFER' },
    { id: 'p2', staffId: 'staff-1', staffName: 'Maulana Abdul Qadir', role: 'IMAM', month: 7, year: 2026, amount: 18000, status: 'PAID', paymentDate: '2026-07-03', paymentMethod: 'BANK_TRANSFER' },
    { id: 'p3', staffId: 'staff-2', staffName: 'Bilal Ahmad', role: 'MUAZZIN', month: 8, year: 2026, amount: 12000, status: 'PAID', paymentDate: '2026-08-05', paymentMethod: 'UPI' },
    { id: 'p4', staffId: 'staff-2', staffName: 'Bilal Ahmad', role: 'MUAZZIN', month: 7, year: 2026, amount: 12000, status: 'UNPAID' },
  ];

  return NextResponse.json({ success: true, data: payments });
}

// POST /api/masjid/[id]/salary - Record salary payment
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    if (!body.staffId || !body.amount || !body.month || !body.year) {
      return NextResponse.json(
        { success: false, error: 'staffId, amount, month, and year are required' },
        { status: 400 }
      );
    }

    const payment = {
      id: `payment-${Date.now()}`,
      mosqueId: params.id,
      ...body,
      status: body.status || 'PAID',
      paymentDate: body.paymentDate || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: payment, message: 'Salary payment recorded' },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
