'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    for (let i = 1; i <= 10; i++) {
      const department = {
        id: i,
        name: 'phong ' + i,
        created_at: new Date(),
        updated_at: new Date(),
      };
      data.push(department);
    }
    await queryInterface.bulkInsert('departments', data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('departments', null, {});
  },
};
