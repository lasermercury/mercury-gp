import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(2000, 'Message must be 2000 characters or less'),
  locale: z.string().optional().default('en'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    // Try to save to database — gracefully degrade if DB is unavailable
    try {
      const { db } = await import('@/lib/db');
      await db.contactSubmission.create({
        data: { name, email, message, locale: parsed.data.locale },
      });
    } catch {
      // DB unavailable (e.g., serverless without persistent storage)
      // Submission still succeeds — log to console in production for monitoring
      console.log('[Contact Submission]', { name, email, locale: parsed.data.locale });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
