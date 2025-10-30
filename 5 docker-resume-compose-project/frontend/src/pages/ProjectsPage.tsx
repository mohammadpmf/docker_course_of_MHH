import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { Project, Skill } from '../types';

const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedFilter, setSelectedFilter] = useState<string>('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsData, skillsData] = await Promise.all([
                    apiService.getProjects(),
                    apiService.getSkills(),
                ]);
                setProjects(projectsData);
                setSkills(skillsData);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch projects');
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

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getProjectsByFilter = () => {
        switch (selectedFilter) {
            case 'featured':
                return projects.filter(p => p.production_link && p.github_link);
            case 'live':
                return projects.filter(p => p.production_link);
            case 'open-source':
                return projects.filter(p => p.github_link);
            case 'recent':
                return projects.filter(p =>
                    p.created_at && new Date(p.created_at) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
                );
            default:
                return projects;
        }
    };

    const filteredProjects = getProjectsByFilter();

    const filters = [
        { id: 'all', label: 'All Projects', count: projects.length },
        { id: 'featured', label: 'Featured', count: projects.filter(p => p.production_link && p.github_link).length },
        { id: 'live', label: 'Live Demo', count: projects.filter(p => p.production_link).length },
        { id: 'open-source', label: 'Open Source', count: projects.filter(p => p.github_link).length },
        {
            id: 'recent', label: 'Recent', count: projects.filter(p =>
                p.created_at && new Date(p.created_at) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
            ).length
        },
    ].filter(filter => filter.count > 0);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="loading-spinner w-12 h-12"></div>
                    <p className="text-muted animate-pulse">Loading projects...</p>
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
                            <h3 className="text-error-800 dark:text-error-200 font-medium">Error loading projects</h3>
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
                        <h1 className="heading-2 mb-2">Project Portfolio</h1>
                        <p className="subheading">
                            Explore my creative projects and technical achievements
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* View Mode Toggle */}
                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        <button className="btn-primary px-6 py-3 shadow-glow-primary">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Project
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div>
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setSelectedFilter(filter.id)}
                            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedFilter === filter.id
                                ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 shadow-sm ring-2 ring-primary-500/20'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            {filter.label}
                            <span className="ml-2 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                                {filter.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Projects */}
            {filteredProjects.length === 0 ? (
                <div className="card">
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="heading-4 mb-2">No projects found</h3>
                        <p className="text-muted mb-6">
                            {selectedFilter === 'all'
                                ? 'Start building your portfolio by adding your first project.'
                                : `No ${filters.find(f => f.id === selectedFilter)?.label.toLowerCase()} projects found.`
                            }
                        </p>
                        <button className="btn-primary px-6 py-3">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Your First Project
                        </button>
                    </div>
                </div>
            ) : (
                <div className={`${viewMode === 'grid'
                    ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-6'
                    }`}>
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`card-hover group animate-fade-in-up ${viewMode === 'list' ? 'flex gap-6' : ''
                                }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Project Image */}
                            {project.image && (
                                <div className={`
                                    bg-gray-200 dark:bg-gray-700 overflow-hidden
                                    ${viewMode === 'grid'
                                        ? 'h-48 rounded-t-xl'
                                        : 'w-48 h-32 rounded-xl flex-shrink-0'
                                    }
                                `}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            )}

                            <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                            {project.title}
                                        </h3>

                                        {/* Project Status Badges */}
                                        <div className="flex items-center gap-2 mb-3">
                                            {project.production_link && (
                                                <span className="badge-success">
                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Live
                                                </span>
                                            )}
                                            {project.github_link && (
                                                <span className="badge-primary">
                                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                    </svg>
                                                    Open Source
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
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

                                {/* Description */}
                                {project.description && (
                                    <p className="body-text mb-4 line-clamp-3">
                                        {project.description}
                                    </p>
                                )}

                                {/* Technologies */}
                                {project.skills.length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Technologies Used
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.skills.slice(0, 5).map((skill) => (
                                                <span
                                                    key={skill.id}
                                                    className="badge-primary"
                                                >
                                                    {getSkillName(skill.id)}
                                                </span>
                                            ))}
                                            {project.skills.length > 5 && (
                                                <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                                    +{project.skills.length - 5} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Links */}
                                <div className="flex items-center justify-between">
                                    <div className="flex space-x-3">
                                        {project.production_link && (
                                            <a
                                                href={project.production_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-secondary px-4 py-2 text-sm"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                Live Demo
                                            </a>
                                        )}
                                        {project.github_link && (
                                            <a
                                                href={project.github_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-secondary px-4 py-2 text-sm"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                                GitHub
                                            </a>
                                        )}
                                    </div>

                                    <div className="text-sm text-muted">
                                        {formatDate(project.created_at)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Statistics */}
            <div className="card">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="heading-3 mb-4">Project Statistics</h2>
                        <p className="subheading">Overview of your project portfolio</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl">
                            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-primary-700 dark:text-primary-300 mb-2">
                                {projects.length}
                            </div>
                            <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                                Total Projects
                            </div>
                        </div>

                        <div className="text-center p-6 bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 rounded-xl">
                            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-success-500 to-success-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-success-700 dark:text-success-300 mb-2">
                                {projects.filter(p => p.production_link).length}
                            </div>
                            <div className="text-sm font-medium text-success-600 dark:text-success-400">
                                Live Projects
                            </div>
                        </div>

                        <div className="text-center p-6 bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20 rounded-xl">
                            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-accent-700 dark:text-accent-300 mb-2">
                                {projects.filter(p => p.github_link).length}
                            </div>
                            <div className="text-sm font-medium text-accent-600 dark:text-accent-400">
                                Open Source
                            </div>
                        </div>

                        <div className="text-center p-6 bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 rounded-xl">
                            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-warning-500 to-warning-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-warning-700 dark:text-warning-300 mb-2">
                                {projects.filter(p => p.image).length}
                            </div>
                            <div className="text-sm font-medium text-warning-600 dark:text-warning-400">
                                With Images
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
