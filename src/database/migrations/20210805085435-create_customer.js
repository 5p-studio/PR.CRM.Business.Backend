'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('customer', {
            id_customer: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            first_name: {
                type: Sequelize.STRING
            },
            last_name: {
                type: Sequelize.STRING
            },
            phone_number: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            facebook: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            group: {
                type: Sequelize.STRING
            },
            lock: {
                type: Sequelize.BOOLEAN
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
        await queryInterface.dropTable('customer');
    }
};