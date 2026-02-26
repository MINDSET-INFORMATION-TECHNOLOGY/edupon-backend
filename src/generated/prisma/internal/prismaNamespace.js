"use strict";
// Prisma client references the JS build, but in dev we want to use the uncompiled
// TypeScript source. Forward the import so ts-node can transpile it.
module.exports = require("./prismaNamespace.ts");
