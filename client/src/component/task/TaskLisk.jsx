import React, { useState, useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useTaskContext } from '../context/TaskContext';
import DeleteTaskModal from '../Modals/DeleteTaskModal';
import EditTaskModal from '../Modals/EditTaskModal';
import AddTaskModal from '../Modals/AddTaskModal';

const TaskList = () => {
    const { tasks, fetchTasks, addTask, updateTask, deleteTask } = useTaskContext();

    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedPriority, setEditedPriority] = useState('low');
    const [isDeleteTaskModalaOpen, setIsDeleteTaskModalOpen] = useState(false);
    const [isEditTaskModalaOpen, setIsEditTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDeleteClick = (taskId) => {
        deleteTask(taskId);
        setIsDeleteTaskModalOpen(false);
        setSelectedTask(null);
    };

    const handleEditSave = (taskId, updatedData) => {
        if (!updatedData.title || !updatedData.priority) return;
        updateTask(taskId, updatedData);
        setIsEditTaskModalOpen(false);
        setSelectedTask(null);
    };

    const handleDeleteTaskModalOpen = (task) => {
        setSelectedTask(task);
        setIsDeleteTaskModalOpen(true);
    };

    const handleDeleteTaskModalClose = () => {
        setIsDeleteTaskModalOpen(false);
    };

    const handleEditTaskModalOpen = (task) => {
        setSelectedTask(task);
        setIsEditTaskModalOpen(true);
    };

    const handleEditTaskModalClose = () => {
        setIsEditTaskModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
                <div className="space-y-4">
                    {Array.isArray(tasks) && tasks.length > 0 ? (
                        tasks.map((task) => (
                            <div
                                key={task._id}
                                className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-4"
                            >
                                <div className="flex flex-col flex-1 min-w-[120px]">
                                    <p className="text-sm font-semibold text-gray-500">Task</p>
                                    {editingTaskId === task._id ? (
                                        <input
                                            value={editedTitle}
                                            onChange={(e) => setEditedTitle(e.target.value)}
                                            className="border rounded px-2 py-1 text-base text-gray-800"
                                        />
                                    ) : (
                                        <p className="text-base text-gray-800">{task.title}</p>
                                    )}
                                </div>

                                <div className="flex flex-col flex-1 min-w-[120px]">
                                    <p className="text-sm font-semibold text-gray-500">Priority</p>
                                    {editingTaskId === task._id ? (
                                        <select
                                            value={editedPriority}
                                            onChange={(e) => setEditedPriority(e.target.value)}
                                            className="border rounded px-2 py-1"
                                        >
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    ) : (
                                        <p
                                            className={`text-base font-medium ${task.priority === 'high'
                                                ? 'text-red-600'
                                                : task.priority === 'medium'
                                                    ? 'text-yellow-600'
                                                    : 'text-green-600'
                                                }`}
                                        >
                                            {task.priority}
                                        </p>
                                    )}
                                </div>

                                <div className="min-w-[100px]">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${task.status === 'Todo'
                                            ? 'bg-gray-200 text-gray-700'
                                            : task.status === 'In Progress'
                                                ? 'bg-yellow-200 text-yellow-800'
                                                : 'bg-green-200 text-green-800'
                                            }`}
                                    >
                                        {task.status || 'N/A'}
                                    </span>
                                </div>

                                <div className="min-w-[20px]">
                                    <div
                                        className={`w-4 h-4 rounded-full ${task.status === 'Todo'
                                            ? 'bg-gray-400'
                                            : task.status === 'In Progress'
                                                ? 'bg-yellow-400'
                                                : 'bg-green-500'
                                            }`}
                                    ></div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <BiEdit
                                        size={22}
                                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                        onClick={() => handleEditTaskModalOpen(task)}
                                    />
                                    <RiDeleteBinLine
                                        size={22}
                                        className="text-red-600 hover:text-red-800 cursor-pointer"
                                        onClick={() => handleDeleteTaskModalOpen(task)}
                                    />

                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">No task created</div>
                    )}
                </div>
            </div>

            {isDeleteTaskModalaOpen && selectedTask && (
                <DeleteTaskModal
                    task={selectedTask}
                    onClose={handleDeleteTaskModalClose}
                    onDelete={() => handleDeleteClick(selectedTask._id)}
                />
            )}
            {/* <AddTaskModal onAddTask={addTask} onClose={closeModal} /> */}

            {isEditTaskModalaOpen && selectedTask && (
                <EditTaskModal
                    task={selectedTask}
                    onClose={handleEditTaskModalClose}
                    onEdit={(updatedData) => handleEditSave(selectedTask._id, updatedData)}
                />
            )}
        </div>
    );
};

export default TaskList;