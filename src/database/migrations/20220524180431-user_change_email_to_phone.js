'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn('users', 'email', 'phone');
  },

  async down(queryInterface) {
    await queryInterface.renameColumn('users', 'phone', 'email');
  },
};
