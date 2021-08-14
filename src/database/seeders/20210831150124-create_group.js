'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const group = [];
    group.push(
      {
        id: 1,
        name: 'Nhom 1',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Nhom 2',
        created_at: new Date(),
        updated_at: new Date(),
      },
    );
    await queryInterface.bulkInsert('groups', group, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('groups', null, {});
  },
};
