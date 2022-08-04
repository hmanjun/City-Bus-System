const { Router } = require('express');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Routes extends Model {}

Routes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
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
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'route'
    });
    
    module.exports = Routes
)
