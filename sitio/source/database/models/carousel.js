module.exports = (sequelize, dataTypes) => {
    let alias = 'carousel';

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
        tableName: 'carousel'
    };

    const carousel = sequelize.define(alias, cols, config);

    return carousel;
};