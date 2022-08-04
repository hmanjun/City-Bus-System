const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connections')

class RouteStop extends Model {}

RouteStop.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    route_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'route',
            key: 'id'
        }
    },
    stop_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'stop',
            key: 'id'
        }
    },
    sequence: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'routestop'
})

module.exports = RouteStop