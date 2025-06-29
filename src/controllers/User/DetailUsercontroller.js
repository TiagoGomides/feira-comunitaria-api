const { DetailUserService } = require("../../services/user/DetailUserService");

class DetailUserController {
  async handle(request, response) {
    const user_id = request.user_id;
    const detailUserService = new DetailUserService();
    const detailUser = await detailUserService.execute(user_id);
    return response.json(detailUser);
  }
}

module.exports = { DetailUserController };
