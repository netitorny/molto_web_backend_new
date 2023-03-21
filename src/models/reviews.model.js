module.exports = ( sequelize , Sequelize) => {
    const reviews = sequelize.define(
        'reviews',
        {
            reviews_id: { type: Sequelize.INTEGER(), primaryKey: true, autoIncrement: true, field: 'reviews_id' },
            reviews_topics: { type: Sequelize.STRING(200), allowNull: true, field: 'reviews_topics' },
            reviews_topics_en: { type: Sequelize.STRING(200), allowNull: true, field: 'reviews_topics_en' },
            reviews_topics_cn: { type: Sequelize.STRING(200), allowNull: true, field: 'reviews_topics_cn' },
            slug_reviews: { type: Sequelize.STRING(150), allowNull: true, field: 'slug_reviews' },
        },
    {
        tableName: 'reviews' 
    }
  );
  
  return reviews;
}