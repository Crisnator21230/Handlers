/* importacion de librerias */
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const {
  logErrors,
  errorHandler,
  boomErrorHandler
} = require('./src/middleweares/errors.handlers');

/* importacion de rutas  */
const routerApi = require('./src/routes')
const port = process.env.PORT;
const app = express();

/* ACtivacion del puerto */
app.listen(port, console.log('Puerto Activo', port));

/* conectamos con la base de datos */
mongoose
  .connect(process.env.MONGODB_STRING_CONNECTION)
  .then(() => console.log('Conexión Exitosa Con Mongo'))
  .catch((err) => console.log(err));

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);
app.use(express.json());

routerApi(app);