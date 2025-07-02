const prismaClient = require("../../prisma/index.js");
const { hash } = require("bcryptjs");
class UpdateUserService {
  async execute({ user_id, fullName, email, image, newPassword }) {
    try {
      const userAlreadyExists = await prismaClient.user.findUnique({
        where: {
          id: user_id,
        },
      });

      if (!userAlreadyExists) {
        throw new Error("Usuario nao existe");
      }

      let passwordData = {};
      if (newPassword) {
        const passwordHash = await hash(newPassword, 8);
        passwordData.password = passwordHash;
      }

      const userUpdated = await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          fullName,
          email,
          ...passwordData,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      });
      if (image && image.length > 0) {
        await prismaClient.userImage.createMany({
          data: image.map(({ imageBuffer, mimeType }) => ({
            userId: user_id,
            image: imageBuffer,
            mimeType,
          })),
        });
      }

      return userUpdated;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.message);
      throw new Error("Erro ao atualizar usuário");
    }
  }
}

module.exports = { UpdateUserService };
