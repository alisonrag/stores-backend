const { PrismaClient } = require('@prisma/client');
const { items } = require('./data.js');
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.item.createMany({
      data: items,
    });
    console.log('Added category data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();