import { prisma } from '@/shared/lib/prisma';
import { CommentCard } from '@/entities/comment/ui/CommentCard';
import { CommentForm } from '../create/ui/CommentForm';
import { DeleteCommentButton } from '../delete/ui/DeleteCommentButton';
import { auth } from '@/shared/lib/auth';

interface CommentSectionProps {
  postId: string;
}

export async function CommentSection({ postId }: CommentSectionProps) {
  const session = await auth();

  const comments = await prisma.comment.findMany({
    where: {
      postId,
      parentId: null,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          nickname: true,
          profile: true,
          image: true,
        },
      },
      replies: {
        where: { deletedAt: null },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              nickname: true,
              profile: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // 삭제됐고 대댓글도 없는 댓글은 카운트에서 제외
  const visibleCount = comments.filter(
    (c) => !c.deletedAt || (c.replies && c.replies.length > 0)
  ).length;

  const isAdmin = session?.user.role === 'admin';

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">댓글 {visibleCount}개</h2>

      <CommentForm postId={postId} />

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            isAdmin={isAdmin}
            deleteSlot={(commentId) => (
              <DeleteCommentButton commentId={commentId} />
            )}
            comment={{
              ...comment,
              user: {
                ...comment.user,
                nickname:
                  comment.user.nickname || comment.user.name || 'Anonymous',
                profile: comment.user.profile || comment.user.image || '',
              },
              replies: comment.replies?.map((reply) => ({
                ...reply,
                user: {
                  ...reply.user,
                  nickname:
                    reply.user.nickname || reply.user.name || 'Anonymous',
                  profile: reply.user.profile || reply.user.image || '',
                },
              })),
            }}
            currentUserId={session?.user.id}
          />
        ))}
      </div>
    </div>
  );
}
