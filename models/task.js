const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    _id: Number,
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ['alta', 'media', 'baja'],
        required: true
    },
    labels: [String],  
    completed: {
        type: Boolean,
        default: false  
    },
    createdAt: {
        type: Date,
        default: Date.now  
    },
    updatedAt: Date,  
    userId: {
        type: Number,
        required: true
    }
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
