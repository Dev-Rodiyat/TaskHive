import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUser } from './context/UserContext';

const Header = () => {
    const { user } = useUser();
    const location = useLocation();

    const navTitle = [
        { url: "/", title: "Home" },
        { url: "/about", title: "About" },
    ];

    console.log({user})

    return (
        <div className="sticky top-0 z-50 bg-white px-4 sm:px-6 md:px-10 lg:px-20 pt-4 shadow">
            <header className="px-6 py-3 rounded-xl flex justify-between items-center w-full">
                <h1 className="text-2xl font-bold text-indigo-600">TaskHive</h1>

                <div className="flex items-center space-x-10">
                    <ul className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-inter font-semibold text-sm xl:text-base">
                        {navTitle.map(({ url, title }, index) => (
                            <li key={index}>
                                <Link
                                    to={url}
                                    className={`transition-colors duration-700 ease-in-out hover:text-indigo-600
                            ${url === location.pathname
                                            ? "text-indigo-700 font-semibold"
                                            : "text-gray-800"
                                        }`}
                                >
                                    {title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {user ? (
                        <Link to="/dashboard">
                            <div className="border border-indigo-500 shadow-md shadow-indigo-100 rounded-full px-2 py-1 flex gap-1 items-center">
                                <p className="">{user?.email}</p>
                                <div className="w-4 h-4 sm:w-8 sm:h-8 overflow-hidden rounded-full border border-indigo-300">
                                    <img
                                        src={user?.image}
                                        alt="User"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="space-x-3 flex items-center">
                            <Link
                                to="/login"
                                className="hidden sm:inline-block text-sm text-gray-700 hover:text-indigo-600 bg-indigo-50 py-2 px-4 rounded-lg hover:bg-indigo-100 transition font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </header>
        </div>
    )
}

export default Header