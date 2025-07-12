const express = require('express');
const { createTask, updateTask, getTask, getAllTasks, deleteTask } = require('../controller/taskController');
const { protectUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-task', protectUser, createTask)
router.put('/update-task/:taskId', protectUser, updateTask)
router.get('/get-task/:taskId', protectUser, getTask)
router.get('/get-all-tasks', protectUser, getAllTasks)
router.delete('/delete-task/:taskId', protectUser, deleteTask)

module.exports = router