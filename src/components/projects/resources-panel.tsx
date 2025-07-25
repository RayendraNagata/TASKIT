"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Upload, 
  File, 
  Link2, 
  MoreHorizontal, 
  Download,
  Eye,
  Trash2,
  Search,
  Filter,
  Image as ImageIcon,
  FileText,
  Archive,
  Video,
  Music,
  Check,
  AlertCircle,
  ExternalLink,
  Folder
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface FileItem {
  id: string
  name: string
  type: string
  size: number
  uploadedBy: {
    id: string
    name: string
  }
  uploadedAt: Date
  status: "uploading" | "completed" | "failed"
  progress?: number
}

interface LinkItem {
  id: string
  name: string
  url: string
  description?: string
  addedBy: {
    id: string
    name: string
  }
  addedAt: Date
}

interface ResourcesPanelProps {
  projectId: string
}

export function ResourcesPanel({ projectId }: ResourcesPanelProps) {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "project-wireframes.figma",
      type: "application/figma", 
      size: 2048000,
      uploadedBy: { id: "1", name: "John Doe" },
      uploadedAt: new Date("2024-01-15"),
      status: "completed"
    },
    {
      id: "2",
      name: "design-system.pdf",
      type: "application/pdf",
      size: 5242880,
      uploadedBy: { id: "2", name: "Jane Smith" },
      uploadedAt: new Date("2024-01-14"),
      status: "completed"
    }
  ])

  const [links, setLinks] = useState<LinkItem[]>([
    {
      id: "1",
      name: "Figma Design File",
      url: "https://figma.com/project-design",
      description: "Main design file with all components",
      addedBy: { id: "1", name: "John Doe" },
      addedAt: new Date("2024-01-15")
    }
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [newLink, setNewLink] = useState({ name: "", url: "", description: "" })
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (type.includes("pdf")) return <FileText className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const getFileTypeColor = (type: string): string => {
    if (type.startsWith("image/")) return "bg-green-100 text-green-800"
    if (type.includes("pdf")) return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return

    Array.from(uploadedFiles).forEach((file) => {
      const newFile: FileItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedBy: { id: "current-user", name: "Current User" },
        uploadedAt: new Date(),
        status: "uploading",
        progress: 0
      }

      setFiles(prev => [...prev, newFile])
      toast.success(`Started uploading ${file.name}`)

      // Simulate upload progress
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === newFile.id && f.status === "uploading") {
            const newProgress = (f.progress || 0) + Math.random() * 30
            if (newProgress >= 100) {
              clearInterval(interval)
              toast.success(`Successfully uploaded ${file.name}`)
              return { ...f, progress: 100, status: "completed" }
            }
            return { ...f, progress: newProgress }
          }
          return f
        }))
      }, 500)
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleFileDelete = (fileId: string, fileName: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
    toast.success(`Deleted ${fileName}`)
  }

  const handleLinkDelete = (linkId: string, linkName: string) => {
    setLinks(prev => prev.filter(l => l.id !== linkId))
    toast.success(`Removed link: ${linkName}`)
  }

  const handleAddLink = () => {
    if (!newLink.name || !newLink.url) return

    const link: LinkItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: newLink.name,
      url: newLink.url,
      description: newLink.description,
      addedBy: { id: "current-user", name: "Current User" },
      addedAt: new Date()
    }

    setLinks(prev => [...prev, link])
    setNewLink({ name: "", url: "", description: "" })
    setShowLinkDialog(false)
    toast.success(`Added link: ${newLink.name}`)
  }

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredLinks = links.filter(link =>
    link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Resources</h3>
          <p className="text-sm text-muted-foreground">
            Files and links for this project
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => fileInputRef.current?.click()}
            size="sm"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload File
          </Button>
          <Button
            onClick={() => setShowLinkDialog(true)}
            variant="outline"
            size="sm"
          >
            <Link2 className="mr-2 h-4 w-4" />
            Add Link
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleFileUpload(e.target.files)}
      />

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="files" className="w-full">
        <TabsList>
          <TabsTrigger value="files">
            Files ({filteredFiles.length})
          </TabsTrigger>
          <TabsTrigger value="links">
            Links ({filteredLinks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-4">
          <Card
            className={`border-2 border-dashed transition-colors cursor-pointer hover:border-primary/50 ${
              isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <CardContent className="p-8 text-center">
              <Upload className={`mx-auto h-12 w-12 mb-4 ${isDragOver ? "text-primary" : "text-muted-foreground"}`} />
              <h4 className="text-lg font-medium mb-2">
                {isDragOver ? "Drop files here" : "Drag & drop files here"}
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Or click to select files from your computer
              </p>
              <Button variant="outline">
                <Folder className="mr-2 h-4 w-4" />
                Choose Files
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {filteredFiles.map((file) => (
              <Card key={file.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-md ${getFileTypeColor(file.type)}`}>
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{file.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{formatFileSize(file.size)}</span>
                          <span>•</span>
                          <span>by {file.uploadedBy.name}</span>
                          <span>•</span>
                          <span>{file.uploadedAt.toLocaleDateString()}</span>
                        </div>
                        {file.status === "uploading" && file.progress !== undefined && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span>Uploading...</span>
                              <span>{Math.round(file.progress)}%</span>
                            </div>
                            <Progress value={file.progress} className="h-1" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {file.status === "completed" && (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <Check className="mr-1 h-3 w-3" />
                          Uploaded
                        </Badge>
                      )}
                      {file.status === "uploading" && (
                        <Badge variant="outline" className="text-blue-600 border-blue-200">
                          <Upload className="mr-1 h-3 w-3" />
                          Uploading
                        </Badge>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleFileDelete(file.id, file.name)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredFiles.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <File className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h4 className="text-lg font-medium mb-2">No files found</h4>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery 
                      ? "Try adjusting your search query" 
                      : "Upload your first file to get started"
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <div className="space-y-3">
            {filteredLinks.map((link) => (
              <Card key={link.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-md bg-blue-100 text-blue-800">
                        <Link2 className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{link.name}</h4>
                        {link.description && (
                          <p className="text-sm text-muted-foreground truncate">
                            {link.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>by {link.addedBy.name}</span>
                          <span>•</span>
                          <span>{link.addedAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          window.open(link.url, "_blank")
                          toast.success(`Opened ${link.name}`)
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              window.open(link.url, "_blank")
                              toast.success(`Opened ${link.name}`)
                            }}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open Link
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleLinkDelete(link.id, link.name)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredLinks.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Link2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h4 className="text-lg font-medium mb-2">No links found</h4>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery 
                      ? "Try adjusting your search query" 
                      : "Add your first link to get started"
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
            <DialogDescription>
              Add a useful link to this project&apos;s resources.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label htmlFor="link-name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="link-name"
                placeholder="e.g., Design Documentation"
                value={newLink.name}
                onChange={(e) => setNewLink(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="link-url" className="text-sm font-medium">
                URL
              </label>
              <Input
                id="link-url"
                placeholder="https://example.com"
                value={newLink.url}
                onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="link-description" className="text-sm font-medium">
                Description (optional)
              </label>
              <Input
                id="link-description"
                placeholder="Brief description of the link"
                value={newLink.description}
                onChange={(e) => setNewLink(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLink}>
              Add Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
