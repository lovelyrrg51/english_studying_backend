// Written by Pooh, 2019-11-08
// Updated by Bluepine, 2019-11-22

const models = require('../models');
const { errorResponse, reducedErrorMessage } = require('../modules/utils');

exports.getList = (req, res) => {
  return models.Classify.findAll()
    .then((classifyList) => res.json({ status: 'ok', classifyList: classifyList }))
    .catch(err => errorResponse(res, reducedErrorMessage(err)));
};

// Author: LionKing, 2019-11-13
exports.createClassify = (req, res) => {
  const name = req.body.name;

  models.Classify.findOne({
    where: {
      name: {
        $eq: name
      },
    }
  }).then((Classify) => {
    // console.log('bluepine#######################1',name);

    if(Classify) return res.json({result:false, message:'Duplicate'});
    else {
      models.Classify.create({
          name: req.body.name
      })  
      .then( function ( classify ) {
        res.json({ result: 'true' });
      })
      .catch(err => errorResponse(res, reducedErrorMessage(err)));
    }
  }).catch(err => errorResponse(res, reducedErrorMessage(err)));
};

exports.deleteClassify = (req, res) => {
  const requestId = parseInt(req.body.id, 10);

  models.Classify.findOne({
    where: {
      id: {
        $eq: requestId
      },
    }
  }).then((Classify) => {
    if(!Classify) return res.json({result:false, message:'Not find the classify'});
    else {
      models.Classify.destroy({
        where: { id: requestId }
      })  
      .then( function ( classify ) {
        res.json({ result: 'true' });
      })
      .catch(err => errorResponse(res, reducedErrorMessage(err)));;
    }
        
  }).catch(err => errorResponse(res, reducedErrorMessage(err)));
};

exports.updateClassify = (req, res) => {
  const requestId = parseInt(req.body.id, 10);

  models.Classify.findOne({
    where: {
      id: {
        $eq: requestId
      }
    }
  }).then((Classify) => {
    if (!Classify) return res.json({result:false, message:'Not find the classify'});
    else {
      Classify.update({
        name: req.body.name
      })  
      .then( function ( classify ) {
        res.json({ result: 'true' });
      })
      .catch(err => errorResponse(res, reducedErrorMessage(err)));;
    }
        
  }).catch(err => errorResponse(res, reducedErrorMessage(err)));
};