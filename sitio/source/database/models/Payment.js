module.exports = (sequelize, dataTypes) => {
    let alias = 'Payment';

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        method: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        cardNumber: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        cardOwner: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        expireDate: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        securityCode: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        dni: {
            type: dataTypes.INTEGER,
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

    const Payment = sequelize.define(alias, cols, config);

    Payment.associate = (models) => {
        // Un metodo de pago le pertenece a un usuario
        Payment.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId',
        });
        // Un metodo de pago puede haber sido utilizado en muchas compras
        Payment.hasMany(models.Cart, {
            as: 'cart',
            foreignKey: 'paymentId',
        });
    };

    return Payment;
};
