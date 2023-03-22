module.exports = ( sequelize , Sequelize) => {
    const promotions = sequelize.define(
        'promotions',
        {
            id: { type: Sequelize.INTEGER(), primaryKey: true, autoIncrement: true, field: 'id' },
            promotions: { type: Sequelize.STRING(100), allowNull: true, field: 'promotions' },
            promotions_en: { type: Sequelize.STRING(100), allowNull: true, field: 'promotions_en' },
            promotions_cn: { type: Sequelize.STRING(100), allowNull: true, field: 'promotions_cn' },
            image: { type: Sequelize.STRING(100), allowNull: true, field: 'image' },
            image_en: { type: Sequelize.STRING(100), allowNull: true, field: 'image_en' },
            image_cn: { type: Sequelize.STRING(100), allowNull: true, field: 'image_cn' },
            month: { type: Sequelize.INTEGER(), allowNull: true, field: 'month' },
            alt: { type: Sequelize.STRING(100), allowNull: true, field: 'alt' }
        },
    {
        tableName: 'promotions' 
    }
  );
  
  return promotions;
}