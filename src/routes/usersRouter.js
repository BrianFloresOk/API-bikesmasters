const express = require("express");
const router = express.Router();

const { create, getOne, editUser, cancelUser, deleteUser, findUsers, login, logout } = require("../controllers/usersController")


//DOCUMENTACION CON SWAGGER
/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *        type: object
 *        properties:
 *          name:
 *              type: string
 * 
 * 
 * 
 */
router.post('/crear', create);
router.get('/:id', getOne);
router.put('/:id', editUser);
router.post('/cancelar-cuenta/:id', cancelUser);
router.delete('/:id', deleteUser);
router.get('/search', findUsers);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router