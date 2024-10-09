import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const AdminNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold">
                            Admin Dashboard
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex space-x-4">
                            <Link to="employee-list" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                Dashboard
                            </Link>
                            <Link to="create-employee" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                create Employee
                            </Link>
                           
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={toggleNavbar} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="employee-list" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                        Dashboard
                    </Link>
                    <Link to="create-employee" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                        Create Employee
                    </Link>
                   
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
