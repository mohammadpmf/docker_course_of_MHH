import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { Experience, Skill } from '../types';

const ExperiencePage: React.FC = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [experiencesData, skillsData] = await Promise.all([
                    apiService.getExperiences(),
                    apiService.getSkills(),
                ]);
                setExperiences(experiencesData);
                setSkills(skillsData);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch experiences');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const getSkillName = (skillId: number) => {
        const skill = skills.find(s => s.id === skillId);
        return skill?.name || 'Unknown';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
        });
    };

    const calculateDuration = (startDate: string, endDate?: string) => {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();

        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        if (years === 0) {
            return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
        } else if (remainingMonths === 0) {
            return `${years} year${years !== 1 ? 's' : ''}`;
        } else {
            return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Work Experience</h1>
                    <p className="text-gray-600 mt-2">
                        Your professional journey and career history
                    </p>
                </div>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Add Experience
                </button>
            </div>

            {experiences.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <div className="text-6xl mb-4">💼</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No work experience added yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Start building your professional profile by adding your work experience.
                    </p>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        Add Your First Experience
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Timeline */}
                    <div className="relative">
                        {experiences.map((experience, index) => (
                            <div key={experience.id} className="relative pb-8">
                                {index !== experiences.length - 1 && (
                                    <span
                                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                                        aria-hidden="true"
                                    />
                                )}

                                <div className="relative flex items-start space-x-3">
                                    <div className="relative">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white ${experience.is_current ? 'bg-green-500' : 'bg-gray-400'
                                            }`}>
                                            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zM8 5a1 1 0 011-1h2a1 1 0 011 1v1H8V5zM4 8a0 0 0 000 0v6a0 0 0 000 0h12a0 0 0 000 0V8a0 0 0 000 0H4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        {experience.is_current && (
                                            <span className="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex-1 bg-white rounded-lg shadow p-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2">
                                                    <h3 className="text-xl font-semibold text-gray-900">
                                                        {experience.position}
                                                    </h3>
                                                    {experience.is_current && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            Current
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="mt-1 flex items-center space-x-2">
                                                    {experience.company_website ? (
                                                        <a
                                                            href={experience.company_website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-lg font-medium text-primary-600 hover:text-primary-700"
                                                        >
                                                            {experience.company}
                                                        </a>
                                                    ) : (
                                                        <span className="text-lg font-medium text-gray-900">
                                                            {experience.company}
                                                        </span>
                                                    )}
                                                    {experience.location && (
                                                        <>
                                                            <span className="text-gray-400">•</span>
                                                            <span className="text-gray-600">{experience.location}</span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="mt-1 text-sm text-gray-500">
                                                    {formatDate(experience.start_date)} - {experience.end_date ? formatDate(experience.end_date) : 'Present'}
                                                    <span className="ml-2">({calculateDuration(experience.start_date, experience.end_date)})</span>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="text-gray-400 hover:text-primary-600 transition-colors">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button className="text-gray-400 hover:text-red-600 transition-colors">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-gray-700 whitespace-pre-line">
                                                {experience.description}
                                            </p>
                                        </div>

                                        {experience.skills.length > 0 && (
                                            <div className="mt-4">
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">Skills & Technologies:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {experience.skills.map((skill) => (
                                                        <span
                                                            key={skill.id}
                                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                                                        >
                                                            {skill.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Career Statistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{experiences.length}</div>
                        <div className="text-sm text-blue-600">Total Positions</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                            {experiences.filter(e => e.is_current).length}
                        </div>
                        <div className="text-sm text-green-600">Current Roles</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                            {new Set(experiences.map(e => e.company)).size}
                        </div>
                        <div className="text-sm text-purple-600">Companies</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">
                            {experiences.reduce((total, exp) => total + exp.skills.length, 0)}
                        </div>
                        <div className="text-sm text-yellow-600">Skills Used</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperiencePage;
