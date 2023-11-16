const User = require("../models/user")

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        return res.json(users);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' })
    }
};

exports.addUser = async (req, res) => {
    const { username, email } = req.body;

    try {
        const newUser = await User.create({ username, email })
        res.json(newUser);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' })
    }
};