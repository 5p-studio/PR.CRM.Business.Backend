'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('history', 'id_employee',
        {
          type: Sequelize.INTEGER,
        },
        { transaction: t },
      );
      await queryInterface.addColumn('customers', 'id_employee',
        {
          type: Sequelize.INTEGER,
        },
        { transaction: t },
      );
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('customers', 'id_employee', { transaction: t });
      await queryInterface.removeColumn('history', 'id_employee', { transaction: t });
      await t.commit();
    } catch (err) {
      await t.rollback();
    }
  },
};
