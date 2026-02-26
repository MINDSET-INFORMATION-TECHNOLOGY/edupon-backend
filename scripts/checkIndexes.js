const { PrismaClient } = require('@prisma/client');
(async () => {
  const prisma = new PrismaClient({});
  try {
    const res = await prisma.$queryRaw`SELECT indexname, indexdef FROM pg_indexes WHERE tablename='AuthProvider';`;
    console.log(res);
  } catch (e) {
    console.error('error', e);
  } finally {
    await prisma.$disconnect();
  }
})();
