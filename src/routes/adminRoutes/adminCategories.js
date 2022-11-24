const express = require("express");
const router = express.Router();

const { list, createCategory, getOneCategory, editCategory, deleteCategory } = require("../../controllers/admin/categoriesController");

router.get("/", list)
router.post("/create", createCategory)
router.get("/:id", getOneCategory);
router.put("/:id", editCategory);
router.delete("/:id", deleteCategory)

module.exports = router