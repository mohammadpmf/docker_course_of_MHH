import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { Certification } from '../types';

const CertificationsPage: React.FC = () => {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const data = await apiService.getCertifications();
                setCertifications(data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch certifications');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCertifications();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getCertificationIcon = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('aws') || lowerName.includes('amazon')) {
            return '☁️';
        } else if (lowerName.includes('google') || lowerName.includes('gcp')) {
            return '🔍';
        } else if (lowerName.includes('microsoft') || lowerName.includes('azure')) {
            return '🔷';
        } else if (lowerName.includes('docker') || lowerName.includes('kubernetes')) {
            return '🐳';
        } else if (lowerName.includes('security') || lowerName.includes('cissp')) {
            return '🔒';
        } else if (lowerName.includes('project') || lowerName.includes('pmp')) {
            return '📊';
        } else if (lowerName.includes('cisco') || lowerName.includes('ccna')) {
            return '🌐';
        }
        return '📜';
    };

    const isRecentCertification = (issueDate: string) => {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        return new Date(issueDate) > sixMonthsAgo;
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
                    <h1 className="text-3xl font-bold text-gray-900">Certifications</h1>
                    <p className="text-gray-600 mt-2">
                        Your professional certifications and achievements
                    </p>
                </div>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Add Certification
                </button>
            </div>

            {certifications.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <div className="text-6xl mb-4">📜</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No certifications added yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Showcase your professional certifications and achievements.
                    </p>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        Add Your First Certification
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert) => (
                        <div
                            key={cert.id}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 p-6 relative"
                        >
                            {isRecentCertification(cert.issue_date) && (
                                <div className="absolute top-4 right-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        New
                                    </span>
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-4">
                                <div className="text-3xl">{getCertificationIcon(cert.name)}</div>
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

                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {cert.name}
                            </h3>

                            <p className="text-primary-600 font-medium mb-2">
                                {cert.issuing_organization}
                            </p>

                            <div className="text-sm text-gray-600 mb-3">
                                <div className="flex items-center space-x-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Issued: {formatDate(cert.issue_date)}</span>
                                </div>
                            </div>

                            {cert.credential_id && (
                                <div className="text-sm text-gray-600 mb-3">
                                    <div className="flex items-center space-x-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        <span className="font-mono text-xs">ID: {cert.credential_id}</span>
                                    </div>
                                </div>
                            )}

                            {cert.description && (
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {cert.description}
                                </p>
                            )}

                            {cert.credential_url && (
                                <div className="mt-4">
                                    <a
                                        href={cert.credential_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        View Credential
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Certification Statistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{certifications.length}</div>
                        <div className="text-sm text-blue-600">Total Certifications</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                            {new Set(certifications.map(c => c.issuing_organization)).size}
                        </div>
                        <div className="text-sm text-green-600">Organizations</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                            {certifications.filter(c => c.credential_url).length}
                        </div>
                        <div className="text-sm text-purple-600">With Credentials</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">
                            {certifications.filter(c => isRecentCertification(c.issue_date)).length}
                        </div>
                        <div className="text-sm text-yellow-600">Recent (6 months)</div>
                    </div>
                </div>
            </div>

            {/* Organization Distribution */}
            {certifications.length > 0 && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Certifications by Organization
                    </h2>
                    <div className="space-y-3">
                        {Array.from(new Set(certifications.map(c => c.issuing_organization))).map((org) => {
                            const count = certifications.filter(c => c.issuing_organization === org).length;
                            const percentage = (count / certifications.length) * 100;

                            return (
                                <div key={org} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span className="font-medium text-gray-900">{org}</span>
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

export default CertificationsPage;
