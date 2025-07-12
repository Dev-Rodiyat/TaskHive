const asyncHandler = require("express-async-handler");
const Task = require("../model/taskModel");
const Notification = require("../model/notificationModel");

const createTask = asyncHandler(async (req, res) => {
    const { title, priority, status, dueDate, project } = req.body;
    const userId = req.userId;

    if (!title || !dueDate) {
        return res.status(400).json({ message: 'Title and due date are required' });
    }

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID' });
    }

    const now = new Date();
    const due = new Date(dueDate);

    if (due < now.setHours(0, 0, 0, 0)) {
        return res.status(400).json({ message: 'Due date cannot be in the past' });
    }

    try {
        const task = await Task.create({
            title,
            priority: priority || 'low',
            status: status || 'todo',
            dueDate,
            project: project || 'personal',
            createdBy: userId,
        });

        await Notification.create({
            user: userId,
            type: 'task',
            message: `You created a new task: ${task.title}`,
            metadata: { taskId: task._id },
        });

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const updateTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { title, priority, status, dueDate, project } = req.body;
    const userId = req.userId;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task Not Found' });
        }

        if (dueDate !== undefined) {
            const now = new Date();
            const due = new Date(dueDate);
            if (due < now.setHours(0, 0, 0, 0)) {
                return res.status(400).json({ message: 'Due date cannot be in the past' });
            }
            task.dueDate = dueDate;
        }

        if (title !== undefined) task.title = title;
        if (priority !== undefined) task.priority = priority;
        if (status !== undefined) task.status = status;
        if (project !== undefined) task.project = project;

        const updatedTask = await task.save();

        await Notification.create({
            user: userId,
            type: 'task',
            message: `You updated a task: ${updatedTask.title}`,
            metadata: { taskId: updatedTask._id },
        });

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const getTask = asyncHandler(async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        if (task) {
            return res.status(200).json(task);
        } else {
            return res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const getAllTasks = asyncHandler(async (req, res) => {
    const userId = req.userId;

    try {
        const tasks = await Task.find({ createdBy: userId }).sort('-createdAt');
        return res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const userId = req.userId;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.deleteOne();

        await Notification.create({
            user: userId,
            type: 'task',
            message: `You deleted a task: ${task.title}`,
            metadata: { taskId: task._id },
        });

        res.status(200).json({ message: 'Task deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = { createTask, updateTask, getTask, getAllTasks, deleteTask };