const express = require("express");
const router = express.Router();

const { list, create, getOne, editUser, cancelUser, deleteUser, findUsers, login } = require("../controllers/usersController")


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
router.get('/', list);
router.post('/crear', create);
router.get('/:id', getOne);
router.put('/:id', editUser);
router.post('/cancelar-cuenta/:id', cancelUser);
router.delete('/:id', deleteUser);
router.get('/search', findUsers);
router.post('/login', login);

module.exports = router