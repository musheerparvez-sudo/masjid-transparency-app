import { NextRequest, NextResponse } from 'next/server';

// GET /api/masjid/[id] - Get mosque details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Mock response — in production, fetch from DB via Prisma
  const mosque = {
    id,
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
    description: 'Jama Masjid Al-Falah ek mashhoor masjid hai.',
    createdAt: '2024-01-15T00:00:00.000Z',
  };

  return NextResponse.json({ success: true, data: mosque });
}

// PUT /api/masjid/[id] - Update mosque info
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // In production, update in DB via Prisma
    return NextResponse.json({
      success: true,
      data: { id: params.id, ...body },
      message: 'Mosque updated successfully',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
