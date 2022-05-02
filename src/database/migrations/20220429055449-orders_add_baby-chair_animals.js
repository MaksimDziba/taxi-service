'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'transportationAnimals', {
      type: Sequelize.DataTypes.BOOLEAN,
    });
    await queryInterface.addColumn('orders', 'babyChair', {
      type: Sequelize.DataTypes.BOOLEAN,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('orders', 'transportationAnimals', {
          transaction: t,
        }),
        queryInterface.removeColumn('orders', 'babyChair', {
          transaction: t,
        }),
      ]);
    });
  },
};
