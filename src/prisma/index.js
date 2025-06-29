const {PrismaClient} = require('../generated/prisma/client');

const prismaClient = new PrismaClient()


module.exports = prismaClient;
