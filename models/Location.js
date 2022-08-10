const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connections')

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