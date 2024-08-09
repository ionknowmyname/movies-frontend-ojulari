import { NextRequest, NextResponse } from 'next/server';
import { getMovies, addMovie, editMovie } from '@/services/moviesApi';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const page = req.nextUrl.searchParams.get('page') ?? '1';
  const limit = req.nextUrl.searchParams.get('limit') ?? '10';

  try {
    const response = await getMovies(page, limit, token);
    if (response.statusCode !== 200)
      return NextResponse.json({ message: response.message }, { status: response.statusCode });

    return NextResponse.json({ ...response.data });
  } catch (error) {
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await req.formData();
    const response = await addMovie(formData, token);

    if (response.statusCode !== 201) {
      return NextResponse.json({ message: response.message }, { status: response.statusCode });
    }

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await req.formData();
    const response = await editMovie(formData, token);

    if (response.statusCode !== 200) {
      return NextResponse.json({ message: response.message }, { status: response.statusCode });
    }

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}
