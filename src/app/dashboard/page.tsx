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

  const totalProjects = projects.length
  const totalTasks = projects.reduce((sum, project) => sum + project.taskCount, 0)
  const completedTasks = projects.reduce((sum, project) => sum + project.completedTasks, 0)
  const totalMembers = projects.reduce((sum, project) => sum + project.memberCount, 0)
  const activeProjects = projects.filter(p => calculateProgress(p.completedTasks, p.taskCount) < 100).length

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Selamat datang, {user?.name || "User"}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Kelola proyek dan kolaborasi tim Anda di satu tempat
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <a href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Pengaturan Akun
              </a>
            </Button>
            <CreateProjectModal onProjectCreated={handleProjectCreated} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Proyek</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProjects}</div>
              <p className="text-xs text-muted-foreground">
                {activeProjects} aktif, {totalProjects - activeProjects} selesai
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tugas</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTasks}</div>
              <p className="text-xs text-muted-foreground">
                {completedTasks} diselesaikan
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Anggota Tim</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMembers}</div>
              <p className="text-xs text-muted-foreground">
                Di semua proyek
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tingkat Penyelesaian</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Progress keseluruhan
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Proyek Saya</h2>
              <p className="text-muted-foreground">
                Kelola dan pantau proyek aktif Anda
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          {projects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="line-clamp-1">{project.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
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
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{project.completedTasks}/{project.taskCount} tugas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4" />
                        <span>{project.totalDiscussions} diskusi</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>{project.totalFiles} file</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link2 className="h-4 w-4" />
                        <span>{project.totalLinks} link</span>
                      </div>
                    </div>

                    {/* Members */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
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
                        <span className="text-sm text-muted-foreground">
                          {project.memberCount} anggota
                        </span>
                      </div>
                      {project.isOwner && (
                        <Badge variant="secondary" className="text-xs">
                          Owner
                        </Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{project.lastActivity}</span>
                      </div>
                      <Button size="sm" asChild>
                        <a href={`/projects/${project.id}`}>
                          Buka Proyek
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
                <CardTitle className="mb-2">Belum ada proyek</CardTitle>
                <CardDescription className="mb-4">
                  Mulai kolaborasi dengan membuat proyek pertama Anda
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
