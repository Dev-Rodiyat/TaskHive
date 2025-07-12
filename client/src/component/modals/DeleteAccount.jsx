import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteAccount = ({ onClose }) => {
    const { deleteUserAccount } = useUser();
    const navigate = useNavigate();

    const handleDelete = async () => {
        await deleteUserAccount();
        navigate('/register');
        toast.success('Account deleted successfully!')
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white w-full max-w-sm mx-4 rounded-xl shadow-xl p-6 text-center">

                <p className="text-lg text-gray-800 font-medium mb-6">
                    Are you sure you want to delete your account ?
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;
