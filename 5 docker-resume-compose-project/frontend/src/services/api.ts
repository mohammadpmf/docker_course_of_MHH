import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import {
  Skill,
  Project,
  Experience,
  Education,
  Certification,
  ApiError,
} from '../types';

class ApiService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    // Use environment variable or default to localhost
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  // Skills API
  async getSkills(): Promise<Skill[]> {
    try {
      const response: AxiosResponse<Skill[]> = await this.api.get('/api/skills/');
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Projects API
  async getProjects(): Promise<Project[]> {
    try {
      const response: AxiosResponse<Project[]> = await this.api.get('/api/projects/');
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Experience API
  async getExperiences(): Promise<Experience[]> {
    try {
      const response: AxiosResponse<Experience[]> = await this.api.get('/api/experiences/');
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Education API
  async getEducations(): Promise<Education[]> {
    try {
      const response: AxiosResponse<Education[]> = await this.api.get('/api/education/');
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Certifications API
  async getCertifications(): Promise<Certification[]> {
    try {
      const response: AxiosResponse<Certification[]> = await this.api.get('/api/certifications/');
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // Utility Methods
  isAuthenticated(): boolean {
    return false; // No authentication needed for public resume
  }

  private handleError(error: AxiosError): ApiError {
    const apiError: ApiError = {
      message: error.message || 'An unexpected error occurred',
      status: error.response?.status || 500,
      details: error.response?.data,
    };

    // Handle specific error cases
    if (error.response?.status === 401) {
      apiError.message = 'Authentication required';
    } else if (error.response?.status === 403) {
      apiError.message = 'Permission denied';
    } else if (error.response?.status === 404) {
      apiError.message = 'Resource not found';
    } else if (error.response?.status === 500) {
      apiError.message = 'Server error';
    }

    return apiError;
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;