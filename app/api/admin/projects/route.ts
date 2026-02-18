import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';
import { prisma } from '@/shared/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { deletedAt: null },
    include: { _count: { select: { posts: true } } },
    orderBy: { sort: 'asc' },
  });

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, desc } = await request.json();

  const project = await prisma.project.create({
    data: {
      name,
      desc: desc || '',
      createUser: session.user.id,
      updateUser: session.user.id,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
