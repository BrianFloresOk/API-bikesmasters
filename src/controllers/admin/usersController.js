const { User } = require("../../database/models");
require('dotenv').config();
const PORT = process.env.PORT || 4000;

module.exports = {
    list: async (req, res) => {
        try {
            let users = await User.findAll({
                attributes: ['id', 'name', 'email', 'avatar', 'rol_id', 'createdAt'],
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
    }
}