import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';

const Header = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleProfile = () => {
        // TODO: Navigate to profile page when implemented
        navigate('/profile');
        setIsDropdownOpen(false);
    };

    const handleChangePassword = () => {
        navigate('/password');
        setIsDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const pathname = window.location.pathname.split('/')[1];

    return (
        <div className="relative z-10 bg-white/95 backdrop-blur-md shadow-2xl border-b border-white/30">
            <div className="max-w-7xl mx-auto py-4 px-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <h4 className=" font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {!pathname ? 'Home' : pathname}
                        </h4>
                        <div className="h-10 w-10 rounded-xl flex items-center justify-center shadow-lg border-t-2 border-r-2 border-b-2 border-l-2 border-gray-300 cursor-pointer" onClick={() => navigate('/')}>
                            <img src="/src/assets/logo.png" alt="Logo" className="h-10 w-10" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {`Welcome ${user.username}`}
                        </h1>
                    </div>

                    {/* User Icon with Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                        >
                            <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <svg className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-in slide-in-from-top-2 duration-200">
                                <div className="px-4 py-2 bg-slate-200 border-b border-gray-100 rounded-lg">
                                    <p className="text-xs text-gray-500">Signed in as {user.username}</p>
                                </div>

                                <button
                                    onClick={handleProfile}
                                    className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                                >
                                    <Icon icon="user" />
                                    <span>Profile</span>
                                </button>

                                <button
                                    onClick={handleChangePassword}
                                    className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                                >
                                    <Icon icon="password" />
                                    <span>Change Password</span>
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-3"
                                >
                                    <Icon icon="logout" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;