"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateProjectModal } from "@/components/projects/create-project-modal"
import { Plus, Search, Users, Calendar, CheckCircle2, MoreVertical } from "lucide-react"

// Mock data - replace with actual data fetching
const projects = [
  {
    id: "project-1",
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern UI/UX",
    memberCount: 5,
    taskCount: 12,
    completedTasks: 8,
    lastActivity: "2 hours ago",
    dueDate: "2025-02-15",
    status: "active",
    color: "bg-blue-500"
  },
  {
    id: "project-2", 
    name: "Mobile App Development",
    description: "Cross-platform mobile application for customer engagement",
    memberCount: 8,
    taskCount: 25,
    completedTasks: 7,
    lastActivity: "1 day ago",
    dueDate: "2025-03-01",
    status: "active",
    color: "bg-green-500"
  },
  {
    id: "project-3",
    name: "Database Migration",
    description: "Migrate legacy database to modern cloud infrastructure",
    memberCount: 3,
    taskCount: 8,
    completedTasks: 8,
    lastActivity: "3 days ago",
    dueDate: "2025-01-30",
    status: "completed",
    color: "bg-purple-500"
  }
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = projects.filter(project =>
      project.name.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredProjects(filtered)
  }

  const handleProjectCreated = (newProject: any) => {
    // In real app, this would trigger a refetch or update the cache
    console.log("New project created:", newProject)
  }

  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage and track all your team projects</p>
        </div>
        <CreateProjectModal onProjectCreated={handleProjectCreated} />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">All Projects</Button>
          <Button variant="outline" size="sm">Active</Button>
          <Button variant="outline" size="sm">Completed</Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${project.color}`} />
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge variant={project.status === 'completed' ? 'default' : 'secondary'} className="mt-1">
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardDescription className="text-sm">
                {project.description}
              </CardDescription>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{getProgressPercentage(project.completedTasks, project.taskCount)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(project.completedTasks, project.taskCount)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{project.completedTasks} completed</span>
                  <span>{project.taskCount} total tasks</span>
                </div>
              </div>

              {/* Project Stats */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{project.memberCount} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Due {project.dueDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs text-gray-500">
                  Last activity: {project.lastActivity}
                </span>
                <Button variant="outline" size="sm">
                  View Project
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery ? "Try adjusting your search terms" : "Get started by creating your first project"}
          </p>
          {!searchQuery && (
            <CreateProjectModal onProjectCreated={handleProjectCreated} />
          )}
        </div>
      )}
    </div>
  )
}
