'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addIndex('customers', ['email'], {
        name: 'customers_email',
        unique: true,
      }, { transaction: t });
      await queryInterface.addIndex('customers', ['phone_number'], {
        name: 'customers_phone_number',
        unique: true,
      }, { transaction: t });
      await t.commit();
    } catch (err) {
      await t.rollback();
    }
  },
  async down (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeIndex('customers', ['email'], { transaction: t });
      await queryInterface.removeIndex('customers', ['phone_number'], { transaction: t });
      await t.commit();
    } catch (err) {
      await t.rollback();
    }
  },
};
