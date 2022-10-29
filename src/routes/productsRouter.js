const express = require("express");
const router = express.Router();

const apiController = require("../controllers/productsController")

router.get("/", apiController.list)
router.get("/:id", apiController.getOne)
//router.get("/images", apiController.productsImages)

module.exports = router