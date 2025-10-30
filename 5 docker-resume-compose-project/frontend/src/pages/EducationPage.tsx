import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { Education } from '../types';

const EducationPage: React.FC = () => {
    const [education, setEducation] = useState<Education[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const data = await apiService.getEducations();
                setEducation(data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch education');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEducation();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
        });
    };

    const calculateDuration = (startDate: string, endDate?: string) => {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();

        const years = end.getFullYear() - start.getFullYear();
        return `${years} year${years !== 1 ? 's' : ''}`;
    };

    const getEducationIcon = (degree: string) => {
        const lowerDegree = degree.toLowerCase();
        if (lowerDegree.includes('phd') || lowerDegree.includes('doctorate')) {
            return '🎓';
        } else if (lowerDegree.includes('master') || lowerDegree.includes('mba')) {
            return '📚';
        } else if (lowerDegree.includes('bachelor')) {
            return '🎓';
        } else if (lowerDegree.includes('associate')) {
            return '📖';
        } else if (lowerDegree.includes('certificate') || lowerDegree.includes('diploma')) {
            return '📜';
        }
        return '🏫';
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
                    <h1 className="text-3xl font-bold text-gray-900">Education</h1>
                    <p className="text-gray-600 mt-2">
                        Your educational background and academic achievements
                    </p>
                </div>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Add Education
                </button>
            </div>

            {education.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <div className="text-6xl mb-4">🎓</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No education records added yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Start building your academic profile by adding your educational background.
                    </p>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        Add Your First Education
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Timeline */}
                    <div className="relative">
                        {education.map((edu, index) => (
                            <div key={edu.id} className="relative pb-8">
                                {index !== education.length - 1 && (
                                    <span
                                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                                        aria-hidden="true"
                                    />
                                )}

                                <div className="relative flex items-start space-x-3">
                                    <div className="relative">
                                        <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center ring-8 ring-white text-xl">
                                            {getEducationIcon(edu.degree)}
                                        </div>
                                    </div>

                                    <div className="flex-1 bg-white rounded-lg shadow p-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {edu.degree}
                                                    {edu.field_of_study && (
                                                        <span className="text-primary-600"> in {edu.field_of_study}</span>
                                                    )}
                                                </h3>
                                                <div className="mt-1">
                                                    <span className="text-lg font-medium text-gray-900">
                                                        {edu.institution}
                                                    </span>
                                                    {edu.location && (
                                                        <>
                                                            <span className="text-gray-400 mx-2">•</span>
                                                            <span className="text-gray-600">{edu.location}</span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="mt-1 flex items-center space-x-4">
                                                    <span className="text-sm text-gray-500">
                                                        {formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                                                        <span className="ml-2">({calculateDuration(edu.start_date, edu.end_date)})</span>
                                                    </span>
                                                    {edu.gpa && (
                                                        <span className="text-sm font-medium text-primary-600">
                                                            GPA: {edu.gpa}
                                                        </span>
                                                    )}
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

                                        {edu.description && (
                                            <div className="mt-4">
                                                <p className="text-gray-700 whitespace-pre-line">
                                                    {edu.description}
                                                </p>
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
                    Education Statistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{education.length}</div>
                        <div className="text-sm text-blue-600">Total Records</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                            {new Set(education.map(e => e.institution)).size}
                        </div>
                        <div className="text-sm text-green-600">Institutions</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                            {education.filter(e => e.gpa).length}
                        </div>
                        <div className="text-sm text-purple-600">With GPA</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">
                            {education.filter(e => !e.end_date).length}
                        </div>
                        <div className="text-sm text-yellow-600">In Progress</div>
                    </div>
                </div>
            </div>

            {/* Degree Distribution */}
            {education.length > 0 && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Degree Distribution
                    </h2>
                    <div className="space-y-3">
                        {Array.from(new Set(education.map(e => e.degree))).map((degree) => {
                            const count = education.filter(e => e.degree === degree).length;
                            const percentage = (count / education.length) * 100;

                            return (
                                <div key={degree} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-lg">{getEducationIcon(degree)}</span>
                                        <span className="font-medium text-gray-900">{degree}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-primary-600 h-2 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EducationPage;
