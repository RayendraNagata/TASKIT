"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Upload, 
  Link as LinkIcon, 
  Download, 
  Trash2, 
  ExternalLink,
  FileText,
  Image,
  Archive,
  Plus
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ProjectFile {
  id: string
  name: string
  size: number
  type: string
  uploadedAt: string
  uploadedBy: {
    name: string
    avatar?: string
  }
}

interface ProjectLink {
  id: string
  title: string
  url: string
  description?: string
  createdAt: string
  createdBy: {
    name: string
    avatar?: string
  }
}

export default function ProjectResourcesPage({ params }: { params: { id: string } }) {
  const [files, setFiles] = useState<ProjectFile[]>([
    {
      id: "1",
      name: "Design_Mockup_v2.figma",
      size: 2456789,
      type: "application/figma",
      uploadedAt: "2025-01-20",
      uploadedBy: { name: "John Doe" }
    },
    {
      id: "2", 
      name: "Project_Requirements.pdf",
      size: 1234567,
      type: "application/pdf",
      uploadedAt: "2025-01-18",
      uploadedBy: { name: "Jane Smith" }
    }
  ])

  const [links, setLinks] = useState<ProjectLink[]>([
    {
      id: "1",
      title: "API Documentation",
      url: "https://docs.example.com/api",
      description: "Complete API documentation for backend integration",
      createdAt: "2025-01-19",
      createdBy: { name: "Mike Chen" }
    },
    {
      id: "2",
      title: "Design System",
      url: "https://figma.com/design-system",
      description: "UI component library and design guidelines",
      createdAt: "2025-01-17",
      createdBy: { name: "Sarah Wilson" }
    }
  ])

  const [isAddingLink, setIsAddingLink] = useState(false)
  const [linkForm, setLinkForm] = useState({
    title: "",
    url: "",
    description: ""
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes("image")) return <Image className="h-4 w-4" />
    if (type.includes("pdf")) return <FileText className="h-4 w-4" />
    if (type.includes("zip") || type.includes("rar")) return <Archive className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  const handleAddLink = () => {
    if (linkForm.title && linkForm.url) {
      const newLink: ProjectLink = {
        id: Date.now().toString(),
        title: linkForm.title,
        url: linkForm.url,
        description: linkForm.description,
        createdAt: new Date().toISOString().split('T')[0],
        createdBy: { name: "Current User" }
      }
      setLinks([newLink, ...links])
      setLinkForm({ title: "", url: "", description: "" })
      setIsAddingLink(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newFile: ProjectFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString().split('T')[0],
        uploadedBy: { name: "Current User" }
      }
      setFiles([newFile, ...files])
    }
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Sumber Daya Proyek</h1>
        <p className="text-muted-foreground">Manage important files and links for this project</p>
      </div>

      <Tabs defaultValue="files" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="files">File</TabsTrigger>
          <TabsTrigger value="links">Link</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">File Proyek</h2>
            <div>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </label>
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {files.map((file) => (
              <Card key={file.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded">
                        {getFileIcon(file.type)}
                      </div>
                      <div>
                        <h3 className="font-medium">{file.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(file.size)} • Diupload oleh {file.uploadedBy.name} • {file.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {files.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">No files yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload the first file for this project
                </p>
                <Button asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Upload File
                  </label>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Link Penting</h2>
            <Dialog open={isAddingLink} onOpenChange={setIsAddingLink}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Link
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Link</DialogTitle>
                  <DialogDescription>
                    Add important links for this project
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={linkForm.title}
                      onChange={(e) => setLinkForm({ ...linkForm, title: e.target.value })}
                      placeholder="Enter link title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">URL</label>
                    <Input
                      value={linkForm.url}
                      onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Deskripsi (Opsional)</label>
                    <Textarea
                      value={linkForm.description}
                      onChange={(e) => setLinkForm({ ...linkForm, description: e.target.value })}
                      placeholder="Brief description about this link"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingLink(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleAddLink}>
                    Tambah Link
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {links.map((link) => (
              <Card key={link.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <LinkIcon className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">{link.title}</h3>
                      </div>
                      {link.description && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {link.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Added by {link.createdBy.name} • {link.createdAt}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {links.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <LinkIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">No links yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add important links for this project
                </p>
                <Button onClick={() => setIsAddingLink(true)}>
                  Add First Link
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
