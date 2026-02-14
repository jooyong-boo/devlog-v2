import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create UserRoles
  const adminRole = await prisma.userRole.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'admin',
    },
  });
  console.log('Created admin role:', adminRole);

  const userRole = await prisma.userRole.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'user',
    },
  });
  console.log('Created user role:', userRole);

  // Create OAuthProviders
  const googleProvider = await prisma.oAuthProvider.upsert({
    where: { name: 'google' },
    update: {},
    create: {
      name: 'google',
    },
  });
  console.log('Created Google OAuth provider:', googleProvider);

  const githubProvider = await prisma.oAuthProvider.upsert({
    where: { name: 'github' },
    update: {},
    create: {
      name: 'github',
    },
  });
  console.log('Created GitHub OAuth provider:', githubProvider);

  // Create initial Projects
  const devProject = await prisma.project.upsert({
    where: { name: '개발' },
    update: {},
    create: {
      name: '개발',
      desc: '개발 관련 글',
      sort: 1,
    },
  });
  console.log('Created project:', devProject);

  const dailyProject = await prisma.project.upsert({
    where: { name: '일상' },
    update: {},
    create: {
      name: '일상',
      desc: '일상 이야기',
      sort: 2,
    },
  });
  console.log('Created project:', dailyProject);

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
