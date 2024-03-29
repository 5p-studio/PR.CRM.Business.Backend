module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addIndex('employees', ['email'], {
        name: 'employees_email',
        unique: true,
      }, { transaction: t });
      await queryInterface.addIndex('employees', ['phone_number'], {
        name: 'employees_phone_number',
        unique: true,
      }, { transaction: t });
      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  },
  async down (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeIndex('employees', ['email'], { transaction: t });
      await queryInterface.removeIndex('employees', ['phone_number'], { transaction: t });
      await t.commit();
    } catch (err) {
      await t.rollback();
    }
  },
};
