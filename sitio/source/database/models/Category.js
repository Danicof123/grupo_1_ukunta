module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';

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
    };

    let config = {
        timestamps: false,
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = (models) => {
        //Una categoria puede tener muchos productos
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'categoryId',
        });
    };

    return Category;
};
