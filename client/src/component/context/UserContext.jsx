import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../../utils/api';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);

    // Global loading state when initially fetching user
    const [loading, setLoading] = useState(true);

    // Loading states for specific actions
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

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
            const res = await api.put('/user/update-user', updatedData, { withCredentials: true });
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
                logoutLoading,
                deleteLoading,
                updateLoading,
                logoutUser,
                deleteUserAccount,
                updateUserProfile
            }}
        >
            {children}
        </UserContext.Provider>
    );
}; 