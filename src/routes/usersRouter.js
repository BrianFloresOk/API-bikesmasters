const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController")


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
router.get('/', usersController.list)
router.post('/crear', usersController.create)
router.get('/:id', usersController.getOne)


module.exports = router