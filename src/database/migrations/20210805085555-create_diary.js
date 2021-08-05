'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('diary', {
            id_permision_detail: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            content: {
                type: Sequelize.STRING
            },
            id_employee: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'employee'
                    },
                    key: 'id_employee'
                },
                allowNull: false
            },
            id_customer: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'customer'
                    },
                    key: 'id_customer'
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
        await queryInterface.dropTable('diary');
    }
};