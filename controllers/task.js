const Task = require('../models/task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();  
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas', error });
    }
};

exports.createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save(); 
        res.status(201).json({ message: 'Tarea creada exitosamente', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea', error });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;  
        const task = await Task.findById(taskId);  

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la tarea', error });
    }
};