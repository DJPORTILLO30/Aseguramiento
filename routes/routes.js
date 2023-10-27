const express = require('express');
const validarToken = require('../auth');
const router = express.Router();
const userController = require('../controllers/user');
const taskController = require('../controllers/task');


router.get('/users', userController.getUsers);
router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/perfil', validarToken, userController.perfil);


router.post('/geTtasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.get('/tasks/:id', taskController.getTaskById);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);


module.exports = router;