# SquadScreen

A modern collaborative project management platform built with Next.js 15, TypeScript, and Tailwind CSS.

## Overview

SquadScreen is a comprehensive project management solution designed for teams to collaborate effectively. It provides intuitive dashboard interfaces, interactive kanban boards, and seamless project tracking capabilities.

## Features

### Core Functionality
- **Dashboard Management**: Comprehensive project overview with real-time statistics
- **Interactive Kanban Board**: Drag-and-drop task management with visual feedback
- **Project Creation**: Streamlined project setup with team collaboration features
- **Task Tracking**: Complete task lifecycle management with priority levels
- **Team Collaboration**: Multi-user workspace with role-based access control

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Modern UI Components**: Shadcn/ui component library
- **Drag & Drop**: Professional @dnd-kit integration
- **Real-time Updates**: Dynamic progress calculation and statistics
- **Authentication**: Secure user management system

## Technology Stack

### Frontend
- **Next.js 15.4.3**: React framework with App Router
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern component library
- **@dnd-kit**: Drag and drop functionality
- **Lucide React**: Icon library

### Backend & Database
- **Convex**: Real-time backend platform
- **Authentication**: Secure user authentication
- **Real-time Data**: Live updates and synchronization

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Turbopack**: Fast development builds

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RayendraNagata/SquadScreen.git
cd SquadScreen
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
CONVEX_DEPLOYMENT=your_convex_deployment
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── admin/             # Admin interface
│   ├── projects/          # Project management
│   └── settings/          # User settings
├── components/            # Reusable UI components
│   ├── dashboard/         # Dashboard-specific components
│   ├── layout/            # Layout components
│   ├── projects/          # Project management components
│   ├── providers/         # Context providers
│   └── ui/                # Base UI components
└── lib/                   # Utility functions and configurations
```

## Key Components

### Dashboard
- Project overview with progress tracking
- Team activity monitoring
- Quick access to recent projects
- Performance analytics

### Kanban Board
- Drag-and-drop task management
- Visual task organization
- Real-time collaboration
- Progress tracking

### Project Management
- Project creation and configuration
- Team member management
- Resource allocation
- Timeline tracking

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

### Code Style
- ESLint configuration for consistent code style
- TypeScript strict mode enabled
- Tailwind CSS for styling
- Component-based architecture

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and commit:
```bash
git commit -m "Add your feature description"
```

4. Push to your branch:
```bash
git push origin feature/your-feature-name
```

5. Create a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain component modularity
- Write descriptive commit messages
- Ensure responsive design compatibility
- Test functionality across different browsers

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For support, questions, or contributions, please open an issue on GitHub or contact the development team.

## Roadmap

### Upcoming Features
- Real-time notifications
- Advanced analytics dashboard
- File sharing and collaboration
- Mobile application
- API integrations
- Advanced reporting tools

---

Built with modern web technologies for efficient team collaboration.
