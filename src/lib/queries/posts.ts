import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { posts } from '@/db/schema/posts';

export type Post = {
  id: number;
  content: string;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export async function getPost(postId?: number): Promise<Post[] | Post> {
  let postList: Post[];

  if (postId) {
    postList = await db.select().from(posts).where(eq(posts.id, postId));
  } else {
    postList = await db.select().from(posts).limit(10);
  }

  return postId ? postList[0] : postList;
}

export async function createPost(postData: Post) {
  const response = await db.insert(posts).values(postData).returning();

  return response;
}

export async function updatePost(postData: Post) {
  const response = await db
    .update(posts)
    .set(postData)
    .where(eq(posts.id, postData.id))
    .returning();

  return response;
}

export async function deletePost(postId: number) {
  const response = await db.delete(posts).where(eq(posts.id, postId));

  return response;
}
