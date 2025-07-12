import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';

export default function EditProfileModal({ isOpen, onClose }) {
    const { user, updateUserProfile } = useUser();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        image: user?.image || '',
    });
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const res = await updateUserProfile(formData);
        setSaving(false);
        if (res.success) {
            onClose()
            toast.success('Profile Updated Successfully!')
        }
        else toast.error('Failed to update profile.');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full border p-2 rounded"
                        required
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
