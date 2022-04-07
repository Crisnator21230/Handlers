const express = require('express');
const serie_routes = require('./series.routes');
const routerApi = (app)=> {
  const dynamic_routes= express.Router();
  app.use('/api/v2',dynamic_routes)
  dynamic_routes.use('/series', serie_routes);
}

module.exports = routerApi;