const { User } = require("../database/models");
require('dotenv').config();
const PORT = process.env.PORT || 4000;


module.exports = {
    list: async (req, res) => {
        try {
            let users = await User.findAll({
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

    create: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            let userCreate = await User.create({
                name,
                email,
                password,
                rol_id: 1
            })

            if(!userCreate) {
                res.status(400).json({
                    meta: {
                        status: 400,
                        msg: "Ocurrio un error"
                    }
                })
            }

            let response = {
                meta: {
                    status: 200,
                    msg: "Usuario creado correctamente"
                },
                data: userCreate
            }

            res.status(200).json(response)

        } catch (error) {
            res.json(error)
        }
    },

    getOne: async (req, res) => {
        let userId = +req.params.id;
        let user = await User.findByPk(userId, {
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