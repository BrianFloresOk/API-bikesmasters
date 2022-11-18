const express = require("express");
const router = express.Router();

const rolsRouter = require("./adminRols");
const usersRouter = require("./adminUsers");
const productsRouter = require("./adminProducts");

 router.get("/", (req, res) => {
    res.status(200).json({
        meta: {
            message: "ADMIN section"
        }
    })
 });

router.use("/credenciales", rolsRouter);
router.use("/usuarios", usersRouter)
router.use("/productos", productsRouter)

module.exports = router