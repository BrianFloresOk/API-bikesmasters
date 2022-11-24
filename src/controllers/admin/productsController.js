const { Product } = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const allProducts = await Product.findAll({
                include: "category"
            });

            if(allProducts) {
                 let response = {
                    meta: {
                        status: 200,
                        message: "Carga completa",
                        total: allProducts.length
                    },
                    data: allProducts
                };

                res.status(200).json(response);
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

    createProduct: async (req, res) => {
        const { name, price, discount, marca, stock, description, category_id } = req.body;
        try {
            let product = await Product.create({
                name,
                price,
                discount,
                marca,
                stock,
                description,
                category_id,
                image: req.file? req.file.filename : "default.jpg"
            })

            if(product) {
                let response = {
                    meta: {
                        status: 200,
                        message: "Carga completa"
                    },
                    data: product
                };
                res.status(200).json(response)
            } else {
                res.status(400).json({
                    meta: {
                        status: 400,
                        message: "Ocurrió un error"
                    }
                })
            };

        } catch (error) {
            res.json(error.message)
        };
    },

}