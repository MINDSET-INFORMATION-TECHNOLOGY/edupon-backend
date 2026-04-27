# Revert to Prisma 6

## Steps
- [x] 1. Update `package.json` — downgrade prisma to ^6.6.0, @prisma/client to ^6.6.0, remove @prisma/adapter-pg
- [x] 2. Remove `prisma.config.ts` — not needed in Prisma 6
- [x] 3. Update `src/prisma/prisma.service.ts` — replace `adapter` with `datasources`
- [ ] 4. Run `npm install` to apply package changes
- [ ] 5. Run `npx prisma generate` to regenerate client

