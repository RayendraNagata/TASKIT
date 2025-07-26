import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Kanban, Link as LinkIcon, CheckCircle, Zap, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl py-16 sm:py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Project Collaboration
              <span className="block text-primary">with Your Team</span>
            </h1>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground">
              Manage tasks, discussions, and files in one place. 
              An easy-to-use collaboration platform for small to medium teams.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/register">
                  Create Your First Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Core Features for Team Collaboration
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
              Three essential features that make team collaboration easier and more organized.
            </p>
          </div>

          <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <div className="rounded-lg border bg-card p-6 text-center transition-colors hover:bg-accent/50">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Project & Team Creation</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Create projects easily and invite team members. Manage roles with a flexible role system.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 text-center transition-colors hover:bg-accent/50">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Kanban className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Kanban Task Board</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Manage tasks with an easy-to-use Kanban board. Drag & drop for task status transitions.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 text-center transition-colors hover:bg-accent/50 md:col-span-2 lg:col-span-1">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <LinkIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Reference Storage</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Store important links and references in one place. Easy access for the entire team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to transform your workflow?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join teams worldwide who trust TASKIT for their project collaboration.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/register">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-xs font-bold">TK</span>
              </div>
              <span className="font-semibold">TASKIT</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 TASKIT. Professional project collaboration platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
