"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Bell, 
  BellRing, 
  Check, 
  MoreHorizontal,
  User,
  MessageSquare,
  FileText,
  Calendar,
  AlertCircle,
  Info,
  CheckCircle,
  X
} from "lucide-react"
import { toast } from "sonner"

interface Notification {
  id: string
  type: 'mention' | 'comment' | 'task' | 'project' | 'system'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  priority: 'low' | 'medium' | 'high'
  author?: {
    id: string
    name: string
    avatar?: string
  }
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "mention",
      title: "You were mentioned in a comment",
      message: "John Doe mentioned you in 'Website Redesign' project discussion",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
      priority: "high",
      author: { id: "1", name: "John Doe" },
      actionUrl: "/projects/1/discussion"
    },
    {
      id: "2",
      type: "task",
      title: "Task assigned to you",
      message: "You've been assigned to 'Implement user authentication'",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false,
      priority: "medium",
      author: { id: "2", name: "Jane Smith" },
      actionUrl: "/projects/1/tasks"
    },
    {
      id: "3",
      type: "comment",
      title: "New comment on your task",
      message: "Sarah Wilson commented on 'Design homepage layout'",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
      priority: "low",
      author: { id: "4", name: "Sarah Wilson" },
      actionUrl: "/projects/1/tasks/3"
    },
    {
      id: "4",
      type: "project",
      title: "Project update",
      message: "Website Redesign project milestone completed",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: true,
      priority: "medium",
      actionUrl: "/projects/1"
    },
    {
      id: "5",
      type: "system",
      title: "Weekly project summary",
      message: "Your weekly activity summary is ready",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      priority: "low",
      actionUrl: "/dashboard"
    }
  ])

  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'mention':
        return <User className="h-4 w-4 text-blue-500" />
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case 'task':
        return <CheckCircle className="h-4 w-4 text-orange-500" />
      case 'project':
        return <FileText className="h-4 w-4 text-purple-500" />
      case 'system':
        return <Info className="h-4 w-4 text-gray-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    return timestamp.toLocaleDateString()
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
    toast.success("All notifications marked as read")
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    toast.success("Notification deleted")
  }

  // Simulate new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance every 30 seconds
        const newNotification: Notification = {
          id: `notification-${Date.now()}`,
          type: ['mention', 'comment', 'task'][Math.floor(Math.random() * 3)] as Notification['type'],
          title: "New notification",
          message: "You have a new update in your project",
          timestamp: new Date(),
          read: false,
          priority: 'medium'
        }
        
        setNotifications(prev => [newNotification, ...prev])
        toast.info("New notification received", {
          action: {
            label: "View",
            onClick: () => setIsOpen(true)
          }
        })
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          {unreadCount > 0 ? (
            <BellRing className="h-5 w-5" />
          ) : (
            <Bell className="h-5 w-5" />
          )}
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Notifications</CardTitle>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs"
                    onClick={markAllAsRead}
                  >
                    <Check className="mr-1 h-3 w-3" />
                    Mark all read
                  </Button>
                )}
                <Badge variant="secondary" className="text-xs">
                  {notifications.length}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <Bell className="mx-auto h-8 w-8 mb-2" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-0">
                {notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <div 
                      className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      }`}
                      onClick={() => {
                        markAsRead(notification.id)
                        if (notification.actionUrl) {
                          window.location.href = notification.actionUrl
                        }
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </p>
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getPriorityColor(notification.priority)}`}
                              >
                                {notification.priority}
                              </Badge>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {!notification.read && (
                                  <DropdownMenuItem 
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      markAsRead(notification.id)
                                    }}
                                  >
                                    <Check className="mr-2 h-4 w-4" />
                                    Mark as read
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem 
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteNotification(notification.id)
                                  }}
                                  className="text-destructive"
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < notifications.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
