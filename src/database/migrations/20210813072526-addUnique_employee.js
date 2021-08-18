module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('employees', ['email'], {
      name: 'employees_email',
      unique: true,
    });
    await queryInterface.addIndex('employees', ['phone_number'], {
      name: 'employees_phone_number',
      unique: true,
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('employees', ['email']);
    await queryInterface.removeIndex('employees', ['phone_number']);
  },
};
