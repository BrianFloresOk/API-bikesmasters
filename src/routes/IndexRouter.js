const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.json({
        meta: {
            status: 200,
            msg: "Conexion exitosa",
            title: "API REST Bikesmasters"
        }
    })
})

module.exports = router