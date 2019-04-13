const { DataTypes } = require('sequelize');

module.exports = (Database, FloodArea) => {
    let Subscription = Database.define('subscription', {
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            primaryKey: true
        },
        floodareaId: {
            type: DataTypes.STRING(70),
            allowNull: false,
            primaryKey: true
        }
    });

    // Possible solutions...
    // FloodArea.hasMany(Subscription, {
    //   sourceKey: 'fwdCode',
    //   scope: {
    //       floodareaId: {
    //           $col: 'FloodArea.floodareaId'
    //       }
    //   }
    // });

    Subscription.sync();
    return Subscription;
};
