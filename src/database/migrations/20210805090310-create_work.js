'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('work', {
            id_work: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_before: {
                type: Sequelize.INTEGER
            },
            id_after: {
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            lock: {
                type: Sequelize.BOOLEAN
            },

            id_process: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'process'
                    },
                    key: 'id_process'
                },
                allowNull: false
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('work');
    }
};