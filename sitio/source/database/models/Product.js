module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        description: {
            type: dataTypes.STRING(255),
            allowNull: false,
        },
        size: {
            type: dataTypes.STRING(15),
            defaultValue: null,
        },
        price: {
            type: dataTypes.DECIMAL(3, 2),
            allowNull: false,
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        expire: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        categoryId: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
    };

    let config = {
        timestamps: false,
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        // Un producto tiene una categoria
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'categoryId',
        });
        // Un producto puede tener muchas imagenes
        Product.hasMany(models.Image, {
            as: 'image',
            foreignKey: 'productId',
        });
        // Un producto puede estar en muchas compras
        Product.belongsToMany(models.Cart, {
            as: 'cart',
            through: 'cartProduct',
            foreignKey: 'productId',
            otherkey: 'cartId',
            timestamps: false,
        });
    };

    return Product;
};
