'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('employees', [{
      id: 1,
      first_name: 'van',
      last_name: 'phi',
      email: 'phivan@gmail.com',
      password: '123456',
      salary_per_hour: 20000,
      phone_number: '0123456789',
      facebook: 'fb.com/phivan',
      linkedln: 'van phi',
      skype: '0123456789',
      signature_email: 'van phi 2233',
      avatar:'',
      is_locked: false,
      id_role: 1,
      id_department: 1,
      created_at: new Date(),
      updated_at: new Date()
    }]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('employees', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
