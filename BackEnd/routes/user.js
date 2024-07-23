const express = require('express');
const router = express.Router();
const { fetchUsers } = require("../controllers/users");
const { validateRegister, registerUser } = require("../controllers/Authentication");

router.get('/getAll', fetchUsers);
router.post('/register', validateRegister(), registerUser);

module.exports = router;
