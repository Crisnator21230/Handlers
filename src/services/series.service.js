const Boom = require('@hapi/boom');
const serie_model= require('../models/series_tv.model')

class SerieService{
  async createSerie(new_serie){
    new_serie.save();
    return new_serie;
  }

  async listSerie(){
    return serie_model.find();
  }

  async showSerie(serieId){
    return serie_model.findById({_id : serieId}).then((serieFind)=> {
      if(!serieFind)throw Boom.notFound('no se encontro la serie');
      return serieFind;
    })
  }

  listarSeries3Seconds(){
    return new Promise((resolve)=>{
      setTimeout(()=>{
      resolve(serie_model.find());
    }, 3000);
  });
  }

  async updateSerie(serieId,serie,number_seasons,original_language,features_seasons){
    return serie_model.findById({_id : serieId}).then((serieFind)=> {
      if(!serieFind)throw Boom.notFound('no se encontro la serie');
      return serie_model.updateOne(
        { _id: serieId },
        {serie,number_seasons,original_language,features_seasons}
      );
    })
  }

  async removeSerie(serieId){
    return serie_model.findById({_id : serieId}).then((serie)=> {
      if(!serie)throw Boom.notFound('no se encontro la serie');
      return serie_model.deleteOne(serie);
    })
  }
}

module.exports= SerieService