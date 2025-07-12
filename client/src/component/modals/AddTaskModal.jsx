import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const AddTaskModal = ({ onAddTask, onClose }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('low');
    const [status, setStatus] = useState('todo');

    const handleSubmit = () => {
        if (!title.trim()) return;

        onAddTask({ title, priority, status });
        setTitle('');
        setPriority('low');
        setStatus('todo');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white w-full max-w-md mx-4 rounded-xl shadow-xl p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <p className="text-xl font-semibold text-gray-800">Add Task</p>
                    <IoClose
                        size={24}
                        className="text-gray-600 hover:text-gray-800 cursor-pointer"
                        onClick={onClose}
                    />
                </div>

                {/* Task Input */}
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-1">Task</p>
                    <input
                        type="text"
                        placeholder="Type your task here..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Priority Buttons */}
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">Priority</p>
                    <div className="flex gap-3">
                        {['high', 'medium', 'low'].map((level) => (
                            <button
                                key={level}
                                onClick={() => setPriority(level)}
                                className={`px-4 py-2 rounded-lg font-medium ${
                                    priority === level
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

                {/* Status Select */}
                <div className="mb-6">
                    <p className="text-sm font-medium text-gray-600 mb-2">Status</p>
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

                {/* Submit Button */}
                <div className="text-right">
                    <button
                        onClick={handleSubmit}
                        className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition"
                    >
                        Add
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddTaskModal;