import { NextResponse } from 'next/server';
import sql from '@/lib/db'; // Adjust this import path as necessary

export async function GET() {
  try {
    const result = await sql`SELECT * FROM items`;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { barcode, item, brand, type, color, asset, serial, storeroom, minimum_qty } = await request.json();
    const newItem = await sql`
      INSERT INTO items (barcode, item, brand, type, color, asset, serial, storeroom, minimum_qty)
      VALUES (${barcode}, ${item}, ${brand}, ${type}, ${color}, ${asset}, ${serial}, ${storeroom}, ${minimum_qty})
      RETURNING *
    `;
    return NextResponse.json(newItem[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating item' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, barcode, item, brand, type, color, asset, serial, storeroom, minimum_qty } = await request.json();
    const updatedItem = await sql`
      UPDATE items
      SET barcode = ${barcode}, item = ${item}, brand = ${brand}, type = ${type}, 
          color = ${color}, asset = ${asset}, serial = ${serial}, 
          storeroom = ${storeroom}, minimum_qty = ${minimum_qty}
      WHERE id = ${id}
      RETURNING *
    `;
    if (updatedItem.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    } else {
      return NextResponse.json(updatedItem[0]);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error updating item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const deletedItem = await sql`
      DELETE FROM items
      WHERE id = ${id}
      RETURNING *
    `;
    if (deletedItem.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    } else {
      return NextResponse.json({ message: 'Item deleted successfully' });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting item' }, { status: 500 });
  }
}