const express = require("express");
const router = express.Router();

const { list } = require("../../controllers/admin/usersController")

router.get("/", list)

module.exports = router