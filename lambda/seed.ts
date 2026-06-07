/**
 * Seed script — creates the initial admin user.
 * Run: npx tsx lambda/seed.ts
 */
import bcrypt from 'bcryptjs';

// Simulates the DynamoDB local environment
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@eva9.ai';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme123';

async function main() {
  const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  console.log('Admin user seed data:');
  console.log(JSON.stringify({
    email: ADMIN_EMAIL,
    name: 'Jacky Chen',
    passwordHash: hash,
    role: 'admin',
    verified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, null, 2));
  console.log('\nInsert this into eva9-users table via AWS Console or CLI.');
}

main();
