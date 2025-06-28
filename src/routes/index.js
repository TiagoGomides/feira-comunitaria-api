const express = require('express');
const {CreateUserController} = require('../controllers/User/CreateUserController');

const router = express.Router();



router.post('/users',new CreateUserController().handle)

module.exports = router;
