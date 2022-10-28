const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
/* const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors'); */

const apiRouter = require("../src/routes/apiRoutes")

/* Views config */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

/* Middlewares */
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(express.json());
/* app.use(cors()) */

///Ruta de APIS///
app.use('/api' , apiRouter);

app.use((req, res, next) => {
    res.status(404).json('not-found');
    next()
})


app.listen(PORT, () => console.log( `Servidor levantado en el puerto ${PORT}
http://localhost:${PORT}`))