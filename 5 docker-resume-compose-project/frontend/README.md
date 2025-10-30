# Resume Frontend Application

A comprehensive React TypeScript application that provides a beautiful interface for managing and displaying resume data. This application connects to the Django backend API to manage skills, projects, experience, education, and certifications.

## 🚀 Features

### Authentication
- JWT-based authentication with automatic token refresh
- Protected routes with automatic redirect to login
- Secure token storage in localStorage
- Professional login interface

### Dashboard Pages
- **Home Dashboard**: Overview with statistics and quick actions
- **Skills Management**: Display and manage technical/soft skills
- **Projects Portfolio**: Showcase projects with images, links, and technologies
- **Work Experience**: Timeline view of professional experience
- **Education**: Academic background with degree information
- **Certifications**: Professional certifications with credential links

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern, responsive design
- **React Router**: Client-side routing with protected routes
- **Axios**: HTTP client with interceptors for authentication
- **Context API**: State management for authentication
- **Responsive Design**: Mobile-first approach with beautiful UI

## 🛠️ Technology Stack

- **React 19.1.1** - Latest React version
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management

## 📦 Installation & Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:8000
   GENERATE_SOURCEMAP=false
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/           # Reusable components
│   ├── Layout.tsx       # Main layout with navigation
│   └── ProtectedRoute.tsx # Route protection component
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state management
├── pages/              # Page components
│   ├── HomePage.tsx    # Dashboard overview
│   ├── LoginPage.tsx   # Authentication page
│   ├── SkillsPage.tsx  # Skills management
│   ├── ProjectsPage.tsx # Projects portfolio
│   ├── ExperiencePage.tsx # Work experience
│   ├── EducationPage.tsx # Education background
│   └── CertificationsPage.tsx # Certifications
├── services/           # API services
│   └── api.ts          # API client with authentication
├── types/              # TypeScript type definitions
│   └── index.ts        # All application types
├── config/             # Configuration files
│   └── environment.ts  # Environment configuration
└── App.tsx             # Main application component
```

## 🔐 Authentication Flow

1. **Login Process**:
   - User enters credentials on login page
   - API call to `/auth/jwt/create/` endpoint
   - Tokens stored in localStorage
   - User data fetched and stored in context
   - Redirect to dashboard

2. **Token Management**:
   - Access token sent with all API requests
   - Automatic token refresh on 401 responses
   - Logout clears tokens and redirects to login

3. **Route Protection**:
   - Protected routes check authentication status
   - Automatic redirect to login if not authenticated
   - Prevent authenticated users from accessing login page

## 🎨 Design System

### Colors
- **Primary**: Blue color scheme (`primary-50` to `primary-900`)
- **Success**: Green for positive actions
- **Warning**: Yellow for attention
- **Error**: Red for errors and destructive actions

### Typography
- **Font**: Inter (loaded from Google Fonts)
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weight for readability

### Components
- **Cards**: White background with subtle shadows
- **Buttons**: Primary color with hover states
- **Forms**: Clean inputs with focus states
- **Navigation**: Sidebar with active states

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: 
  - `sm`: 640px and up
  - `md`: 768px and up
  - `lg`: 1024px and up
  - `xl`: 1280px and up

## 🔧 API Integration

### Endpoints Used
- **Authentication**: `/auth/jwt/create/`, `/auth/jwt/refresh/`, `/auth/users/me/`
- **Skills**: `/api/skills/` (GET, POST, PATCH, DELETE)
- **Projects**: `/api/projects/` (GET, POST, PATCH, DELETE)
- **Experience**: `/api/experiences/` (GET, POST, PATCH, DELETE)
- **Education**: `/api/education/` (GET, POST, PATCH, DELETE)
- **Certifications**: `/api/certifications/` (GET, POST, PATCH, DELETE)

### Error Handling
- Global error handling in API service
- User-friendly error messages
- Automatic token refresh on authentication errors
- Loading states for all API calls

## 🚀 Deployment

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Environment Variables**
   Set `REACT_APP_API_URL` to your production API URL

3. **Serve Static Files**
   The build folder contains static files ready for deployment

## 🔍 Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Consistent naming conventions
- Clean component architecture

## 📋 Features Breakdown

### Home Dashboard
- Statistics cards for each data type
- Quick action buttons
- Recent activity indicators
- Responsive grid layout

### Skills Page
- Grid layout for skills display
- Add/edit/delete functionality (UI ready)
- Statistics and analytics
- Search and filter capabilities (extendable)

### Projects Portfolio
- Card-based layout with images
- External links to live demos and GitHub
- Technology tags from skills
- Project statistics

### Experience Timeline
- Chronological timeline view
- Current position indicators
- Company and location information
- Skills used in each role
- Duration calculations

### Education Timeline
- Academic timeline with degrees
- GPA display when available
- Institution and location info
- Degree type distribution charts

### Certifications Gallery
- Card-based certification display
- Credential links and IDs
- Organization grouping
- Recent certification highlighting

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Maintain responsive design principles
4. Add proper error handling
5. Update types when adding new features

## 📄 License

This project is part of a Docker course demonstration and is for educational purposes.