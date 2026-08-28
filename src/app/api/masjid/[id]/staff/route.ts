import { NextRequest, NextResponse } from 'next/server';

// GET /api/masjid/[id]/staff - List staff of a mosque
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const staff = [
    {
      id: 'staff-1', mosqueId: params.id, name: 'Maulana Abdul Qadir', role: 'IMAM',
      phone: '+91 98765 11111', qualification: 'Aalim, Fazil — Darul Uloom Deoband',
      experienceYears: 15, appointedDate: '2015-06-01', monthlySalary: 18000, isActive: true,
    },
    {
      id: 'staff-2', mosqueId: params.id, name: 'Bilal Ahmad', role: 'MUAZZIN',
      phone: '+91 98765 22222', qualification: 'Hafiz-e-Quran',
      experienceYears: 8, appointedDate: '2019-01-15', monthlySalary: 12000, isActive: true,
    },
  ];

  return NextResponse.json({ success: true, data: staff });
}

// POST /api/masjid/[id]/staff - Add new staff member
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    if (!body.name || !body.role || !body.monthlySalary) {
      return NextResponse.json(
        { success: false, error: 'Name, role, and monthly salary are required' },
        { status: 400 }
      );
    }

    const newStaff = {
      id: `staff-${Date.now()}`,
      mosqueId: params.id,
      ...body,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: newStaff, message: 'Staff member added successfully' },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
