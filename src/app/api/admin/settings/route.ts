import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

const VALID_USERNAME = 'mercury-admin';
const VALID_PASSWORD = 'Mercury@2024!Secure';

function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.substring(7);
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [user, pass] = decoded.split(':');
    return user === VALID_USERNAME && pass === VALID_PASSWORD;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    message: 'Settings retrieved from client-side localStorage',
    note: 'Admin settings are managed client-side via Zustand persist middleware. This endpoint confirms auth status.',
  });
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const settings = await request.json();
    // In a production setup, settings would be saved to a database
    // For this implementation, settings are persisted client-side via localStorage
    return NextResponse.json({
      success: true,
      message: 'Settings received. Client-side persistence via Zustand is primary storage.',
      savedKeys: Object.keys(settings),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
