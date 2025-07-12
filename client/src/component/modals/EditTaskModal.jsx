import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';

const EditTaskModal = ({ onClose, task, onEdit, loading }) => {
    const [title, setTitle] = useState(task?.title || '');
    const [priority, setPriority] = useState(task?.priority || 'low');
    const [dueDate, setDueDate] = useState(() => task?.dueDate?.slice(0, 10) || '');
    const [project, setProject] = useState(task?.project || 'personal');
    const [status, setStatus] = useState(task?.status || 'todo');

    const override = {
        display: "block",
        margin: "0 auto",
    };

    const handleSubmit = () => {
        if (!title.trim() || !dueDate) return;
        onEdit({
            id: task._id,
            title,
            priority,
            dueDate,
            project,
            status,
        });
        toast.success('Task updated successfully!')
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white w-full max-w-md mx-4 rounded-xl shadow-xl p-6">
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-center items-center h-40"
                    >
                        <ClipLoader color="#1a80e5" loading={loading} cssOverride={override} />
                    </motion.div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <p className="text-xl font-semibold text-gray-800">Edit Task</p>
                            <IoClose
                                size={24}
                                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                                onClick={onClose}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Task Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter task title"
                            />
                        </div>

                        <div className="mb-4">
                            <p className="block text-sm font-medium text-gray-600 mb-1">Priority</p>
                            <div className="flex gap-3">
                                {['high', 'medium', 'low'].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setPriority(level)}
                                        className={`px-4 py-2 rounded-lg font-medium ${priority === level
                                            ? level === 'high'
                                                ? 'bg-red-600 text-white'
                                                : level === 'medium'
                                                    ? 'bg-yellow-500 text-white'
                                                    : 'bg-green-600 text-white'
                                            : level === 'high'
                                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                : level === 'medium'
                                                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                                            }`}
                                    >
                                        {level.charAt(0).toUpperCase() + level.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Project</label>
                            <select
                                value={project}
                                onChange={(e) => setProject(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="work">Work</option>
                                <option value="personal">Personal</option>
                                <option value="school">School</option>
                                <option value="other">Others</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Due Date</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="text-right">
                            <button
                                onClick={handleSubmit}
                                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold disabled:opacity-50"
                                disabled={!title.trim() || !dueDate || loading}
                            >
                                Save Changes
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EditTaskModal;
