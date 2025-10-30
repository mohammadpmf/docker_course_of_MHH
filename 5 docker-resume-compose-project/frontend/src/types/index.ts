// API Response Types
export interface Skill {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  production_link?: string;
  github_link?: string;
  image?: string;
  skills: Skill[];
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date?: string;
  location?: string;
  company_website?: string;
  skills: Skill[];
  is_current: boolean;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field_of_study?: string;
  start_date: string;
  end_date?: string;
  gpa?: number;
  description?: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: number;
  name: string;
  issuing_organization: string;
  issue_date: string;
  credential_id?: string;
  credential_url?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// API Error Type
export interface ApiError {
  message: string;
  status: number;
  details?: any;
}
