module.exports = (sequelize, dataTypes) => {
    let alias = 'Address';

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        street: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        streetNumber: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        country: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        state: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        city: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        userId: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
    };

    let config = {
        timestamps: false,
    };

    const Address = sequelize.define(alias, cols, config);

    Address.associate = (models) => {
        //Una direccion le pertenece a un usuario
        Address.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId',
        });
    };

    return Address;
};
