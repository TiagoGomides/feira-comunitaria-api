const { DeleteUserService } = require("../../services/user/DeleteUserService");

class DeleteUserController {
  async handle(request, response) {
    const user_id = request.user_id;

    const deleteUserService = new DeleteUserService();

    try {
      const result = await deleteUserService.execute(user_id);
      return response.status(200).json(result);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error.message);
      return response.status(400).json({ error: error.message });
    }
  }
}

module.exports = { DeleteUserController };
