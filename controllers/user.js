const models = require('../models');
const { reducedErrorMessage, errorResponse } = require('../modules/utils');

exports.singupUser = async (req, res) => { // eslint-disable-line
  models.user.create({
    userid: req.query.userid,
    email: req.query.email,
    password: req.query.password
  }).then((obj) => 
    {
      if(obj)
      {
        return res.json({ status: 'ok', data: obj});
      }
      else
      {
        return res.json({ status: 'fail', message: "user signup failed"});
      }
    }
  )
};


exports.loginUser = async (req, res) => { // eslint-disable-line
  models.user.findOne({
    where: {userid: req.query.userid, password: req.query.password},
    attributes: ['id', 'userid', 'email']
  }).then((obj) =>
    {
      if(obj)
      {
        return res.json({ status: 'ok', data: obj});
      }
      else
      {
        return res.json({ status: 'ok', message: "no matching userid"});
      }
    }
  )
};
