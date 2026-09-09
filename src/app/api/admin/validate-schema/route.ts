import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { schema } = body;

    if (!schema) {
      return NextResponse.json(
        { success: false, error: 'Schema object required' },
        { status: 400 }
      );
    }

    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic JSON-LD validation
    if (!schema['@context']) {
      errors.push('Missing @context property');
    } else if (schema['@context'] !== 'https://schema.org') {
      warnings.push('@context should be "https://schema.org"');
    }

    if (!schema['@type']) {
      errors.push('Missing @type property');
    }

    if (!schema.name && !schema.headline && !schema.title) {
      warnings.push('No name, headline, or title property found');
    }

    // Type-specific validation
    const type = schema['@type'];
    if (type === 'FAQPage') {
      if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
        errors.push('FAQPage requires mainEntity array');
      }
    } else if (type === 'HowTo') {
      if (!schema.step || !Array.isArray(schema.step)) {
        errors.push('HowTo requires step array');
      }
    } else if (type === 'Product') {
      if (!schema.name) {
        errors.push('Product requires name');
      }
    } else if (type === 'Article') {
      if (!schema.headline) {
        errors.push('Article requires headline');
      }
      if (!schema.author) {
        warnings.push('Article should have author');
      }
      if (!schema.datePublished) {
        warnings.push('Article should have datePublished');
      }
    } else if (type === 'Organization') {
      if (!schema.name) {
        errors.push('Organization requires name');
      }
    } else if (type === 'BreadcrumbList') {
      if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
        errors.push('BreadcrumbList requires itemListElement array');
      }
    }

    const isValid = errors.length === 0;

    return NextResponse.json({
      success: true,
      isValid,
      errors,
      warnings,
      type: type || 'unknown',
      propertyCount: Object.keys(schema).length,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON schema' },
      { status: 400 }
    );
  }
}
