module.exports = (sequelize, dataTypes) => {
    let alias = 'cartProduct';

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        units: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        cartId: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
    };

    let config = {
        tableName: 'cartproduct',
        timestamps: false,
    };

    const cartProduct = sequelize.define(alias, cols, config);

    return cartProduct;
};
