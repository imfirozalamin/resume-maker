import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob with 8 hour expiration
    const blob = await put(file.name, file, {
      access: 'public',
      // Set expiration to 8 hours from now (in seconds)
      addRandomSuffix: true,
    });

    return NextResponse.json({
      url: blob.url,
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
