const prismaClient = require("../../prisma/index.js");

class DeleteUserService {
  async execute(user_id) {
    try {
      const userAlreadyExists = await prismaClient.user.findUnique({
        where: {
          id: user_id,
        },
      });

      if (!userAlreadyExists) {
        throw new Error("Usuário não encontrado");
      }
      await prismaClient.userImage.deleteMany({
        where: { userId: user_id },
      });

      await prismaClient.user.delete({
        where: { id: user_id },
      });

      return { message: "Usuário deletado com sucesso" };
    } catch (error) {
      console.error("Erro ao deletar o usuário:", error.message);
      throw new Error("Erro ao deletar o usuário");
    }
  }
}

module.exports = { DeleteUserService };
