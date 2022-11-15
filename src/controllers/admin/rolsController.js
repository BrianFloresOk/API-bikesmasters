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
    }
}