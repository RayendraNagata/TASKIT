"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CreateProjectModal } from "@/components/projects/create-project-modal"
import { useAuth } from "@/components/providers/auth-provider"
import { 
  Plus, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FolderOpen,
  Settings,
  MoreHorizontal,
  TrendingUp,
  MessageSquare,
  FileText,
  Link2
} from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  memberCount: number
  taskCount: number
  completedTasks: number
  totalDiscussions: number
  totalFiles: number
  totalLinks: number
  lastActivity: string
  members: Array<{
    id: string
    name: string
    avatar?: string
  }>
  isOwner: boolean
}

// Helper function to calculate progress
const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

export default function Dashboard() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Website Redesign",
      description: "Complete overhaul of company website with modern design and improved UX",
      memberCount: 4,
      taskCount: 12,
      completedTasks: 8,
      totalDiscussions: 15,
      totalFiles: 8,
      totalLinks: 12,
      lastActivity: "2 hours ago",
      members: [
        { id: "1", name: "Alice Johnson" },
        { id: "2", name: "Bob Smith" },
        { id: "3", name: "Carol Davis" },
        { id: "4", name: "David Wilson" }
      ],
      isOwner: true
    },
    {
      id: "2", 
      name: "Mobile App Development",
      description: "React Native app for iOS and Android platforms",
      memberCount: 6,
      taskCount: 18,
      completedTasks: 5,
      totalDiscussions: 23,
      totalFiles: 15,
      totalLinks: 8,
      lastActivity: "1 day ago",
      members: [
        { id: "1", name: "Alice Johnson" },
        { id: "5", name: "Eva Martinez" },
        { id: "6", name: "Frank Garcia" },
        { id: "7", name: "Grace Lee" }
      ],
      isOwner: false
    },
    {
      id: "3",
      name: "Database Migration",
      description: "Migrate from MongoDB to PostgreSQL for better performance",
      memberCount: 3,
      taskCount: 8,
      completedTasks: 8,
      totalDiscussions: 6,
      totalFiles: 4,
      totalLinks: 3,
      lastActivity: "3 days ago",
      members: [
        { id: "1", name: "Alice Johnson" },
        { id: "8", name: "Henry Kim" },
        { id: "9", name: "Ivy Chen" }
      ],
      isOwner: true
    }
  ])

  const handleProjectCreated = (newProject: any) => {
    const projectWithStats: Project = {
      ...newProject,
      memberCount: 1,
      taskCount: 0,
      completedTasks: 0,
      totalDiscussions: 0,
      totalFiles: 0,
      totalLinks: 0,
      lastActivity: "Just now",
      members: [{ id: user?.id || "1", name: user?.name || "You" }],
      isOwner: true
    }
    setProjects(prev => [projectWithStats, ...prev])
  }

  // Handler for project actions
  const handleProjectAction = (projectId: string, projectName: string) => {
    console.log(`Action for project: ${projectName} (ID: ${projectId})`)
    // TODO: Open project actions menu
  }

  const totalProjects = projects.length
  const totalTasks = projects.reduce((sum, project) => sum + project.taskCount, 0)
  const completedTasks = projects.reduce((sum, project) => sum + project.completedTasks, 0)
  const totalMembers = projects.reduce((sum, project) => sum + project.memberCount, 0)
  const activeProjects = projects.filter(p => calculateProgress(p.completedTasks, p.taskCount) < 100).length

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, {user?.name || "User"}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your projects and team collaboration in one place
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <a href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Account Settings</span>
                <span className="sm:hidden">Settings</span>
              </a>
            </Button>
            <CreateProjectModal onProjectCreated={handleProjectCreated} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{totalProjects}</div>
              <p className="text-xs text-muted-foreground">
                <span className="hidden sm:inline">{activeProjects} active, {totalProjects - activeProjects} completed</span>
                <span className="sm:hidden">{activeProjects} active</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{totalTasks}</div>
              <p className="text-xs text-muted-foreground">
                {completedTasks} completed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{totalMembers}</div>
              <p className="text-xs text-muted-foreground">
                <span className="hidden sm:inline">Across all projects</span>
                <span className="sm:hidden">Total</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <span className="hidden sm:inline">Completion Rate</span>
                <span className="sm:hidden">Progress</span>
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">
                {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="hidden sm:inline">Overall progress</span>
                <span className="sm:hidden">Overall</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">My Projects</h2>
              <p className="text-muted-foreground">
                Manage and monitor your active projects
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          {projects.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1 min-w-0">
                        <CardTitle className="line-clamp-1 text-base sm:text-lg">{project.name}</CardTitle>
                        <CardDescription className="line-clamp-2 text-sm">
                          {project.description}
                        </CardDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-2 flex-shrink-0"
                        onClick={() => handleProjectAction(project.id, project.name)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{calculateProgress(project.completedTasks, project.taskCount)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${calculateProgress(project.completedTasks, project.taskCount)}%` }}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Project Stats */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{project.completedTasks}/{project.taskCount} tasks</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{project.totalDiscussions} discussions</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{project.totalFiles} files</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link2 className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{project.totalLinks} links</span>
                      </div>
                    </div>

                    {/* Members */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="flex -space-x-2">
                          {project.members.slice(0, 3).map((member, index) => (
                            <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="text-xs">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.memberCount > 3 && (
                            <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                              <span className="text-xs font-medium">+{project.memberCount - 3}</span>
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground truncate">
                          {project.memberCount} members
                        </span>
                      </div>
                      {project.isOwner && (
                        <Badge variant="secondary" className="text-xs flex-shrink-0">
                          Owner
                        </Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{project.lastActivity}</span>
                      </div>
                      <Button size="sm" asChild className="w-full sm:w-auto">
                        <a href={`/projects/${project.id}`}>
                          Open Project
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="py-12">
              <CardContent className="text-center">
                <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <CardTitle className="mb-2">No projects yet</CardTitle>
                <CardDescription className="mb-4">
                  Start collaborating by creating your first project
                </CardDescription>
                <CreateProjectModal onProjectCreated={handleProjectCreated} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
