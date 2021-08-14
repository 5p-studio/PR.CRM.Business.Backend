'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const employees = [];
    for (let i = 1; i < 10; i++) {
      employees.push({
        first_name: 'first_name ' + i,
        last_name: 'last_name ' + i,
        email: 'email' + i + '@gmail.com',
        password: 'password' + i,
        salary_per_hour: 20000,
        phone_number: `012345678${i}`,
        facebook: '',
        linkedln: '',
        skype: '',
        signature_email: 'NV' + i,
        avatar: '',
        id_role: 1,
        id_department: 1,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert('employees', employees, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('employees', null, {});
  },
};
