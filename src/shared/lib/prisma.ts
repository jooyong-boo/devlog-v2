import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // 빌드 타임: DIRECT_URL(PostgreSQL 직접 연결)로 PgBouncer connection_limit 우회
  // 런타임: DATABASE_URL(PgBouncer)로 서버리스 커넥션 풀링
  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';
  const url =
    (isBuildPhase ? process.env.DIRECT_URL : undefined) ??
    process.env.DATABASE_URL;

  return new PrismaClient(url ? { datasourceUrl: url } : undefined);
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
