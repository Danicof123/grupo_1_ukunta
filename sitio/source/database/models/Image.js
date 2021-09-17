module.exports = (sequelize, dataTypes) => {
    let alias = 'Image';

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
    };

    let config = {
        timestamps: false,
    };

    const Image = sequelize.define(alias, cols, config);

    Image.associate = (models) => {
        //Una imagen le pertenece a un producto
        Image.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'productId',
        });
    };

    return Image;
};
