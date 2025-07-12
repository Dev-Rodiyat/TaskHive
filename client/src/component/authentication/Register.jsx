
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { BsCheck2All } from 'react-icons/bs';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import axios from 'axios';
import PasswordInput from './PasswordInput';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const override = {
    display: 'block',
    margin: '100px auto',
} 

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [uCase, setUCase] = useState(false);
    const [num, setNum] = useState(false);
    const [sChar, setSChar] = useState(false);
    const [passwordLength, setPasswordLength] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formValidMessage, setFormValidMessage] = useState(false)
    const [loading, setLoading] = useState(false);
    const [formCompleted, setFormCompleted] = useState(false);

    const navigate = useNavigate();

    const timesIcon = <FaTimes color='red' size={20} />
    const checkIcon = <BsCheck2All color='green' size={20} />

    const switchIcon = (condition) => {
        return condition ? checkIcon : timesIcon
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    useEffect(() => {
        const password = formData.password;
        setUCase(/([a-z].*[A-Z])|([A-Z].*[a-z])/.test(password));
        setNum(/([0-9])/.test(password));
        setSChar(/([!,%,&,@,#,$,_,*])/.test(password));
        setPasswordLength(password.length > 5);
    }, [formData.password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { name, email, password, confirmPassword } = formData;

            if (!name || !email || !password || !confirmPassword) {
                setFormValidMessage('OOps, All fields are required');
                return;
            }

            if (password !== confirmPassword) {
                setFormValidMessage('Oops, Password does not match');
                return;
            }
            setIsSubmitting(true);
            setLoading(true);

            const response = await axios.post(`${SERVER_URL}/user/register`, formData, { withCredentials: true });

            if (response?.data) {
                setLoading(false)
                // setUser(response.data)
                setIsSubmitting(false)
                setFormCompleted(true);
                toast.success('Registration Successful');
                navigate('/dashboard', { state: { user: response.data } })
            }

        } catch (error) {
            setIsSubmitting(false);
            toast.error(error?.response?.data?.message)
            const message = error?.response?.data?.message ? `${error.response.data.message}` : 'Internal server error'
            console.log(error)
            setFormValidMessage(message);
            setLoading(false);
        }
    }

    const handlePastePassword = (e) => {
        e.preventDefault();
        toast.error('Cannot paste into this field');
        return;
    }

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <ClipLoader color="#1a80e5" loading={loading} cssOverride={override}/>
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                    <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-8">

                        {/* Title */}
                        <p className="text-2xl font-semibold text-center text-gray-800 mb-6">Create an Account</p>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Full Name */}
                            <div className="flex flex-col">
                                <label htmlFor="name" className="text-sm text-gray-600 mb-1">Full Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter Your Full Name"
                                    onChange={handleInputChange}
                                    value={formData.name}
                                    required
                                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-sm text-gray-600 mb-1">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    onChange={handleInputChange}
                                    value={formData.email}
                                    required
                                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col">
                                <label htmlFor="password" className="text-sm text-gray-600 mb-1">Password:</label>
                                <PasswordInput
                                    type="password"
                                    name="password"
                                    placeholder="Enter Your Password"
                                    onChange={handleInputChange}
                                    value={formData.password}
                                    required
                                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="flex flex-col">
                                <label htmlFor="confirmPassword" className="text-sm text-gray-600 mb-1">Confirm Password:</label>
                                <PasswordInput
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    onChange={handleInputChange}
                                    onPaste={handlePastePassword}
                                    value={formData.confirmPassword}
                                    required
                                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                                />
                            </div>

                            {/* Password Validation Checklist */}
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-center gap-2">{switchIcon(uCase)} Lowercase & Uppercase</li>
                                    <li className="flex items-center gap-2">{switchIcon(num)} Number (0 - 9)</li>
                                    <li className="flex items-center gap-2">{switchIcon(sChar)} Special Characters (!, %, &, @, #, $, _, *)</li>
                                    <li className="flex items-center gap-2">{switchIcon(passwordLength)} Minimum of 6 characters</li>
                                </ul>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-2 rounded-lg font-medium text-white transition
              ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            >
                                {isSubmitting ? 'Signing you up...' : 'Create Account'}
                            </button>
                        </form>

                        {/* Form validation message */}
                        {formValidMessage && (
                            <p className="mt-4 text-center text-red-600 text-sm">{formValidMessage}</p>
                        )}

                        {/* Login redirect */}
                        <p className="mt-6 text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-indigo-600 hover:underline font-medium">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Register