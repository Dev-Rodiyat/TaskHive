const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            enum: ['high', 'medium', 'low'],
            default: 'low',
            required: true,
        },
        status: {
            type: String,
            enum: ['todo', 'in-progress', 'done'],
            default: 'todo',
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        project: {
            type: String,
            enum: ['work', 'personal', 'school', 'other'],
            default: 'personal',
            required: true,
        },
        done: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;