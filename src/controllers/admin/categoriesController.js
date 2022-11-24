const { Category } = require("../../database/models")
require('dotenv').config();
const PORT = process.env.PORT || 4000;

module.exports = {
    list: async (req, res) => {
        try {
            let categories = await Category.findAll()
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
                        url: `http://localhost:${PORT}/api/admin/categorias`,
                        total: categories.length
                    },
                    data: categories
                }
                res.status(200).json(response)
            }
        } catch (error) {
            res.json(error)
        }
    },

    createCategory: async (req, res) => {
        const { name } = req.body;
        try {
            let category = await Category.create({ name });

            if (!category) {
                res.status(200).json({
                    meta: {
                        status: 400,
                        msg: "Ocurrió un error"
                    }
                })
            };
            let response = {
                meta: {
                    status: 200,
                    message: "Categoria creada correctamente"
                },
                data: category
            };

            res.status(200).json(response)

        } catch (error) {
            res.json(error.message)
        }
    },

    getOneCategory: async (req, res) => {
        const categoryId = req.params.id;
        try {
            const category = await Category.findByPk(categoryId, {
                include: "productos"
            });

            if (!category) {
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

            let response = {
                meta: {
                    meta: 200,
                    message: "Carga completa",
                    products_category: "Hay " + category.productos.length + " productos en esta categoría"
                },

                data: {
                    category
                }
            }

            res.status(200).json(response)

        } catch (error) {
            res.json(error)
        }
    },

    editCategory: async (req, res) => {
        const { name } = req.body;
        const { id } = req.params;
        try {
            let categoryExist = await Category.findByPk(id)
            if(categoryExist) {
                let category = await Category.update({
                    name
                }, {
                    where: {
                        id: categoryExist.id
                    }
                });
    
                if (!category) {
                    res.status(200).json({
                        meta: {
                            status: 400,
                            msg: "Ocurrió un error"
                        }
                    })
                };
    
                let categoryUpdated = await Category.findByPk(categoryExist.id)
    
                let response = {
                    meta: {
                        status: 200,
                        message: `La categoria ${categoryExist.name} paso a llamarse ${categoryUpdated.name}`
                    },
                    data: categoryUpdated
                };
    
                res.status(200).json(response);

            } else {
                res.status(200).json({
                    meta: {
                        status: 400,
                        message: "No es posibles realizar esta acción"
                    }
                })
            };


        } catch (error) {
            res.json(error.message)
        }
    },

    deleteCategory: async (req, res) => {
        const categoryId = req.params.id;
        try {
            const category = await Category.findByPk(categoryId);
            if(category) {
                await Category.destroy({
                    where: {
                        id: category.id
                    }
                });
    
                let response = {
                    meta: {
                        status: 200,
                        message: `Se elimino el rol: ${category.name}`
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
            res.json(error.message)
        }
    }

}