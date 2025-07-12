import React, { useState, useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useTaskContext } from '../context/TaskContext';
import DeleteTaskModal from '../Modals/DeleteTaskModal';
import EditTaskModal from '../Modals/EditTaskModal';
import { FiSearch, FiX } from 'react-icons/fi';

const TaskList = () => {
    const { tasks, fetchTasks, addTask, updateTask, deleteTask } = useTaskContext();
    const [isDeleteTaskModalaOpen, setIsDeleteTaskModalOpen] = useState(false);
    const [isEditTaskModalaOpen, setIsEditTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [projectFilter, setProjectFilter] = useState('');

    useEffect(() => {
        if (tasks) {
            fetchTasks();
        }
    }, [tasks]);

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
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl">
            <div className="overflow-x-auto">
                <div className="space-y-4 p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6">
                        <div className="relative w-full md:w-1/2">
                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <FiSearch size={18} />
                            </span>
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    <FiX size={18} />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
                            {/* Status Filter */}
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Status</option>
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>

                            {/* Priority Filter */}
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Priorities</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>

                            {/* Project Filter */}
                            <select
                                value={projectFilter}
                                onChange={(e) => setProjectFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Projects</option>
                                {[...new Set(tasks.map((task) => task.project).filter(Boolean))].map((project) => (
                                    <option key={project} value={project}>
                                        {project}
                                    </option>
                                ))}
                            </select>

                            {/* Clear Filters Button */}
                            {(statusFilter || priorityFilter || projectFilter) && (
                                <button
                                    onClick={() => {
                                        setStatusFilter('');
                                        setPriorityFilter('');
                                        setProjectFilter('');
                                    }}
                                    className="text-sm px-3 py-2 border border-red-400 text-red-500 rounded-md hover:bg-red-100 transition"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {Array.isArray(tasks) && tasks.length > 0 ? (
                        tasks
                            .filter((task) =>
                                task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                                (statusFilter ? task.status === statusFilter : true) &&
                                (priorityFilter ? task.priority === priorityFilter : true) &&
                                (projectFilter ? task.project === projectFilter : true)
                            )
                            .map((task) => (
                                <div
                                    key={task._id}
                                    className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                                >
                                    <div className="hidden md:flex items-center justify-between gap-4">
                                        <div className="flex flex-col gap-3 min-w-[140px]">
                                            <p className="text-sm font-semibold text-gray-500">Task</p>
                                            <p className="text-base text-gray-800 break-words">{task.title}</p>
                                        </div>

                                        <div className="flex gap-3 flex-col min-w-[100px]">
                                            <p className="text-sm font-semibold text-gray-500">Priority</p>
                                            <p
                                                className={`text-base font-medium ${task.priority === "high"
                                                    ? "text-red-600"
                                                    : task.priority === "medium"
                                                        ? "text-yellow-600"
                                                        : "text-green-600"
                                                    }`}
                                            >
                                                {task.priority}
                                            </p>
                                        </div>

                                        <div className="flex gap-3 flex-col min-w-[130px]">
                                            <p className="text-sm font-semibold text-gray-500">Due Date</p>
                                            <p className="text-base text-gray-700">
                                                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
                                            </p>
                                        </div>

                                        <div className="flex gap-3 flex-col min-w-[120px]">
                                            <p className="text-sm font-semibold text-gray-500">Project</p>
                                            <p className="text-base text-gray-700">{task.project || "N/A"}</p>
                                        </div>

                                        <div className="flex gap-3 flex-col min-w-[120px]">
                                            <p className="text-sm font-semibold text-gray-500">Status</p>
                                            <span
                                                className={`px-4 py-1.5 rounded-full text-sm font-semibold inline-block text-center
                                        ${task.status === "todo"
                                                        ? "bg-gray-200 text-gray-700"
                                                        : task.status === "in-progress"
                                                            ? "bg-yellow-200 text-yellow-800"
                                                            : task.status === "done"
                                                                ? "bg-green-300 text-green-900"
                                                                : "bg-green-200 text-green-800"
                                                    }`}
                                            >
                                                {task.status || "N/A"}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 min-w-[80px]">
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

                                    {/* Mobile Layout */}
                                    <div className="md:hidden">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{task.title}</h3>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium
                                                ${task.priority === "high"
                                                                ? "bg-red-100 text-red-600"
                                                                : task.priority === "medium"
                                                                    ? "bg-yellow-100 text-yellow-600"
                                                                    : "bg-green-100 text-green-600"
                                                            }`}
                                                    >
                                                        {task.priority}
                                                    </span>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium
                                                ${task.status === "todo"
                                                                ? "bg-gray-200 text-gray-700"
                                                                : task.status === "in-progress"
                                                                    ? "bg-yellow-200 text-yellow-800"
                                                                    : task.status === "done"
                                                                        ? "bg-green-300 text-green-900"
                                                                        : "bg-green-200 text-green-800"
                                                            }`}
                                                    >
                                                        {task.status || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 ml-4">
                                                <BiEdit
                                                    size={20}
                                                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                                    onClick={() => handleEditTaskModalOpen(task)}
                                                />
                                                <RiDeleteBinLine
                                                    size={20}
                                                    className="text-red-600 hover:text-red-800 cursor-pointer"
                                                    onClick={() => handleDeleteTaskModalOpen(task)}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                            <div>
                                                <span className="font-medium">Due: </span>
                                                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
                                            </div>
                                            <div>
                                                <span className="font-medium">Project: </span>
                                                {task.project || "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className="text-center text-gray-500 py-8">No task created</div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {isDeleteTaskModalaOpen && selectedTask && (
                <DeleteTaskModal
                    task={selectedTask}
                    onClose={handleDeleteTaskModalClose}
                    onDelete={() => handleDeleteClick(selectedTask._id)}
                />
            )}
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