module.exports = ( sequelize , Sequelize) => {
    const videos = sequelize.define(
        'videos',
        {
            id: { type: Sequelize.INTEGER(), primaryKey: true, autoIncrement: true, field: 'id' },
            video_path: { type: Sequelize.STRING(100), allowNull: true, field: 'video_path' },
            name: { type: Sequelize.STRING(100), allowNull: true, field: 'name' },
            img_path: { type: Sequelize.STRING(100), allowNull: true, field: 'img_path' },
            name_en: { type: Sequelize.STRING(100), allowNull: true, field: 'name_en' },
            name_cn: { type: Sequelize.STRING(100), allowNull: true, field: 'name_cn' },
        },
    {
        tableName: 'videos' 
    }
  );
  
  return videos;
}