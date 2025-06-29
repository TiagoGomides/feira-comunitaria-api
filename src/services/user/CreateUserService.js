const prismaClient = require("../../prisma/index.js");
const { hash } = require("bcryptjs");

class CreateUserService {
  async execute({ fullName, email, password, reputation = 0 }) {
    if (!email) {
      throw new Error("Insira um email");
    }

    if (!fullName) {
      throw new Error("Insira um nome completo");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error("Email já cadastrado");
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        fullName,
        email,
        reputation,
        password: passwordHash,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });

    return user;
  }
}

module.exports = { CreateUserService };
