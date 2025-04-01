import { NextRequest, NextResponse } from 'next/server';

import { createPost, getPost, Post, updatePost } from '@/lib/queries/posts';

export async function GET() {
  try {
    const postList = await getPost();

    return NextResponse.json(postList, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching posts: ', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Post content is required.' },
        { status: 400 }
      );
    }

    const postData = {
      content,
      imageUrl: '',
      isActive: true
    } as Post;

    const postResponse = await createPost(postData);

    return NextResponse.json(postResponse, { status: 200 });
  } catch (error: unknown) {
    console.error('Error creating posts: ', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, content } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Post id is required.' },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        { error: 'Post content is required.' },
        { status: 400 }
      );
    }

    const postData = {
      id,
      content,
      imageUrl: '',
      isActive: true
    } as Post;

    const postResponse = await updatePost(postData);

    return NextResponse.json(postResponse, { status: 200 });
  } catch (error: unknown) {
    console.error('Error updating posts: ', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
