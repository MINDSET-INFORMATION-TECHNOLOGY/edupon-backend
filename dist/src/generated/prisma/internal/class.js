"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.4.1",
    "engineVersion": "55ae170b1ced7fc6ed07a15f110549408c501bb3",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider     = \"prisma-client\"\n  output       = \"../src/generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nenum Role {\n  STUDENT\n  EDUCATOR\n  COMPANY\n}\n\nenum AuthProviderType {\n  GOOGLE\n  LINKEDIN\n}\n\nmodel User {\n  id               String         @id @default(uuid())\n  email            String         @unique\n  fullname         String\n  avatar           String?\n  password         String\n  role             Role\n  institution      String?\n  area_of_interest String?\n  authProviders    AuthProvider[]\n  createdAt        DateTime       @default(now())\n  updatedAt        DateTime       @updatedAt\n}\n\nmodel AuthProvider {\n  id             String           @id @default(uuid())\n  userId         String\n  provider       AuthProviderType\n  providerUserId String\n  accessToken    String?\n  refreshToken   String?\n  createdAt      DateTime         @default(now())\n  updatedAt      DateTime         @updatedAt\n  user           User             @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([provider, providerUserId])\n  @@unique([userId, provider])\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fullname\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"avatar\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"Role\"},{\"name\":\"institution\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"area_of_interest\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"authProviders\",\"kind\":\"object\",\"type\":\"AuthProvider\",\"relationName\":\"AuthProviderToUser\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"AuthProvider\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"provider\",\"kind\":\"enum\",\"type\":\"AuthProviderType\"},{\"name\":\"providerUserId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"accessToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"refreshToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AuthProviderToUser\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"user\",\"authProviders\",\"_count\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"AuthProvider.findUnique\",\"AuthProvider.findUniqueOrThrow\",\"AuthProvider.findFirst\",\"AuthProvider.findFirstOrThrow\",\"AuthProvider.findMany\",\"AuthProvider.createOne\",\"AuthProvider.createMany\",\"AuthProvider.createManyAndReturn\",\"AuthProvider.updateOne\",\"AuthProvider.updateMany\",\"AuthProvider.updateManyAndReturn\",\"AuthProvider.upsertOne\",\"AuthProvider.deleteOne\",\"AuthProvider.deleteMany\",\"AuthProvider.groupBy\",\"AuthProvider.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"userId\",\"AuthProviderType\",\"provider\",\"providerUserId\",\"accessToken\",\"refreshToken\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"email\",\"fullname\",\"avatar\",\"password\",\"Role\",\"role\",\"institution\",\"area_of_interest\",\"every\",\"some\",\"none\",\"provider_providerUserId\",\"userId_provider\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\"]"),
    graph: "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-ACAYAAA_ACAZAAA_ACA4AQAAAAE5AQAAAAU6AQAAAAU7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQA9ACFAAQAAAAFBAQAAAAFCAQAAAAELBQAAOwAgGAAAPAAgGQAAPAAgOEAAAAABOUAAAAAEOkAAAAAEO0AAAAABPEAAAAABPUAAAAABPkAAAAABP0AAOgAhCwUAADsAIBgAADwAIBkAADwAIDhAAAAAATlAAAAABDpAAAAABDtAAAAAATxAAAAAAT1AAAAAAT5AAAAAAT9AADoAIQg4AgAAAAE5AgAAAAQ6AgAAAAQ7AgAAAAE8AgAAAAE9AgAAAAE-AgAAAAE_AgA7ACEIOEAAAAABOUAAAAAEOkAAAAAEO0AAAAABPEAAAAABPUAAAAABPkAAAAABP0AAPAAhDgUAAD4AIBgAAD8AIBkAAD8AIDgBAAAAATkBAAAABToBAAAABTsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BAD0AIUABAAAAAUEBAAAAAUIBAAAAAQg4AgAAAAE5AgAAAAU6AgAAAAU7AgAAAAE8AgAAAAE9AgAAAAE-AgAAAAE_AgA-ACELOAEAAAABOQEAAAAFOgEAAAAFOwEAAAABPAEAAAABPQEAAAABPgEAAAABPwEAPwAhQAEAAAABQQEAAAABQgEAAAABBwUAADsAIBgAAEEAIBkAAEEAIDgAAAAyAjkAAAAyCDoAAAAyCD8AAEAyIgQ4AAAAMgI5AAAAMgg6AAAAMgg_AABBMiIOBQAAOwAgGAAAQwAgGQAAQwAgOAEAAAABOQEAAAAEOgEAAAAEOwEAAAABPAEAAAABPQEAAAABPgEAAAABPwEAQgAhQAEAAAABQQEAAAABQgEAAAABCzgBAAAAATkBAAAABDoBAAAABDsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BAEMAIUABAAAAAUEBAAAAAUIBAAAAAQ0sAABEADAtAAAcABAuAABEADAvAQA2ACE2QAA5ACE3QAA5ACFDAQA2ACFEAQA2ACFFAQA4ACFGAQA2ACFIAABFSCJJAQA4ACFKAQA4ACEHBQAAOwAgGAAARwAgGQAARwAgOAAAAEgCOQAAAEgIOgAAAEgIPwAARkgiBwUAADsAIBgAAEcAIBkAAEcAIDgAAABIAjkAAABICDoAAABICD8AAEZIIgQ4AAAASAI5AAAASAg6AAAASAg_AABHSCIOBAAATQAgLAAASAAwLQAACQAQLgAASAAwLwEASQAhNkAATAAhN0AATAAhQwEASQAhRAEASQAhRQEASgAhRgEASQAhSAAAS0giSQEASgAhSgEASgAhCzgBAAAAATkBAAAABDoBAAAABDsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BAEMAIUABAAAAAUEBAAAAAUIBAAAAAQs4AQAAAAE5AQAAAAU6AQAAAAU7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQA_ACFAAQAAAAFBAQAAAAFCAQAAAAEEOAAAAEgCOQAAAEgIOgAAAEgIPwAAR0giCDhAAAAAATlAAAAABDpAAAAABDtAAAAAATxAAAAAAT1AAAAAAT5AAAAAAT9AADwAIQNLAAADACBMAAADACBNAAADACACMgAAADICMwEAAAABAjABAAAAATIAAAAyAgwDAABSACAsAABQADAtAAADABAuAABQADAvAQBJACEwAQBJACEyAABRMiIzAQBJACE0AQBKACE1AQBKACE2QABMACE3QABMACEEOAAAADICOQAAADIIOgAAADIIPwAAQTIiEAQAAE0AICwAAEgAMC0AAAkAEC4AAEgAMC8BAEkAITZAAEwAITdAAEwAIUMBAEkAIUQBAEkAIUUBAEoAIUYBAEkAIUgAAEtIIkkBAEoAIUoBAEoAIVAAAAkAIFEAAAkAIAAAAAABVQEAAAABAVUAAAAyAgFVAQAAAAEBVUAAAAABBRIAAHIAIBMAAHUAIFIAAHMAIFMAAHQAIFgAAAEAIAMSAAByACBSAABzACBYAAABACAAAAABVQAAAEgCCxIAAGIAMBMAAGcAMFIAAGMAMFMAAGQAMFQAAGUAIFUAAGYAMFYAAGYAMFcAAGYAMFgAAGYAMFkAAGgAMFoAAGkAMAcvAQAAAAEyAAAAMgIzAQAAAAE0AQAAAAE1AQAAAAE2QAAAAAE3QAAAAAECAAAABQAgEgAAbQAgAwAAAAUAIBIAAG0AIBMAAGwAIAELAABxADAOAwAAUgAgLAAAUAAwLQAAAwAQLgAAUAAwLwEAAAABMAEASQAhMgAAUTIiMwEASQAhNAEASgAhNQEASgAhNkAATAAhN0AATAAhTgAATgAgTwAATwAgAgAAAAUAIAsAAGwAIAIAAABqACALAABrACALLAAAaQAwLQAAagAQLgAAaQAwLwEASQAhMAEASQAhMgAAUTIiMwEASQAhNAEASgAhNQEASgAhNkAATAAhN0AATAAhCywAAGkAMC0AAGoAEC4AAGkAMC8BAEkAITABAEkAITIAAFEyIjMBAEkAITQBAEoAITUBAEoAITZAAEwAITdAAEwAIQcvAQBXACEyAABYMiIzAQBXACE0AQBZACE1AQBZACE2QABaACE3QABaACEHLwEAVwAhMgAAWDIiMwEAVwAhNAEAWQAhNQEAWQAhNkAAWgAhN0AAWgAhBy8BAAAAATIAAAAyAjMBAAAAATQBAAAAATUBAAAAATZAAAAAATdAAAAAAQQSAABiADBSAABjADBUAABlACBYAABmADAABAQAAG8AIEUAAFMAIEkAAFMAIEoAAFMAIAcvAQAAAAEyAAAAMgIzAQAAAAE0AQAAAAE1AQAAAAE2QAAAAAE3QAAAAAEKLwEAAAABNkAAAAABN0AAAAABQwEAAAABRAEAAAABRQEAAAABRgEAAAABSAAAAEgCSQEAAAABSgEAAAABAgAAAAEAIBIAAHIAIAMAAAAJACASAAByACATAAB2ACAMAAAACQAgCwAAdgAgLwEAVwAhNkAAWgAhN0AAWgAhQwEAVwAhRAEAVwAhRQEAWQAhRgEAVwAhSAAAYEgiSQEAWQAhSgEAWQAhCi8BAFcAITZAAFoAITdAAFoAIUMBAFcAIUQBAFcAIUUBAFkAIUYBAFcAIUgAAGBIIkkBAFkAIUoBAFkAIQIEBgIFAAMBAwABAQQHAAAAAAMFAAgYAAkZAAoAAAADBQAIGAAJGQAKAQMAAQEDAAEDBQAPGAAQGQARAAAAAwUADxgAEBkAEQYCAQcIAQgLAQkMAQoNAQwPAQ0RBA4SBQ8UARAWBBEXBhQYARUZARYaBBodBxseCxwfAh0gAh4hAh8iAiAjAiElAiInBCMoDCQqAiUsBCYtDScuAigvAikwBCozDis0Eg"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map