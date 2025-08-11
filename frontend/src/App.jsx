import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, Github, BarChart3, Users, FileText, AlertCircle, TrendingUp, Activity, GitBranch, Star, Eye, GitPullRequest, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import Home from './Home';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import Features from "./Features.jsx";
import ScrollToTop from "./Scrolltotop.jsx";
import Health from "./Health.jsx";
// Theme Context
const ThemeContext = React.createContext();
export default function App() {
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        // Check if the user prefers dark mode
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (prefersDark) {
            setTheme('dark');
        } else {
            setTheme('light');
        }

        // Optional: listen for changes in system theme preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            setTheme(e.matches ? 'dark' : 'light');
        };
        mediaQuery.addEventListener('change', handleChange);

        // Cleanup listener on unmount
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // Add this to prevent flash of wrong theme
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <Router>
                <div className={`transition-all duration-500 ${
                    theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'
                }`}>
                    <Navbar theme={theme} toggleTheme={toggleTheme} />
                    <ScrollToTop toggleTheme={toggleTheme} />
                    <Routes>
                        <Route path="/" element={<Home theme={theme} />} />
                        <Route path="/features" element={<Features theme={theme} />} />
                        <Route path="/dashboard" element={<Dashboard theme={theme} />} />
                        <Route path="/repo/:repoName" element={<Health theme={theme} />} />
                    </Routes>
                </div>
            </Router>
        </ThemeContext.Provider>
    );
}