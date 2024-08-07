import { NextResponse } from 'next/server';
import sql from '@/lib/db'; // Make sure this path is correct for your project

export async function GET() {
  try {
    const items = await sql`SELECT * FROM inventory`;
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json({ error: 'Error fetching inventory' }, { status: 500 });
  }
}