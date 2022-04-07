const Boom = require('@hapi/boom');
const express=require('express');
const serie_model = require('../models/series_tv.model');
const series_routes= express.Router();
const SerieService = require('../services/series.service');
const _service_serie = new SerieService();

series_routes.post('/serie',async (req,res) => {
  try {
    const new_serie = serie_model(req.body);
    const data_service = _service_serie.createSerie(new_serie);
    res.status(201).json(data_service);
  } catch (error) {
    res.status(500).json( {message: error});
  }
});

series_routes.get('/',async (req,res) => {
  try {
    const data_service = await _service_serie.listSerie();
    res.status(200).json(data_service);
  } catch (error) {
    res.status(404).json( {message: error});
  }
});

series_routes.get('/3Seconds',async (req,res) => {
  try {
    const data_service = await _service_serie.listarSeries3Seconds();
    res.status(201).json(data_service);
  } catch (error) {
    res.status(404).json( {message: error});
  }
});

series_routes.get('/:serieId',async (req,res,next) => {
  try {
    const { serieId } = req.params;
    const data_service = await _service_serie.showSerie(serieId);
    res.status(201).json(data_service);
  } catch (error) {
    next(error);
  }
});

series_routes.put('/:serieId',async (req,res,next) => {
  try {
    const { serieId } = req.params;
    const {serie,number_seasons,original_language,features_seasons} = req.body
    const data_service = await _service_serie.updateSerie(
      serieId,
      serie,
      number_seasons,
      original_language,
      features_seasons
      );
    res.status(201).json(data_service);
  } catch (error) {
    next(error);
  }
});

series_routes.delete('/:serieId',async (req,res,next) => {
  try {
    const { serieId } = req.params;
    const data_service = await _service_serie.removeSerie(serieId);
    res.status(201).json(data_service);
  } catch (error) {
    next(error);
  }
});




module.exports = series_routes;