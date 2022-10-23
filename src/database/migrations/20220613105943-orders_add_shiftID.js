'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'shiftID', {
      type: Sequelize.DataTypes.INTEGER,
    });
  },

  async down(queryInterface) {
    queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('orders', 'shiftID', {
          transaction: t,
        }),
      ]);
    });
  },
};
