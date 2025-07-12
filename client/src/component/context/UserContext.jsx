// UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await api.get(`/user/get-user`, { withCredentials: true });
                setUser(res.data.user);
                setStats(res.data.stats);
            } catch (err) {
                console.error('Failed to fetch user data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const register = async (
        formData,
        setLoading,
        setIsSubmitting,
        setFormValidMessage,
        setFormCompleted
    ) => {
        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword) {
            setFormValidMessage('Oops, all fields are required');
            return { success: false };
        }

        if (password !== confirmPassword) {
            setFormValidMessage('Oops, passwords do not match');
            return { success: false };
        }

        try {
            setLoading(true);
            setIsSubmitting(true);

            const res = await api.post(`/user/register`, formData, {
                withCredentials: true,
            });

            if (res?.data) {
                setUser(res.data);
                setLoading(false);
                setIsSubmitting(false);
                setFormCompleted(true);
                toast.success('Registration successful!');
                return { success: true, user: res.data };
            }
        } catch (error) {
            setIsSubmitting(false);
            setLoading(false);
            const msg = error?.response?.data?.message || 'Internal server error';
            toast.error(msg);
            setFormValidMessage(msg);
            return { success: false };
        }
    };

    const loginUser = async (formData) => {
        const { email, password } = formData;

        if (!email || !password) {
            toast.error('Oops! All fields are required.');
            return { success: false };
        }

        setLoginLoading(true);

        try {
            await api.post(`/user/login`, formData, { withCredentials: true });

            const res = await api.get(`/user/get-user`, { withCredentials: true });
            setUser(res.data.user);
            setStats(res.data.stats);

            toast.success('Login successful!');
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error?.response?.data?.message || 'Login failed. Please try again.');
            return { success: false };
        } finally {
            setLoginLoading(false);
        }
    };

    const logoutUser = async () => {
        setLogoutLoading(true);
        try {
            await api.post('/user/logout', {}, { withCredentials: true });
            setUser(null);
            setStats(null);
        } catch (err) {
            console.error('Logout failed:', err);
        } finally {
            setLogoutLoading(false);
        }
    };

    const deleteUserAccount = async () => {
        setDeleteLoading(true);
        try {
            await api.delete('/user/delete-user', { withCredentials: true });
            setUser(null);
            setStats(null);
        } catch (err) {
            console.error('Account deletion failed:', err);
        } finally {
            setDeleteLoading(false);
        }
    };

    const updateUserProfile = async (updatedData) => {
        setUpdateLoading(true);
        try {
            const res = await api.put('/user/update-user', updatedData, {
                withCredentials: true,
            });
            setUser(res.data.updatedUser);
            return { success: true };
        } catch (err) {
            console.error('Profile update failed:', err);
            return { success: false, error: err };
        } finally {
            setUpdateLoading(false);
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                stats,
                loading,
                loginLoading,
                logoutLoading,
                deleteLoading,
                updateLoading,
                register,
                loginUser,
                logoutUser,
                deleteUserAccount,
                updateUserProfile,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
