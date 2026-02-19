'use server';

import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';
import { createPostServerSchema } from '../model/schema';

export async function createPost(formData: FormData) {
  const session = await auth();

  if (!session || session.user.role !== 'admin') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const rawData = {
      title: formData.get('title'),
      content: formData.get('content'),
      thumbnail: formData.get('thumbnail') || '',
      projectId: formData.get('projectId'),
      seriesId: formData.get('seriesId') || undefined,
      tags: formData.get('tags') || '',
      status: formData.get('status') || 'draft',
    };

    const data = createPostServerSchema.parse(rawData);

    const tagNames = data.tags
      ? data.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const textContent = data.content.replace(/<[^>]*>/g, '');
    const readingTime = Math.max(
      1,
      Math.ceil(textContent.split(/\s+/).length / 200)
    );

    const post = await prisma.$transaction(async (tx) => {
      const newPost = await tx.post.create({
        data: {
          title: data.title,
          content: data.content,
          thumbnail: data.thumbnail,
          projectId: data.projectId,
          seriesId: data.seriesId,
          userId: session.user.id,
          status: data.status,
          readingTime,
          createUser: session.user.id,
          updateUser: session.user.id,
        },
      });

      for (const tagName of tagNames) {
        const tag = await tx.tag.upsert({
          where: { name: tagName },
          create: {
            name: tagName,
            createUser: session.user.id,
            updateUser: session.user.id,
          },
          update: {},
        });

        await tx.postTag.create({
          data: {
            postId: newPost.id,
            tagId: tag.id,
            createUser: session.user.id,
          },
        });
      }

      return newPost;
    });

    revalidatePath('/');
    revalidatePath('/admin/posts');
    revalidateTag('posts', 'max');

    return { success: true, postId: post.id };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error('Failed to create post:', error);
    return { success: false, error: 'Failed to create post' };
  }
}

export async function updatePost(postId: string, formData: FormData) {
  const session = await auth();

  if (!session || session.user.role !== 'admin') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const rawData = {
      title: formData.get('title'),
      content: formData.get('content'),
      thumbnail: formData.get('thumbnail') || '',
      projectId: formData.get('projectId'),
      seriesId: formData.get('seriesId') || undefined,
      tags: formData.get('tags') || '',
      status: formData.get('status') || 'draft',
    };

    const data = createPostServerSchema.parse(rawData);

    const tagNames = data.tags
      ? data.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const textContent = data.content.replace(/<[^>]*>/g, '');
    const readingTime = Math.max(
      1,
      Math.ceil(textContent.split(/\s+/).length / 200)
    );

    await prisma.$transaction(async (tx) => {
      await tx.post.update({
        where: { id: postId },
        data: {
          title: data.title,
          content: data.content,
          thumbnail: data.thumbnail,
          projectId: data.projectId,
          seriesId: data.seriesId ?? null,
          status: data.status,
          readingTime,
          updateUser: session.user.id,
        },
      });

      await tx.postTag.deleteMany({ where: { postId } });

      for (const tagName of tagNames) {
        const tag = await tx.tag.upsert({
          where: { name: tagName },
          create: {
            name: tagName,
            createUser: session.user.id,
            updateUser: session.user.id,
          },
          update: {},
        });

        await tx.postTag.create({
          data: {
            postId,
            tagId: tag.id,
            createUser: session.user.id,
          },
        });
      }
    });

    revalidatePath('/');
    revalidatePath('/admin/posts');
    revalidateTag('posts', 'max');

    return { success: true, postId };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error('Failed to update post:', error);
    return { success: false, error: 'Failed to update post' };
  }
}

export async function deletePost(postId: string) {
  const session = await auth();

  if (!session || session.user.role !== 'admin') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        deletedAt: new Date(),
        deleteUser: session.user.id,
      },
    });

    revalidatePath('/');
    revalidatePath('/admin/posts');
    revalidateTag('posts', 'max');

    return { success: true };
  } catch (error) {
    console.error('Failed to delete post:', error);
    return { success: false, error: 'Failed to delete post' };
  }
}
