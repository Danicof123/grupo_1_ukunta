module.exports = (sequelize, dataTypes) => {
    let alias = 'User';

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
        lastname: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        datebirth: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        dni: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        avatar: {
            type: dataTypes.STRING(100),
            defaultValue: null,
        },
        rol: {
            type: dataTypes.STRING(10),
            allowNull: false,
        },
        phone: {
            type: dataTypes.STRING(15),
            allowNull: false,
        },
    };

    let config = {
        timestamps: false,
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        // Un usuario puede tener muchas direcciones
        User.hasMany(models.Address, {
            as: 'address',
            foreignKey: 'userId',
        });
        // Un usuario puede tener muchas metodos de pago
        User.hasMany(models.Payment, {
            as: 'payment',
            foreignKey: 'userId',
        });
        // Un usuario puede tener muchas compras procesadas a traves de un carrito
        User.hasMany(models.Cart, {
            as: 'cart',
            foreignKey: 'userId',
        });
    };

    return User;
};
