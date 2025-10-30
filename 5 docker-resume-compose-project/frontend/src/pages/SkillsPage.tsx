import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { Skill } from '../types';

const SkillsPage: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data = await apiService.getSkills();
                setSkills(data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch skills');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSkills();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="loading-spinner w-12 h-12"></div>
                    <p className="text-muted animate-pulse">Loading skills...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="card bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800">
                <div className="p-6">
                    <div className="flex items-center">
                        <svg className="w-6 h-6 text-error-600 dark:text-error-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h3 className="text-error-800 dark:text-error-200 font-medium">Error loading skills</h3>
                            <p className="text-error-600 dark:text-error-400 text-sm">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="heading-2 mb-2">Technical Skills</h1>
                        <p className="subheading">
                            Explore my technical expertise and professional competencies
                        </p>
                    </div>
                    <button className="btn-primary px-6 py-3 shadow-glow-primary">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Skill
                    </button>
                </div>
            </div>


            {/* Skills Grid */}
            {skills.length === 0 ? (
                <div className="card">
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="heading-4 mb-2">No skills in this category</h3>
                        <p className="text-muted mb-6">
                            Start building your skill profile by adding your first skill.
                        </p>
                        <button className="btn-primary px-6 py-3">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Your First Skill
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.id}
                            className="card-hover animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {skill.name}
                                        </h3>
                                    </div>
                                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 rounded-lg text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button className="p-2 rounded-lg text-gray-400 hover:text-error-600 dark:hover:text-error-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {skill.description && (
                                    <p className="body-text mb-4 line-clamp-3">
                                        {skill.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="card">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="heading-3 mb-4">Skill Statistics</h2>
                        <p className="subheading">Overview of your technical expertise</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl">
                            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-primary-700 dark:text-primary-300 mb-2">
                                {skills.length}
                            </div>
                            <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                                Total Skills
                            </div>
                        </div>

                        <div className="text-center p-6 bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 rounded-xl">
                            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-success-500 to-success-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-success-700 dark:text-success-300 mb-2">
                                {skills.filter(s => s.description).length}
                            </div>
                            <div className="text-sm font-medium text-success-600 dark:text-success-400">
                                With Descriptions
                            </div>
                        </div>

                        <div className="text-center p-6 bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20 rounded-xl">
                            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-accent-700 dark:text-accent-300 mb-2">
                                {skills.filter(s =>
                                    s.created_at && new Date(s.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                                ).length}
                            </div>
                            <div className="text-sm font-medium text-accent-600 dark:text-accent-400">
                                Added This Month
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsPage;
