import { NextRequest, NextResponse } from 'next/server';

// POST /api/volunteer - Register new volunteer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    if (!body.name || !body.email || !body.phone || !body.password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, phone, and password are required' },
        { status: 400 }
      );
    }

    if (body.password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // In production, hash password and save to DB via Prisma
    const volunteer = {
      id: `vol-${Date.now()}`,
      name: body.name,
      email: body.email,
      phone: body.phone,
      area: body.area,
      city: body.city,
      state: body.state,
      role: 'VOLUNTEER',
      isVerified: false,
      level: 'NEW',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: volunteer, message: 'Volunteer registered successfully' },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
