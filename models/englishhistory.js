const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const EnglishHistory = sequelize.define('EnglishHistories', {
    userId: {
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    checkAudio: {
      type: Sequelize.BOOLEAN,
    }
  });
  return EnglishHistory;
};
