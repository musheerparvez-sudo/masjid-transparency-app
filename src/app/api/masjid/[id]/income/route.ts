import { NextRequest, NextResponse } from 'next/server';

const mockIncomes = [
  { id: 'i1', source: 'DONATION', amount: 150000, description: 'Monthly donations — August', incomeDate: '2026-08-01' },
  { id: 'i2', source: 'RENTAL', amount: 25000, description: 'Shop rent — Ground floor', incomeDate: '2026-08-01' },
  { id: 'i3', source: 'DONATION', amount: 50000, description: 'Eid special donation drive', incomeDate: '2026-07-15' },
  { id: 'i4', source: 'LAND', amount: 15000, description: 'Agricultural land income', incomeDate: '2026-07-01' },
  { id: 'i5', source: 'GOVERNMENT_AID', amount: 30000, description: 'Waqf Board annual grant', incomeDate: '2026-06-01' },
  { id: 'i6', source: 'TRUST_FUND', amount: 20000, description: 'Trust fund returns', incomeDate: '2026-05-15' },
];

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true, data: mockIncomes, total: mockIncomes.length });
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    if (!body.source || !body.amount || !body.description) {
      return NextResponse.json({ success: false, error: 'Source, amount, and description are required' }, { status: 400 });
    }
    const newIncome = { id: `i-${Date.now()}`, mosqueId: params.id, ...body, createdAt: new Date().toISOString() };
    return NextResponse.json({ success: true, data: newIncome, message: 'Income recorded successfully' }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
}
