"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { 
  ArrowLeft,
  Settings,
  Save,
  Trash2,
  Users,
  Shield,
  Bell,
  Archive,
  AlertTriangle,
  Calendar,
  Lock,
  Eye,
  EyeOff
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

// Mock project data
const projectData = {
  "1": {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern design and improved UX",
    status: "active",
    visibility: "private",
    createdAt: "2024-01-15",
    owner: { id: "1", name: "Alice Johnson" },
    memberCount: 4,
    taskCount: 12,
    settings: {
      allowInvitations: true,
      allowFileUploads: true,
      allowExternalLinks: true,
      notifyOnNewTasks: true,
      notifyOnComments: true,
      notifyOnMemberJoin: true,
      autoArchiveCompleted: false,
      requireApprovalForTasks: false,
      maxFileSize: 10,
      allowedFileTypes: ["image", "document", "spreadsheet"]
    }
  }
}

export default function ProjectSettingsPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const project = projectData[projectId as keyof typeof projectData]

  const [projectInfo, setProjectInfo] = useState({
    name: project?.name || "",
    description: project?.description || "",
    visibility: project?.visibility || "private"
  })

  const [projectSettings, setProjectSettings] = useState(
    project?.settings || {
      allowInvitations: true,
      allowFileUploads: true,
      allowExternalLinks: true,
      notifyOnNewTasks: true,
      notifyOnComments: true,
      notifyOnMemberJoin: true,
      autoArchiveCompleted: false,
      requireApprovalForTasks: false,
      maxFileSize: 10,
      allowedFileTypes: ["image", "document", "spreadsheet"]
    }
  )

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showArchiveDialog, setShowArchiveDialog] = useState(false)

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="mb-2">Project Not Found</CardTitle>
            <CardDescription className="mb-4">
              The project you're looking for doesn't exist or has been deleted.
            </CardDescription>
            <Button asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSaveGeneral = () => {
    console.log("Saving project info:", projectInfo)
    toast.success("Project information updated successfully!")
  }

  const handleSaveSettings = () => {
    console.log("Saving project settings:", projectSettings)
    toast.success("Project settings updated successfully!")
  }

  const handleArchiveProject = () => {
    console.log("Archiving project:", projectId)
    toast.success("Project archived successfully!")
    setShowArchiveDialog(false)
    router.push("/dashboard")
  }

  const handleDeleteProject = () => {
    console.log("Deleting project:", projectId)
    toast.success("Project deleted successfully!")
    setShowDeleteDialog(false)
    router.push("/dashboard")
  }

  const updateSetting = (key: string, value: any) => {
    setProjectSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/projects/${projectId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Project Settings</h1>
            <p className="text-muted-foreground mt-1">{project.name}</p>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
                <CardDescription>
                  Update your project's basic information and visibility settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Name</label>
                  <Input
                    value={projectInfo.name}
                    onChange={(e) => setProjectInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter project name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={projectInfo.description}
                    onChange={(e) => setProjectInfo(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this project is about"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Visibility</label>
                  <Select 
                    value={projectInfo.visibility} 
                    onValueChange={(value) => setProjectInfo(prev => ({ ...prev, visibility: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Private</div>
                            <div className="text-xs text-muted-foreground">Only invited members can access</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="public">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Public</div>
                            <div className="text-xs text-muted-foreground">Anyone can view and request to join</div>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium">Project Status</p>
                    <p className="text-xs text-muted-foreground">
                      Created on {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={project.status === "active" ? "default" : "secondary"}>
                    {project.status}
                  </Badge>
                </div>

                <Button onClick={handleSaveGeneral} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions */}
          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Member Permissions</CardTitle>
                <CardDescription>
                  Control what members can do in this project.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow member invitations</p>
                    <p className="text-sm text-muted-foreground">Members can invite others to join the project</p>
                  </div>
                  <Switch
                    checked={projectSettings.allowInvitations}
                    onCheckedChange={(checked) => updateSetting("allowInvitations", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow file uploads</p>
                    <p className="text-sm text-muted-foreground">Members can upload files to the project</p>
                  </div>
                  <Switch
                    checked={projectSettings.allowFileUploads}
                    onCheckedChange={(checked) => updateSetting("allowFileUploads", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow external links</p>
                    <p className="text-sm text-muted-foreground">Members can add external links and resources</p>
                  </div>
                  <Switch
                    checked={projectSettings.allowExternalLinks}
                    onCheckedChange={(checked) => updateSetting("allowExternalLinks", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Require task approval</p>
                    <p className="text-sm text-muted-foreground">Tasks need approval before being marked as done</p>
                  </div>
                  <Switch
                    checked={projectSettings.requireApprovalForTasks}
                    onCheckedChange={(checked) => updateSetting("requireApprovalForTasks", checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">File Upload Settings</h4>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Maximum file size (MB)</label>
                    <Select 
                      value={projectSettings.maxFileSize.toString()} 
                      onValueChange={(value) => updateSetting("maxFileSize", parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 MB</SelectItem>
                        <SelectItem value="10">10 MB</SelectItem>
                        <SelectItem value="25">25 MB</SelectItem>
                        <SelectItem value="50">50 MB</SelectItem>
                        <SelectItem value="100">100 MB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleSaveSettings} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Permissions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure when project members receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New task notifications</p>
                    <p className="text-sm text-muted-foreground">Notify when new tasks are created or assigned</p>
                  </div>
                  <Switch
                    checked={projectSettings.notifyOnNewTasks}
                    onCheckedChange={(checked) => updateSetting("notifyOnNewTasks", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Comment notifications</p>
                    <p className="text-sm text-muted-foreground">Notify when someone comments on discussions</p>
                  </div>
                  <Switch
                    checked={projectSettings.notifyOnComments}
                    onCheckedChange={(checked) => updateSetting("notifyOnComments", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Member join notifications</p>
                    <p className="text-sm text-muted-foreground">Notify when new members join the project</p>
                  </div>
                  <Switch
                    checked={projectSettings.notifyOnMemberJoin}
                    onCheckedChange={(checked) => updateSetting("notifyOnMemberJoin", checked)}
                  />
                </div>

                <Button onClick={handleSaveSettings} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>
                  Advanced project management and automation settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-archive completed tasks</p>
                    <p className="text-sm text-muted-foreground">Automatically move completed tasks to archive after 30 days</p>
                  </div>
                  <Switch
                    checked={projectSettings.autoArchiveCompleted}
                    onCheckedChange={(checked) => updateSetting("autoArchiveCompleted", checked)}
                  />
                </div>

                <Button onClick={handleSaveSettings} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Advanced Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Actions</CardTitle>
                <CardDescription>
                  Manage your project's lifecycle and data.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Archive Project</p>
                    <p className="text-sm text-muted-foreground">Archive this project to make it read-only</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowArchiveDialog(true)}
                  >
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20">
                  <div>
                    <p className="font-medium text-red-900 dark:text-red-100">Delete Project</p>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Permanently delete this project and all its data
                    </p>
                  </div>
                  <Button 
                    variant="destructive" 
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Archive Confirmation Dialog */}
        <Dialog open={showArchiveDialog} onOpenChange={setShowArchiveDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Archive Project</DialogTitle>
              <DialogDescription>
                Are you sure you want to archive "{project.name}"? 
                Archived projects become read-only and cannot be modified.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowArchiveDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleArchiveProject}>
                <Archive className="mr-2 h-4 w-4" />
                Archive Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Project</DialogTitle>
              <DialogDescription>
                Are you sure you want to permanently delete "{project.name}"? 
                This action cannot be undone and will remove all tasks, discussions, files, and member data.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteProject}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Forever
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
