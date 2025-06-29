const express = require("express");
const { upload } = require("../config/multer"); // multer com memoryStorage
const { isAuthenticated } = require("../middlewares/isAuthenticated"); // multer com memoryStorage
const {
  CreateUserController,
} = require("../controllers/User/CreateUserController");
const {
  AuthUserController,
} = require("../controllers/User/AuthUserController");
const {
  DetailUserController,
} = require("../controllers/User/DetailUsercontroller");

const router = express.Router();
const createUserController = new CreateUserController();

router.post("/users", upload.single("image"), (req, res) => {
  return createUserController.handle(req, res);
});

router.get("/me", isAuthenticated, new DetailUserController().handle);

router.post("/login", new AuthUserController().handle);

module.exports = router;
