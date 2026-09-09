import { NextRequest, NextResponse } from 'next/server';

const VALID_USERNAME = 'mercury-admin';
const VALID_PASSWORD = 'Mercury@2024!Secure';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password required' },
        { status: 400 }
      );
    }

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      const token = Buffer.from(username + ':' + password).toString('base64');
      return NextResponse.json({
        success: true,
        token,
        expiresIn: 1800, // 30 minutes
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
