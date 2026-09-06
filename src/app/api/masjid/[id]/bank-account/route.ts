import { NextRequest, NextResponse } from 'next/server';

const mockBankAccount = {
  id: 'ba1',
  bankName: 'State Bank of India',
  accountNumber: '1234567890123',
  ifscCode: 'SBIN0001234',
  accountHolderName: 'Jama Masjid Al-Falah Trust',
  upiId: 'masjidfalah@sbi',
  qrCodeUrl: null,
  isVerified: true,
};

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true, data: mockBankAccount });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    if (!body.bankName || !body.accountNumber || !body.ifscCode) {
      return NextResponse.json({ success: false, error: 'Bank name, account number, and IFSC code are required' }, { status: 400 });
    }
    const updated = { ...mockBankAccount, ...body, mosqueId: params.id };
    return NextResponse.json({ success: true, data: updated, message: 'Bank account updated successfully' });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
}
