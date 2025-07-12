import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
            <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
                Page Not Found
            </h2>
            <p className="text-gray-600 max-w-md mb-6">
                The page you’re looking for doesn’t exist or has been moved.
            </p>
            <Link
                to="/"
                className="inline-flex items-center bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
                <FaArrowLeft className="mr-2" /> Go back home
            </Link>
        </div>
    );
}
