const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController")

router.get('/', usersController.list)
router.get('/:id', usersController.getOne)


module.exports = router