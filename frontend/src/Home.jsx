import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Activity, AlertCircle, BarChart3, Eye, FileText, TrendingUp, Users} from "lucide-react";
import { BookOpen,  Code } from "lucide-react";
import {
    Sparkles,
    ArrowRight
} from 'lucide-react';
const Home = ({ theme }) => {
    const [scrollY, setScrollY] = useState(0);
    const navigate = useNavigate();
    const features = [
        {
            icon: BarChart3,
            title: "Real-time Analytics",
            description: "Monitor commits, pull requests, and issues with beautiful, interactive dashboards that update in real-time.",
            color: "text-blue-500",
            bgColor: theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50',
            borderColor: theme === 'dark' ? 'border-blue-500/20' : 'border-blue-200',
            hoverBg: theme === 'dark' ? 'group-hover:bg-blue-500/20' : 'group-hover:bg-blue-100',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Activity,
            title: "AI Code Review",
            description: "Get intelligent suggestions for code improvements, complexity reduction, and best practice recommendations.",
            color: "text-purple-500",
            bgColor: theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-50',
            borderColor: theme === 'dark' ? 'border-purple-500/20' : 'border-purple-200',
            hoverBg: theme === 'dark' ? 'group-hover:bg-purple-500/20' : 'group-hover:bg-purple-100',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: FileText,
            title: "Documentation Health",
            description: "Automatically evaluate README quality, code comments, and documentation completeness with actionable tips.",
            color: "text-green-500",
            bgColor: theme === 'dark' ? 'bg-green-500/10' : 'bg-green-50',
            borderColor: theme === 'dark' ? 'border-green-500/20' : 'border-green-200',
            hoverBg: theme === 'dark' ? 'group-hover:bg-green-500/20' : 'group-hover:bg-green-100',
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description: "Track contributor engagement, response times, and community health to build stronger development teams.",
            color: "text-pink-500",
            bgColor: theme === 'dark' ? 'bg-pink-500/10' : 'bg-pink-50',
            borderColor: theme === 'dark' ? 'border-pink-500/20' : 'border-pink-200',
            hoverBg: theme === 'dark' ? 'group-hover:bg-pink-500/20' : 'group-hover:bg-pink-100',
            gradient: 'from-pink-500 to-rose-500'
        },
        {
            icon: AlertCircle,
            title: "Smart Alerts",
            description: "Receive intelligent notifications about declining metrics, stale PRs, and optimization opportunities.",
            color: "text-red-500",
            bgColor: theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50',
            borderColor: theme === 'dark' ? 'border-red-500/20' : 'border-red-200',
            hoverBg: theme === 'dark' ? 'group-hover:bg-red-500/20' : 'group-hover:bg-red-100',
            gradient: 'from-red-500 to-orange-500'
        },
        {
            icon: TrendingUp,
            title: "Predictive Insights",
            description: "Understand trends and predict future repository health with advanced machine learning algorithms.",
            color: "text-orange-500",
            bgColor: theme === 'dark' ? 'bg-orange-500/10' : 'bg-orange-50',
            borderColor: theme === 'dark' ? 'border-orange-500/20' : 'border-orange-200',
            hoverBg: theme === 'dark' ? 'group-hover:bg-orange-500/20' : 'group-hover:bg-orange-100',
            gradient: 'from-orange-500 to-yellow-500'
        }
    ];
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const glassClass = theme === "dark"
        ? "bg-white/10 border-white/20 backdrop-blur-xl shadow-lg"
        : "bg-white/40 border-gray-200 backdrop-blur-xl shadow-lg";

    const cardClass = theme === "dark"
        ? "bg-white/10 border-white/20 hover:bg-white/20 transition"
        : "bg-white/50 border-gray-300 hover:bg-white/70 transition";

    const textMain = theme === "dark" ? "text-gray-100" : "text-gray-900";
    const textSub = theme === "dark" ? "text-gray-400" : "text-gray-600";
    const dashboardScale = Math.min(1 + scrollY * 0.0001, 1.2);
    const dashboardOpacity = Math.max(1, 0.3);

    return (
        <div className={`transition-all duration-500 ${
            theme === 'dark' ? 'bg-black' : 'bg-white'
        }`}>
            {/* Hero Section */}
            <section className={`pt-20 pb-16 overflow-hidden ${
                theme === 'dark'
                    ? 'bg-black'
                    : 'bg-gradient-to-br from-gray-50 to-white'
            }`}>
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className={`absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${
                        theme === 'dark' ? 'bg-orange-500' : 'bg-orange-200'
                    }`}></div>
                    <div className={`absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${
                        theme === 'dark' ? 'bg-blue-500' : 'bg-blue-200'
                    }`}></div>
                </div>


                <div className="max-w-6xl mx-auto px-6 py-16 text-center">
                    <h1
                        className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                    >
                        Monitor your GitHub
                        <br/>
                        <span className="text-orange-600">repository health</span>
                    </h1>

                    <p
                        className={`text-xl mb-10 max-w-3xl mx-auto leading-relaxed ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                    >
                        Get instant insights into your repository's activity, code quality, and documentation.
                        Make data-driven decisions to improve your project's health score.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 hover:cursor-pointer">
                        {/* Primary Button */}
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="group relative px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg transition-all duration-500 shadow-lg transform hover:-translate-y-1 hover:scale-103 overflow-hidden"
                        >
                            {/* Glow background */}

                            <span className="flex items-center justify-center space-x-2 relative z-10">
                <span>Analyze Repository</span>
                <BarChart3 className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"/>
            </span>
                        </button>

                        {/* Secondary Button */}
                        <button
                            className={`group relative px-8 py-4 border-2 font-semibold rounded-lg transition-all duration-500 transform hover:-translate-y-1 overflow-hidden ${
                                theme === "dark"
                                    ? "border-gray-600 text-gray-300 hover:border-orange-500 hover:text-orange-400"
                                    : "border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-600"
                            }`}
                        >
                            {/* Subtle gradient hover background */}
                            <span
                                className={`absolute inset-0 ${
                                    theme === "dark"
                                        ? "bg-orange-500/10"
                                        : "bg-orange-500/5"
                                } opacity-0 group-hover:opacity-100 transition duration-500`}
                            ></span>

                            <span className="flex items-center justify-center space-x-2 relative z-10">
                <Eye
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"/>
                <span>View Live Demo</span>
            </span>
                        </button>
                    </div>


                {/* Dashboard Preview */}
                <div className="relative max-w-4xl mx-auto px-4">
                    <div
                        className={`rounded-2xl border overflow-hidden transform transition-all duration-700 ease-out ${glassClass}`}
                        style={{
                            transform: `scale(${dashboardScale})`,
                            opacity: dashboardOpacity,
                        }}
                    >
                        {/* Window Header */}
                        <div
                            className={`px-6 py-3 border-b ${theme === "dark" ? "border-white/20" : "border-gray-200"} flex items-center space-x-2`}>
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className={`ml-4 text-sm font-mono truncate ${textSub}`}>
                        github.com/repo-health
                    </span>
                        </div>

                        {/* Dashboard Content */}
                        <div className="p-8">
                            {/* Title + Score */}
                            <div
                                className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                                <h3 className={`text-2xl font-bold ${textMain}`}>
                                    Repository Health Overview
                                </h3>
                                <div className="text-right">
                                    <div className="text-4xl font-extrabold text-orange-400 drop-shadow-md">
                                        87
                                    </div>
                                    <div className={`text-sm ${textSub}`}>
                                        Strong & Well-Maintained
                                    </div>
                                </div>
                            </div>

                            {/* Score Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Documentation */}
                                <div className={`text-center p-6 rounded-xl border ${cardClass}`}>
                                    <BookOpen className="w-8 h-8 mx-auto mb-3 text-orange-400"/>
                                    <div className={`font-semibold ${textMain}`}>
                                        Documentation Quality
                                    </div>
                                    <div className={`text-sm mt-2 ${textSub}`}>
                                        README covers setup & usage; lacks advanced API examples.
                                    </div>
                                </div>

                                {/* Activity */}
                                <div className={`text-center p-6 rounded-xl border ${cardClass}`}>
                                    <Activity className="w-8 h-8 mx-auto mb-3 text-green-400"/>
                                    <div className={`font-semibold ${textMain}`}>
                                        Development Activity
                                    </div>
                                    <div className={`text-sm mt-2 ${textSub}`}>
                                        Active commits; PRs merged quickly, could improve review depth.
                                    </div>
                                </div>

                                {/* Code Quality */}
                                <div className={`text-center p-6 rounded-xl border ${cardClass}`}>
                                    <Code className="w-8 h-8 mx-auto mb-3 text-blue-400"/>
                                    <div className={`font-semibold ${textMain}`}>
                                        Code Quality
                                    </div>
                                    <div className={`text-sm mt-2 ${textSub}`}>
                                        Modular structure, consistent naming; minor duplication remains.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
</section>

    {/* Rest of the sections with theme support... */
    }
    {/* Features Section */
    }
    <section className={`py-32 relative overflow-hidden ${
        theme === 'dark'
            ? 'bg-gradient-to-b from-gray-900 via-black to-gray-900'
            : 'bg-gradient-to-b from-white via-gray-50/50 to-white'
    }`}>
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${
                theme === 'dark' ? 'bg-orange-500' : 'bg-orange-200'
            }`}></div>
            <div className={`absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${
                theme === 'dark' ? 'bg-blue-500' : 'bg-blue-200'
            }`}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-24">
                {/* Badge */}
                <div
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold mb-8 transition-all duration-300 hover:scale-105 ${
                        theme === 'dark'
                            ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                            : 'bg-orange-50 text-orange-600 border border-orange-200'
                    }`}>
                    <Sparkles className="w-4 h-4"/>
                    Powerful Features
                </div>

                {/* Main heading */}
                <h2 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                    Everything you need for
                    <br/>
                    <span className="relative">
                            <span
                                className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                                healthy repositories
                            </span>
                            <div
                                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full opacity-30"></div>
                        </span>
                </h2>

                {/* Description */}
                <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            Comprehensive analytics and AI-powered insights designed to help developers
                            maintain thriving, high-quality GitHub repositories.
                        </p>
                    </div>

                    {/* Features grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`group relative rounded-3xl p-8 border transition-all duration-700 ease-out transform hover:-translate-y-3 hover:scale-[1.02] cursor-pointer overflow-hidden ${
                                    theme === 'dark'
                                        ? `bg-gray-800/50 backdrop-blur-sm ${feature.borderColor} hover:border-orange-500/50 hover:bg-gray-800/80`
                                        : `bg-white/80 backdrop-blur-sm ${feature.borderColor} hover:border-orange-300/50 hover:bg-white`
                                } hover:shadow-2xl hover:shadow-orange-500/10`}
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                {/* Gradient overlay on hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>

                                {/* Icon container */}
                                <div
                                    className={`relative w-18 h-18 ${feature.bgColor} ${feature.hoverBg} rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                    <feature.icon
                                        className={`w-9 h-9 ${feature.color} transition-all duration-300 group-hover:scale-110`}/>

                                    {/* Glow effect */}
                                    <div
                                        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl ${feature.bgColor}`}></div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className={`text-2xl font-bold mb-4 transition-all duration-300 ${
                                        theme === 'dark'
                                            ? 'text-white group-hover:text-orange-300'
                                            : 'text-gray-900 group-hover:text-orange-600'
                                    }`}>
                                        {feature.title}
                                    </h3>
                                    <p className={`text-lg leading-relaxed transition-all duration-300 ${
                                        theme === 'dark'
                                            ? 'text-gray-300 group-hover:text-gray-200'
                                            : 'text-gray-600 group-hover:text-gray-700'
                                    }`}>
                                        {feature.description}
                                    </p>

                                    {/* Hover arrow */}
                                    <div
                                        className="flex items-center mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                                    <span className={`text-sm font-medium mr-2 ${
                                        theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                                    }`}>
                                        Learn more
                                    </span>
                                        <ArrowRight className={`w-4 h-4 ${
                                            theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                                        }`}/>
                                    </div>
                                </div>

                                {/* Corner decoration */}
                                <div
                                    className={`absolute top-4 right-4 w-2 h-2 rounded-full transition-all duration-300 ${
                                        theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                                    } group-hover:bg-orange-500 group-hover:scale-150`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className={`py-20 relative overflow-hidden ${
                theme === 'dark'
                    ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800'
                    : 'bg-gradient-to-r from-gray-900 via-black to-gray-900'
            }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-orange-400/10"></div>
                <div className="relative z-10 max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Trusted by developers worldwide</h2>
                        <p className="text-xl text-gray-300">Join the growing community of teams using RepoHealth</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            {number: "50K+", label: "Repositories Analyzed", suffix: ""},
                            {number: "2.5M+", label: "Health Checks Run", suffix: ""},
                            {number: "99.9", label: "Uptime Guarantee", suffix: "%"},
                            {number: "< 30", label: "Average Analysis Time", suffix: "s"}
                        ].map((stat, index) => (
                            <div key={index} className="group">
                                <div
                                    className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-500">
                                    {stat.number}<span className="text-orange-400">{stat.suffix}</span>
                                </div>
                                <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={`py-24 relative overflow-hidden ${
                theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900'
                    : 'bg-gradient-to-br from-orange-50 to-white'
            }`}>
                <div
                    className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full -translate-y-48 translate-x-48"></div>
                <div
                    className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/20 rounded-full translate-y-48 -translate-x-48"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div
                        className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-6">
                        🚀 Ready to get started?
                    </div>
                    <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                        Transform your repository
                        <br/>
                        <span className="text-orange-600">health today</span>
                    </h2>
                    <p className={`text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Join thousands of developers who trust RepoHealth to monitor, analyze,
                        and improve their GitHub repositories with AI-powered insights.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="group px-10 py-5 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
                        >
              <span className="flex items-center justify-center space-x-2">
                <span>Start Free Analysis</span>
                <BarChart3 className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"/>
              </span>
                        </button>
                        <button
                            className={`px-10 py-5 border-2 font-semibold rounded-xl transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1 ${
                                theme === 'dark'
                                    ? 'border-gray-600 text-gray-300 hover:border-orange-600 hover:text-orange-400'
                                    : 'border-gray-300 text-gray-700 hover:border-orange-600 hover:text-orange-600'
                            }`}>
                            View Pricing Plans
                        </button>
                    </div>
                    <p className={`text-sm mt-6 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                        No credit card required • Free forever plan available
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className={`border-t transition-all duration-500 ${
                theme === 'dark'
                    ? 'bg-gray-900 border-gray-800'
                    : 'bg-white border-gray-200'
            }`}>
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div
                                    className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <BarChart3 className="w-6 h-6 text-white"/>
                                </div>
                                <span className={`font-bold text-xl ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                  RepoHealth
                </span>
                            </div>
                            <p className={`${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                AI-powered repository health monitoring for modern development teams.
                            </p>
                        </div>

                        {[
                            {
                                title: "Product",
                                links: ["Features", "Pricing", "API", "Integrations"]
                            },
                            {
                                title: "Company",
                                links: ["About", "Blog", "Careers", "Contact"]
                            },
                            {
                                title: "Support",
                                links: ["Help Center", "Documentation", "Community", "Status"]
                            }
                        ].map((section, index) => (
                            <div key={index}>
                                <h4 className={`font-semibold mb-4 ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                    {section.title}
                                </h4>
                                <ul className={`space-y-2 ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a href="#" className="hover:text-orange-600 transition-colors">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center ${
                        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                    }`}>
                        <div className={`text-sm mb-4 md:mb-0 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            © {new Date().getFullYear()} RepoHealth. Made with ❤️ for developers worldwide.
                        </div>
                        <div className={`flex space-x-6 text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            <a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-orange-600 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-orange-600 transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default Home;