const prismaClient = require("../../prisma/index.js");

class UploadImageService {
  async execute({ userId, imageBuffer, mimeType }) {
    if (!userId) {
      throw new Error("User ID é obrigatório.");
    }
    if (!imageBuffer) {
      throw new Error("Imagem não enviada.");
    }
    if (!mimeType) {
      throw new Error("Tipo da imagem é obrigatório.");
    }

    const image = await prismaClient.userImage.create({
      data: {
        userId,
        image: imageBuffer,
        mimeType,
      },
    });

    return image;
  }
}

module.exports = { UploadImageService };
