"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  UserPlus,
  Crown,
  Shield,
  User,
  MoreHorizontal,
  Mail,
  Calendar,
  Search,
  Settings
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface Member {
  id: string
  name: string
  email: string
  avatar?: string
  role: {
    id: string
    name: string
    type: "owner" | "admin" | "member"
    permissions: string[]
  }
  joinedAt: Date
  lastActive: Date
  status: "online" | "offline" | "away"
}

interface MembersPanelProps {
  projectId: string
}

export function MembersPanel({ projectId }: MembersPanelProps) {
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@company.com",
      role: {
        id: "owner",
        name: "Project Manager", 
        type: "owner",
        permissions: ["all"]
      },
      joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      lastActive: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: "online"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@company.com",
      role: {
        id: "developer",
        name: "Lead Developer",
        type: "admin", 
        permissions: ["manage_tasks", "manage_files", "manage_members"]
      },
      joinedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: "away"
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike@company.com",
      role: {
        id: "designer",
        name: "UI/UX Designer",
        type: "member",
        permissions: ["view_project", "manage_tasks", "manage_files"]
      },
      joinedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      status: "offline"
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@company.com",
      role: {
        id: "marketing",
        name: "Marketing Specialist",
        type: "member",
        permissions: ["view_project", "manage_files"]
      },
      joinedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      status: "online"
    }
  ])

  const [searchQuery, setSearchQuery] = useState("")

  // Handler functions for member actions
  const handleInviteMember = () => {
    toast.success("Invite member dialog will open")
    // TODO: Open invite member dialog
  }

  const handleManageRoles = () => {
    toast.success("Role management dialog will open")
    // TODO: Open role management dialog
  }

  const handleChangeRole = (memberId: string, memberName: string) => {
    toast.success(`Change role for ${memberName}`)
    // TODO: Open change role dialog
  }

  const handleSendMessage = (memberId: string, memberName: string) => {
    toast.success(`Opening message dialog for ${memberName}`)
    // TODO: Open messaging interface
  }

  const handleViewProfile = (memberId: string, memberName: string) => {
    toast.success(`Viewing profile for ${memberName}`)
    // TODO: Navigate to user profile
  }

  const handleRemoveMember = (memberId: string, memberName: string) => {
    toast.error(`Remove ${memberName} from project?`)
    // TODO: Show confirmation dialog and remove member
  }

  const getRoleIcon = (roleType: Member["role"]["type"]) => {
    switch (roleType) {
      case "owner": return <Crown className="h-4 w-4 text-yellow-600" />
      case "admin": return <Shield className="h-4 w-4 text-blue-600" />
      case "member": return <User className="h-4 w-4 text-gray-600" />
    }
  }

  const getRoleBadgeColor = (roleType: Member["role"]["type"]) => {
    switch (roleType) {
      case "owner": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "admin": return "bg-blue-100 text-blue-800 border-blue-200"
      case "member": return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: Member["status"]) => {
    switch (status) {
      case "online": return "bg-green-500"
      case "away": return "bg-yellow-500"
      case "offline": return "bg-gray-400"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Project Members</h3>
          <p className="text-sm text-muted-foreground">
            Manage team members and their roles
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline"
            onClick={handleManageRoles}
          >
            <Settings className="mr-2 h-4 w-4" />
            Roles
          </Button>
          <Button onClick={handleInviteMember}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{members.length}</div>
            <div className="text-sm text-muted-foreground">Total Members</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">
              {members.filter(m => m.status === "online").length}
            </div>
            <div className="text-sm text-muted-foreground">Online Now</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">
              {members.filter(m => m.role.type === "admin" || m.role.type === "owner").length}
            </div>
            <div className="text-sm text-muted-foreground">Admins</div>
          </CardContent>
        </Card>
      </div>

      {/* Members List */}
      <div className="space-y-3">
        {filteredMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div 
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium">{member.name}</h4>
                      {getRoleIcon(member.role.type)}
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getRoleBadgeColor(member.role.type)}`}
                      >
                        {member.role.name}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Joined {formatTimeAgo(member.joinedAt)}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mt-1">
                      Last active: {formatTimeAgo(member.lastActive)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground capitalize">
                      {member.status}
                    </div>
                  </div>
                  
                  {member.role.type !== "owner" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleChangeRole(member.id, member.name)}>
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendMessage(member.id, member.name)}>
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewProfile(member.id, member.name)}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleRemoveMember(member.id, member.name)}
                        >
                          Remove from Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredMembers.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h4 className="font-medium mb-2">No members found</h4>
              <p className="text-sm text-muted-foreground text-center">
                Try adjusting your search terms
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Permissions Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Role Permissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center space-x-3">
            <Crown className="h-4 w-4 text-yellow-600" />
            <span className="font-medium">Project Manager:</span>
            <span className="text-muted-foreground">Full project control, can manage all settings</span>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="font-medium">Admin:</span>
            <span className="text-muted-foreground">Manage tasks, files, and members</span>
          </div>
          <div className="flex items-center space-x-3">
            <User className="h-4 w-4 text-gray-600" />
            <span className="font-medium">Member:</span>
            <span className="text-muted-foreground">View project and contribute to assigned tasks</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
