import React from 'react'

const Footer = () => {
    return (
        <footer className="py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} TaskHive. All rights reserved.
        </footer>
    )
}

export default Footer