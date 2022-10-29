const express = require('express');
const app = express();
const logger = require("morgan")
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
/* const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors'); */

/****** ROUTES ******/

const indexRoute = require("./routes/indexRouter")
const productsRoutes = require("./routes/productsRouter")
const usersRoutes = require("./routes/usersRouter")
const categoriesRoutes = require("./routes/categoriesRouter")

/* Middlewares */
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(logger('dev'))
/* app.use(cors()) */

///Ruta de APIS///
app.use('/api', indexRoute)
app.use("/api/productos", productsRoutes);
app.use("/api/usuarios", usersRoutes)
app.use("/api/categorias", categoriesRoutes)

app.use((req, res, next) => {
    res.status(404).json('not-found');
    next()
})


app.listen(PORT, () => console.log( `Servidor levantado en el puerto ${PORT}
http://localhost:${PORT}`))