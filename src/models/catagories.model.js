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
            alt: { type: Sequelize.STRING(100), allowNull: true, field: 'alt' },
            title: { type: Sequelize.STRING(500), allowNull: true, field: 'title' },
            title_en: { type: Sequelize.STRING(500), allowNull: true, field: 'title_en' },
            title_cn: { type: Sequelize.STRING(500), allowNull: true, field: 'title_cn' },
            seo_descriptions: { type: Sequelize.STRING(500), allowNull: true, field: 'seo_descriptions' },
            name_descriptions: { type: Sequelize.STRING(500), allowNull: true, field: 'name_descriptions' },
            name_descriptions_en: { type: Sequelize.STRING(500), allowNull: true, field: 'name_descriptions_en' },
            name_descriptions_cn: { type: Sequelize.STRING(500), allowNull: true, field: 'name_descriptions_cn' },
            // createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), field: 'created_at' },
            // updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), field: 'updated_at' },
            // deletedAt: { type: Sequelize.DATE, allowNull: true, field: 'deleted_at' }
        },
    {
        tableName: 'catagories' ,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
        timestamps: true,
    }
  );
  
  return catagories;
}