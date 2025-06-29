const express = require("express");

const userRoutes = require("./user.routes");

const router = express.Router();

router.use(userRoutes); // carrega tudo que tiver no userRoutes

module.exports = router;

