module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        userId: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        paymentId: {
            type: dataTypes.INTEGER,
            defaultValue: null,
        },
        total: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        discount: {
            type: dataTypes.DECIMAL(3, 2),
            defaultValue: null,
        },
    };

    let config = {
        tableName: 'cart',
        timestamps: false,
    };

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = (models) => {
        // Un carrito (compra) le corresponde a un usuario
        Cart.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId',
        });
        //  Un carrito (compra) tiene un metodo de pago
        Cart.belongsTo(models.Payment, {
            as: 'payment',
            foreignKey: 'paymentId',
        });
        //Una compra puede tener muchos productos
        Cart.belongsToMany(models.Product, {
            as: 'products',
            through: 'cartProduct',
            foreignKey: 'cartId',
            otherkey: 'productId',
            timestamps: false,
        });
    };

    return Cart;
};
