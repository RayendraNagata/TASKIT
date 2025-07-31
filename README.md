# TASKIT

A comprehensive collaborative project management platform designed for teams to work together efficiently. TASKIT provides powerful tools for task management, team collaboration, and resource sharing in a modern, responsive interface.

# TASKIT

A comprehensive collaborative project management platform designed for teams to work together efficiently. TASKIT provides powerful tools for task management, team collaboration, and resource sharing in a modern, responsive interface.

## Features

### Core Functionality
- **User Authentication**: Secure login and registration system with role-based access control
- **Project Management**: Create, edit, and delete projects with comprehensive settings
- **Task Management**: Interactive Kanban board with drag-and-drop functionality and team member assignment
- **Team Collaboration**: Real-time discussion panels, member management, and role-based permissions
- **Resource Management**: File uploads with validation, link sharing, and organized resource panels
- **Profile Management**: Complete user profiles with photo upload capability
- **Responsive Design**: Mobile-first approach ensuring optimal experience across all devices

### User Roles & Permissions
- **Admin**: Full system access with user and project management capabilities
- **Project Owner**: Can create projects, manage team members, configure settings, and delete projects
- **Team Member**: Can participate in projects, manage assigned tasks, upload files, and contribute to discussions

### Enhanced Project Features
- **Project Settings**: Comprehensive 4-tab settings interface (General, Permissions, Notifications, Advanced)
- **Member Management**: Invite members, assign roles, change permissions, and remove team members
- **Task Assignment**: Assign tasks to specific team members with visual assignee selection
- **File Management**: Upload files with type/size validation, organize resources, and manage links
- **Notification System**: Configurable notifications for tasks, comments, and member activities
- **Project Actions**: Archive projects or permanently delete with confirmation dialogs

### User Interface & Experience
- **Modern UI/UX**: Clean, professional interface built with Tailwind CSS and Radix UI components
- **Drag & Drop**: Advanced task management with multi-input support (mouse, touch, keyboard)
- **Photo Upload**: Profile picture upload with drag-and-drop interface and real-time preview
- **Modal Dialogs**: Comprehensive dialog system for all CRUD operations
- **Dark/Light Theme**: User preference-based theme switching
- **Legal Pages**: Complete Terms of Service, Privacy Policy, Contact, About, and Help pages

### Pages & Navigation
- **Dashboard**: Project overview with statistics, recent activity, and quick actions
- **Project Pages**: Detailed project view with tabs for Tasks, Discussions, Files, Members
- **Settings**: Complete user settings with profile management and preferences
- **Project Settings**: Full project configuration with permissions and advanced options
- **Legal & Support**: Terms, Privacy, Contact, About, and Help center with search functionality

## Technology Stack

### Frontend
- **Next.js 15.4.3**: React framework with App Router and Server Components
- **TypeScript**: Type-safe development with strict type checking
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Radix UI**: Accessible component primitives with comprehensive dialog system
- **Lucide React**: Beautiful, customizable icons for modern interface
- **React Hook Form**: Advanced form handling with Zod validation
- **Sonner**: Toast notification system for user feedback

### UI Components & Libraries
- **@dnd-kit/core**: Advanced drag-and-drop functionality with accessibility support
- **@hookform/resolvers**: Form validation with Zod schema integration
- **next-themes**: Theme management with system preference detection
- **date-fns**: Date manipulation and formatting utilities

### Development Tools
- **ESLint**: Code linting with modern JavaScript standards
- **PostCSS**: CSS post-processing for enhanced styling capabilities
- **Turbopack**: Fast development server for improved developer experience

## Project Structure

