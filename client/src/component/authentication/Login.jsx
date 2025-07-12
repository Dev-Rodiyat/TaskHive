import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import PasswordInput from './PasswordInput';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    //   const {setUser} = useContext(UserContext)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const loginUser = async (e) => {
        e.preventDefault()

        try {
            const { email, password } = formData;

            if (!email || !password) {
                toast.error('OOps, All fields are required');
                return;
            }
            setIsSubmitting(true);

            console.log({ formData });

            const response = await axios.post(`${SERVER_URL}/user/login`, formData, { withCredentials: true });

            console.log(response);
            toast.success('Login Successful');
            // setUser(response.data)
            navigate('/dashboard')

        } catch (error) {
            console.error(error)
            toast.error(error?.response?.data?.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                {/* Title */}
                <p className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</p>

                {/* Form */}
                <form onSubmit={loginUser} className="space-y-5">

                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm text-gray-600 mb-1">Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm text-gray-600 mb-1">Password:</label>
                        <PasswordInput
                            name="password"
                            placeholder="Enter Your Password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 rounded-lg font-medium text-white transition 
          ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                {/* Redirect Link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account yet?{' '}
                    <Link to="/register" className="text-indigo-600 hover:underline font-medium">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login