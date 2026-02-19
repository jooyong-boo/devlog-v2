'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { deletePost } from '@/features/post/create/api/actions';
import Link from 'next/link';

interface PostActionsProps {
  postId: string;
}

export function PostActions({ postId }: PostActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    const result = await deletePost(postId);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="flex gap-2">
      <Link href={`/admin/posts/${postId}/edit`}>
        <Button variant="outline" size="sm">
          수정
        </Button>
      </Link>
      <Button variant="danger" size="sm" onClick={handleDelete}>
        삭제
      </Button>
    </div>
  );
}
