'use server';

import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { revalidatePath } from 'next/cache';

type ActionResult = { success: true } | { success: false; error: string };

export async function deleteComment(commentId: number): Promise<ActionResult> {
  const session = await auth();

  if (!session) {
    return { success: false, error: '로그인이 필요합니다.' };
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return { success: false, error: '댓글을 찾을 수 없습니다.' };
    }

    if (comment.deletedAt) {
      return { success: false, error: '이미 삭제된 댓글입니다.' };
    }

    const isOwner = comment.userId === session.user.id;
    const isAdmin = session.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return { success: false, error: '삭제 권한이 없습니다.' };
    }

    await prisma.comment.update({
      where: { id: commentId },
      data: {
        deletedAt: new Date(),
        deleteUser: session.user.id,
      },
    });

    revalidatePath(`/posts/${comment.postId}`);

    return { success: true };
  } catch {
    return { success: false, error: '댓글 삭제 중 오류가 발생했습니다.' };
  }
}
