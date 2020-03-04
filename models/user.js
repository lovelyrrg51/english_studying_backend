const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const user = sequelize.define('user', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
    },
    emailConfirmationToken: {
      type: Sequelize.STRING,
    },
    emailConfirmed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    resetPasswordToken: {
      type: Sequelize.STRING,
    },
    resetPasswordTokenExpiration: {
      type: Sequelize.DATE
    },
  },
  {
    timestamp: true
  });

  user.upsert = (values, condition) => (
    user.findOne({ where: condition })
      .then((obj) => {
        if(obj) {
          return obj.update(values);
        }
        return user.create(values);
      })
  );

  return user;
};
