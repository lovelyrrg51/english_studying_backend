/* Written by Pooh, 2019-11-08 */

'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    idiomId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    type: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
  };
  return Like;
};