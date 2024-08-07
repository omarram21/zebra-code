import { NextResponse } from 'next/server';
import sql from '@/lib/db'; // Ensure this path is correct for your project

export async function GET() {
  try {
    const actions = await sql`SELECT * FROM inventory_actions ORDER BY date DESC`;
    return NextResponse.json(actions);
  } catch (error) {
    console.error('Error fetching inventory actions:', error);
    return NextResponse.json({ error: 'Error fetching inventory actions' }, { status: 500 });
  }
}