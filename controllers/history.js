const httpStatus = require('http-status');
const Sequelize = require('sequelize');
const models = require('../models');
const { reducedErrorMessage, errorResponse } = require('../modules/utils');

const Ops = Sequelize.Op;

exports.editHistory = (req, res) => {
  res.status(httpStatus.OK).json({ status: 'ok', message: 'Your api is working succesfully' });
};

exports.getHistory = async (req, res) => {
  const startdate = `${req.query.createddate}-01 00:00:00`;
  const enddate = `${req.query.createddate}-31 23:59:59`;
  models.EnglishHistories.findAll({
    where: {
      userId: req.query.userId,
      title: {
        [Ops.like]: `%${req.query.searchtext}%`
      },
      createdAt: {
        [Ops.between]: [startdate, enddate]
      }
    },
    attributes: ['id', 'title', 'createdAt', 'checkAudio']
  }).then((obj) => {
    if(obj) {
      return res.json({ status: req.query.userId, data: obj });
    // eslint-disable-next-line no-else-return
    } else {
      return res.json({ status: req.query.createddate, message: 'no matching' });
    }
  })
    .catch(err => errorResponse(res, reducedErrorMessage(err)));
};
