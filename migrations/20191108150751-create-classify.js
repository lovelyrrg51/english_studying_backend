/* Written by Pooh, 2019-11-08 */

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Classifies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    /* Added by Pooh, 2019-11-11 */
    return queryInterface.bulkInsert('Classifies', [{
      name: 'Greetings',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Boring',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Glad',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Classifies');
  }
};