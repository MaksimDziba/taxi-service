'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'status', {
      type: Sequelize.DataTypes.STRING,
    });
  },

  async down(queryInterface) {
    queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('orders', 'status', {
          transaction: t,
        }),
      ]);
    });
  },
};
