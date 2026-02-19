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

  const project = await prisma.project.update({
    where: { id: parseInt(id) },
    data: {
      name: body.name,
      desc: body.desc,
      updateUser: session.user.id,
    },
  });

  revalidateTag('projects', 'max');

  return NextResponse.json(project);
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

  await prisma.project.update({
    where: { id: parseInt(id) },
    data: {
      deletedAt: new Date(),
      deleteUser: session.user.id,
    },
  });

  revalidateTag('projects', 'max');

  return NextResponse.json({ success: true });
}
