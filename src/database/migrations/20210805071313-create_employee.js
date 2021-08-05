'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('employee', {
            id_employee: {
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
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            salary_per_hour: {
                type: Sequelize.FLOAT
            },
            phonenumber: {
                type: Sequelize.STRING
            },
            facebook: {
                type: Sequelize.STRING
            },
            linkedln: {
                type: Sequelize.STRING
            },
            skype: {
                type: Sequelize.STRING
            },
            signature_email: {
                type: Sequelize.STRING
            },
            avatar: {
                type: Sequelize.STRING
            },
            lock: {
                type: Sequelize.BOOLEAN
            },
            id_permision: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'permision'
                    },
                    key: 'id_permision'
                },
                allowNull: false
            },
            id_department: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'department'
                    },
                    key: 'id_department'
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
        await queryInterface.dropTable('employee');
    }
};