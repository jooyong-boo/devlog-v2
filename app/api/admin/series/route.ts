import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { auth } from '../../../../auth';
import { prisma } from '@/shared/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const series = await prisma.series.findMany({
    where: { deletedAt: null },
    include: { _count: { select: { posts: true } } },
    orderBy: { sort: 'asc' },
  });

  return NextResponse.json(series);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, description } = await request.json();

  const series = await prisma.series.create({
    data: {
      title,
      description: description || null,
      createUser: session.user.id,
      updateUser: session.user.id,
    },
  });

  revalidateTag('posts', 'max');

  return NextResponse.json(series, { status: 201 });
}
