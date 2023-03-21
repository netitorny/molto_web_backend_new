module.exports = ( sequelize , Sequelize) => {
    const products = sequelize.define(
        'products',
        {
            id_products: { type: Sequelize.INTEGER(), primaryKey: true, autoIncrement: true, field: 'id_products' },
            id_catagories: { type: Sequelize.INTEGER(), allowNull: true, field: 'id_catagories' },
            name_catagories: { type: Sequelize.STRING(150), allowNull: true, field: 'name_catagories' },
            name_product: { type: Sequelize.STRING(150), allowNull: true, field: 'name_product' },
            name_product_en: { type: Sequelize.STRING(150), allowNull: true, field: 'name_product_en' },
            name_product_cn: { type: Sequelize.STRING(150), allowNull: true, field: 'name_product_cn' },
            w: { type: Sequelize.FLOAT(), allowNull: true, field: 'w' },
            d: { type: Sequelize.FLOAT(), allowNull: true, field: 'd' },
            h: { type: Sequelize.FLOAT(), allowNull: true, field: 'h' },
            price: { type: Sequelize.FLOAT(), allowNull: true, field: 'price' },
            product_type: { type: Sequelize.STRING(150), allowNull: true, field: 'product_type' },
            discount_price: { type: Sequelize.INTEGER(), allowNull: true, field: 'discount_price' },
            type_color: { type: Sequelize.JSON(), allowNull: true, field: 'type_color' },
            type_color_en: { type: Sequelize.JSON(), allowNull: true, field: 'type_color_en' },
            type_color_cn: { type: Sequelize.JSON(), allowNull: true, field: 'type_color_cn' },
            material: { type: Sequelize.JSON(), allowNull: true, field: 'material' },
            material_en: { type: Sequelize.JSON(), allowNull: true, field: 'material_en' },
            material_cn: { type: Sequelize.JSON(), allowNull: true, field: 'material_cn' },
            properties: { type: Sequelize.JSON(), allowNull: true, field: 'properties' },
            properties_en: { type: Sequelize.JSON(), allowNull: true, field: 'properties_en' },
            properties_cn: { type: Sequelize.JSON(), allowNull: true, field: 'properties_cn' },
            enable: { type: Sequelize.BOOLEAN(), allowNull: true, field: 'enable' },
            out_of_stock: { type: Sequelize.BOOLEAN(), allowNull: true, field: 'out_of_stock' },
            slug_product: { type: Sequelize.STRING(150), allowNull: true, field: 'slug_product' },
            order: { type: Sequelize.INTEGER(), allowNull: true, field: 'order' },
        },
    {
        tableName: 'products' 
    }
  );
  
  return products;
}