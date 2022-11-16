const { UserRol } = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const rols = await UserRol.findAll();
            if(!rols) {
                res.status(400).json({
                    meta: {
                        status: 400,
                        message: "Ocurrió un error"
                    }
                })
            }

            let response = {
                meta: {
                    status: 200,
                    message: "Carga completa",
                    total: rols.legth
                },
                data: rols
            }

            res.status(200).json(response)

        } catch (error) {
            res.json(error)
        }
    },

    getOneRol: async (req, res) => {
        const rolId = req.params.id;
        try {
            const rols = await UserRol.findByPk(rolId);
            const rol = await UserRol.findByPk(rolId, {
                include: "usuarios"
            });
            if(!rol) {
                res.status(400).json({
                    meta: {
                        status: 400,
                        message: "Ocurrió un error"
                    },
                    data: {
                        message: "No results"
                    }
                })
            }

            let rolUsers = rol.usuarios
            let usuarios = [];
            rolUsers.forEach(user => {
                let userData = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    createdAt: user.createdAt
                };
                usuarios.push(userData)
            })

            let response = {
                meta: {
                    meta: 200,
                    message: "Carga completa",
                    users: rolUsers.length
                },

                data: {
                    rols,
                    usuarios
                }
            }

            res.status(200).json(response)

        } catch (error) {
            res.json(error)
        }
    },

    createRol: async (req, res) => {
        const { name } = req.body
        try {
            const newRol = await UserRol.create({name});
            if(!newRol) {
                res.status(400).json({
                    meta: {
                        status: 400,
                        message: "Ocurrió un error"
                    },
                    data: {
                        message: "No results"
                    }
                })
            };

            let response= {
                meta: {
                    status: 200,
                    message: "Carga completa"
                },
                data: newRol
            }

            res.status(200).json(response);

        } catch (error) {
            res.json(error)
        }
    },

    editRol: async (req, res) => {
        const rolId = req.params.id;
        const { name } = req.body;
        try {
            const rol = await UserRol.findByPk(rolId);
            if(!rol) {
                res.status(404).json({
                    meta: {
                        status: 404,
                        message: "No se encontró ROl"
                    }
                })
            };

            await UserRol.update({
                name
            }, {
                where: {
                    id: rol.id
                }
            });

            let rolEdited = await UserRol.findByPk(rol.id);

            let response = {
                meta: {
                    status: 200,
                    message: `Rol modificado de ${rol.name} a ${rolEdited.name}`
                },
                data: rolEdited
            };

            res.status(200).json(response);
        } catch (error) {
            res.json(error)
        }
    },

    deleteRol: async (req, res) => {
        const rolId = req.params.id;
        try {
            const rol = await UserRol.findByPk(rolId);
            if(rol) {
                await UserRol.destroy({
                    where: {
                        id: rol.id
                    }
                });
    
                let response = {
                    meta: {
                        status: 200,
                        message: `Se elimino el rol: ${rol.name}`
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