module.exports = ( sequelize , Sequelize) => {
    const catagories = sequelize.define(
        'catagories',
        {
            id_catagories: { type: Sequelize.INTEGER(), primaryKey: true, autoIncrement: true, field: 'id_catagories' },
            name_catagories: { type: Sequelize.STRING(150), allowNull: true, field: 'name_catagories' },
            image_catagories: { type: Sequelize.STRING(150), allowNull: true, field: 'image_catagories' },
            banner: { type: Sequelize.STRING(150), allowNull: true, field: 'banner' },
            main: { type: Sequelize.INTEGER(), allowNull: true, field: 'main' },
            order: { type: Sequelize.INTEGER(), allowNull: true, field: 'order' },
            slug_catagory: { type: Sequelize.STRING(150), allowNull: true, field: 'slug_catagory' },
        },
    {
        tableName: 'catagories' 
    }
  );
  
  return catagories;
}