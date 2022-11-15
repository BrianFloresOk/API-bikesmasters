const createError = require('http-errors')
const express = require('express');
const app = express();
const logger = require("morgan")
require('dotenv').config();
const PORT = process.env.PORT || 4000;
/* const methodOverride =  require('method-override'); */ // Pasar poder usar los métodos PUT y DELETE
const cors = require('cors')
const path = require("path")

/* SWAGGER para documentar API */
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node MySql DB",
            version: "1.0.0"
        },
        servers: [
            {
                url: `http://localhost${PORT}`
            }
        ]
    },
    apis: [         //Aqui van donde estan las rutas de la api
        `${path.join(__dirname, "./routes/*.js")}`
    ]
}

/****** ROUTES ******/

const indexRoute = require("./routes/indexRouter")
const productsRoutes = require("./routes/productsRouter")
const usersRoutes = require("./routes/usersRouter")
const categoriesRoutes = require("./routes/categoriesRouter")

/* Middlewares */
app.use(express.urlencoded({extended: false}));
/* app.use(methodOverride('_method')); */
app.use(express.json());
app.use(logger('dev'))
app.use(cors())

// Middlware de swagger
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)))

///Ruta de APIS///
app.use('/api', indexRoute)
app.use("/api/productos", productsRoutes);
app.use("/api/usuarios", usersRoutes)
app.use("/api/categorias", categoriesRoutes)

app.use((req, res, next) => {
    next(createError(404))
  })

console.log(PORT);

app.listen(PORT, () => console.log( `Servidor levantado en el puerto ${PORT}
http://localhost:${PORT}`))