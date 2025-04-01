import { NextRequest, NextResponse } from 'next/server';

import { deletePost, getPost } from '@/lib/queries/posts';

export type PostRequetsParams = {
  params: {
    id: number;
  };
};

export async function GET(
  _request: NextRequest,
  { params }: PostRequetsParams
) {
  try {
    const { id } = await params;

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Post id is required' },
        { status: 400 }
      );
    }

    const postList = await getPost(id);

    return NextResponse.json(postList, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching posts: ', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: PostRequetsParams
) {
  try {
    const { id } = await params;

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Post id is required.' },
        { status: 400 }
      );
    }

    const postResponse = await deletePost(id);

    return NextResponse.json(postResponse, { status: 200 });
  } catch (error: unknown) {
    console.error('Error deleting posts: ', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
