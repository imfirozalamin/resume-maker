import { list, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Verify this is a cron job request (optional security measure)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // If CRON_SECRET is not set, allow the request (for manual testing)
      if (process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // List all blobs
    const { blobs } = await list();
    
    const now = new Date();
    const eightHoursAgo = new Date(now.getTime() - 8 * 60 * 60 * 1000);
    
    let deletedCount = 0;
    const deletionPromises = [];

    // Delete blobs older than 8 hours
    for (const blob of blobs) {
      const uploadedAt = new Date(blob.uploadedAt);
      
      if (uploadedAt < eightHoursAgo) {
        deletionPromises.push(
          del(blob.url).then(() => {
            deletedCount++;
            console.log(`Deleted blob: ${blob.pathname}`);
          }).catch(err => {
            console.error(`Failed to delete blob ${blob.pathname}:`, err);
          })
        );
      }
    }

    await Promise.all(deletionPromises);

    return NextResponse.json({
      success: true,
      message: `Cleaned up ${deletedCount} old images`,
      deletedCount,
      totalBlobs: blobs.length,
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { error: 'Failed to cleanup old images' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
