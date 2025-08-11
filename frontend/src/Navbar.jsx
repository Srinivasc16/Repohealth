import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    BarChart3,
    Menu,
    Moon,
    Sun,
    X,
    LogOut,
    User,
    ChevronDown
} from "lucide-react";

const Navbar = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    // Fetch logged-in user
    useEffect(() => {
        fetch("http://localhost:8080/user", { credentials: "include" })
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (data && data.login) {
                    setUser({
                        username: data.login,
                        avatar: data.avatar_url,
                        profileUrl: data.html_url
                    });
                }
            })
            .catch(() => {});
    }, []);
    const handleLogout = () => {
        fetch("http://localhost:8080/logout", {
            method: "POST",
            credentials: "include"
        }).then(() => {
            setUser(null);
            window.location.href = "/"; // force refresh
        });
    };

    // Scroll listener with debounce
    useEffect(() => {
        let timeoutId;
        const handleScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setScrolled(window.scrollY > 20);
            }, 10);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.user-dropdown')) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const navbarClasses = `fixed z-50 transition-all duration-700 ease-out ${
        scrolled
            ? "top-0 left-0 w-full rounded-none shadow-2xl"
            : "top-3 left-1/2 -translate-x-1/2 w-[92%] md:w-[85%] lg:w-[80%] rounded-3xl shadow-xl"
    }`;

    const containerClasses = `flex justify-between items-center px-6 py-4 border backdrop-blur-xl transition-all duration-700 ease-out ${
        scrolled ? "rounded-none" : "rounded-3xl"
    } ${
        theme === "dark"
            ? "bg-black/20 border-white/10 shadow-black/20"
            : "bg-white/60 border-gray-200/50 shadow-gray-900/10"
    }`;

    return (
        <>
            <nav className={navbarClasses}>
                <div className={containerClasses}>
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative w-11 h-11 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/30 transition-all duration-300 group-hover:scale-105">
                            <BarChart3 className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <span
                            className={`font-bold text-xl transition-colors duration-300 ${
                                theme === "dark" ? "text-white group-hover:text-orange-300" : "text-gray-900 group-hover:text-orange-600"
                            }`}
                        >
                            RepoHealth
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['Features', 'Dashboard'].map((item) => (
                            <Link
                                key={item}
                                to={`/${item.toLowerCase()}`}
                                className={`relative font-medium transition-all duration-300 hover:scale-105 ${
                                    theme === "dark"
                                        ? "text-white/90 hover:text-orange-300"
                                        : "text-gray-700 hover:text-orange-600"
                                } after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-orange-500 after:to-red-500 after:transition-all after:duration-300 hover:after:w-full after:rounded-full`}
                            >
                                {item}
                            </Link>
                        ))}

                        {/* User Dropdown */}
                        {user ? (
                            <div className="relative user-dropdown">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className={`flex items-center space-x-3 rounded-2xl transition-all duration-300 hover:scale-105 px-3 py-2 ${
                                        userMenuOpen
                                            ? 'bg-orange-500/20 shadow-lg'
                                            : 'hover:bg-orange-500/10'
                                    }`}
                                >
                                    <div className="relative">
                                        <img
                                            src={user.avatar}
                                            alt="avatar"
                                            className="w-9 h-9 rounded-full border-2 border-white/20 transition-all duration-300 hover:border-orange-400/50"
                                        />
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                                    </div>
                                    <span
                                        className={`font-medium transition-colors duration-300 ${
                                            theme === "dark" ? "text-white" : "text-gray-800"
                                        }`}
                                    >
                                        {user.username}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                                        userMenuOpen ? 'rotate-180' : ''
                                    } ${theme === "dark" ? "text-white/70" : "text-gray-600"}`} />
                                </button>

                                <div
                                    className={`absolute right-0 mt-3 w-48 rounded-2xl shadow-2xl border backdrop-blur-xl transform transition-all duration-300 origin-top ${
                                        userMenuOpen
                                            ? 'opacity-100 scale-100 translate-y-0'
                                            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                    } ${
                                        theme === "dark"
                                            ? "bg-white border-white/10 text-black shadow-black/50"
                                            : "bg-white/90 border-gray-200/50 text-gray-800 shadow-gray-900/20"
                                    }`}
                                >
                                    <div className="p-2">
                                        <a
                                            href={user.profileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-orange-500/10 hover:scale-[1.02]"
                                        >
                                            <User className="w-4 h-4" />
                                            <span>View Profile</span>
                                        </a>
                                        <button
                                            onClick={handleLogout}
                                            className="px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-200 hover:scale-105 flex items-center space-x-3"
                                        >
                                            <LogOut className="w-4 h-4"/>
                                            <span>Logout</span>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <a
                                href="http://localhost:8080/oauth2/authorization/github"
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-2xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                Get Started
                            </a>
                        )}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg ${
                                theme === "dark"
                                    ? "bg-white/10 text-yellow-400 hover:bg-white/20 shadow-black/20"
                                    : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 shadow-gray-300/50"
                            }`}
                        >
                            <div className="relative">
                                {theme === "dark" ? (
                                    <Sun className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
                                ) : (
                                    <Moon className="w-5 h-5 transition-transform duration-300 hover:-rotate-12" />
                                )}
                            </div>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`md:hidden p-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                            theme === "dark"
                                ? "text-white hover:bg-white/10"
                                : "text-gray-900 hover:bg-gray-100/60"
                        }`}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-50 transition-all duration-500 ${
                isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
                {/* Overlay */}
                <div
                    className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500 ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => setIsOpen(false)}
                ></div>

                {/* Sidebar */}
                <div
                    className={`fixed top-0 left-0 w-80 h-full p-6 border-r backdrop-blur-xl transform transition-all duration-500 ease-out ${
                        isOpen ? 'translate-x-0' : '-translate-x-full'
                    } ${
                        theme === "dark"
                            ? "bg-black/80 border-white/10 text-white shadow-2xl shadow-black/50"
                            : "bg-white/90 border-gray-200/50 text-gray-900 shadow-2xl shadow-gray-900/20"
                    }`}
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                                <BarChart3 className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-lg">RepoHealth</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className={`p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                                theme === "dark"
                                    ? "hover:bg-white/10"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="flex flex-col space-y-3">
                        {[
                            { name: 'Features', path: '/features' },
                            { name: 'Dashboard', path: '/dashboard' }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                                    theme === "dark"
                                        ? "hover:bg-white/10 hover:text-orange-300"
                                        : "hover:bg-gray-100 hover:text-orange-600"
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="border-t border-gray-300/20 my-4"></div>

                        {user ? (
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 px-4 py-2">
                                    <img
                                        src={user.avatar}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full border border-gray-300/30"
                                    />
                                    <span className="font-medium">{user.username}</span>
                                </div>
                                <a
                                    href={user.profileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    className={`px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 flex items-center space-x-3 ${
                                        theme === "dark"
                                            ? "hover:bg-white/10"
                                            : "hover:bg-gray-100"
                                    }`}
                                >
                                    <User className="w-4 h-4" />
                                    <span>View Profile</span>
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-200 hover:scale-105 flex items-center space-x-3"
                                >
                                    <LogOut className="w-4 h-4"/>
                                    <span>Logout</span>
                                </button>

                            </div>
                        ) : (
                            <a
                                href="http://localhost:8080/oauth2/authorization/github"
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-2xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 text-center"
                            >
                                Get Started
                            </a>
                        )}

                        <button
                            onClick={() => {
                                toggleTheme();
                                setIsOpen(false);
                            }}
                            className={`flex items-center space-x-3 px-4 py-3 mt-6 rounded-xl transition-all duration-200 hover:scale-105 ${
                                theme === "dark"
                                    ? "bg-white/10 hover:bg-white/20"
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-600" />
                            )}
                            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                        </button>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navbar;