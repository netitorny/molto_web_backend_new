module.exports = ( sequelize , Sequelize) => {
    const reviews_image = sequelize.define(
        'reviews_image',
        {
            image_id: { type: Sequelize.INTEGER(), primaryKey: true, autoIncrement: true, field: 'image_id' },
            reviews_id: { type: Sequelize.INTEGER(), allowNull: true, field: 'reviews_id' },
            folder: { type: Sequelize.STRING(150), allowNull: true, field: 'folder' },
            image_path: { type: Sequelize.STRING(150), allowNull: true, field: 'image_path' },
            main: { type: Sequelize.BOOLEAN(), allowNull: true, field: 'main' },
            
        },
    {
        tableName: 'reviews_image' 
    }
  );
  
  return reviews_image;
}