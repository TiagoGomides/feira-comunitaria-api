const { CreateUserService } = require("../../services/user/CreateUserService");
const { UploadImageService } = require("../../services/user/UploadImageService.js");

class CreateUserController {
  async handle(request, response) {
    const { fullName, email, password, reputation } = request.body;
    const file = request.file;

    const createUserService = new CreateUserService();

   
    const user = await createUserService.execute({
      fullName,
      email,
      password,
      reputation: Number(reputation) || 0,
    });

    
    if (file) {
      const uploadImageService = new UploadImageService();
      await uploadImageService.execute({
        userId: user.id,
        imageBuffer: file.buffer,
        mimeType: file.mimetype,
      });
    }

    return response.status(201).json(user);
  }
}

module.exports = { CreateUserController };
