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
            
        },
    {
        tableName: 'questions' 
    }
  );
  
  return questions;
}