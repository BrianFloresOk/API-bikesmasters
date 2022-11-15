const express = require("express");
const router = express.Router();

const rolsRouter = require("./adminRols")

/* router.use("/", adminRouter) */
router.use("/credenciales", rolsRouter)

module.exports = router