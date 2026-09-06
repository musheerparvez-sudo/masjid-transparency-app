import { NextRequest, NextResponse } from 'next/server';

const mockMutawalli = {
  id: 'mt1',
  name: 'Haji Mohammad Iqbal',
  phone: '+91 98765 43210',
  email: 'haji.iqbal@email.com',
  address: '45, Purani Basti, Near Jama Masjid',
  sinceDate: '2018-03-15',
  photoUrl: null,
};

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true, data: mockMutawalli });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    if (!body.name || !body.phone) {
      return NextResponse.json({ success: false, error: 'Mutawalli name and phone are required' }, { status: 400 });
    }
    const updated = { ...mockMutawalli, ...body, mosqueId: params.id };
    return NextResponse.json({ success: true, data: updated, message: 'Mutawalli information updated' });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
}
