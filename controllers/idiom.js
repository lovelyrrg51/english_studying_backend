/* Written by Pooh, 2019-11-08 */

const models = require('../models');
const { errorResponse, reducedErrorMessage } = require('../modules/utils');

exports.getList = (req, res) => {
  return models.Idiom.findAll()
    .then((idioms) => res.json({ status: 'ok', idioms: idioms }))
    .catch(err => errorResponse(res, reducedErrorMessage(err)));
};

exports.createIdiom = (req, res) => {
    models.Idiom.create({
        classifyId: req.body.classifyId,
        title: req.body.title,
        description: req.body.description,
        example: req.body.example,
        userId: 1,
        likeCount: 0,
        dislikeCount: 0
    })
    .then( function ( idiom ) {
        res.json( { status: 'ok', idiom : idiom} );
    })
    .catch(err => errorResponse(res, reducedErrorMessage(err)));
};

exports.updateIdiom = (req, res) => {
    if (req.body.id === undefined) {
        errorResponse(res, "Please input a idiom id");
    } else {
        if ( req.body.isLike === 1 ) {
            models.Like.create({
                userId: req.body.ownUserId,
                idiomId: req.body.id
            })
            .then( function ( idiom ) {
                models.Idiom.update(
                    { 
                        likeCount: req.body.likeCount
                    },
                    { where: { id: req.body.id } }
                )
                .then( function ( idiom ) {
                    if ( Math.max(...idiom) === 1 ) {
                        models.Idiom.findOne({
                            where: {
                                id: req.body.id,
                            }
                        })
                        .then(idiom => {
                            res.json({
                                status: 'ok',
                                idiom: idiom
                            });
                        });
                    } else {
                        res.json( {status: 'failed'} );
                    }
                })
                .catch(err => errorResponse(res, reducedErrorMessage(err)));
            })
            .catch(err => errorResponse(res, reducedErrorMessage(err)));            
        } else {
            models.Idiom.update(
                { 
                    classifyId: req.body.classifyId,
                    title: req.body.title,
                    description: req.body.description,
                    example: req.body.example
                },
                { where: { id: req.body.id } }
            )
            .then( function ( idiom ) {
                if ( Math.max(...idiom) === 1 ) {
                    models.Idiom.findOne({
                        where: {
                            id: req.body.id,
                        }
                    })
                    .then(idiom => {
                        res.json({
                            status: 'ok',
                            idiom: idiom
                        });
                    })
                    .catch(err => errorResponse(res, reducedErrorMessage(err)));
                } else {
                    res.json( {status: 'failed'} );
                }
            })
            .catch(err => errorResponse(res, reducedErrorMessage(err)));
        }
    }
};

exports.deleteIdiom = (req, res) => {
  console.log("--------------", req.body.id);
  // return;
  if (req.body.id === undefined) {
    errorResponse(res, "Please input a idiom id");
  } else {
    const id = req.body.id;
    models.Idiom.destroy({
      where: { id: id }
    })
    .then(deletedOwner => {
      console.log(deletedOwner);
      res.json(deletedOwner);
    });
  }
};