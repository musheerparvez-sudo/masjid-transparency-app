import { NextRequest, NextResponse } from 'next/server';

const mockProperties = [
  { id: 'pr1', type: 'SHOP', area: 250, areaUnit: 'SQFT', location: 'Ground floor, main road side', legalStatus: 'Trust registered', monthlyIncome: 25000 },
  { id: 'pr2', type: 'AGRICULTURAL', area: 2, areaUnit: 'ACRE', location: 'Village Khatoli, 5km from masjid', legalStatus: 'Waqf property', monthlyIncome: 15000 },
  { id: 'pr3', type: 'HALL', area: 1500, areaUnit: 'SQFT', location: 'First floor, masjid compound', legalStatus: 'Trust registered', monthlyIncome: 0, description: 'Community hall for events' },
  { id: 'pr4', type: 'LAND', area: 1, areaUnit: 'ACRE', location: 'Behind masjid, graveyard road', legalStatus: 'Waqf registered', monthlyIncome: 0, description: 'Reserved for expansion' },
];

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true, data: mockProperties, total: mockProperties.length });
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    if (!body.type || !body.area || !body.location) {
      return NextResponse.json({ success: false, error: 'Type, area, and location are required' }, { status: 400 });
    }
    const newProperty = { id: `pr-${Date.now()}`, mosqueId: params.id, monthlyIncome: 0, ...body, createdAt: new Date().toISOString() };
    return NextResponse.json({ success: true, data: newProperty, message: 'Property added successfully' }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
}
