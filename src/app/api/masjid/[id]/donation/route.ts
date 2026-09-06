import { NextRequest, NextResponse } from 'next/server';

const mockDonations = [
  { id: 'd1', donorName: 'Ahmad Khan', amount: 50000, isAnonymous: false, method: 'BANK_TRANSFER', message: 'For masjid renovation', donatedAt: '2026-08-15' },
  { id: 'd2', donorName: null, amount: 25000, isAnonymous: true, method: 'UPI', donatedAt: '2026-08-10' },
  { id: 'd3', donorName: 'Fatima Begum', amount: 10000, isAnonymous: false, method: 'CASH', message: 'Monthly chanda', donatedAt: '2026-08-05' },
  { id: 'd4', donorName: null, amount: 100000, isAnonymous: true, method: 'BANK_TRANSFER', donatedAt: '2026-07-28' },
  { id: 'd5', donorName: 'Dr. Yusuf Ali', amount: 30000, isAnonymous: false, method: 'UPI', message: 'Eid donation', donatedAt: '2026-07-20' },
  { id: 'd6', donorName: 'Mohd. Irfan', amount: 5000, isAnonymous: false, method: 'CASH', donatedAt: '2026-07-15' },
];

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true, data: mockDonations, total: mockDonations.length });
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    if (!body.amount) {
      return NextResponse.json({ success: false, error: 'Donation amount is required' }, { status: 400 });
    }
    const newDonation = {
      id: `d-${Date.now()}`, mosqueId: params.id, isAnonymous: body.isAnonymous || false,
      method: body.method || 'CASH', donatedAt: new Date().toISOString(), ...body,
    };
    return NextResponse.json({ success: true, data: newDonation, message: 'Donation recorded. JazakAllah Khair!' }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
}
