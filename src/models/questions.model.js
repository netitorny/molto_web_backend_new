module.exports = ( sequelize , Sequelize) => {
    const questions = sequelize.define(
        'questions',
        {
            id: { type: Sequelize.INTEGER(), primaryKey: true, autoIncrement: true, field: 'id' },
            question: { type: Sequelize.STRING(500), allowNull: true, field: 'question' },
            question_en: { type: Sequelize.STRING(500), allowNull: true, field: 'question_en' },
            question_cn: { type: Sequelize.STRING(500), allowNull: true, field: 'question_cn' },
            topic: { type: Sequelize.STRING(500), allowNull: true, field: 'topic' },
            topic_en: { type: Sequelize.STRING(500), allowNull: true, field: 'topic_en' },
            topic_cn: { type: Sequelize.STRING(500), allowNull: true, field: 'topic_cn' },
            lists: { type: Sequelize.JSON(), allowNull: true, field: 'lists' },
            lists_en: { type: Sequelize.JSON(), allowNull: true, field: 'lists_en' },
            lists_cn: { type: Sequelize.JSON(), allowNull: true, field: 'lists_cn' },
            img: { type: Sequelize.STRING(100), allowNull: true, field: 'img' },
            img_en: { type: Sequelize.STRING(100), allowNull: true, field: 'img_en' },
            img_cn: { type: Sequelize.STRING(100), allowNull: true, field: 'img_cn' },
            slug: { type: Sequelize.STRING(150), allowNull: true, field: 'slug' },
            alt: { type: Sequelize.STRING(150), allowNull: true, field: 'alt' },
            title: { type: Sequelize.STRING(500), allowNull: true, field: 'title' },
            title_en: { type: Sequelize.STRING(500), allowNull: true, field: 'title_en' },
            title_cn: { type: Sequelize.STRING(500), allowNull: true, field: 'title_cn' },
            label: { type: Sequelize.STRING(500), allowNull: true, field: 'label' },
            label_en: { type: Sequelize.STRING(500), allowNull: true, field: 'label_en' },
            label_cn: { type: Sequelize.STRING(500), allowNull: true, field: 'label_cn' },
            seo_descriptions: { type: Sequelize.STRING(200), allowNull: true, field: 'seo_descriptions' },
        },
    {
        tableName: 'questions' 
    }
  );
  
  return questions;
}