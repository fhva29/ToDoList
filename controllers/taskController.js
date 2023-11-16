const Task = require("../models/task");
const User = require("../models/user")

const isNullOrEmpty = (str) => str == null || str.trim() === '';
const userIsNullOrEmpty = (id) => id == null;

exports.getAllTasks = async (req, res) => {
    const { page = 1, pageSize = 10, sortBy = 'createdAt', sortOrder = 'asc' } = req.query;
    const offset = (page - 1) * pageSize;

    try {
        const tasks = await Task.findAndCountAll({
            order: [[sortBy, sortOrder.toUpperCase()]],
            offset,
            limit: pageSize
        });

        res.json({
            tasks: tasks.rows,
            totalCount: tasks.count,
            totalPages: Math.ceil(tasks.count / pageSize),
            currentPage: +page,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
};

exports.addTask = async (req, res) => {
    const { title, description, userId } = req.body;

    if (isNullOrEmpty(title)) {
        return res.status(400).json({ error: 'The title cannot be empty.' })
    }
    if (userIsNullOrEmpty(userId)) {
        return res.status(400).json({ error: 'The userId cannot be empty.' })
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }
        const newTask = await Task.create({ title, description, UserId: userId });
        res.json(newTask)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error." })
    }
}

exports.updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description, completed } = req.body;

    if (isNullOrEmpty(title)) {
        return res.status(400).json({ error: 'The title cannot be empty.' })
    }

    try {
        const [updatedRowsCount] = await Task.update(
            { title, description, completed },
            { where: { id: taskId } }
        );

        if (updatedRowsCount > 0) {
            const updatedTask = await Task.findByPk(taskId);
            res.json(updatedTask);
        } else {
            res.status(404).json({ error: "Task not found!" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
};


exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const deletedRowsCount = await Task.destroy({ where: { id: taskId } });

        if (deletedRowsCount > 0) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: "Task not found!" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}


exports.getTasksByUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const tasks = await Task.findAll({ where: { UserId: userId } });
        return res.json(tasks)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
};