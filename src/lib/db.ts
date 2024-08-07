import { neon,neonConfig  } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('NEON_DATABASE_URL must be a Neon postgres connection string')
}
neonConfig.fetchConnectionCache = true;


const sql = neon(process.env.DATABASE_URL!);

export default sql;