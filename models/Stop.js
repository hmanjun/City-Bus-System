const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Stop extends Model {}

Stop.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'location',
            key: 'id'
        }
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'stop'
})

module.exports = Stop