module.exports = (sequelize, Sequelize) => {
    const sim_users = sequelize.define(
        "sim_users",
        {
            id: { type: Sequelize.INTEGER(), primaryKey: true, autoIncrement: true, field: 'id' },
            name: { type: Sequelize.TEXT, allowNull: true, field: 'name' },
            surname: { type: Sequelize.TEXT, allowNull: true, field: 'surname' },
            email: { type: Sequelize.TEXT, allowNull: true, field: 'email' },
            phoneNum: { type: Sequelize.TEXT, allowNull: true, field: 'phoneNum' },
            password: { type: Sequelize.TEXT, allowNull: true, field: 'password' },
            savedData: { type: Sequelize.TEXT, allowNull: true, field: 'savedData' },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), field: 'createdAt' },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), field: 'updatedAt' },
        });

    return sim_users;
};