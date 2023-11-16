const express = require('express')
const sequelize = require('./db')
const Task = require('./models/task');
const User = require('./models/user');
const taskController = require("./controllers/taskController")
const userController = require("./controllers/userController")

const app = express()
const port = 3000

app.use(express.json());

// Tasks
app.get("/tasks", taskController.getAllTasks);
app.post("/tasks/add", taskController.addTask);
app.put("/tasks/update/:id", taskController.updateTask);
app.delete("/tasks/delete/:id", taskController.deleteTask);
app.get("/tasks/user/:userId", taskController.getTasksByUser);

// User
app.get("/users", userController.getAllUsers);
app.post("/users/add", userController.addUser);

sequelize.sync().then(() => {
    console.log("Database synchronized!")
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})



