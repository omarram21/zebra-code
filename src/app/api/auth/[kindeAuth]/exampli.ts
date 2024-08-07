import sql from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await sql`SELECT * FROM your_table_name`;
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
}