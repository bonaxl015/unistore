import path from 'path';

import dotenv from 'dotenv';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { client, db } from '.';

dotenv.config();

async function main() {
  try {
    await migrate(db, {
      migrationsFolder: path.join(__dirname, './migrations')
    });
    console.log(`Migrations complete`);
    await client.end();
  } catch (error) {
    console.log('Error during migration: ', error);
    process.exit(1);
  }
}

main();
