import React from "react";
import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
    <FiAlertTriangle className="text-yellow-500" size={64} />
    <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
    <p className="mt-2 text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Go Home
    </Link>
  </div>
);

export default NotFound;