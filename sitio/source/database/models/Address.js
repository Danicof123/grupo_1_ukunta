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
        },
        streetNumber: {
            type: dataTypes.INTEGER,
        },
        description: {
            type: dataTypes.STRING(100),
        },
        country: {
            type: dataTypes.STRING(45),
        },
        state: {
            type: dataTypes.STRING(45),
        },
        city: {
            type: dataTypes.STRING(45),
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
