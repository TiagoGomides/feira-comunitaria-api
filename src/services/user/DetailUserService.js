const prismaClient = require("../../prisma/index.js");

class DetailUserService {
  async execute(user_id) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        reputation: true,
        images: {
          select: {
            mimeType: true,
          },
        },
      },
    });

    return user;
  }
}

module.exports = { DetailUserService };
