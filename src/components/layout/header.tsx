"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { useAuth } from "@/components/providers/auth-provider"
import { cn } from "@/lib/utils"
import { LogOut, Settings, Shield } from "lucide-react"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/register")
  const isLandingPage = pathname === "/"
  const isDashboardArea = pathname?.startsWith("/dashboard") || pathname?.startsWith("/projects") || pathname?.startsWith("/settings") || pathname?.startsWith("/admin")

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">SS</span>
            </div>
            <span className="text-xl font-semibold">Study Squad</span>
          </Link>

          {/* Navigation for logged-in users in landing page */}
          {user && isLandingPage && (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Go to Dashboard
              </Link>
            </nav>
          )}

          {/* Navigation for dashboard area */}
          {user && isDashboardArea && (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
                )}
              >
                Dashboard
              </Link>
              <Link
                href="/projects"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname?.startsWith("/projects") ? "text-foreground" : "text-foreground/60"
                )}
              >
                Proyek
              </Link>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80 flex items-center gap-1",
                    pathname?.startsWith("/admin") ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  <Shield className="h-3 w-3" />
                  Admin
                </Link>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {!isAuthPage && user && <NotificationCenter />}
          
          {isLoading ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium flex items-center gap-1">
                  {user.name}
                  {user.role === "admin" && (
                    <Shield className="h-3 w-3 text-primary" />
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            !isAuthPage && (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  )
}
