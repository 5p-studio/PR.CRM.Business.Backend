'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const customers = [];
    for (let i = 11; i < 35; i++) {
      customers.push({
        id_employee: 1,
        first_name: `first_name_${i - 10}`,
        last_name: `last_name_${i - 10}`,
        email: `customer_${i - 10}@gmail.st.com`,
        phone_number: `03468963${i}`,
        facebook: 'hf ad',
        status: 'status 1',
        group: 1,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert('customers', customers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customers', null, {});
  },
};
