const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Task = require('./task');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
});

User.hasMany(Task, { onDelete: 'CASCADE' });

module.exports = User;