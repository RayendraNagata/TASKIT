"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Plus, 
  MoreHorizontal, 
  Calendar,
  User,
  AlertCircle,
  CheckCircle2,
  GripVertical
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TaskModal } from "./task-modal"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverEvent,
  useDroppable
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

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

interface KanbanBoardProps {
  projectId: string
}

// Sortable Task Card Component
function SortableTaskCard({ 
  task, 
  onEdit 
}: { 
  task: Task
  onEdit?: (task: Task) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        isDragging ? "opacity-50 shadow-lg" : ""
      }`}
      {...attributes}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium line-clamp-2 flex-1">
            {task.title}
          </CardTitle>
          <div className="flex items-center space-x-1">
            <button
              {...listeners}
              className="p-1 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="h-3 w-3 text-gray-400" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(task)}>
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem>Change Status</DropdownMenuItem>
                <DropdownMenuItem>Assign Member</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Priority Badge */}
          {task.priority && (
            <Badge 
              variant="outline" 
              className={`text-xs ${getPriorityColor(task.priority)}`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </Badge>
          )}

          {/* Bottom section */}
          <div className="flex items-center justify-between">
            {/* Assignee */}
            {task.assignee && (
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage 
                    src={task.assignee.avatar} 
                    alt={task.assignee.name} 
                  />
                  <AvatarFallback className="text-xs">
                    {task.assignee.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {task.assignee.name}
                </span>
              </div>
            )}

            {/* Due Date */}
            {task.dueDate && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Droppable Column Component
function DroppableColumn({ 
  id, 
  title, 
  status, 
  tasks, 
  icon,
  onAddTask,
  onEditTask
}: { 
  id: string
  title: string
  status: Task["status"]
  tasks: Task[]
  icon: React.ReactNode
  onAddTask?: (status: Task["status"]) => void
  onEditTask?: (task: Task) => void
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: id
  })

  return (
    <div className="space-y-4">
      <div 
        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
      >
        <div className="flex items-center space-x-2">
          {icon}
          <h4 className="font-medium">{title}</h4>
          <Badge variant="secondary" className="text-xs">
            {tasks.length}
          </Badge>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onAddTask?.(status)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div 
        ref={setNodeRef}
        className={`space-y-3 min-h-[400px] p-2 rounded-lg transition-colors ${
          isOver ? "bg-primary/5 border-2 border-primary border-dashed" : ""
        }`}
      >
        <SortableContext 
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} onEdit={onEditTask} />
          ))}

          {/* Empty state */}
          {tasks.length === 0 && (
            <Card className={`border-dashed border-2 ${
              isOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            }`}>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="text-muted-foreground text-sm text-center">
                  {isOver ? "Drop task here" : `No tasks in ${title.toLowerCase()}`}
                </div>
                {!isOver && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => onAddTask?.(status)}
                  >
                    <Plus className="mr-2 h-3 w-3" />
                    Add Task
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </SortableContext>
      </div>
    </div>
  )
}

export function KanbanBoard({ projectId }: KanbanBoardProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [taskModal, setTaskModal] = useState<{
    isOpen: boolean
    mode: "create" | "edit"
    task?: Task
    status?: Task["status"]
  }>({
    isOpen: false,
    mode: "create"
  })
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design new homepage layout",
      description: "Create wireframes and mockups for the new homepage design",
      status: "todo",
      assignee: {
        id: "1",
        name: "John Doe",
        email: "john@company.com"
      },
      dueDate: "2025-01-30",
      priority: "high"
    },
    {
      id: "2",
      title: "Implement user authentication",
      description: "Set up login and registration functionality",
      status: "in_progress",
      assignee: {
        id: "2",
        name: "Jane Smith",
        email: "jane@company.com"
      },
      dueDate: "2025-02-05",
      priority: "medium"
    },
    {
      id: "3",
      title: "Setup database schema",
      description: "Design and implement the database structure",
      status: "done",
      assignee: {
        id: "3",
        name: "Mike Chen",
        email: "mike@company.com"
      },
      priority: "low"
    },
    {
      id: "4",
      title: "Create project documentation",
      description: "Write comprehensive documentation for the project",
      status: "todo",
      assignee: {
        id: "4",
        name: "Sarah Wilson",
        email: "sarah@company.com"
      },
      dueDate: "2025-02-10",
      priority: "medium"
    },
    {
      id: "5",
      title: "Implement API endpoints",
      description: "Create REST API endpoints for user management",
      status: "in_progress",
      assignee: {
        id: "1",
        name: "John Doe",
        email: "john@company.com"
      },
      dueDate: "2025-02-08",
      priority: "high"
    }
  ])

  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  )

  const columns = [
    { id: "todo", title: "To Do", status: "todo" as const },
    { id: "in_progress", title: "In Progress", status: "in_progress" as const },
    { id: "done", title: "Done", status: "done" as const }
  ]

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter(task => task.status === status)
  }

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "todo": return <AlertCircle className="h-4 w-4 text-blue-500" />
      case "in_progress": return <Calendar className="h-4 w-4 text-orange-500" />
      case "done": return <CheckCircle2 className="h-4 w-4 text-green-500" />
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Find the active task
    const activeTask = tasks.find(task => task.id === activeId)
    if (!activeTask) return

    // Determine the new status based on where it's dropped
    let newStatus: Task["status"] = activeTask.status

    // If dropped on a column header or empty area
    if (overId === "todo" || overId === "in_progress" || overId === "done") {
      newStatus = overId as Task["status"]
    } else {
      // If dropped on another task, use that task's status
      const overTask = tasks.find(task => task.id === overId)
      if (overTask) {
        newStatus = overTask.status
      }
    }

    // Update the task status
    if (newStatus !== activeTask.status) {
      setTasks(tasks => 
        tasks.map(task => 
          task.id === activeId 
            ? { ...task, status: newStatus }
            : task
        )
      )
    } else {
      // Reorder within the same column
      const columnTasks = getTasksByStatus(newStatus)
      const activeIndex = columnTasks.findIndex(task => task.id === activeId)
      const overIndex = columnTasks.findIndex(task => task.id === overId)

      if (activeIndex !== overIndex) {
        const newOrder = arrayMove(columnTasks, activeIndex, overIndex)
        const otherTasks = tasks.filter(task => task.status !== newStatus)
        setTasks([...otherTasks, ...newOrder])
      }
    }
  }

  const handleCreateTask = (status: Task["status"]) => {
    setTaskModal({
      isOpen: true,
      mode: "create",
      status
    })
  }

  const handleEditTask = (task: Task) => {
    setTaskModal({
      isOpen: true,
      mode: "edit",
      task
    })
  }

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (taskModal.mode === "create") {
      const newTask: Task = {
        id: taskData.id!,
        title: taskData.title!,
        description: taskData.description,
        status: taskModal.status || taskData.status!,
        assignee: taskData.assignee,
        dueDate: taskData.dueDate,
        priority: taskData.priority
      }
      setTasks([...tasks, newTask])
    } else {
      setTasks(tasks.map(task => 
        task.id === taskData.id ? { ...task, ...taskData } : task
      ))
    }
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const closeTaskModal = () => {
    setTaskModal({ isOpen: false, mode: "create" })
  }

  // Prevent hydration mismatch - render only after client mount
  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
              <h3 className="font-semibold text-gray-900">{column.title}</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 h-20 animate-pulse" />
              <div className="bg-white rounded-lg p-3 h-16 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Project Tasks</h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop tasks to update their status and priority
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.status)
            
            return (
              <DroppableColumn
                key={column.id}
                id={column.status}
                title={column.title}
                status={column.status}
                tasks={columnTasks}
                icon={getStatusIcon(column.status)}
                onAddTask={handleCreateTask}
                onEditTask={handleEditTask}
              />
            )
          })}
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="rotate-3 opacity-90">
              <SortableTaskCard 
                task={tasks.find(task => task.id === activeId)!} 
                onEdit={handleEditTask}
              />
            </div>
          ) : null}
        </DragOverlay>

        <TaskModal
          task={taskModal.task}
          isOpen={taskModal.isOpen}
          onClose={closeTaskModal}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
          mode={taskModal.mode}
        />
      </div>
    </DndContext>
  )
}
