const { Categoria } = require("../database/models")
require('dotenv').config();
const PORT = process.env.PORT || 4000;

module.exports = {
    list: async (req, res) => {
        try {
            let categories = await Categoria.findAll()
            if (!categories) {
                res.status(200).json({
                    meta: {
                        status: 400,
                        msg: "No se encontraron resultados"
                    }
                })
            } else {
                let response = {
                    meta: {
                        status: 200,
                        msg: "Carga exitosa",
                        url: `http://localhost:${PORT}/api/categorias`,
                        total: categories.length
                    },
                    data: categories
                }
                res.status(200).json(response)
            }
        } catch (error) {
            res.json(error)
        }
    }
}