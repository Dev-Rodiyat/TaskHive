import React, { useState, useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const AddTaskModal = ({ onClose, onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('low');
    const [status, setStatus] = useState('todo');
    const [project, setProject] = useState('personal');
    const [dueDate, setDueDate] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!title.trim() || !dueDate) {
            toast.error('Please fill in all required fields.');
            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                '/task/create-task',
                {
                    title,
                    priority,
                    project,
                    status,
                    dueDate: new Date(dueDate).toISOString(),
                },
                { withCredentials: true }
            );

            if (response.status === 201) {
                onTaskCreated?.();
                onClose();
                setTitle('');
                setPriority('low');
                setProject('personal');
                setStatus('todo');
                setDueDate('');
            }
            toast.success('Task created successfully!');
        } catch (err) {
            console.error('Error creating task:', err);
            toast.error('Failed to create task.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white w-full max-w-md mx-4 rounded-xl shadow-xl p-6">

                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <p className="text-xl font-semibold text-gray-800">Add Task</p>
                    <IoClose
                        size={24}
                        className="text-gray-600 hover:text-gray-800 cursor-pointer"
                        onClick={onClose}
                    />
                </div>

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

                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-1">Due Date</p>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">Priority</p>
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

                <div className="mb-6">
                    <p className="text-sm font-medium text-gray-600 mb-2">Project</p>
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

                <div className="text-right">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition disabled:opacity-50"
                    >
                        {loading ? 'Adding...' : 'Add'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddTaskModal;
