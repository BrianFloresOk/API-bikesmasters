const express = require("express");
const router = express.Router();

const { list, createProduct } = require("../../controllers/admin/productsController")

router.get("/", list);
router.post("/create", createProduct)

module.exports = router