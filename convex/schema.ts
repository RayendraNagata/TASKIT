import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
    role: v.union(v.literal("admin"), v.literal("user")),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  projects: defineTable({
    name: v.string(),
    description: v.string(),
    ownerId: v.id("users"),
    archived: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_owner", ["ownerId"]),

  projectRoles: defineTable({
    projectId: v.id("projects"),
    name: v.string(),
    permissions: v.array(v.string()),
  }).index("by_project", ["projectId"]),

  projectMembers: defineTable({
    projectId: v.id("projects"),
    userId: v.id("users"),
    roleId: v.id("projectRoles"),
    joinedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_user", ["userId"])
    .index("by_project_user", ["projectId", "userId"]),

  tasks: defineTable({
    projectId: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("todo"),
      v.literal("in_progress"),
      v.literal("done")
    ),
    assigneeId: v.optional(v.id("users")),
    dueDate: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_assignee", ["assigneeId"])
    .index("by_status", ["status"]),

  comments: defineTable({
    projectId: v.id("projects"),
    userId: v.id("users"),
    text: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_user", ["userId"]),

  files: defineTable({
    projectId: v.id("projects"),
    userId: v.id("users"),
    name: v.string(),
    size: v.number(),
    storageId: v.id("_storage"),
    uploadedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_user", ["userId"]),

  links: defineTable({
    projectId: v.id("projects"),
    userId: v.id("users"),
    title: v.string(),
    url: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_user", ["userId"]),
})
