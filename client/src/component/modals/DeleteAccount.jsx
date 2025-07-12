import React from "react";

const DeleteAccount = ({onClose, onDelete}) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 font-inter flex items-center justify-center px-4">
            <div
                className="animate-fade-in-up scale-125 animate-duration-300 animate-ease-out flex flex-col items-center gap-6 px-6 sm:px-10 py-10 rounded-3xl shadow-2xl w-full max-w-md bg-white text-center border border-zinc-200 relative"
            >
                <p className="font-semibold text-lg sm:text-xl text-slate-800 leading-relaxed">
                    Are you sure you want to delete your account?
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-10 w-full">
                    <button
                        className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg transition w-full sm:w-1/2"
                        onClick={onDelete}
                    >
                        Yes, Delete
                    </button>
                    <button
                        className="bg-zinc-100 hover:bg-zinc-200 text-slate-700 py-2 px-6 rounded-lg transition w-full sm:w-1/2"
                        onClick={onClose}
                    >
                        No, Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;
