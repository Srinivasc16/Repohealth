import React, { useEffect, useState } from "react";
import {
    Activity,
    AlertCircle,
    BarChart3,
    Users,
    FileText,
    TrendingUp,
    Sparkles,
    ArrowRight,
} from "lucide-react";

const Details = ({ theme }) => {
    const [scrollY, setScrollY] = useState(0);

    const features = [
        {
            icon: BarChart3,
            title: "Real-time Analytics",
            description:
                "Monitor commits, pull requests, and issues with beautiful, interactive dashboards that update in real-time.",
            color: "text-blue-500",
            bgColor: theme === "dark" ? "bg-blue-500/10" : "bg-blue-50",
            borderColor: theme === "dark" ? "border-blue-500/20" : "border-blue-200",
            hoverBg: theme === "dark" ? "group-hover:bg-blue-500/20" : "group-hover:bg-blue-100",
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            icon: Activity,
            title: "AI Code Review",
            description:
                "Get intelligent suggestions for code improvements, complexity reduction, and best practice recommendations.",
            color: "text-purple-500",
            bgColor: theme === "dark" ? "bg-purple-500/10" : "bg-purple-50",
            borderColor: theme === "dark" ? "border-purple-500/20" : "border-purple-200",
            hoverBg: theme === "dark" ? "group-hover:bg-purple-500/20" : "group-hover:bg-purple-100",
            gradient: "from-purple-500 to-pink-500",
        },
        {
            icon: FileText,
            title: "Documentation Health",
            description:
                "Automatically evaluate README quality, code comments, and documentation completeness with actionable tips.",
            color: "text-green-500",
            bgColor: theme === "dark" ? "bg-green-500/10" : "bg-green-50",
            borderColor: theme === "dark" ? "border-green-500/20" : "border-green-200",
            hoverBg: theme === "dark" ? "group-hover:bg-green-500/20" : "group-hover:bg-green-100",
            gradient: "from-green-500 to-emerald-500",
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description:
                "Track contributor engagement, response times, and community health to build stronger development teams.",
            color: "text-pink-500",
            bgColor: theme === "dark" ? "bg-pink-500/10" : "bg-pink-50",
            borderColor: theme === "dark" ? "border-pink-500/20" : "border-pink-200",
            hoverBg: theme === "dark" ? "group-hover:bg-pink-500/20" : "group-hover:bg-pink-100",
            gradient: "from-pink-500 to-rose-500",
        },
        {
            icon: AlertCircle,
            title: "Smart Alerts",
            description:
                "Receive intelligent notifications about declining metrics, stale PRs, and optimization opportunities.",
            color: "text-red-500",
            bgColor: theme === "dark" ? "bg-red-500/10" : "bg-red-50",
            borderColor: theme === "dark" ? "border-red-500/20" : "border-red-200",
            hoverBg: theme === "dark" ? "group-hover:bg-red-500/20" : "group-hover:bg-red-100",
            gradient: "from-red-500 to-orange-500",
        },
        {
            icon: TrendingUp,
            title: "Predictive Insights",
            description:
                "Understand trends and predict future repository health with advanced machine learning algorithms.",
            color: "text-orange-500",
            bgColor: theme === "dark" ? "bg-orange-500/10" : "bg-orange-50",
            borderColor: theme === "dark" ? "border-orange-500/20" : "border-orange-200",
            hoverBg: theme === "dark" ? "group-hover:bg-orange-500/20" : "group-hover:bg-orange-100",
            gradient: "from-orange-500 to-yellow-500",
        },
    ];

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`transition-all duration-500 ${
                theme === "dark" ? "bg-black" : "bg-white"
            }`}
        >
            <section
                className={`py-30 relative overflow-hidden ${
                    theme === "dark"
                        ? "bg-gradient-to-b from-gray-900 via-black to-gray-900"
                        : "bg-gradient-to-b from-white via-gray-50/50 to-white"
                }`}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className={`absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${
                            theme === "dark" ? "bg-orange-500" : "bg-orange-200"
                        }`}
                    ></div>
                    <div
                        className={`absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${
                            theme === "dark" ? "bg-blue-500" : "bg-blue-200"
                        }`}
                    ></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-24">
                        <div
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold mb-8 transition-all duration-300 hover:scale-105 ${
                                theme === "dark"
                                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                    : "bg-orange-50 text-orange-600 border border-orange-200"
                            }`}
                        >
                            <Sparkles className="w-4 h-4" />
                            Powerful Features
                        </div>

                        <h2
                            className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight ${
                                theme === "dark" ? "text-white" : "text-gray-900"
                            }`}
                        >
                            Everything you need for
                            <br />
                            <span className="relative">
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  healthy repositories
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full opacity-30"></div>
              </span>
                        </h2>

                        <p
                            className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                                theme === "dark" ? "text-gray-300" : "text-gray-600"
                            }`}
                        >
                            Comprehensive analytics and AI-powered insights designed to help
                            developers maintain thriving, high-quality GitHub repositories.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (

                            <div
                                key={index}
                                className={`group relative rounded-3xl p-8 border transition-all duration-700 ease-out transform hover:-translate-y-3 hover:scale-[1.02] cursor-pointer overflow-hidden ${
                                    theme === "dark"
                                        ? `bg-gray-800/50 backdrop-blur-sm ${feature.borderColor} hover:border-orange-500/50 hover:bg-gray-800/80`
                                        : `bg-white/80 backdrop-blur-sm ${feature.borderColor} hover:border-orange-300/50 hover:bg-white`
                                } hover:shadow-2xl hover:shadow-orange-500/10`}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                                onClick={() => navigate(`/features/${slug}`)}
                            >
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                                ></div>

                                <div
                                    className={`relative w-18 h-18 ${feature.bgColor} ${feature.hoverBg} rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                                >
                                    <feature.icon
                                        className={`w-9 h-9 ${feature.color} transition-all duration-300 group-hover:scale-110`}
                                    />
                                    <div
                                        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl ${feature.bgColor}`}
                                    ></div>
                                </div>

                                <div className="relative z-10">
                                    <h3
                                        className={`text-2xl font-bold mb-4 transition-all duration-300 ${
                                            theme === "dark"
                                                ? "text-white group-hover:text-orange-300"
                                                : "text-gray-900 group-hover:text-orange-600"
                                        }`}
                                    >
                                        {feature.title}
                                    </h3>
                                    <p
                                        className={`text-lg leading-relaxed transition-all duration-300 ${
                                            theme === "dark"
                                                ? "text-gray-300 group-hover:text-gray-200"
                                                : "text-gray-600 group-hover:text-gray-700"
                                        }`}
                                    >
                                        {feature.description}
                                    </p>
                                    <div className="flex items-center mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                    <span
                        className={`text-sm font-medium mr-2 ${
                            theme === "dark" ? "text-orange-400" : "text-orange-600"
                        }`}
                    >
                      Learn more
                    </span>
                                        <ArrowRight
                                            className={`w-4 h-4 ${
                                                theme === "dark" ? "text-orange-400" : "text-orange-600"
                                            }`}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`absolute top-4 right-4 w-2 h-2 rounded-full transition-all duration-300 ${
                                        theme === "dark" ? "bg-gray-600" : "bg-gray-300"
                                    } group-hover:bg-orange-500 group-hover:scale-150`}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Details;
