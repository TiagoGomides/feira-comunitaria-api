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
const {
  UpdateUserController,
} = require("../controllers/User/UpdateUserController");
const {
  DeleteUserController,
} = require("../controllers/User/DeleteUserController");

const router = express.Router();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
router.post("/users", upload.single("image"), (req, res) => {
  return createUserController.handle(req, res);
});
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.post("/login", new AuthUserController().handle);
router.put("/users", isAuthenticated, upload.single("image"), (req, res) => {
  return updateUserController.handle(req, res);
});
router.delete("/users", isAuthenticated, (req, res) => {
  return deleteUserController.handle(req, res);
});

module.exports = router;
