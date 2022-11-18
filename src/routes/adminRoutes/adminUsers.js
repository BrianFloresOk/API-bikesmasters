const express = require("express");
const router = express.Router();

const { list, getOne, changeUserRol, cancelUser } = require("../../controllers/admin/usersController")

router.get("/", list);
router.get("/:id", getOne);
router.put("/editar-rol/:id", changeUserRol);
router.put("/cancelar-cuenta/:id", cancelUser);

module.exports = router