const express = require("express");
const router = express.Router();

const apiController = require("../controllers/apiController")

router.get("/productos", apiController.list)
router.get("/productos/:id", apiController.getOne)
//router.get("/productos/images", apiController.productsImages)

module.exports = router