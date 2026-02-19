import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { auth } from '../../../../../auth';
import { prisma } from '@/shared/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const series = await prisma.series.update({
    where: { id: parseInt(id) },
    data: {
      title: body.title,
      description: body.description,
      updateUser: session.user.id,
    },
  });

  revalidateTag('posts', 'max');

  return NextResponse.json(series);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  await prisma.series.update({
    where: { id: parseInt(id) },
    data: {
      deletedAt: new Date(),
      deleteUser: session.user.id,
    },
  });

  revalidateTag('posts', 'max');

  return NextResponse.json({ success: true });
}
