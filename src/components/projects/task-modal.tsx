"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, User, Flag, Trash2 } from "lucide-react"
import { format } from "date-fns"

interface Task {
  id: string
  title: string
  description?: string
  status: "todo" | "in_progress" | "done"
  assignee?: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  dueDate?: string
  priority?: "low" | "medium" | "high"
}

interface TaskModalProps {
  task?: Task
  isOpen: boolean
  onClose: () => void
  onSave: (task: Partial<Task>) => void
  onDelete?: (taskId: string) => void
  mode: "create" | "edit"
}

// Mock team members data
const teamMembers = [
  { id: "1", name: "John Doe", email: "john@example.com", avatar: "" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", avatar: "" },
  { id: "3", name: "Mike Chen", email: "mike@example.com", avatar: "" },
  { id: "4", name: "Sarah Wilson", email: "sarah@example.com", avatar: "" },
]

export function TaskModal({ 
  task, 
  isOpen, 
  onClose, 
  onSave, 
  onDelete, 
  mode 
}: TaskModalProps) {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "todo" as const,
    assigneeId: task?.assignee?.id || "",
    dueDate: task?.dueDate || "",
    priority: task?.priority || "medium" as const,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    if (!formData.title.trim()) return

    setIsLoading(true)
    
    try {
      const assignee = teamMembers.find(member => member.id === formData.assigneeId)
      
      const taskData: Partial<Task> = {
        id: task?.id || `task-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        status: formData.status,
        assignee: assignee,
        dueDate: formData.dueDate,
        priority: formData.priority,
      }

      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
      onSave(taskData)
      onClose()
    } catch (error) {
      console.error("Failed to save task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!task?.id || !onDelete) return
    
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
      onDelete(task.id)
      onClose()
    } catch (error) {
      console.error("Failed to delete task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo": return "bg-blue-100 text-blue-800 border-blue-200"
      case "in_progress": return "bg-orange-100 text-orange-800 border-orange-200"
      case "done": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Task" : "Edit Task"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" 
              ? "Fill in the details for the task to be added to the project" 
              : "Edit the details of this task"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">Task Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
              className="mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed task description (optional)"
              rows={3}
              className="mt-1"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <Select value={formData.status} onValueChange={(value: "todo" | "in_progress" | "done") => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor("todo")}>Todo</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="in_progress">
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor("in_progress")}>In Progress</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="done">
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor("done")}>Done</Badge>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Assignee */}
          <div>
            <label className="text-sm font-medium">Assignee</label>
            <Select value={formData.assigneeId} onValueChange={(value: string) => setFormData({ ...formData, assigneeId: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Due Date */}
          <div>
            <label className="text-sm font-medium">Due Date</label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="mt-1"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-medium">Priority</label>
            <Select value={formData.priority} onValueChange={(value: "low" | "medium" | "high") => setFormData({ ...formData, priority: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <div className="flex items-center space-x-2">
                    <Flag className="h-3 w-3 text-green-500" />
                    <Badge className={getPriorityColor("low")}>Low</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center space-x-2">
                    <Flag className="h-3 w-3 text-yellow-500" />
                    <Badge className={getPriorityColor("medium")}>Medium</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center space-x-2">
                    <Flag className="h-3 w-3 text-red-500" />
                    <Badge className={getPriorityColor("high")}>High</Badge>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            {mode === "edit" && onDelete && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading || !formData.title.trim()}>
              {isLoading ? "Saving..." : mode === "create" ? "Create Task" : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
