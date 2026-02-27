const { Client } = require('pg');

(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const res = await client.query("SELECT indexname, indexdef FROM pg_indexes WHERE tablename ILIKE 'authprovider';");
  console.log(res.rows);
  await client.end();
})();
