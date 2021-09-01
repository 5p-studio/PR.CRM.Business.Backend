'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    for (let i = 1; i <= 10; i++) {
      for (let index = 1; index <= 5; index++) {
        const stt = i * 5 + index;
        const emp = {
          id: stt,
          first_name: 'nv ' + stt,
          last_name: '',
          email: 'email' + stt + '@gmail.com',
          password: 'password' + stt,
          salary_per_hour: 20000,
          phone_number: '012345678' + stt,
          facebook: '',
          linkedln: '',
          skype: '',
          signature_email: 'NV' + stt,
          avatar: '',
          is_locked: false,
          id_role: 1,
          id_department: i,
          created_at: new Date(),
          updated_at: new Date(),
        };
        data.push(emp);
      }
    }
    await queryInterface.bulkInsert('employees', data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('employees', null, {});
  },
};
