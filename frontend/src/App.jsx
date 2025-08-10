import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, Github, BarChart3, Users, FileText, AlertCircle, TrendingUp, Activity, GitBranch, Star, Eye, GitPullRequest, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import Home from './Home';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
// Theme Context
const ThemeContext = React.createContext();
export default function App() {
    const [theme, setTheme] = useState('light');

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

                    <Routes>
                        <Route path="/" element={<Home theme={theme} />} />
                        <Route path="/dashboard" element={<Dashboard theme={theme} />} />
                    </Routes>
                </div>
            </Router>
        </ThemeContext.Provider>
    );
}