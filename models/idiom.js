/* Written by Pooh, 2019-11-08 */

'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Idiom = sequelize.define('Idiom', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    classifyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    example: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        notEmpty: true
      }
    },
    likeCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty: true
      }
    },
    dislikeCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty: true
      }
    },
  }, {});
  Idiom.associate = function(models) {
    // associations can be defined here
  };
  return Idiom;
};