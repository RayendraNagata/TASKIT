# TASKIT

A comprehensive collaborative project management platform designed for teams to work together efficiently. TASKIT provides powerful tools for task management, team collaboration, and resource sharing in a modern, responsive interface.

## Features

### Core Functionality
- **User Authentication**: Secure login and registration system with role-based access control
- **Project Management**: Create and manage projects with detailed descriptions and team assignments
- **Task Management**: Interactive Kanban board with drag-and-drop functionality for task organization
- **Team Collaboration**: Real-time discussion panels and team member management
- **Resource Management**: File uploads and link sharing for project resources
- **Responsive Design**: Mobile-first approach ensuring optimal experience across all devices

### User Roles
- **Admin**: Full system access with user and project management capabilities
- **Project Owner**: Can create projects, manage team members, and configure project settings
- **Team Member**: Can participate in projects, manage assigned tasks, and contribute to discussions

### Technical Features
- **Modern UI/UX**: Clean, professional interface built with Tailwind CSS and Radix UI components
- **Drag & Drop**: Advanced task management with multi-input support (mouse, touch, keyboard)
- **Real-time Updates**: Live collaboration features for seamless team coordination
- **Dark/Light Theme**: User preference-based theme switching
- **Notification System**: Keep track of important updates and team activities

## Technology Stack

### Frontend
- **Next.js 15.4.3**: React framework with App Router and Server Components
- **TypeScript**: Type-safe development with strict type checking
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Radix UI**: Accessible component primitives for consistent user interface
- **Lucide React**: Beautiful, customizable icons

### Development Tools
- **ESLint**: Code linting with modern JavaScript standards
- **PostCSS**: CSS post-processing for enhanced styling capabilities
- **Turbopack**: Fast development server for improved developer experience

### Key Dependencies
- **@dnd-kit/core**: Advanced drag-and-drop functionality with accessibility support
- **@hookform/resolvers**: Form validation with Zod integration
- **next-themes**: Theme management with system preference detection

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
│   │   └── layout.tsx         # Root layout component
│   ├── components/            # Reusable React components
│   │   ├── ui/               # Base UI components (buttons, inputs, dialogs)
│   │   ├── layout/           # Layout components (header, theme toggle)
│   │   ├── auth/             # Authentication components
│   │   ├── projects/         # Project-specific components
│   │   ├── notifications/    # Notification system
│   │   └── providers/        # Context providers
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

The application includes demo accounts for testing:

- **Admin Account**: admin@taskit.com / password123
- **Regular User**: john@company.com / password123

## Available Scripts

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build production application
- `npm run start`: Start production server
- `npm run lint`: Run ESLint code analysis

## Key Components

### Authentication System
- Secure user registration and login
- Password reset functionality
- Role-based access control
- Session management

### Project Management
- Project creation and configuration
- Team member invitation and management
- Project statistics and progress tracking
- Resource and file management

### Task Management
- Interactive Kanban board
- Task creation, editing, and deletion
- Status tracking (To Do, In Progress, Done)
- Priority and assignee management
- Drag-and-drop task organization

### User Interface
- Responsive design for all screen sizes
- Dark and light theme support
- Consistent component library
- Accessible navigation and interactions

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

- Real-time collaboration with WebSocket integration
- Advanced notification system with email support
- File storage and management improvements
- Advanced project analytics and reporting
- Integration with popular development tools
- Mobile application development

## License

This project is developed as a demonstration of modern web application architecture and collaborative project management solutions.

## Contributing

This is a demonstration project showcasing modern web development practices and collaborative project management features. The codebase serves as an example of:

- Modern React and Next.js development patterns
- TypeScript implementation in full-stack applications
- Responsive design and mobile-first development
- User authentication and role-based access control
- Interactive UI components and drag-and-drop functionality

For questions or feedback about the implementation, please refer to the code comments and documentation within the source files.
