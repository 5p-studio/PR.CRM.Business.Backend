'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn('customers', 'is_locked', {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      }, { transaction: t });
      await queryInterface.changeColumn('employees', 'is_locked', {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      }, { transaction: t });
      await queryInterface.changeColumn('history', 'interactive_object', {
        type: Sequelize.INTEGER,
      }, { transaction: t });
      await queryInterface.changeColumn('customers', 'group', {
        type: Sequelize.INTEGER,
      }, { transaction: t });
      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  },

  down: async (queryInterface, Sequelize) => {
  },
};
