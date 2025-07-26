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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 sm:h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-6 min-w-0">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-xs sm:text-sm font-bold">TK</span>
            </div>
            <span className="hidden sm:inline text-lg sm:text-xl font-semibold">TASKIT</span>
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
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
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
                Projects
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

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
          <ThemeToggle />
          
          {!isAuthPage && user && <NotificationCenter />}
          
          {isLoading ? (
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden lg:block text-right min-w-0">
                <p className="text-sm font-medium flex items-center gap-1 truncate">
                  <span className="truncate">{user.name}</span>
                  {user.role === "admin" && (
                    <Shield className="h-3 w-3 text-primary flex-shrink-0" />
                  )}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs sm:text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" asChild className="h-8 w-8 sm:h-9 sm:w-9">
                  <Link href="/settings">
                    <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="h-8 w-8 sm:h-9 sm:w-9">
                  <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          ) : (
            !isAuthPage && (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild size="sm" className="hidden sm:inline-flex">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">
                    <span className="hidden sm:inline">Get Started</span>
                    <span className="sm:hidden">Sign Up</span>
                  </Link>
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  )
}
