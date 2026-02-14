import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.$transaction([
      prisma.post.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      }),
      prisma.viewTrend.upsert({
        where: {
          postId_viewDate: {
            postId: id,
            viewDate: today,
          },
        },
        create: {
          postId: id,
          viewCount: 1,
          viewDate: today,
          createUser: 'system',
          updateUser: 'system',
        },
        update: {
          viewCount: { increment: 1 },
          updateUser: 'system',
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
