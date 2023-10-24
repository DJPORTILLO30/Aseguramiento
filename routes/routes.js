const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const taskController = require('../controllers/task');


router.get('/users', userController.getUsers);
router.post('/register', userController.createUser);
router.post('/login', userController.login);


router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.get('/tasks/:id', taskController.getTaskById);

module.exports = router;