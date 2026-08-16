import { NextResponse } from 'next/server';
import { mockReviewsData } from '@/mocks/handlers';

export async function GET() {
  return NextResponse.json(mockReviewsData);
}
