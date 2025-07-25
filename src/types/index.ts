export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  name: string
  description: string
  ownerId: string
  archived: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProjectRole {
  id: string
  projectId: string
  name: string
  permissions: string[]
}

export interface ProjectMember {
  id: string
  projectId: string
  userId: string
  roleId: string
  joinedAt: Date
}

export interface Task {
  id: string
  projectId: string
  title: string
  description?: string
  status: "todo" | "in_progress" | "done"
  assigneeId?: string
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  projectId: string
  userId: string
  text: string
  createdAt: Date
  updatedAt: Date
}

export interface ProjectFile {
  id: string
  projectId: string
  userId: string
  name: string
  size: number
  uploadedAt: Date
}

export interface ProjectLink {
  id: string
  projectId: string
  userId: string
  title: string
  url: string
  description?: string
  createdAt: Date
}
