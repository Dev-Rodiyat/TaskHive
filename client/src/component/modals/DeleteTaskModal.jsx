import React from 'react';
import { ClipLoader } from 'react-spinners';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';


const DeleteTaskModal = ({ task, onClose, onDeleteTask, loading }) => {
    const override = {
        display: "block",
        margin: "0 auto",
    };

    const handleDelete = () => {
        if (task?._id) {
            onDeleteTask(task._id);
            toast.success('Task deleted successfully!')
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white w-full max-w-sm mx-4 rounded-xl shadow-xl p-6 text-center">
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
                        <p className="text-lg text-gray-800 font-medium mb-6">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold text-red-600">
                                {task?.title || 'this task'}
                            </span>
                            ?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition"
                                disabled={loading}
                            >
                                Delete
                            </button>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DeleteTaskModal;