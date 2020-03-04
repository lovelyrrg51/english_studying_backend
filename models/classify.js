/* Written by Pooh, 2019-11-08 */

'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Classify = sequelize.define('Classify', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {});
  Classify.associate = function(models) {
    // associations can be defined here
  };
  return Classify;
};