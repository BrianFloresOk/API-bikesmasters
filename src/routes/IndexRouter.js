const express = require("express");
const router = express.Router();

const usersRouters = require("./usersRouter")

router.get("/", (req, res ) => {
    res.json({
        meta: {
            status: 200,
            msg: "Conexion exitosa",
            title: "API REST Bikesmasters"
        }
    })
});

router.use("/usuarios", usersRouters)

module.exports = router