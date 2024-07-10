module.exports = (sequelize, Sequelize) => {
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
            alt: { type: Sequelize.STRING(100), allowNull: true, field: 'alt' },
            date_order: { type: Sequelize.DATE, allowNull: true, field: 'date_order' },
            enable: { type: Sequelize.BOOLEAN(), allowNull: true, default: true, field: 'enable' },
            // createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), },
            // updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), },
            // deletedAt: { type: Sequelize.DATE, allowNull: true, }
        },
        {
            tableName: 'promotions',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
            timestamps: true,
        }
    );

    return promotions;
}