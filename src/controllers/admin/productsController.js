const { Product } = require("../../database/models");
const { endpointResponse } = require("../../helpers/success")

module.exports = {
    list: async (req, res) => {
        try {
            const allProducts = await Product.findAll({
                include: "category"
            });

            if(allProducts) {
/*                 let response = {
                    meta: {
                        status: 200,
                        message: "Carga completa",
                        total: allProducts.length
                    },
                    data: allProducts
                };

                res.status(200).json(response) */
                endpointResponse({
                    res,
                    message: "Carga completa con funcion response",
                    body: allProducts,
                })

            } else {
                res.status(400).json({
                    meta: {
                        status: 400,
                        message: "Ocurrió un error"
                    }
                })
            }
            
        } catch (error) {
            let err = {
                error,
                message: error.message
            };
            res.json(err)
        }
    },
}