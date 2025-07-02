const { UpdateUserService } = require("../../services/user/UpdateUserService");

class UpdateUserController {
  async handle(request, response) {
    const { fullName, email, newPassword } = request.body;
    const user_id = request.user_id;
 const imagem = request.file
  ? [{ imageBuffer: request.file.buffer, mimeType: request.file.mimetype }]
  : [];


    const updateUserService = new UpdateUserService();

    try {
      const updatedUser = await updateUserService.execute({
        user_id,
        fullName,
        email,
        newPassword,
        imagem,
      });

      return response.status(200).json(updatedUser);
    } catch (error) {
      console.error("Erro no controller:", error.message);
      return response.status(400).json({ error: error.message });
    }
  }
}

module.exports = { UpdateUserController };
