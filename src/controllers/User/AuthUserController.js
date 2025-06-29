const { AuthUserService } = require("../../services/user/AuthUserService");

class AuthUserController {
  async handle(request, response) {
    const { email, password } = request.body;

    const authUserService = new AuthUserService();

    const session = await authUserService.execute({
      email,
      password,
    });

    return response.json(session);
  }
}

module.exports = { AuthUserController };
