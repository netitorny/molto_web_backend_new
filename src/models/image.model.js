module.exports = ( sequelize , Sequelize) => {
    const image = sequelize.define(
        'image',
        {
            id_pictures: { type: Sequelize.INTEGER(), primaryKey: true, autoIncrement: true, field: 'id_pictures' },
            id_products: { type: Sequelize.INTEGER(), allowNull: true, field: 'id_products' },
            shelves_color: { type: Sequelize.STRING(100), allowNull: true, field: 'shelves_color' },
            shelves_color_en: { type: Sequelize.STRING(100), allowNull: true, field: 'shelves_color_en' },
            shelves_color_cn: { type: Sequelize.STRING(100), allowNull: true, field: 'shelves_color_cn' },
            img_path: { type: Sequelize.STRING(100), allowNull: true, field: 'img_path' },
            main_color: { type: Sequelize.BOOLEAN(), allowNull: true, field: 'main_color' },
            main: { type: Sequelize.BOOLEAN(), allowNull: true, field: 'main' },
            folder: { type: Sequelize.STRING(100), allowNull: true, field: 'folder' },
            out_of_stock: { type: Sequelize.BOOLEAN(), allowNull: true, field: 'out_of_stock' },
        },
    {
        tableName: 'image' 
    }
  );
  
  return image;
}