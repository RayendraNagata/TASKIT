// Mock authentication functions for development
// This will be replaced with Convex authentication later

export interface AuthUser {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  createdAt: Date
}

// Mock users database
const mockUsers: AuthUser[] = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@taskit.com",
    role: "admin",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "user-1", 
    name: "John Doe",
    email: "john@company.com",
    role: "user",
    createdAt: new Date("2024-01-15")
  },
  {
    id: "user-2",
    name: "Jane Smith", 
    email: "jane@startup.io",
    role: "user",
    createdAt: new Date("2024-01-20")
  }
]

// Mock authentication functions
export async function signIn(email: string, password: string): Promise<AuthUser | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Find user by email
  const user = mockUsers.find(u => u.email === email)
  
  // For demo purposes, accept any password for existing users
  if (user && password.length >= 8) {
    return user
  }
  
  return null
}

export async function signUp(name: string, email: string): Promise<AuthUser | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email === email)
  if (existingUser) {
    throw new Error("User already exists")
  }
  
  // Create new user
  const newUser: AuthUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    role: "user",
    createdAt: new Date()
  }
  
  mockUsers.push(newUser)
  return newUser
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  // For demo purposes, return a user from localStorage
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("current-user")
    if (userData) {
      return JSON.parse(userData)
    }
  }
  return null
}

export async function signOut(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("current-user")
  }
}

// Demo accounts for testing
export const DEMO_ACCOUNTS = {
  admin: {
    email: "admin@taskit.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const
  },
  user: {
    email: "john@company.com", 
    password: "user123",
    name: "John Doe",
    role: "user" as const
  }
} as const
