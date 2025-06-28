const { request, response } = require("express");

const { CreateUserService } = require("../../services/user/CreateUserService");

class CreateUserController {
  async handle(request, response) {
    console.log("Request body:", request.body);
    const { fullName, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      fullName,
      email,
      password,
    });
    return response.json(user);
  }
}

module.exports = { CreateUserController };
