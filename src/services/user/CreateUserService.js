const prismaClient = require("../../prisma/index.js");
const { hash } = require("bcryptjs");

class CreateUserService {
  async execute({ fullName, email, password }) {
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

/*id           String         @id @default(uuid())
  fullName     String
  email        String         @unique
  password     String
  reputation   Int            @default(0)
  imageUrl     String?
  createdAt*/
