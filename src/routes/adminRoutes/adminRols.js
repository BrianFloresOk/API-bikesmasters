const express = require("express");
const router = express.Router();
const { list, getOneRol, createRol, editRol, deleteRol } = require("../../controllers/admin/rolsController")

router.get('/', list);
router.get('/:id', getOneRol);
router.post('/create', createRol);
router.put('/:id', editRol);
router.delete('/:id', deleteRol);

module.exports = router