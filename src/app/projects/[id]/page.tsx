"use client"

import { KanbanBoard } from "@/components/projects/kanban-board"
import { DiscussionPanel } from "@/components/projects/discussion-panel"
import { ResourcesPanel } from "@/components/projects/resources-panel"
import { MembersPanel } from "@/components/projects/members-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Settings, 
  Users, 
  MessageSquare, 
  FolderOpen, 
  Kanban,
  Calendar,
  MoreHorizontal
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ProjectPage() {
  const params = useParams()
  const projectId = params.id as string

  // Mock project data - will be replaced with real data from Convex
  const project = {
    id: projectId,
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern design and improved UX",
    memberCount: 4,
    taskCount: 12,
    completedTasks: 8,
    createdAt: new Date(),
    lastActivity: "2 hours ago",
    owner: {
      id: "1",
      name: "John Doe",
      email: "john@company.com"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl">
        {/* Project Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                  <span className="sm:hidden">Back</span>
                </Link>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Users className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Invite Members</span>
                <span className="sm:hidden">Invite</span>
              </Button>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Settings className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
                <span className="sm:hidden">Settings</span>
              </Button>
              <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">{project.description}</p>
          </div>

          {/* Project Stats */}
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                <Kanban className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">{project.taskCount}</div>
                <p className="text-xs text-muted-foreground">
                  {project.completedTasks} completed
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <span className="hidden sm:inline">Team Members</span>
                  <span className="sm:hidden">Team</span>
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">{project.memberCount}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="hidden sm:inline">Active collaborators</span>
                  <span className="sm:hidden">Active</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progress</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">
                  {Math.round((project.completedTasks / project.taskCount) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="hidden sm:inline">Completion rate</span>
                  <span className="sm:hidden">Complete</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <span className="hidden sm:inline">Last Activity</span>
                  <span className="sm:hidden">Activity</span>
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">{project.lastActivity}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="hidden sm:inline">Recent update</span>
                  <span className="sm:hidden">Update</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Project Tabs */}
        <Tabs defaultValue="kanban" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="kanban" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm py-2">
              <Kanban className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="discussion" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm py-2">
              <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Discussion</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm py-2">
              <FolderOpen className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Resources</span>
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm py-2">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Members</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="space-y-4">
            <KanbanBoard projectId={projectId} />
          </TabsContent>

          <TabsContent value="discussion" className="space-y-4">
            <DiscussionPanel projectId={projectId} />
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <ResourcesPanel projectId={projectId} />
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <MembersPanel projectId={projectId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
