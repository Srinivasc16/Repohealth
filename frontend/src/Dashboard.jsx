import React, { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink, Plus, Code, Github, CheckCircle, Eye, Search, Filter, SortAsc, Bookmark, TrendingUp, Activity, Clock, ChevronDown, Zap, Users, Calendar } from "lucide-react";

const Dashboard = ({ theme = "light" }) => {
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likedRepos, setLikedRepos] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("updated");
    const [filterLang, setFilterLang] = useState("all");
    const [showStats, setShowStats] = useState(false);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/user/repos", {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch repositories");
                return res.json();
            })
            .then((data) => {
                setRepos(data);
                setFilteredRepos(data);
                setLoading(false);
                setTimeout(() => setShowStats(true), 500);
            })
            .catch((err) => {
                setError(err.message || "Failed to load repositories");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let filtered = repos.filter(repo =>
            repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        if (filterLang !== "all") {
            filtered = filtered.filter(repo => repo.language === filterLang);
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name": return a.name.localeCompare(b.name);
                case "stars": return (b.stargazers_count || 0) - (a.stargazers_count || 0);
                case "forks": return (b.forks_count || 0) - (a.forks_count || 0);
                case "updated": return new Date(b.updated_at) - new Date(a.updated_at);
                default: return 0;
            }
        });

        setFilteredRepos(filtered);
    }, [searchTerm, sortBy, filterLang, repos]);

    const toggleLike = (repoId) => {
        setLikedRepos(prev => {
            const newSet = new Set(prev);
            if (newSet.has(repoId)) {
                newSet.delete(repoId);
            } else {
                newSet.add(repoId);
            }
            return newSet;
        });
    };

    const handleGithubClick = (htmlUrl) => {
        window.open(htmlUrl, '_blank', 'noopener,noreferrer');
    };

    const handleCheckClick = (repoName) => {
        window.location.href = `/repo/${repoName}`;
    };

    const formatDate = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return "1 day ago";
        if (diffDays < 30) return `${diffDays} days ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    };

    const getLanguageColor = (language) => {
        const colors = {
            JavaScript: 'bg-yellow-400 shadow-yellow-400/50',
            TypeScript: 'bg-blue-500 shadow-blue-500/50',
            Python: 'bg-green-500 shadow-green-500/50',
            Java: 'bg-orange-500 shadow-orange-500/50',
            'C++': 'bg-pink-500 shadow-pink-500/50',
            'C#': 'bg-purple-500 shadow-purple-500/50',
            Go: 'bg-cyan-500 shadow-cyan-500/50',
            Rust: 'bg-red-500 shadow-red-500/50',
            PHP: 'bg-indigo-500 shadow-indigo-500/50',
            Ruby: 'bg-red-600 shadow-red-600/50',
            Swift: 'bg-orange-400 shadow-orange-400/50',
            Kotlin: 'bg-purple-600 shadow-purple-600/50'
        };
        return colors[language] || 'bg-gray-400 shadow-gray-400/50';
    };

    const uniqueLanguages = [...new Set(repos.map(repo => repo.language).filter(Boolean))];
    const isDark = theme === "dark";

    const sortOptions = [
        { value: "updated", label: "Recently Updated", icon: Clock },
        { value: "name", label: "Alphabetical", icon: SortAsc },
        { value: "stars", label: "Most Stars", icon: Star },
        { value: "forks", label: "Most Forks", icon: GitFork }
    ];

    const langOptions = [
        { value: "all", label: "All Languages", icon: Code },
        ...uniqueLanguages.map(lang => ({ value: lang, label: lang, icon: Code }))
    ];

    // Enhanced Custom Dropdown Component
    const CustomDropdown = ({
                                options,
                                value,
                                onChange,
                                placeholder,
                                isOpen,
                                setIsOpen,
                                icon: DefaultIcon
                            }) => (
        <div className="relative">
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    // Close other dropdown
                    if (setIsOpen === setSortDropdownOpen) {
                        setLangDropdownOpen(false);
                    } else {
                        setSortDropdownOpen(false);
                    }
                }}
                className={`glass-button flex items-center justify-between gap-4 px-6 py-3 rounded-2xl border-2 transition-all duration-500 min-w-[200px] group ${
                    isDark
                        ? "bg-white/[0.08] border-white/20 text-white hover:bg-white/[0.15] hover:border-white/30"
                        : "bg-black/[0.08] border-black/20 text-gray-900 hover:bg-black/[0.15] hover:border-black/30"
                } ${isOpen ? 'ring-4 ring-blue-500/30 border-blue-400/50 scale-105' : 'hover:scale-105'} backdrop-blur-xl shadow-xl`}
            >
                <div className="flex items-center gap-3">
                    <DefaultIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span className="font-semibold text-base">
                        {options.find(opt => opt.value === value)?.label || placeholder}
                    </span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-all duration-500 ${isOpen ? 'rotate-180 scale-110' : 'group-hover:scale-110'}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className={`absolute top-full left-0 right-0 mt-3 py-3 rounded-2xl border-2 shadow-2xl backdrop-blur-xl z-50 glass-dropdown ${
                        isDark
                            ? "bg-gray-900/80 border-white/20"
                            : "bg-white/80 border-black/20"
                    } animate-dropdown-open`}>
                        {options.map((option, index) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-5 py-4 text-left transition-all duration-300 flex items-center gap-4 group/item ${
                                    value === option.value
                                        ? (isDark ? 'bg-blue-600/30 text-blue-300 border-l-4 border-blue-400' : 'bg-blue-500/30 text-blue-700 border-l-4 border-blue-500')
                                        : (isDark ? 'hover:bg-white/10 text-gray-300 hover:text-white' : 'hover:bg-black/10 text-gray-700 hover:text-gray-900')
                                } font-medium`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <option.icon className="w-5 h-5 transition-transform group-hover/item:scale-110" />
                                <span className="text-base">{option.label}</span>
                                {value === option.value && (
                                    <CheckCircle className="w-4 h-4 ml-auto text-green-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );

    if (loading) {
        return (
            <div className={`min-h-screen pt-20 px-8 ${isDark ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"} relative overflow-hidden`}>
                {/* Animated Background Orbs */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className={`absolute top-20 left-20 w-96 h-96 ${isDark ? 'bg-blue-600/20' : 'bg-blue-400/30'} rounded-full blur-3xl animate-pulse`}></div>
                    <div className={`absolute bottom-20 right-20 w-80 h-80 ${isDark ? 'bg-purple-600/20' : 'bg-purple-400/30'} rounded-full blur-3xl animate-pulse`} style={{animationDelay: '2s'}}></div>
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 ${isDark ? 'bg-cyan-600/20' : 'bg-cyan-400/30'} rounded-full blur-3xl animate-pulse`} style={{animationDelay: '4s'}}></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="animate-pulse space-y-8">
                        <div className={`h-16 ${isDark ? "bg-white/10" : "bg-black/10"} rounded-3xl w-96 backdrop-blur-xl glass-loading`}></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className={`p-8 rounded-3xl ${isDark ? "bg-white/[0.08] border-white/20" : "bg-black/[0.08] border-black/20"} backdrop-blur-xl border-2 glass-card`}>
                                    <div className={`h-20 ${isDark ? "bg-white/20" : "bg-black/20"} rounded-2xl mb-6`}></div>
                                    <div className={`h-6 ${isDark ? "bg-white/20" : "bg-black/20"} rounded-lg w-3/4`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen pt-20 px-8 ${isDark ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"} relative overflow-hidden`}>
                <div className="max-w-2xl mx-auto mt-20">
                    <div className={`p-12 rounded-3xl border-2 backdrop-blur-xl text-center shadow-2xl glass-error ${
                        isDark ? "bg-red-900/20 border-red-500/30" : "bg-red-50/80 border-red-300/50"
                    }`}>
                        <div className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center shadow-2xl ${
                            isDark ? "bg-red-900/40 border-2 border-red-500/30" : "bg-red-100 border-2 border-red-300/50"
                        } backdrop-blur-xl`}>
                            <Activity className={`w-12 h-12 ${isDark ? "text-red-400" : "text-red-500"}`} />
                        </div>
                        <h2 className={`text-4xl font-bold mb-6 ${isDark ? "text-red-400" : "text-red-600"}`}>
                            Connection Error
                        </h2>
                        <p className={`${isDark ? "text-red-300" : "text-red-500"} mb-10 text-xl leading-relaxed`}>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className={`glass-button px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-110 ${
                                isDark
                                    ? "bg-red-600/80 hover:bg-red-600 text-white border-2 border-red-400/50 hover:border-red-300"
                                    : "bg-red-500/80 hover:bg-red-500 text-white border-2 border-red-400/50 hover:border-red-300"
                            } backdrop-blur-xl shadow-2xl`}
                        >
                            Retry Connection
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen pt-20 px-8 ${isDark ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"} relative overflow-hidden`}>
            {/* Enhanced Floating Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className={`absolute -top-48 -right-48 w-96 h-96 ${isDark ? 'bg-blue-600/20' : 'bg-blue-400/30'} rounded-full blur-3xl animate-float`}></div>
                <div className={`absolute -bottom-48 -left-48 w-80 h-80 ${isDark ? 'bg-purple-600/20' : 'bg-purple-400/30'} rounded-full blur-3xl animate-float-delayed`}></div>
                <div className={`absolute top-1/3 right-1/4 w-72 h-72 ${isDark ? 'bg-cyan-600/15' : 'bg-cyan-400/25'} rounded-full blur-3xl animate-float-slow`}></div>
                <div className={`absolute bottom-1/3 left-1/4 w-64 h-64 ${isDark ? 'bg-pink-600/15' : 'bg-pink-400/25'} rounded-full blur-3xl animate-float-reverse`}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Enhanced Glassmorphism Header */}
                <div className={`sticky top-8 z-40 mb-16 p-10 rounded-3xl backdrop-blur-xl border-2 shadow-2xl glass-header ${
                    isDark
                        ? "bg-white/[0.08] border-white/20 shadow-black/20"
                        : "bg-white/30 border-white/40 shadow-black/10"
                }`}>
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
                        <div className="relative">
                            <h1 className={`text-3xl font-black bg-gradient-to-r ${
                                isDark ? "from-white via-blue-200 to-purple-200" : "from-gray-900 via-blue-600 to-purple-600"
                            } bg-clip-text text-transparent mb-6 leading-tight drop-shadow-lg`}>
                                GitHub Dashboard
                            </h1>
                            <div className={`flex items-center gap-4 text-md text-italic font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                <div className="flex items-center gap-3">
                                    <Code className="w-7 h-7" />
                                    <span>Managing {repos.length} repositories</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-yellow-500" />
                                    <span className="text-yellow-500">Live</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => window.open('https://github.com/new', '_blank')}
                            className={`glass-button group relative px-6 py-3 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-110 shadow-2xl overflow-hidden border-2 ${
                                isDark
                                    ? "bg-gradient-to-r from-green-600/80 to-emerald-600/80 hover:from-green-500/90 hover:to-emerald-500/90 text-white backdrop-blur-xl border-green-400/30 hover:border-green-300/50"
                                    : "bg-gradient-to-r from-green-500/80 to-emerald-500/80 hover:from-green-400/90 hover:to-emerald-400/90 text-white backdrop-blur-xl border-green-400/40 hover:border-green-300/60"
                            }`}
                        >
                            <div className="flex items-center gap-4 relative z-10">
                                <Plus className="w-7 h-7 transition-transform group-hover:rotate-180" />
                                <span>Create Repository</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-2xl"></div>
                        </button>
                    </div>

                    {/* Enhanced Search and Filters Section */}
                    <div className="flex flex-col xl:flex-row gap-8 mt-6">
                        <div className="relative flex-1">
                            <Search className={`absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 transition-colors ${isDark ? "text-gray-400 group-focus-within:text-blue-400" : "text-gray-500 group-focus-within:text-blue-500"}`} />
                            <input
                                type="text"
                                placeholder="Search repositories by name, description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`glass-input w-full pl-16 pr-8 py-3 rounded-2xl border-2 transition-all duration-500 focus:ring-4 focus:outline-none text-lg backdrop-blur-xl ${
                                    isDark
                                        ? "bg-white/[0.08] border-white/20 text-white placeholder-gray-400 focus:ring-blue-500/30 focus:border-blue-400/50 hover:bg-white/[0.12]"
                                        : "bg-black/[0.08] border-black/20 text-gray-900 placeholder-gray-500 focus:ring-blue-500/30 focus:border-blue-400/50 hover:bg-black/[0.12]"
                                } shadow-xl font-medium`}
                            />
                        </div>

                        <div className="flex gap-6">
                            <CustomDropdown
                                options={sortOptions}
                                value={sortBy}
                                onChange={setSortBy}
                                placeholder="Sort by"
                                isOpen={sortDropdownOpen}
                                setIsOpen={setSortDropdownOpen}
                                icon={SortAsc}
                            />

                            <CustomDropdown
                                options={langOptions}
                                value={filterLang}
                                onChange={setFilterLang}
                                placeholder="Filter Language"
                                isOpen={langDropdownOpen}
                                setIsOpen={setLangDropdownOpen}
                                icon={Filter}
                            />
                        </div>
                    </div>
                </div>

                {/* Enhanced Statistics Cards */}
                {repos.length > 0 && (
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6 transition-all duration-1000 ${
                        showStats ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'
                    }`}>
                        {[
                            {
                                title: "Total Repositories",
                                value: repos.length,
                                icon: Code,
                                gradient: isDark ? "from-blue-600/30 to-indigo-600/30" : "from-blue-500/30 to-indigo-500/30",
                                textColor: "text-blue-500",
                                iconBg: isDark ? "bg-blue-900/40" : "bg-blue-100/60",
                                borderColor: "border-blue-400/30"
                            },
                            {
                                title: "Total Stars",
                                value: repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0),
                                icon: Star,
                                gradient: isDark ? "from-yellow-600/30 to-orange-600/30" : "from-yellow-500/30 to-orange-500/30",
                                textColor: "text-yellow-500",
                                iconBg: isDark ? "bg-yellow-900/40" : "bg-yellow-100/60",
                                borderColor: "border-yellow-400/30"
                            },
                            {
                                title: "Total Forks",
                                value: repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0),
                                icon: GitFork,
                                gradient: isDark ? "from-green-600/30 to-emerald-600/30" : "from-green-500/30 to-emerald-500/30",
                                textColor: "text-green-500",
                                iconBg: isDark ? "bg-green-900/40" : "bg-green-100/60",
                                borderColor: "border-green-400/30"
                            },
                            {
                                title: "Favorites",
                                value: likedRepos.size,
                                icon: Bookmark,
                                gradient: isDark ? "from-purple-600/30 to-pink-600/30" : "from-purple-500/30 to-pink-500/30",
                                textColor: "text-purple-500",
                                iconBg: isDark ? "bg-purple-900/40" : "bg-purple-100/60",
                                borderColor: "border-purple-400/30"
                            }
                        ].map((stat, index) => (
                            <div
                                key={stat.title}
                                className={`glass-card group p-8 rounded-3xl border-2 transition-all duration-700 hover:scale-110 shadow-2xl hover:shadow-3xl backdrop-blur-xl overflow-hidden relative ${
                                    isDark ? `bg-white/[0.08] border-white/20 hover:${stat.borderColor}` : `bg-white/20 border-white/30 hover:${stat.borderColor}`
                                } bg-gradient-to-br ${stat.gradient}`}
                                style={{
                                    animationDelay: `${index * 300}ms`,
                                    animation: 'slideInUp 0.8s ease-out forwards'
                                }}
                            >
                                {/* Glass reflection effect */}
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-3xl"></div>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-8 translate-x-8"></div>

                                <div className="flex items-center justify-between relative z-10">
                                    <div>
                                        <p className={`text-sm font-bold ${isDark ? "text-gray-400" : "text-gray-600"} uppercase tracking-wider`}>
                                            {stat.title}
                                        </p>
                                        <p className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-900"} transition-colors group-hover:${stat.textColor} drop-shadow-lg`}>
                                            {stat.value.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className={`p-5 rounded-2xl ${stat.iconBg} transition-all duration-500 shadow-2xl backdrop-blur-xl border border-white/20`}>
                                        <stat.icon className={`w-10 h-10 ${stat.textColor} drop-shadow-lg`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Enhanced Repository Grid */}
                {filteredRepos.length === 0 && !loading ? (
                    <div className={`text-center py-40 rounded-3xl border-2 shadow-2xl backdrop-blur-xl glass-empty ${
                        isDark ? "bg-white/[0.08] border-white/20" : "bg-white/20 border-white/30"
                    }`}>
                        <div className={`w-40 h-40 mx-auto mb-10 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-xl border-2 ${
                            isDark ? "bg-white/10 border-white/20" : "bg-black/10 border-black/20"
                        }`}>
                            <Search className={`w-20 h-20 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                        </div>
                        <h3 className={`text-5xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"}`}>
                            {searchTerm || filterLang !== "all" ? "No matches found" : "No Repositories"}
                        </h3>
                        <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-16 text-2xl max-w-2xl mx-auto leading-relaxed`}>
                            {searchTerm || filterLang !== "all"
                                ? "Try adjusting your search criteria or filters to discover more repositories"
                                : "Start your coding journey by creating your first repository and watch your projects grow"
                            }
                        </p>
                        {!searchTerm && filterLang === "all" && (
                            <button
                                onClick={() => window.open('https://github.com/new', '_blank')}
                                className={`glass-button inline-flex items-center gap-5 px-16 py-8 rounded-2xl font-bold text-2xl transition-all duration-500 transform hover:scale-110 shadow-2xl backdrop-blur-xl border-2 ${
                                    isDark
                                        ? "bg-gradient-to-r from-green-600/80 to-emerald-600/80 hover:from-green-500/90 hover:to-emerald-500/90 text-white border-green-400/30"
                                        : "bg-gradient-to-r from-green-500/80 to-emerald-500/80 hover:from-green-400/90 hover:to-emerald-400/90 text-white border-green-300/40"
                                }`}
                            >
                                <Plus className="w-8 h-8" />
                                Create Your First Repository
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                        {filteredRepos.map((repo, index) => (
                            <div
                                key={repo.id}
                                className={`glass-repo-card group p-10 rounded-3xl border-2 transition-all duration-700 hover:scale-103 shadow-2xl hover:shadow-3xl backdrop-blur-xl transform hover:-translate-y-4 overflow-hidden relative ${
                                    isDark
                                        ? "bg-white/[0.08] border-white/20 hover:border-white/30 hover:bg-white/[0.12]"
                                        : "bg-white/20 border-white/30 hover:border-white/40 hover:bg-white/30"
                                }`}
                                style={{
                                    animationDelay: `${index * 150}ms`,
                                    animation: 'slideInUp 0.8s ease-out forwards'
                                }}
                            >
                                {/* Enhanced Glassmorphism Effects */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-8 -translate-x-8"></div>

                                {/* Repository Header */}
                                <div className="mb-8 relative z-10">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className={`font-black text-3xl leading-tight mb-4 transition-all duration-500 group-hover:text-blue-500 group-hover:scale-105 ${
                                                isDark ? "text-white" : "text-gray-900"
                                            } drop-shadow-lg`}>
                                                {repo.name}
                                            </h3>
                                            {repo.private && (
                                                <span className={`inline-flex items-center px-4 py-2 text-sm font-bold rounded-full backdrop-blur-xl border-2 shadow-lg transition-all duration-300 hover:scale-110 ${
                                                    isDark
                                                        ? "bg-yellow-600/20 text-yellow-300 border-yellow-500/40"
                                                        : "bg-yellow-500/20 text-yellow-700 border-yellow-400/40"
                                                }`}>
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Private
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <p className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"} min-h-[5rem] font-medium`}>
                                        {repo.description || "No description available for this repository"}
                                    </p>
                                </div>

                                {/* Repository Metadata */}
                                <div className="space-y-6 relative z-10">
                                    {repo.language && (
                                        <div className="flex items-center gap-4">
                                            <div className={`w-5 h-5 rounded-full shadow-lg border-2 border-white/20 ${getLanguageColor(repo.language)}`}></div>
                                            <span className={`text-base font-bold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                                {repo.language}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-8 text-base">
                                            <span className={`flex items-center gap-3 ${isDark ? "text-gray-400" : "text-gray-600"} transition-all duration-300 group-hover:text-yellow-500 font-semibold`}>
                                                <Star className="w-5 h-5 transition-transform group-hover:scale-125" />
                                                <span>{repo.stargazers_count || 0}</span>
                                            </span>
                                            <span className={`flex items-center gap-3 ${isDark ? "text-gray-400" : "text-gray-600"} transition-all duration-300 group-hover:text-green-500 font-semibold`}>
                                                <GitFork className="w-5 h-5 transition-transform group-hover:scale-125" />
                                                <span>{repo.forks_count || 0}</span>
                                            </span>
                                        </div>
                                    </div>

                                    {repo.updated_at && (
                                        <div className={`flex items-center gap-3 text-base ${isDark ? "text-gray-400" : "text-gray-600"} font-medium`}>
                                            <Clock className="w-5 h-5" />
                                            <span>Updated {formatDate(repo.updated_at)}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Enhanced Action Buttons */}
                                <div className="flex flex-col gap-5 pt-8 border-t-2 border-white/10 relative z-10">

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleGithubClick(repo.html_url)}
                                            className={`glass-button group/github relative flex-1 px-6 py-5 rounded-2xl text-base font-bold transition-all duration-500 transform hover:scale-105 shadow-xl backdrop-blur-xl overflow-hidden border-2 ${
                                                isDark
                                                    ? "bg-gradient-to-r from-blue-600/80 to-indigo-600/80 hover:from-blue-500/90 hover:to-indigo-500/90 text-white border-blue-400/40 hover:border-blue-300/60"
                                                    : "bg-gradient-to-r from-blue-500/80 to-indigo-500/80 hover:from-blue-400/90 hover:to-indigo-400/90 text-white border-blue-400/40 hover:border-blue-300/60"
                                            }`}
                                        >
                                            <div className="flex items-center justify-center gap-3 relative z-10">
                                                <Github className="w-6 h-6 transition-all duration-500 group-hover/github:scale-125 group-hover/github:rotate-12" />
                                                <span className="text-lg">GitHub</span>
                                                <ExternalLink className="w-4 h-4 opacity-80" />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform scale-x-0 group-hover/github:scale-x-100 transition-transform origin-left rounded-2xl"></div>
                                        </button>

                                        <button
                                            onClick={() => handleCheckClick(repo.name)}
                                            className={`glass-button group/check relative flex-1 px-6 py-5 rounded-2xl text-base font-bold transition-all duration-500 transform hover:scale-105 shadow-xl backdrop-blur-xl overflow-hidden border-2 ${
                                                isDark
                                                    ? "bg-gradient-to-r from-green-600/80 to-emerald-600/80 hover:from-green-500/90 hover:to-emerald-500/90 text-white border-green-400/40 hover:border-green-300/60"
                                                    : "bg-gradient-to-r from-green-500/80 to-emerald-500/80 hover:from-green-400/90 hover:to-emerald-400/90 text-white border-green-400/40 hover:border-green-300/60"
                                            }`}
                                        >
                                            <div className="flex items-center justify-center gap-3 relative z-10">
                                                <CheckCircle className="w-6 h-6 transition-all duration-500 group-hover/check:scale-125 group-hover/check:rotate-12" />
                                                <span className="text-lg">Explore</span>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform scale-x-0 group-hover/check:scale-x-100 transition-transform origin-left rounded-2xl"></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Enhanced Floating Action Button */}
                <div className="fixed bottom-10 right-10 z-50">
                    <div className="relative group">
                        <button className={`glass-button p-6 rounded-full shadow-2xl transition-all duration-700 transform hover:scale-125 backdrop-blur-xl border-2 overflow-hidden ${
                            isDark
                                ? "bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 shadow-black/20"
                                : "bg-black/10 hover:bg-black/20 text-gray-900 border-black/30 hover:border-black/50 shadow-black/10"
                        }`}>
                            <TrendingUp className="w-8 h-8 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                        </button>

                        <div className={`absolute bottom-24 right-0 mb-3 px-6 py-4 rounded-2xl text-base font-bold transition-all duration-500 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 backdrop-blur-xl border-2 shadow-2xl ${
                            isDark ? "bg-gray-900/80 text-white border-white/30" : "bg-white/80 text-gray-900 border-black/30"
                        } whitespace-nowrap`}>
                            Real Time Analytics
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Custom CSS with Glassmorphism */}
            <style jsx>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(60px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-30px) rotate(180deg);
                    }
                }

                @keyframes float-delayed {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-25px) rotate(-180deg);
                    }
                }

                @keyframes float-slow {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(90deg);
                    }
                }

                @keyframes float-reverse {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(20px) rotate(-90deg);
                    }
                }

                @keyframes dropdown-open {
                    from {
                        opacity: 0;
                        transform: translateY(-20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .animate-float {
                    animation: float 20s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 25s ease-in-out infinite;
                    animation-delay: 5s;
                }

                .animate-float-slow {
                    animation: float-slow 30s ease-in-out infinite;
                    animation-delay: 10s;
                }

                .animate-float-reverse {
                    animation: float-reverse 35s ease-in-out infinite;
                    animation-delay: 15s;
                }

                .animate-dropdown-open {
                    animation: dropdown-open 0.3s ease-out forwards;
                }

                /* Enhanced Glassmorphism Classes */
                .glass-button {
                    backdrop-filter: blur(20px) saturate(180%);
                    -webkit-backdrop-filter: blur(20px) saturate(180%);
                    box-shadow:
                            0 25px 50px -12px rgba(0, 0, 0, 0.25),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1);
                }

                .glass-card {
                    backdrop-filter: blur(25px) saturate(200%);
                    -webkit-backdrop-filter: blur(25px) saturate(200%);
                    box-shadow:
                            0 25px 50px -12px rgba(0, 0, 0, 0.25),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1),
                            0 0 0 1px rgba(255, 255, 255, 0.05);
                }

                .glass-repo-card {
                    backdrop-filter: blur(30px) saturate(180%);
                    -webkit-backdrop-filter: blur(30px) saturate(180%);
                    box-shadow:
                            0 25px 50px -12px rgba(0, 0, 0, 0.25),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1),
                            0 0 0 1px rgba(255, 255, 255, 0.05);
                }

                .glass-header {
                    backdrop-filter: blur(25px) saturate(180%);
                    -webkit-backdrop-filter: blur(25px) saturate(180%);
                    box-shadow:
                            0 25px 50px -12px rgba(0, 0, 0, 0.25),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1);
                }

                .glass-input {
                    backdrop-filter: blur(20px) saturate(150%);
                    -webkit-backdrop-filter: blur(20px) saturate(150%);
                    box-shadow:
                            0 10px 25px -5px rgba(0, 0, 0, 0.1),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1);
                }

                .glass-dropdown {
                    backdrop-filter: blur(25px) saturate(180%);
                    -webkit-backdrop-filter: blur(25px) saturate(180%);
                    box-shadow:
                            0 25px 50px -12px rgba(0, 0, 0, 0.25),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1);
                }

                .glass-loading {
                    backdrop-filter: blur(15px) saturate(150%);
                    -webkit-backdrop-filter: blur(15px) saturate(150%);
                }

                .glass-error {
                    backdrop-filter: blur(25px) saturate(180%);
                    -webkit-backdrop-filter: blur(25px) saturate(180%);
                }

                .glass-empty {
                    backdrop-filter: blur(25px) saturate(180%);
                    -webkit-backdrop-filter: blur(25px) saturate(180%);
                }

                /* Enhanced hover effects */
                .glass-button:hover {
                    backdrop-filter: blur(25px) saturate(200%);
                    -webkit-backdrop-filter: blur(25px) saturate(200%);
                }

                .glass-card:hover {
                    backdrop-filter: blur(35px) saturate(220%);
                    -webkit-backdrop-filter: blur(35px) saturate(220%);
                }

                .glass-repo-card:hover {
                    backdrop-filter: blur(40px) saturate(200%);
                    -webkit-backdrop-filter: blur(40px) saturate(200%);
                }

                /* Custom scrollbar with glassmorphism */
                ::-webkit-scrollbar {
                    width: 12px;
                }

                ::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                    backdrop-filter: blur(10px);
                }

                ::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.4);
                    backdrop-filter: blur(15px);
                }

                /* Enhanced selection with glassmorphism */
                ::selection {
                    background: rgba(59, 130, 246, 0.3);
                    color: inherit;
                    backdrop-filter: blur(10px);
                }

                /* Shimmer effect for loading */
                @keyframes shimmer {
                    0% {
                        background-position: -200px 0;
                    }
                    100% {
                        background-position: calc(200px + 100%) 0;
                    }
                }

                .glass-loading::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                            90deg,
                            transparent,
                            rgba(255, 255, 255, 0.1),
                            transparent
                    );
                    background-size: 200px 100%;
                    animation: shimmer 2s infinite;
                    border-radius: inherit;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;