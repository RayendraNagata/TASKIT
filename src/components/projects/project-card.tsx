import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  CheckCircle, 
  Circle, 
  Clock,
  MoreHorizontal,
  Settings,
  Archive,
  Trash2
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProjectCardProps {
  project: {
    id: string
    name: string
    description?: string
    memberCount: number
    taskCount: number
    completedTasks: number
    lastActivity: string
    createdAt: Date
  }
  isOwner?: boolean
  onArchive?: (projectId: string) => void
  onDelete?: (projectId: string) => void
}

export function ProjectCard({ 
  project, 
  isOwner = false,
  onArchive,
  onDelete 
}: ProjectCardProps) {
  const progressPercentage = project.taskCount > 0 
    ? Math.round((project.completedTasks / project.taskCount) * 100)
    : 0

  return (
    <Card className="group transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="space-y-1 flex-1">
          <CardTitle className="text-lg line-clamp-1">{project.name}</CardTitle>
          {project.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          )}
        </div>
        
        {isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/projects/${project.id}/settings`}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onArchive?.(project.id)}
                className="text-orange-600"
              >
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(project.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{project.memberCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{project.completedTasks}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Circle className="h-4 w-4 text-muted-foreground" />
              <span>{project.taskCount - project.completedTasks}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{project.lastActivity}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/projects/${project.id}`}>
            Open Project
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
