'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('shifts', 'orderID', {
      type: Sequelize.DataTypes.INTEGER,
    });
  },

  async down(queryInterface) {
    queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('shifts', 'orderID', {
          transaction: t,
        }),
      ]);
    });
  },
};
