const prismaClient = require("../../prisma/index.js");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
class AuthUserService {
  async execute({ email, password }) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("Email/Senha incorreto");
    }

    const passwordMatch = await compare(password, user?.password);

    if (!passwordMatch) {
      throw new Error("Email/Senha incorreto");
    }
    const token = sign(
      {
        fullName: user.fullName,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "4h",
      }
    );
    return {
      id: user?.id,
      fullName: user?.fullName,
      email: user.email,
      token: token,
    };
  }
}

module.exports = { AuthUserService };
