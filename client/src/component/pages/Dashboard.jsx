import { useEffect, useState } from 'react';
import taskImage from './../../assets/task.png';
import { motion } from 'framer-motion';
import WeeklyProgressChart from './WeeklyProgressChart';
import { useUser } from '../context/UserContext';
import { ClipLoader } from 'react-spinners';
import { useTaskContext } from '../context/TaskContext';
import EditProfileModal from '../modals/EditProfileModal';
import { MdEdit } from 'react-icons/md';
import AddTaskModal from '../task/AddTaskModal';

const override = {
    display: 'block',
    margin: '100px auto',
}

export default function Dashboard() {
    const [isAddTaskModalaOpen, setIsAddTaskModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const { user, loading } = useUser();
    const { tasks, fetchTasks } = useTaskContext();

    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#1a80e5" loading={loading} cssOverride={override} />
    </div>;

    const handleAddTaskModalClose = () => {
        setIsAddTaskModalOpen(false);
    };

    const now = new Date();

    const completedTasks = tasks?.filter(task => task.status === 'done') || [];
    const upcomingTasks = tasks?.filter(task => {
        const due = new Date(task.dueDate);
        return due > now && task.status !== 'done';
    }) || [];

    const stats = [
        { label: 'Tasks Created', value: tasks?.length || 0 },
        { label: 'Completed Tasks', value: completedTasks.length },
        { label: 'Upcoming Tasks', value: upcomingTasks.length },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="max-w-5xl mx-auto bg-white p-6 mt-10 rounded-2xl shadow-xl w-full relative"
        >
            {user && (
                <div className="flex items-center gap-6 relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden shadow-md hover:scale-105 transition-transform bg-gray-200">
                        <img
                            src={user?.image || taskImage}
                            alt="Profile"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-800">{user?.name}</h1>
                        <p className="text-base text-zinc-500">{user?.email}</p>
                    </div>

                    <button
                        onClick={() => setIsEditOpen(true)}
                        className="ml-auto p-2 text-indigo-600 hover:text-indigo-800"
                        title="Edit Profile"
                    >
                        <MdEdit size={20} />
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-4xl">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-indigo-50 p-4 rounded-xl text-center shadow-sm"
                    >
                        <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            <WeeklyProgressChart tasks={tasks} />

            <div className="mt-10 text-center text-gray-500 italic text-sm">
                "Productivity is never an accident. It is always the result of a commitment to excellence."
            </div>

            {isAddTaskModalaOpen && <AddTaskModal onClose={handleAddTaskModalClose} />}
            <EditProfileModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
        </motion.div>
    );
}
