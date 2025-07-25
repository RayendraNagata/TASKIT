import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/providers/auth-provider"
import { CreateProjectModal } from "@/components/projects/create-project-modal"
import { 
  LayoutDashboard, 
  FolderOpen, 
  Settings, 
  Plus,
  User
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface SidebarProps {
  onProjectCreated?: (project: any) => void
}

export function Sidebar({ onProjectCreated }: SidebarProps) {
  const { user } = useAuth()
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard"
    },
    {
      title: "Proyek Saya",
      href: "/projects",
      icon: FolderOpen,
      active: pathname?.startsWith("/projects")
    },
    {
      title: "Pengaturan Akun",
      href: "/settings",
      icon: Settings,
      active: pathname === "/settings"
    }
  ]

  return (
    <div className="w-64 border-r bg-muted/40 h-screen sticky top-0">
      <div className="p-6">
        {/* User Profile */}
        <div className="flex items-center gap-3 mb-6">
          <Avatar>
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Create Project Button */}
        <div className="mb-6">
          <CreateProjectModal onProjectCreated={onProjectCreated} />
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                item.active 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
