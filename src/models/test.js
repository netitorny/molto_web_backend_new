module.exports = ( sequelize , Sequelize) => {
    const test = sequelize.define(
        'test',
        {
            id: { type: Sequelize.INTEGER(), primaryKey: true, autoIncrement: true, field: 'id' },
            name: { type: Sequelize.STRING(10), allowNull: true, field: 'name' },
        },
    {
        tableName: 'test' 
    }
  );
  
  return test;
}