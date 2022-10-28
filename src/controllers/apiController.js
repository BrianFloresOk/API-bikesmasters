const {Producto, Usuario, Categoria} = require('../database/models')
const fs = require('fs');
const path = require('path');
const { Op } = require("sequelize");

module.exports = {
/*     productsImages: async (req, res) => {
        let productId = req.params.id

        try {
            let producto = await Producto.findByPk(productId);
            let imagePath = path.join(__dirname, "../../../public/images/products/" + producto.image)
            if (fs.existsSync(imagePath)) {
                res.sendFile(imagePath)
            } else {
                let imageDefault = path.join(__dirname, "../../../public/images/products/product-default-4.png")
                res.sendFile(imageDefault)
            }
        } catch (error) {
            res.send(error)
        }
    }, */


    list: async (req, res) => {

        try {
            let productos = await Producto.findAll({include: "category"})
            if(productos) {
                let allProducts = [];

                productos.forEach(producto => {
                    allProducts.push({
                        id: producto.id,
                        name: producto.name,
                        price: producto.price,
                        discount: producto.discount,
                        stock: producto.stock,
                        categoryid: producto.categoryid,
                        description: producto.description,
                        image: producto.image,
                        user_id: producto.user_id,
                        category: producto.category,
                        imageURL: "http://localhost:4000/api/producto/images/" + producto.id
                    })
                });

                let respuesta = {
                    meta: {
                        status: 200,
                        msg: "Carga completada",
                        total: allProducts.length,
                        url: "http://localhost:4000/api/producto"
                    },
                    data: {
                        allProducts
                    }
                };

                res.status(200).json(respuesta);

            } else {
                res.status(400).json({
                    meta: {
                        status: 400,
                        msg: "Ocurrió un error"
                    }
                })
            };
        } catch (error) {
            res.json(error)
        }
    },
/*     allCategories: (req, res) => {
        Categoria.findAll()
            .then((categoria) => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: categoria.length,
                        url: '/api/producto/categoria'
                    }, data: categoria
                }

                res.status(200).json(respuesta)
            })
    }, */
/*     Usuarios: (req, res) => {
        Usuario.findAll()
            .then((Usuario) => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: Usuario.length,
                        url: '/api/Usuario'
                    }, data: Usuario
                }

                res.status(200).json(respuesta)
            }).catch((error) => res.status(400).send(error))


    }, */
/*     unUsuario: (req, res) => {
        Usuario.findByPk(req.params.id)
            .then((Usuario) => {
                if (Usuario) {
                    let respuesta = {
                        meta: {
                            status: 200,
                            total: Usuario.length,
                            url: '/api/Usuario/:id'
                        }, data: Usuario
                    }

                    res.status(200).json(respuesta)
                } else {
                    return res.status(404).json({
                        meta: {
                            status: 404,
                            msg: "Not found",
                        },
                    });
                }
            })
            .catch((error) => res.status(400).send(error));
    } */
}