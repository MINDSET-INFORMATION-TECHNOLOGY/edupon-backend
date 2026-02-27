const { Client } = require('pg');
require('dotenv').config();

(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    const sql = `ALTER TABLE "AuthProvider" ADD CONSTRAINT "AuthProvider_userId_provider_key" UNIQUE ("userId","provider");`;
    await client.query(sql);
    console.log('Constraint added successfully');
  } catch (e) {
    console.error('Failed to add constraint:', e.message);
    process.exitCode = 1;
  } finally {
    try {
      await client.end();
    } catch {}
  }
})();
