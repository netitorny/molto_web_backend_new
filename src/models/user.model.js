module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define(
        "users",
        {
            id: { type: Sequelize.INTEGER(), primaryKey: true, autoIncrement: true, field: 'id' },
            username: { type: Sequelize.STRING(20), allowNull: true, field: 'username' },
            password: { type: Sequelize.STRING(20), allowNull: true, field: 'password' },
        });
  
    return users;
  };