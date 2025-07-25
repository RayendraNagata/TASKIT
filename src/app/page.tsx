import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { ArrowRight, Users, Kanban, FileText } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="container py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Professional Project
              <span className="block text-primary">Collaboration</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Manage tasks, discussions, and resources in one place. 
              Built for teams that demand professionalism and efficiency.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  Start Your First Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need for team collaboration
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Professional tools designed for teams that build great things together.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 text-center transition-colors hover:bg-accent/50">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Team Management</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Create projects, invite team members, and manage roles with custom permissions.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 text-center transition-colors hover:bg-accent/50">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Kanban className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Kanban Boards</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Organize tasks with drag-and-drop Kanban boards. Track progress efficiently.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 text-center transition-colors hover:bg-accent/50">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Resource Hub</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Store files, links, and important references. Keep everything organized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to transform your workflow?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join teams worldwide who trust Study Squad for their project collaboration.
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
      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
                <span className="text-xs font-bold">SS</span>
              </div>
              <span className="font-semibold">Study Squad</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Study Squad. Professional project collaboration platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
