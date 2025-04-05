import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { posts } from '@/db/schema/posts';

import { getPost, createPost, updatePost, deletePost, Post } from './posts';

jest.mock('@/db', () => ({
  db: {
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis()
  }
}));

describe('Given Post Service', () => {
  const mockPost: Post = {
    id: 1,
    content: 'Test post',
    imageUrl: 'https://example.com/image.jpg',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all posts when no ID is provided', async () => {
    (db.select().from(posts).limit as jest.Mock).mockResolvedValue([mockPost]);

    const result = await getPost();
    expect(db.select).toHaveBeenCalled();
    expect((db as any).from).toHaveBeenCalledWith(posts);
    expect((db as any).limit).toHaveBeenCalledWith(10);
    expect(result).toEqual([mockPost]);
  });

  it('should fetch a single post when ID is provided', async () => {
    (db.select().from(posts).where as jest.Mock).mockResolvedValue([mockPost]);

    const result = await getPost(1);
    expect(db.select).toHaveBeenCalled();
    expect((db as any).from).toHaveBeenCalledWith(posts);
    expect((db as any).where).toHaveBeenCalledWith(eq(posts.id, 1));
    expect(result).toEqual(mockPost);
  });

  it('should create a post', async () => {
    (
      db.insert(posts).values(mockPost).returning as jest.Mock
    ).mockResolvedValue([mockPost]);

    const result = await createPost(mockPost);
    expect(db.insert).toHaveBeenCalledWith(posts);
    expect((db as any).values).toHaveBeenCalledWith(mockPost);
    expect((db as any).returning).toHaveBeenCalled();
    expect(result).toEqual([mockPost]);
  });

  it('should update a post', async () => {
    (db.update as jest.Mock).mockReturnThis();
    ((db as any).set as jest.Mock).mockReturnThis();
    ((db as any).where as jest.Mock).mockReturnThis();
    ((db as any).returning as jest.Mock).mockResolvedValue([mockPost]);

    (
      db.update(posts).set(mockPost).where(eq(posts.id, mockPost.id))
        .returning as jest.Mock
    ).mockResolvedValue([mockPost]);

    const result = await updatePost(mockPost);

    expect(db.update).toHaveBeenCalledWith(posts);
    expect((db as any).set).toHaveBeenCalledWith(mockPost);
    expect((db as any).where).toHaveBeenCalledWith(eq(posts.id, mockPost.id));
    expect((db as any).returning).toHaveBeenCalled();
    expect(result).toEqual([mockPost]);
  });

  it('should delete a post', async () => {
    (db.delete(posts).where as jest.Mock).mockResolvedValue(1);

    const result = await deletePost(1);
    expect(db.delete).toHaveBeenCalledWith(posts);
    expect((db as any).where).toHaveBeenCalledWith(eq(posts.id, 1));
    expect(result).toBe(1);
  });
});
