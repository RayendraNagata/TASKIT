export const APP_CONFIG = {
  name: "TASKIT",
  description: "Professional project collaboration platform",
  version: "1.0.0",
  author: "TASKIT Team",
} as const

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROJECTS: "/projects",
  SETTINGS: "/settings",
  RESET_PASSWORD: "/reset-password",
} as const

export const PROJECT_PERMISSIONS = {
  // Project management
  MANAGE_PROJECT: "manage_project",
  DELETE_PROJECT: "delete_project",
  ARCHIVE_PROJECT: "archive_project",
  
  // Member management
  INVITE_MEMBERS: "invite_members",
  REMOVE_MEMBERS: "remove_members",
  MANAGE_ROLES: "manage_roles",
  
  // Task management
  CREATE_TASKS: "create_tasks",
  EDIT_TASKS: "edit_tasks",
  DELETE_TASKS: "delete_tasks",
  ASSIGN_TASKS: "assign_tasks",
  
  // Resources
  UPLOAD_FILES: "upload_files",
  DELETE_FILES: "delete_files",
  CREATE_LINKS: "create_links",
  DELETE_LINKS: "delete_links",
  
  // Discussions
  POST_COMMENTS: "post_comments",
  DELETE_COMMENTS: "delete_comments",
  MODERATE_DISCUSSIONS: "moderate_discussions",
} as const

export const DEFAULT_ROLES = {
  PROJECT_MANAGER: {
    name: "Project Manager",
    permissions: Object.values(PROJECT_PERMISSIONS),
  },
  MEMBER: {
    name: "Member",
    permissions: [
      PROJECT_PERMISSIONS.CREATE_TASKS,
      PROJECT_PERMISSIONS.EDIT_TASKS,
      PROJECT_PERMISSIONS.UPLOAD_FILES,
      PROJECT_PERMISSIONS.CREATE_LINKS,
      PROJECT_PERMISSIONS.POST_COMMENTS,
    ],
  },
  VIEWER: {
    name: "Viewer",
    permissions: [
      PROJECT_PERMISSIONS.POST_COMMENTS,
    ],
  },
} as const

export const TASK_STATUSES = {
  TODO: "todo",
  IN_PROGRESS: "in_progress", 
  DONE: "done",
} as const

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const
