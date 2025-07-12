import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import taskImage from './../../assets/task.png';
import Header from './Header';
import Footer from './Footer';

export default function Home() {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: (i = 1) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: 'easeOut',
            },
        }),
    };

    const features = [
        {
            title: 'Simple Task Creation',
            desc: 'Add and manage tasks effortlessly with an intuitive, clutter-free interface.',
        },
        {
            title: 'Priority Management',
            desc: 'Mark tasks as high, medium, or low priority to stay focused on what matters most.',
        },
        {
            title: 'Cross-Device Sync',
            desc: 'Access and update your tasks seamlessly across mobile, tablet, and desktop.',
        },
        {
            title: 'Task Sharing',
            desc: 'Share tasks with teammates or collaborators to boost accountability.',
        },
        {
            title: 'Smart Notifications',
            desc: 'Get real-time alerts for tasks, updates, and deletions.',
        },
        {
            title: 'Productivity Insights',
            desc: 'Track your task completion trends and discover patterns to work smarter.',
        },
    ];

    const steps = [
        {
            title: '1. Create an Account',
            desc: 'Sign up quickly using your email and set up your TaskHive profile.',
        },
        {
            title: '2. Add Your Tasks',
            desc: 'List your daily goals and organize them by priority or category.',
        },
        {
            title: '3. Stay Organized',
            desc: 'Manage deadlines, mark progress, and declutter your task list.',
        },
        {
            title: '4. Search & Filter',
            desc: 'Easily locate specific tasks or filter by status, tags, or priority.',
        },
        {
            title: '5. Enable Notifications',
            desc: 'Get real-time updates on tasks, updates, or deletions.',
        },
        {
            title: '6. Analyze & Improve',
            desc: 'Review your completed tasks and improve efficiency with insights.',
        },
    ];

    return (
        <div className="min-h-screen bg-white text-gray-800 flex flex-col font-inter">
            <Header/>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
                className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 pt-24 pb-10 bg-gradient-to-r from-indigo-50 to-indigo-100"
            >
                <motion.div variants={fadeUp} className="max-w-xl text-center md:text-left">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                        Stay Organized. Get Things Done.
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg mb-6">
                        TaskHive helps you manage your tasks, prioritize efficiently, and boost your productivity—all in one place.
                    </p>
                    <Link
                        to="/register"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-lg font-medium inline-block"
                    >
                        Create an Account
                    </Link>
                </motion.div>
                <motion.img
                    src={taskImage}
                    alt="Task Illustration"
                    className="w-full max-w-md mt-10 md:mt-0"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                />
            </motion.section>

            {/* Features Section */}
            <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-16 bg-white text-center">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-10">Why TaskHive?</h3>
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-md transition"
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={fadeUp}
                        >
                            <FaCheckCircle className="text-indigo-600 text-3xl mx-auto mb-4" />
                            <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                            <p className="text-gray-600">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-4 sm:px-6 md:px-10 lg:px-16 bg-gray-50 text-center">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-10">How It Works</h3>
                <div className="max-w-5xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeUp}
                        >
                            <div className="text-4xl font-bold text-indigo-600 mb-4">{step.title}</div>
                            <p className="text-gray-700 text-base">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <motion.section
                className="bg-indigo-600 text-white text-center py-16 px-4 sm:px-6 md:px-10 lg:px-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Take Control of Your Day?</h3>
                <p className="text-base sm:text-lg mb-6">
                    Join thousands of productive users managing tasks efficiently with TaskHive.
                </p>
                <Link
                    to="/register"
                    className="inline-block px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition"
                >
                    Get Started for Free
                </Link>
            </motion.section>            
            <Footer/>
        </div>
    );
}
