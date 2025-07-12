import { useState } from 'react';
import { MdDashboard, MdLogout } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { IoIosAdd, IoIosNotificationsOutline } from 'react-icons/io';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { motion } from 'framer-motion';
import Dashboard from './Dashboard';
import TaskLisk from './task/TaskLisk';
import Notification from './modals/Notification';
import AddTaskModal from './Modals/AddTaskModal';
import DeleteAccount from './modals/DeleteAccount';
import Logout from './modals/Logout';

export default function DashLayout() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [notificationModalOpen, setNotificationModalOpen] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
    const [isAddTaskModalaOpen, setIsAddTaskModalOpen] = useState(false);

    const openNotification = () => {
        setNotificationModalOpen(true)
    }

    const closeNotification = () => {
        setNotificationModalOpen(false)
    }

    const handleDeleteAccountModalOpen = () => {
        setIsDeleteAccountModalOpen(true);
    };

    const handleDeleteAccountModalClose = () => {
        setIsDeleteAccountModalOpen(false);
    };

    const handleAddTaskModalOpen = () => {
        setIsAddTaskModalOpen(true);
    };

    const handleAddTaskModalClose = () => {
        setIsAddTaskModalOpen(false);
    };

    const handleLogoutModalOpen = () => {
        setLogoutModal(true);
    };

    const handleLogoutModalClose = () => {
        setLogoutModal(false);
    };

    const renderContent = () => {
        if (activeTab === 'dashboard') {
            return (
                <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Dashboard />
                </motion.div>
            );
        } else if (activeTab === 'tasks') {
            return (
                <motion.div
                    key="tasks"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <TaskLisk />
                </motion.div>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="pt-28 pb-6 px-4 sm:px-6 lg:px-8">

                {/* Fixed Navbar */}
                <header className="fixed top-6 left-4 right-4 sm:left-6 sm:right-6 lg:left-10 lg:right-10 z-50 px-4 sm:px-6 py-3 bg-white flex justify-between items-center shadow-md rounded-xl">
                    <h1 className="text-2xl font-bold text-indigo-600">TaskHive</h1>
                    <button className="hover:bg-indigo-100 p-2 rounded-lg" onClick={openNotification}>
                        <IoIosNotificationsOutline size={28} />
                    </button>
                </header>

                {/* Main content area */}
                <div className="pt-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        {/* Tabs */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`px-4 py-2 flex items-center gap-2 rounded-lg transition ${activeTab === 'dashboard'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                    }`}
                            >
                                <MdDashboard />
                                Dashboard
                            </button>

                            <button
                                onClick={() => setActiveTab('tasks')}
                                className={`px-4 py-2 flex items-center gap-2 rounded-lg transition ${activeTab === 'tasks'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                    }`}
                            >
                                <FaTasks />
                                Tasks
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                className="bg-indigo-50 px-4 py-2 text-sm flex items-center gap-2 rounded-lg hover:bg-indigo-200 transition hover:shadow-sm"
                                onClick={handleAddTaskModalOpen}
                            >
                                <IoIosAdd />
                                New Task
                            </button>

                            <button
                                className="bg-red-50 text-red-600 px-4 py-2 text-sm flex items-center gap-2 rounded-lg hover:bg-red-100 transition hover:shadow-sm"
                                onClick={handleDeleteAccountModalOpen}
                            >
                                <AiOutlineUserDelete />
                                Delete Account
                            </button>

                            <button
                                className="bg-indigo-50 text-gray-700 px-4 py-2 text-sm flex items-center gap-2 rounded-lg hover:bg-indigo-200 transition hover:shadow-sm"
                                onClick={handleLogoutModalOpen}
                            >
                                <MdLogout />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="mt-8">{renderContent()}</div>
            </main>

            {/* Modals */}
            {notificationModalOpen && <Notification onClose={closeNotification} />}
            {logoutModal && <Logout onClose={handleLogoutModalClose} />}
            {isDeleteAccountModalOpen && <DeleteAccount onClose={handleDeleteAccountModalClose} />}
            {isAddTaskModalaOpen && <AddTaskModal onClose={handleAddTaskModalClose} />}
        </div>
    );
}
