import { NextRequest, NextResponse } from 'next/server';

// Mock mosque data
const mosques = [
  { id: 'masjid-1', name: 'Jama Masjid Al-Falah', city: 'Lucknow', state: 'Uttar Pradesh', pinCode: '226001', type: 'TRUST', transparencyScore: 85, isVerified: true },
  { id: 'masjid-2', name: 'Masjid-e-Noor', city: 'Delhi', state: 'Delhi', pinCode: '110006', type: 'WAQF_BOARD', transparencyScore: 72, isVerified: true },
  { id: 'masjid-3', name: 'Bilal Masjid', city: 'Mumbai', state: 'Maharashtra', pinCode: '400001', type: 'COMMITTEE', transparencyScore: 60, isVerified: false },
  { id: 'masjid-4', name: 'Masjid Al-Huda', city: 'Hyderabad', state: 'Telangana', pinCode: '500001', type: 'PRIVATE', transparencyScore: 45, isVerified: false },
  { id: 'masjid-5', name: 'Masjid-e-Ibrahim', city: 'Bhopal', state: 'Madhya Pradesh', pinCode: '462001', type: 'TRUST', transparencyScore: 92, isVerified: true },
  { id: 'masjid-6', name: 'Madina Masjid', city: 'Bangalore', state: 'Karnataka', pinCode: '560001', type: 'WAQF_BOARD', transparencyScore: 78, isVerified: true },
];

// GET /api/masjid - List mosques with search/filter
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.toLowerCase();
  const city = searchParams.get('city')?.toLowerCase();
  const state = searchParams.get('state')?.toLowerCase();
  const type = searchParams.get('type');
  const pinCode = searchParams.get('pinCode');

  let filtered = [...mosques];

  if (query) {
    filtered = filtered.filter(
      (m) => m.name.toLowerCase().includes(query) || m.city.toLowerCase().includes(query)
    );
  }
  if (city) {
    filtered = filtered.filter((m) => m.city.toLowerCase().includes(city));
  }
  if (state) {
    filtered = filtered.filter((m) => m.state.toLowerCase().includes(state));
  }
  if (type) {
    filtered = filtered.filter((m) => m.type === type);
  }
  if (pinCode) {
    filtered = filtered.filter((m) => m.pinCode === pinCode);
  }

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
    message: `Found ${filtered.length} mosques`,
  });
}

// POST /api/masjid - Register new mosque
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.city || !body.state || !body.address) {
      return NextResponse.json(
        { success: false, error: 'Name, city, state, and address are required' },
        { status: 400 }
      );
    }

    // In production, save to database via Prisma
    const newMosque = {
      id: `masjid-${Date.now()}`,
      ...body,
      transparencyScore: 0,
      isVerified: false,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: newMosque, message: 'Mosque registered successfully' },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
