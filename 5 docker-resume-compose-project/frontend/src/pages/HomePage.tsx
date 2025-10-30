import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Skill, Project, Experience, Education, Certification } from '../types';

const HomePage: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [education, setEducation] = useState<Education[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [skillsData, projectsData, experiencesData, educationData, certificationsData] = await Promise.all([
                    apiService.getSkills(),
                    apiService.getProjects(),
                    apiService.getExperiences(),
                    apiService.getEducations(),
                    apiService.getCertifications(),
                ]);

                setSkills(skillsData);
                setProjects(projectsData);
                setExperiences(experiencesData);
                setEducation(educationData);
                setCertifications(certificationsData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });
    };

    const getSkillName = (skillId: number) => {
        const skill = skills.find(s => s.id === skillId);
        return skill?.name || 'Unknown';
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="loading-spinner w-12 h-12"></div>
                    <p className="text-muted animate-pulse">Loading resume data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header Section - Developer Info with Photo */}
            <div className="card">
                <div className="p-8">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                        {/* Profile Photo */}
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-4xl lg:text-5xl font-bold shadow-xl">
                                JD
                            </div>
                        </div>

                        {/* Developer Info */}
                        <div className="flex-1 text-center lg:text-left">
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                                Hadi Hajihosseini
                            </h1>
                            <h2 className="text-xl lg:text-2xl text-primary-600 dark:text-primary-400 font-semibold mb-4">
                                Full Stack Developer
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 max-w-3xl">
                                Passionate software developer with {experiences.length}+ years of experience in building
                                scalable web applications. Specialized in React, Node.js, and modern web technologies.
                                Always eager to learn new technologies and solve complex problems.
                            </p>

                            {/* Contact Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button className="btn-primary px-6 py-3 shadow-glow-primary">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download Resume
                                </button>
                                <button className="btn-secondary px-6 py-3">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Contact Me
                                </button>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex-shrink-0">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                                    <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                                        {projects.length}
                                    </div>
                                    <div className="text-sm text-primary-600 dark:text-primary-400">Projects</div>
                                </div>
                                <div className="text-center p-4 bg-success-50 dark:bg-success-900/20 rounded-xl">
                                    <div className="text-2xl font-bold text-success-700 dark:text-success-300">
                                        {skills.length}
                                    </div>
                                    <div className="text-sm text-success-600 dark:text-success-400">Skills</div>
                                </div>
                                <div className="text-center p-4 bg-accent-50 dark:bg-accent-900/20 rounded-xl">
                                    <div className="text-2xl font-bold text-accent-700 dark:text-accent-300">
                                        {experiences.length}
                                    </div>
                                    <div className="text-sm text-accent-600 dark:text-accent-400">Experience</div>
                                </div>
                                <div className="text-center p-4 bg-warning-50 dark:bg-warning-900/20 rounded-xl">
                                    <div className="text-2xl font-bold text-warning-700 dark:text-warning-300">
                                        {certifications.length}
                                    </div>
                                    <div className="text-sm text-warning-600 dark:text-warning-400">Certificates</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="card">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Technical Skills
                        </h3>
                        <Link
                            to="/skills"
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center"
                        >
                            View All
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {skills.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No skills added yet</p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {skills.slice(0, 12).map((skill) => (
                                <span
                                    key={skill.id}
                                    className="badge-primary px-3 py-2"
                                >
                                    {skill.name}
                                </span>
                            ))}
                            {skills.length > 12 && (
                                <Link
                                    to="/skills"
                                    className="badge bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                                >
                                    +{skills.length - 12} more
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Experience Section */}
            <div className="card">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Professional Experience
                        </h3>
                        <Link
                            to="/experience"
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center"
                        >
                            View All
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {experiences.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No experience added yet</p>
                    ) : (
                        <div className="space-y-4">
                            {experiences.slice(0, 3).map((exp) => (
                                <div key={exp.id} className="border-l-4 border-primary-500 pl-4 py-2">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        {exp.position}
                                    </h4>
                                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                                        {exp.company}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                                    </p>
                                    {exp.description && (
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-2">
                                            {exp.description}
                                        </p>
                                    )}
                                    {exp.skills && exp.skills.length > 0 && (
                                        <div className="mt-3">
                                            <div className="flex flex-wrap gap-1">
                                                {exp.skills.slice(0, 4).map((skill) => (
                                                    <span
                                                        key={skill.id}
                                                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                                                    >
                                                        {skill.name}
                                                    </span>
                                                ))}
                                                {exp.skills.length > 4 && (
                                                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded">
                                                        +{exp.skills.length - 4} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Projects Section */}
            <div className="card">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Featured Projects
                        </h3>
                        <Link
                            to="/projects"
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center"
                        >
                            View All
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {projects.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No projects added yet</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.slice(0, 4).map((project) => (
                                <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary-300 dark:hover:border-primary-600 transition-colors">
                                    {project.image && (
                                        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        {project.title}
                                    </h4>
                                    {project.description && (
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                                            {project.description}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-wrap gap-1">
                                            {project.skills.map((skill) => (
                                                <span
                                                    key={skill.id}
                                                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                                                >
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex space-x-2">
                                            {project.production_link && (
                                                <a
                                                    href={project.production_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            )}
                                            {project.github_link && (
                                                <a
                                                    href={project.github_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Education & Certifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Education */}
                <div className="card">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Education
                            </h3>
                            <Link
                                to="/education"
                                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center"
                            >
                                View All
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        {education.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No education added yet</p>
                        ) : (
                            <div className="space-y-4">
                                {education.slice(0, 2).map((edu) => (
                                    <div key={edu.id} className="border-l-4 border-success-500 pl-4 py-2">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {edu.degree}
                                        </h4>
                                        <p className="text-success-600 dark:text-success-400 font-medium">
                                            {edu.institution}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Certifications */}
                <div className="card">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Certifications
                            </h3>
                            <Link
                                to="/certifications"
                                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center"
                            >
                                View All
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        {certifications.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No certifications added yet</p>
                        ) : (
                            <div className="space-y-4">
                                {certifications.slice(0, 3).map((cert) => (
                                    <div key={cert.id} className="border-l-4 border-accent-500 pl-4 py-2">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {cert.name}
                                        </h4>
                                        <p className="text-accent-600 dark:text-accent-400 font-medium">
                                            {cert.issuing_organization}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Issued {formatDate(cert.issue_date)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;