const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Location extends Model {}

Location.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    
    route_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'route',
            key: 'id'
        }
    },

    Stop_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Stop',
            key: 'id'
        }   
    }
},
{
sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'location'
    })

module.exports = Location