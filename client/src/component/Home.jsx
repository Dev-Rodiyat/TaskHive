import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import taskImage from './../assets/task.png'

export default function Home() {
    return (
        <div className="min-h-screen bg-white text-gray-800 flex flex-col">
            {/* Navbar */}
            {/* Navbar Wrapper */}
            <div className="px-4 sm:px-6 md:px-10 lg:px-20 pt-6">
                <header className="bg-white px-6 py-4 rounded-xl shadow-md flex justify-between items-center space-y-4 sm:space-y-0">
                    <h1 className="text-2xl font-bold text-indigo-600">TaskList</h1>
                    <div className="space-x-4 flex">
                        <Link
                            to="/login"
                            className="text-sm text-gray-700 hover:text-indigo-600 hidden sm:block bg-indigo-50 py-3 px-4 rounded-lg hover:bg-indigo-100 font-medium"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            Get Started
                        </Link>
                    </div>
                </header>
            </div>

            {/* Push content down below fixed navbar */}
            <div className="pt-32">
                {/* Hero Section */}
                <section className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 py-10 bg-gradient-to-r from-indigo-50 to-indigo-100">
                    <div className="max-w-xl text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Stay Organized. Get Things Done.
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg mb-6">
                            TaskList helps you manage your tasks, prioritize efficiently, and boost your productivity—all in one place.
                        </p>
                        <Link
                            to="/register"
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-lg font-medium inline-block"
                        >
                            Create an Account
                        </Link>
                    </div>
                    <img
                        src={taskImage}
                        alt="Task Illustration"
                        className="w-full max-w-md mt-10 md:mt-0"
                    />
                </section>

                {/* Features Section */}
                <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-16 bg-white text-center">
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-10">Why TaskList?</h3>
                    <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                        {[
                            {
                                title: 'Simple Task Creation',
                                desc: 'Add and manage tasks effortlessly with an intuitive interface.',
                            },
                            {
                                title: 'Priority Management',
                                desc: 'Mark tasks as high, medium, or low priority for better focus.',
                            },
                            {
                                title: 'Cross-Device Sync',
                                desc: 'Access your tasks from any device, anytime, anywhere.',
                            },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-md transition"
                            >
                                <FaCheckCircle className="text-indigo-600 text-3xl mx-auto mb-4" />
                                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-indigo-600 text-white text-center py-16 px-4 sm:px-6 md:px-10 lg:px-16">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Take Control of Your Day?</h3>
                    <p className="text-base sm:text-lg mb-6">
                        Join thousands of productive users managing tasks efficiently with TaskList.
                    </p>
                    <Link
                        to="/register"
                        className="inline-block px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition"
                    >
                        Get Started for Free
                    </Link>
                </section>

                {/* Footer */}
                <footer className="py-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} TaskList. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
