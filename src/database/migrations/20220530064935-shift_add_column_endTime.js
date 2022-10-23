'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('shifts', 'endTime', {
      type: Sequelize.DataTypes.DATE,
    });
  },

  async down(queryInterface) {
    queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('shifts', 'endTime', {
          transaction: t,
        }),
      ]);
    });
  },
};
