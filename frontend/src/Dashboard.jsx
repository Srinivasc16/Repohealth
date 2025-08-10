import React, {useState} from "react";
import {
    Activity,
    AlertCircle,
    CheckCircle,
    FileText,
    GitBranch,
    Github,
    GitPullRequest,
    Star,
    Users
} from "lucide-react";

const Dashboard = ({ theme }) => {
    const [selectedRepo, setSelectedRepo] = useState('react-portfolio');
    const [activeTab, setActiveTab] = useState('overview');

    const repoData = {
        'react-portfolio': {
            name: 'react-portfolio',
            owner: 'johndoe',
            healthScore: 87,
            status: 'Excellent',
            stars: 234,
            watchers: 42,
            forks: 18,
            openIssues: 3,
            pullRequests: 2,
            lastCommit: '2 hours ago',
            contributors: 5,
            codeQuality: 92,
            documentation: 85,
            activity: 78,
            security: 94
        },
        'api-server': {
            name: 'api-server',
            owner: 'johndoe',
            healthScore: 73,
            status: 'Good',
            stars: 89,
            watchers: 15,
            forks: 7,
            openIssues: 8,
            pullRequests: 1,
            lastCommit: '1 day ago',
            contributors: 3,
            codeQuality: 78,
            documentation: 65,
            activity: 82,
            security: 88
        }
    };

    const currentRepo = repoData[selectedRepo];

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-500';
        if (score >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getScoreBg = (score) => {
        if (score >= 80) return 'bg-green-50 border-green-200';
        if (score >= 60) return 'bg-yellow-50 border-yellow-200';
        return 'bg-red-50 border-red-200';
    };

    return (
        <div className={`min-h-screen pt-20 transition-all duration-500 ${
            theme === 'dark'
                ? 'bg-black'
                : 'bg-gradient-to-br from-gray-50 to-white'
        }`}>
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Repository Dashboard
                    </h1>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Monitor and analyze your repository health in real-time
                    </p>
                </div>

                {/* Repository Selector */}
                <div className="mb-8">
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Select Repository
                    </label>
                    <select
                        value={selectedRepo}
                        onChange={(e) => setSelectedRepo(e.target.value)}
                        className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                            theme === 'dark'
                                ? 'bg-gray-800 border-gray-700 text-white focus:ring-orange-500'
                                : 'bg-white border-gray-300 text-gray-900 focus:ring-orange-500'
                        } focus:ring-2 focus:border-transparent`}
                    >
                        <option value="react-portfolio">johndoe/react-portfolio</option>
                        <option value="api-server">johndoe/api-server</option>
                    </select>
                </div>

                {/* Health Score Card */}
                <div className={`rounded-2xl p-8 mb-8 transition-all duration-500 ${
                    theme === 'dark'
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200 shadow-xl'
                }`}>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-xl ${
                                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                            }`}>
                                <Github className={`w-8 h-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
                            </div>
                            <div>
                                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    {currentRepo.owner}/{currentRepo.name}
                                </h2>
                                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Last updated: {currentRepo.lastCommit}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`text-6xl font-bold mb-2 ${getScoreColor(currentRepo.healthScore)}`}>
                                {currentRepo.healthScore}
                            </div>
                            <div className={`px-4 py-2 rounded-full text-sm font-medium ${getScoreBg(currentRepo.healthScore)}`}>
                                {currentRepo.status}
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex items-center space-x-2 mb-2">
                                <Star className="w-5 h-5 text-yellow-500" />
                                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Stars
                </span>
                            </div>
                            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {currentRepo.stars}
                            </div>
                        </div>
                        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex items-center space-x-2 mb-2">
                                <GitBranch className="w-5 h-5 text-blue-500" />
                                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Forks
                </span>
                            </div>
                            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {currentRepo.forks}
                            </div>
                        </div>
                        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex items-center space-x-2 mb-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Issues
                </span>
                            </div>
                            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {currentRepo.openIssues}
                            </div>
                        </div>
                        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex items-center space-x-2 mb-2">
                                <Users className="w-5 h-5 text-purple-500" />
                                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Contributors
                </span>
                            </div>
                            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {currentRepo.contributors}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Code Quality', score: currentRepo.codeQuality, icon: CheckCircle },
                        { label: 'Documentation', score: currentRepo.documentation, icon: FileText },
                        { label: 'Activity', score: currentRepo.activity, icon: Activity },
                        { label: 'Security', score: currentRepo.security, icon: AlertCircle }
                    ].map((metric, index) => (
                        <div key={index} className={`p-6 rounded-xl transition-all duration-500 ${
                            theme === 'dark'
                                ? 'bg-gray-800 border border-gray-700 hover:border-orange-500'
                                : 'bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:border-orange-300'
                        }`}>
                            <div className="flex items-center justify-between mb-4">
                                <metric.icon className={`w-6 h-6 ${getScoreColor(metric.score)}`} />
                                <span className={`text-3xl font-bold ${getScoreColor(metric.score)}`}>
                  {metric.score}
                </span>
                            </div>
                            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {metric.label}
                            </h3>
                            <div className={`w-full bg-gray-200 rounded-full h-2 mt-3 ${
                                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                            }`}>
                                <div
                                    className={`h-2 rounded-full transition-all duration-1000 ${
                                        metric.score >= 80 ? 'bg-green-500' :
                                            metric.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${metric.score}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div className={`rounded-2xl p-8 transition-all duration-500 ${
                    theme === 'dark'
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200 shadow-xl'
                }`}>
                    <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Recent Activity
                    </h3>
                    <div className="space-y-4">
                        {[
                            { action: 'Merged pull request #45', time: '2 hours ago', icon: GitPullRequest, color: 'text-green-500' },
                            { action: 'New issue opened: Bug fix needed', time: '4 hours ago', icon: AlertCircle, color: 'text-red-500' },
                            { action: 'Code quality scan completed', time: '6 hours ago', icon: CheckCircle, color: 'text-blue-500' },
                            { action: 'Documentation updated', time: '1 day ago', icon: FileText, color: 'text-purple-500' }
                        ].map((activity, index) => (
                            <div key={index} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
                                <activity.icon className={`w-5 h-5 ${activity.color}`} />
                                <div className="flex-1">
                                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        {activity.action}
                                    </p>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;