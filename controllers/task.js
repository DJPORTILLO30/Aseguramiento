const Task = require('../models/task');

exports.getTasks = async (req, res) => {
    try {
        // Obtén el ID del usuario de la solicitud. Esto asume que el ID del usuario se encuentra en req.userId, que debe ser establecido durante la autenticación.
        const userId = req.userId;

        // Consulta todas las tareas que coincidan con el userId
        const tasks = await Task.find({ userId });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas', error });
    }
};

exports.createTask = async (req, res) => {
    try {
        // Obtén el ID del usuario de la solicitud. Esto asume que el ID del usuario se encuentra en req.userId, que debe ser establecido durante la autenticación.
        const userId = req.userId;
        
        // Crea la nueva tarea con el userId asignado.
        const newTask = new Task({
            ...req.body,
            userId: userId,
        });

        await newTask.save();
        
        res.status(201).json({ message: 'Tarea creada exitosamente', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea', error });
        console.log(error)
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

exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updateData = req.body;

        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.status(200).json({ message: 'Tarea actualizada exitosamente', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea', error });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const deletedTask = await Task.findByIdAndRemove(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.status(200).json({ message: 'Tarea eliminada exitosamente', task: deletedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea', error });
    }
};
