'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('Employees', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      positionId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      positionName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Employees');
  }
};
