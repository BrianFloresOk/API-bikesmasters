const { Op } = require("sequelize")
const { User } = require("../database/models");
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const { jwtCreate } = require("../middlewares/userToken")


module.exports = {

    create: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            let userCreate = await User.create({
                name,
                email,
                password,
                rol_id: 2,
                active: true
            })

            if (!userCreate) {
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

    editUser: async (req, res) => {
        const { name, telefono } = req.body;
        const { id } = req.params;
        try {
            let exist = await User.findByPk(id);
            if (exist) {
                let user = await User.update({
                    name,
                    telefono,
                    avatar: req.file ? req.file.filename : "default.jpg"
                }, {
                    where: { id }
                })

                if (user) {
                    let userUpdated = await User.findByPk(id);
                    let response = {
                        meta: {
                            status: true,
                            message: "Actualización correcta",
                            url: `http://localhost:${PORT}/api/usuarios/${id}`
                        },
                        data: userUpdated
                    };
                    res.status(200).json(response)
                }
            } else {
                res.status(400).json({
                    meta: {
                        status: 400,
                        message: "Ocurrio un error"
                    }
                })
            }
        } catch (error) {
            res.json(error)
        }
    },

    getOne: async (req, res) => {
        let userId = +req.params.id;
        let user = await User.findByPk(userId, {
            attributes:['id', 'name', 'email', 'avatar', 'telefono', 'direccion_id'],
            include: ["direccion"]
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
    },

    cancelUser: async (req, res) => {
        const { id } = req.params;
        try {
            let user = await User.update({
                active: false
            }, {
                where: { id }
            })

            if (user) {
                let userCanceled = await User.findByPk(id);
                let response = {
                    meta: {
                        status: 200,
                        message: "Cancelación exitosa"
                    },
                    data: {
                        message: `El usuario ${userCanceled.name} desactivó su cuenta`,
                        userCanceled,
                    }
                };

                res.status(200).json(response)

            } else {
                res.status(400).json({
                    meta: {
                        status: 400,
                        message: "Ocurrió un error"
                    }
                })
            }

        } catch (error) {
            res.json(error)
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            let user = await User.findByPk(id)
            if (user) {
                await User.destroy({
                    where: {
                        id: user.id
                    }
                })
                let response = {
                    meta: {
                        status: 200,
                        message: "Carga exitosa"
                    },
                    data: {
                        message: `El usuario: "${user.name}" ha sido eliminado`
                    }
                };

                res.status(200).json(response)

            } else {
                res.status(400).json({
                    meta: {
                        status: 400,
                        message: "Ocurrió un error"
                    }
                })
            }

        } catch (error) {
            res.json(error)
        }
    },

    findUsers: async (req, res) => {
        console.log("ENTRE AL CONTROLADOR ****************************************");
        const busqueda = req.query.keywords;
        console.log(busqueda);
        try {
            const users = await User.findAll({
                where: {
                    name: { [Op.substring]: busqueda }
                }
            });
            if (!users) {
                res.status(400).json({
                    meta: {
                        status: 400,
                        message: "No se encotraron resultados",
                        total: users.length
                    },
                    data: {
                        users: false
                    }
                })
            }

            let response = {
                meta: {
                    status: 200,
                    message: "Carga exitosa",
                    total: users.length
                },
                data: users
            }

            res.status(200).json(response)

        } catch (error) {
            let err = "Hola soy un error"
            res.json(error)
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            let user = await User.findOne({
                where: {
                    email: email
                }
            })

            if (user && user.password === password) {

                let userData = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    rol_id: user.rol_id
                };

                let userLoged = await jwtCreate(userData);

                const TIME_IN_MILISECONDS = 60000;

                res.cookie('bikes', userLoged, {
                    expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                    httpOnly: true,
                    secure: true
                });

                console.log(userLoged);
                console.log(req.cookies.bikes);

                res.status(200).json({
                    meta: {
                        status: 200,
                        message: "Login autorizado"
                    },
                    data: userLoged
                });
            } else {
                res.status(400).json({
                    meta: {
                        status: 400,
                        message: "Ocurrió un error"
                    }
                })
            }

        } catch (error) {
            res.json(error)
        }
    },

    logout: async (req, res) => {
        try {
            if (!req.cookies.bikes) {
                res.status(400).json({
                    meta: {
                        status: 400,
                        message: "Ocurrió un error"
                    }
                })
            } else {
                res.cookie('bikes', "", { maxAge: -1 });
                let response = {
                    meta: {
                        status: 200,
                        message: "Sesión finalizada"
                    }
                };

                res.status(200).json(response)
            }
        } catch (error) {
            res.json(error)
        }


    }

}