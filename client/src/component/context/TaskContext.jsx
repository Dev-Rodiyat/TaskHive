import { createContext, useContext, useState } from 'react';
import api from '../../utils/api';
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/task/get-all-tasks`, { withCredentials: true });
            console.log({ res })
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (newTask) => {
        try {
            const res = await api.post(`/task/create-task`, newTask, { withCredentials: true });
            setTasks(prev => [res.data, ...prev]);
        } catch (err) {
            console.error('Error creating task:', err);
        }
    };

    const updateTask = async (taskId, updatedData) => {
        try {
            const res = await api.put(`/task/update-task/${taskId}`, updatedData, {
                withCredentials: true,
            });
            setTasks(prev =>
                prev.map(task => (task._id === taskId ? res.data : task))
            );
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/task/delete-task/${taskId}`, {
                withCredentials: true,
            });
            setTasks(prev => prev.filter(task => task._id !== taskId));
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            loading,
            fetchTasks,
            addTask,
            updateTask,
            deleteTask,
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => useContext(TaskContext);
