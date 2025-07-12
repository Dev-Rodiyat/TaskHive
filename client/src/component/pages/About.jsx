import { motion } from "framer-motion";
import { FaLaptopCode, FaLightbulb } from "react-icons/fa";
import { MdInsights } from "react-icons/md";
import Header from "./Header";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const About = () => {
    return (
        <div className="min-h-screen bg-white text-gray-800">
            <Header />

            {/* Hero Section */}
            <motion.section
                className="px-4 sm:px-6 md:px-10 lg:px-20 py-20 bg-gradient-to-r from-indigo-50 to-indigo-100 text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">About TaskHive</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
                    TaskHive is more than just a task manager — it's your productivity partner.
                    Built for users who want to stay organized, on time, and in control of their workload.
                </p>
            </motion.section>

            {/* Mission Section */}
            <motion.section
                className="py-16 px-4 sm:px-6 md:px-10 lg:px-20 bg-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <div className="max-w-5xl mx-auto text-center">
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-6">Our Mission</h3>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                        We believe productivity shouldn't feel overwhelming. TaskHive exists to simplify the way you manage your daily tasks — whether you're working solo or managing a project.
                        Our goal is to help you achieve more by focusing on what truly matters.
                    </p>
                </div>
            </motion.section>

            {/* Values Section */}
            <motion.section
                className="py-16 px-4 sm:px-6 md:px-10 lg:px-20 bg-indigo-50"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
            >
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-10">What We Value</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
                        {[
                            {
                                icon: <FaLightbulb className="text-indigo-600 text-3xl mb-3" />,
                                title: "Simplicity",
                                desc: "We strip away the clutter so you can focus on your work, not your tools."
                            },
                            {
                                icon: <FaLaptopCode className="text-indigo-600 text-3xl mb-3" />,
                                title: "Innovation",
                                desc: "We constantly iterate and improve so you always get the best task management experience."
                            },
                            {
                                icon: <MdInsights className="text-indigo-600 text-3xl mb-3" />,
                                title: "Progress Insights",
                                desc: "Track your weekly productivity trends and gain insights into your task completion habits."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition duration-300"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: i * 0.2 }}
                                viewport={{ once: true }}
                            >
                                {item.icon}
                                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                                <p className="text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Call to Action */}
            <motion.section
                className="text-center bg-indigo-600 text-white py-16 px-4 sm:px-6 md:px-10 lg:px-20"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Join TaskHive?</h3>
                <p className="text-base sm:text-lg mb-6 max-w-xl mx-auto">
                    Whether you're a student or freelancer — TaskHive is designed to help you stay organized and efficient.
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
};

export default About;
