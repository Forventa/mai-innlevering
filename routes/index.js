var express = require('express');
var router = express.Router();

const isAuth = require('../middleware/isAuth');

const UserService = require('../services/userService');
const userService = new UserService;

/* GET home page. */
router.get('/', isAuth, async function(req, res, next) {
  const user = await userService.checkPassword("admin", "passord123");
  res.json(user);
});

module.exports = router;
