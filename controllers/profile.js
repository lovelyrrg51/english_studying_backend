const models = require('../models');
const { reducedErrorMessage, errorResponse } = require('../modules/utils');

exports.createProfile = async (req, res) => { // eslint-disable-line
  models.profile.create({
    user_id: req.query.user_id,
    first_name: req.query.first_name,
    last_name: req.query.last_name,
    bio: req.query.bio,
    portfolio: req.query.portfolio
  }).then((obj) => 
    {
      if(obj)
      {
        return res.json({ status: 'ok', data: obj});
      }
      else
      {
        return res.json({ status: 'fail', message: "profile create failed"});
      }
    }
  )
};

exports.readProfile = async (req, res) => { // eslint-disable-line
  models.profile.findOne({
    where: {user_id: req.query.user_id},
    attributes: ['id', 'first_name', 'last_name', 'bio', 'portfolio']
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

exports.updateProfile = async (req, res) => { // eslint-disable-line
  models.profile.find({
    where: {user_id: req.query.user_id},
  }).then((obj) => 
    {
      if(obj)
      {
        obj.update(
          {
            first_name: req.query.first_name,
            last_name: req.query.last_name,
            bio: req.query.bio,
            portfolio: req.query.portfolio
          }
        )
        return res.json({ status: 'ok', data: "update success"});
      }
      else
      {
        return res.json({ status: 'ok', message: "update failed"});
      }
    }
  )
};

exports.deleteProfile = async (req, res) => { // eslint-disable-line
  models.profile.destroy({
    where: {user_id: req.query.user_id}
  }).then((obj) => 
    {
      if(obj)
      {
        return res.json({ status: 'ok', message: "delete profile successfully"});
      }
      else
      {
        return res.json({ status: 'fail', message: "delete profile failed"});
      }
    }
  )
};

// exports.getMonitorDb = async (req, res) => models.sequelize
//   .authenticate()
//   .then(() => res.json({ status: 'ok', message: 'Db is working now !' }))
//   .catch(err => errorResponse(res, reducedErrorMessage(err)));
