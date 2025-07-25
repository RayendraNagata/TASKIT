import { z } from "zod"
import { TASK_STATUSES } from "@/lib/constants"

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export const newPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Project schemas
export const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100, "Project name must be less than 100 characters"),
  description: z.string().min(1, "Project description is required").max(500, "Description must be less than 500 characters"),
})

export const updateProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100, "Project name must be less than 100 characters"),
  description: z.string().min(1, "Project description is required").max(500, "Description must be less than 500 characters"),
})

// Task schemas
export const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required").max(255, "Title must be less than 255 characters"),
  description: z.string().optional(),
  assigneeId: z.string().optional(),
  dueDate: z.date().optional(),
})

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Task title is required").max(255, "Title must be less than 255 characters"),
  description: z.string().optional(),
  status: z.enum([TASK_STATUSES.TODO, TASK_STATUSES.IN_PROGRESS, TASK_STATUSES.DONE]),
  assigneeId: z.string().optional(),
  dueDate: z.date().optional(),
})

// Comment schemas
export const createCommentSchema = z.object({
  text: z.string().min(1, "Comment cannot be empty").max(1000, "Comment must be less than 1000 characters"),
})

// Link schemas
export const createLinkSchema = z.object({
  title: z.string().min(1, "Link title is required").max(255, "Title must be less than 255 characters"),
  url: z.string().url("Please enter a valid URL"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
})

// Member schemas
export const inviteMemberSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  roleId: z.string().min(1, "Please select a role"),
})

// Role schemas
export const createRoleSchema = z.object({
  name: z.string().min(1, "Role name is required").max(100, "Role name must be less than 100 characters"),
  permissions: z.array(z.string()).min(1, "Please select at least one permission"),
})

// Profile schemas
export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Type exports
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type CreateCommentInput = z.infer<typeof createCommentSchema>
export type CreateLinkInput = z.infer<typeof createLinkSchema>
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>
