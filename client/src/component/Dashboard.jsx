import { useState } from 'react';
import taskImage from './../assets/task.png';
import { motion } from 'framer-motion';
import AddTaskModal from './Modals/AddTaskModal';
import WeeklyProgressChart from './WeeklyProgressChart';
import { useUser } from './context/UserContext';
import { ClipLoader } from 'react-spinners';

const override = {
    display: 'block',
    margin: '100px auto',
}

export default function Dashboard() {
    const [isAddTaskModalaOpen, setIsAddTaskModalOpen] = useState(false);

    const { user, stats, loading } = useUser();

    if (loading) return <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#1a80e5" loading={loading} cssOverride={override} />
    </div>;

    const handleAddTaskModalOpen = () => {
        setIsAddTaskModalOpen(true);
    };

    const handleAddTaskModalClose = () => {
        setIsAddTaskModalOpen(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="max-w-5xl mx-auto bg-white p-6 mt-10 rounded-2xl shadow-xl"
        >
            {/* Profile Header */}
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full overflow-hidden shadow-md hover:scale-105 transition-transform bg-gray-200">
                    <img
                        src={taskImage}
                        alt="Profile"
                        className="object-cover w-full h-full"
                    />
                </div>
                {user && (
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-800">{user.name}</h1>
                        <p className="text-base text-zinc-500">{user.email}</p>
                    </div>
                )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                    { label: 'Tasks Created', value: 12 },
                    { label: 'Completed Tasks', value: 7 },
                    { label: 'Upcoming Tasks', value: 3 },
                    { label: 'Streak', value: '4 Days' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-indigo-50 p-4 rounded-xl text-center shadow-sm">
                        <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4 text-zinc-800">Recent Activity</h2>
                <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                    <li>✅ Completed "Update portfolio site"</li>
                    <li>➕ Added "Finish dashboard layout"</li>
                    <li>📌 Pinned "Team meeting notes"</li>
                </ul>
            </div>

            <WeeklyProgressChart />

            {/* Call to Action Buttons */}
            <div className="mt-10 flex gap-4 flex-wrap">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition" onClick={handleAddTaskModalOpen}>
                    ➕ Create Task
                </button>
                <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition">
                    📋 View All Tasks
                </button>
            </div>

            {/* Motivational Quote */}
            <div className="mt-10 text-center text-gray-500 italic text-sm">
                "Productivity is never an accident. It is always the result of a commitment to excellence."
            </div>
            {isAddTaskModalaOpen && <AddTaskModal onClose={handleAddTaskModalClose} />}
        </motion.div>
    );
}
