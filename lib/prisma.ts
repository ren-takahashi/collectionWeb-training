import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma";

// =============================================================================
// Prisma Client シングルトン（Next.js サーバーコンポーネント用）
// -----------------------------------------------------------------------------
// Next.js の開発環境ではホットリロードのたびにモジュールが再評価されるため、
// そのままだと PrismaClient のインスタンスが増え続けてしまう。
// globalThis に保持することで、再評価されても同じインスタンスを使い回す。
// =============================================================================

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
