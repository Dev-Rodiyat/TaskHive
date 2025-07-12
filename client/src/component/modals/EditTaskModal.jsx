import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

const EditTaskModal = ({ onClose, task, onEdit, loading }) => {
    const [title, setTitle] = useState(task?.title || '');
    const [priority, setPriority] = useState(task?.priority || 'low');

    const override = {
        display: "block",
        margin: "0 auto",
    };

    const handleSubmit = () => {
        if (!title.trim()) return;
        onEdit({ id: task._id, title, priority });
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
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <p className="text-xl font-semibold text-gray-800">Edit Task</p>
                            <IoClose
                                size={24}
                                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                                onClick={onClose}
                            />
                        </div>

                        {/* Task Input */}
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

                        {/* Priority Dropdown */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="text-right">
                            <button
                                onClick={handleSubmit}
                                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold disabled:opacity-50"
                                disabled={!title.trim() || loading}
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