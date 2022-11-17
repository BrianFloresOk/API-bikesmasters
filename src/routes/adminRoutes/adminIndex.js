const express = require("express");
const router = express.Router();

const rolsRouter = require("./adminRols");
const usersRouter = require("./adminUsers");

 router.get("/", (req, res) => {
    res.status(200).json({
        meta: {
            message: "ADMIN section"
        }
    })
 });

router.use("/credenciales", rolsRouter);
router.use("/users", usersRouter)

module.exports = router