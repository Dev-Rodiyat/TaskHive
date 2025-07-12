import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/user/get-user`, { withCredentials: true });
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

    return (
        <UserContext.Provider value={{ user, stats, loading }}>
            {children}
        </UserContext.Provider>
    );
};
