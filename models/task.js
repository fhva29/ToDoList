const { DataTypes } = require('sequelize')
const sequelize = require('../db');

const Task = sequelize.define("Task", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Task;