```
taskit/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages (login, register, forgot-password)
│   │   ├── dashboard/         # User dashboard
│   │   ├── projects/          # Project management pages
│   │   ├── admin/             # Administrative interface
│   │   ├── settings/          # User settings
│   │   ├── terms/             # Legal pages (terms, privacy, contact, about, help)
│   │   └── layout.tsx         # Root layout component
│   ├── components/            # Reusable React components
│   │   ├── ui/               # Base UI components (buttons, inputs, dialogs)
│   │   ├── layout/           # Layout components (header, sidebar, theme toggle)
│   │   ├── auth/             # Authentication components
│   │   ├── projects/         # Project-specific components (kanban, tasks, members)
│   │   ├── notifications/    # Notification system
│   │   └── providers/        # Context providers (auth, theme)
│   └── lib/                  # Utility functions and configurations
├── public/                   # Static assets
├── convex/                  # Backend API and database schema
└── config files             # TypeScript, ESLint, Tailwind configurations
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RayendraNagata/TASKIT.git
cd taskit
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Demo Accounts

The application includes demo accounts for testing all features:

- **Admin Account**: admin@taskit.com / password123
  - Full system access and user management
  - Can create, modify, and delete any project
  - Access to admin dashboard and analytics

- **Regular User**: john@company.com / password123  
  - Standard user with project creation abilities
  - Can manage own projects and participate in others
  - Full access to task management and collaboration features

### Demo Features Available

- Create and manage multiple projects
- Invite team members and assign roles
- Upload profile pictures and files
- Use drag-and-drop Kanban board
- Test all modal dialogs and forms
- Explore project settings and configurations
- Experience responsive design on mobile devices

## Available Scripts

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build production application
- `npm run start`: Start production server
- `npm run lint`: Run ESLint code analysis

## Key Components

### Authentication System
- Secure user registration and login with form validation
- Password reset functionality with email integration
- Role-based access control (Admin, Owner, Member)
- Session management and protected routes

### Project Management
- **Project Creation**: Full project setup with name, description, and visibility settings
- **Project Settings**: 4-tab comprehensive settings (General, Permissions, Notifications, Advanced)
- **Team Management**: Invite members, assign roles, change permissions, remove users
- **Project Actions**: Archive projects or permanently delete with confirmation dialogs
- **Statistics**: Real-time progress tracking and member activity overview

### Task Management
- **Interactive Kanban Board**: Drag-and-drop task organization across columns
- **Task Assignment**: Assign tasks to specific team members with visual selection
- **Task Modal**: Complete CRUD operations (Create, Read, Update, Delete)
- **Priority System**: High, Medium, Low priority with color coding
- **Status Tracking**: Todo, In Progress, Done with progress visualization
- **Due Dates**: Calendar integration for deadline management

### Profile Management
- **Photo Upload**: Drag-and-drop profile picture upload with validation
- **File Validation**: Image type checking and 5MB size limit
- **Real-time Preview**: Instant avatar updates after upload
- **Profile Settings**: Complete user information management

### Collaboration Features
- **Discussion Panels**: Project-wide discussions with threaded comments
- **File Sharing**: Upload files with type/size validation and organized display
- **Link Management**: Add, organize, and manage external resources
- **Notification System**: Configurable alerts for tasks, comments, and activities

### User Interface
- **Responsive Design**: Mobile-first approach for all screen sizes
- **Theme System**: Dark and light mode with system preference detection
- **Modal Dialogs**: Comprehensive dialog system for all operations
- **Toast Notifications**: User feedback for all actions and operations
- **Accessible Components**: Full keyboard navigation and screen reader support

## Development Guidelines

### Code Standards
- TypeScript strict mode enabled
- ESLint configuration for code quality
- Consistent component structure and naming
- Responsive design principles

### Component Architecture
- Modular component design
- Separation of concerns
- Reusable UI components
- Proper state management

### Responsive Design
- Mobile-first approach
- Flexible layouts with CSS Grid and Flexbox
- Optimized touch interactions
- Consistent spacing and typography

## Future Enhancements

- **Real-time Collaboration**: WebSocket integration for live updates and concurrent editing
- **Advanced Analytics**: Project metrics, time tracking, and productivity insights
- **Mobile Application**: Native iOS and Android apps with offline capabilities
- **Integration Hub**: Connect with popular tools (GitHub, Slack, Trello, Jira)
- **Advanced Notifications**: Email, SMS, and webhook integrations
- **File Versioning**: Track file changes and maintain version history
- **Advanced Permissions**: Granular role-based access control with custom roles
- **Project Templates**: Pre-built project structures for common use cases
- **API Integration**: RESTful API for third-party integrations
- **Advanced Search**: Global search across projects, tasks, and discussions

## Completed Features (Recent Updates)

- Task Assignment: Complete member assignment system with visual selection
- Photo Upload: Profile picture upload with drag-and-drop interface
- Project Settings: Comprehensive 4-tab settings with all configurations
- Member Management: Full CRUD operations for team member management
- Legal Pages: Complete Terms, Privacy, Contact, About, and Help pages
- Enhanced Dialogs: Functional modal system replacing placeholder toasts
- Form Validation: Comprehensive Zod schema validation across all forms
- File Management: Upload validation, type checking, and size limits

## License

This project is developed as a demonstration of modern web application architecture and collaborative project management solutions.

## Contributing

This project demonstrates modern web development practices and serves as a comprehensive example of:

### Architecture Patterns
- **Next.js App Router**: Modern React framework with server-side rendering
- **TypeScript Integration**: Full type safety across frontend and backend
- **Component Architecture**: Reusable, accessible, and maintainable UI components
- **State Management**: Proper React state patterns with hooks and context
- **Form Handling**: Advanced form validation with React Hook Form and Zod

### Development Practices
- **Responsive Design**: Mobile-first development with Tailwind CSS
- **Accessibility**: WCAG guidelines compliance with screen reader support
- **Performance**: Optimized loading and rendering with Next.js features
- **User Experience**: Intuitive interface design with comprehensive feedback systems
- **Code Quality**: ESLint configuration and TypeScript strict mode

### Implementation Highlights
- **Drag & Drop**: Advanced @dnd-kit integration with multi-input support
- **Modal Systems**: Comprehensive dialog patterns for all CRUD operations
- **File Handling**: Upload validation, preview, and management systems
- **Theme System**: Dark/light mode with user preference persistence
- **Routing**: Dynamic routing with protected pages and role-based access

This codebase serves as a reference for building modern, scalable web applications with React, Next.js, and TypeScript. The implementation showcases industry best practices for:

- Component composition and reusability
- State management and data flow
- User authentication and authorization  
- Form validation and error handling
- Responsive design and mobile optimization
- Accessibility and inclusive design principles

For technical questions or feedback about specific implementations, please refer to the comprehensive code comments and documentation within the source files.
