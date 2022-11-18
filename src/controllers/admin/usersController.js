const { User } = require("../../database/models");
require('dotenv').config();
const PORT = process.env.PORT || 4000;

module.exports = {
    list: async (req, res) => {
        try {
            let users = await User.findAll({
                attributes: ['id', 'name', 'email', 'avatar', 'rol_id', 'createdAt', 'active'],
                include: "userRol"
            });

            if (users) {

                let response = {
                    meta: {
                        status: 200,
                        msg: "Carga completa",
                        total: users.length,
                        url: `http://localhost:${PORT}/api/admin/usuarios`
                    },
                    data: users
                }

                res.status(200).json(response)

            } else {
                res.status(400).json({
                    meta: {
                        status: 400,
                        msg: "No se encontraron resultados"
                    }
                })
            };

        } catch (error) {
            res.json(error)
        }
    },

    getOne: async (req, res) => {
        const { id } = req.params;
        try {
            let user = await User.findByPk(id, {
                attributes: ['id', 'name', 'email', 'avatar', 'rol_id', 'createdAt', 'active', 'direccion_id'],
                include: ['userRol', 'direccion']
            });

            if (!user) {
                res.status(400).json({
                    meta: {
                        status: 400,
                        msg: "No se encontraron resultados"
                    }
                })
            };

            let response = {
                meta: {
                    status: 200,
                    message: "Carga completa",
                },
                data: user
            };

            res.status(200).json(response)

        } catch (error) {
            let err = {
                error,
                message: error.message
            };

            res.json(err)
        }
    },

    changeUserRol: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);

            if (user) {
                const { rol_id } = req.body;
                const userRol = await User.update({
                    rol_id
                }, {
                    where: {
                        id: user.id
                    }
                });
                if (!userRol) {
                    res.status(400).json({
                        meta: {
                            status: 400,
                            message: "Ocurrió un error al intentar actualizar"
                        }
                    })
                };

                let userEdited = await User.findByPk(user.id, {
                    attributes: ['id', 'name', 'rol_id'],
                    include: 'userRol'
                });

                let response = {
                    meta: {
                        status: 200,
                        message: "Actualización satisfactoria"
                    },
                    data: userEdited
                };

                res.status(200).json(response)

            } else {
                res.status(404).json({
                    meta: {
                        status: 404,
                        message: "No es posible realizar esta acción"
                    }
                })
            };
        } catch (error) {
            let err = {
                error,
                message: error.message
            };
            res.json(err)
        }
    },

    cancelUser: async (req, res) => {
        const { id } = req.params;
        try {

            let existUser = await User.findByPk(id);

            if (existUser && existUser.active === true) {
                let user = await User.update({
                    active: false
                }, {
                    where: { id: existUser.id }
                });

                if (user) {
                    let userCanceled = await User.findByPk(existUser.id);
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
                };
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
                });

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
    }

}