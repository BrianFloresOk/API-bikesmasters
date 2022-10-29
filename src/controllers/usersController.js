const { Usuario } = require("../database/models");
require('dotenv').config();
const PORT = process.env.PORT || 4000;


module.exports = {
    list: async (req, res) => {
        try {
            let users = await Usuario.findAll({
                include: "userRol"
            })
            if (!users) {
                res.status(400).json({
                    meta: {
                        status: 400,
                        msg: "No se encontraron resultados"
                    }
                })
            } else {
                let response = {
                    meta: {
                        status: 200,
                        msg: "Carga completa",
                        total: users.length,
                        url: `http://localhost:${PORT}/api/usuarios`
                    },
                    data: users
                }
                res.status(200).json(response)
            }

        } catch (error) {
            res.json(error)
        }
    },

    getOne: async (req, res) => {
        let userId = +req.params.id;
        let user = await Usuario.findByPk(userId, {
            include: ["userRol", "direccion"]
        });

        try {
            if (!user) {
                res.status(400).json({
                    meta: {
                        status: 400,
                        msg: "No se encontraron resultados"
                    }
                })
            } else {
                let response = {
                    meta: {
                        status: 200,
                        msg: "Carga completa",
                        url: `http://localhost:${PORT}/api/usuarios/${userId}`
                    },
                    data: user
                }
                res.status(200).json(response)
            }
            
        } catch (error) {
            res.json(error)
        }
    }
}