import { PrismaClient } from '../src/generated/prisma/client';

async function main() {
  const prisma = new PrismaClient({} as any);
  const res: any = await prisma.$queryRaw`SELECT indexname, indexdef FROM pg_indexes WHERE tablename ILIKE 'authprovider'`;
  console.log('indexes result length', Array.isArray(res) ? res.length : typeof res);
  console.dir(res, { depth: null });
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
