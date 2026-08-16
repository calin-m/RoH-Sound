import { NextResponse } from 'next/server';
import { mockProductData } from '@/mocks/handlers';

export async function GET() {
  return NextResponse.json(mockProductData);
}
