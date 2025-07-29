import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Target, Zap, Shield, Heart, Globe } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      description: "10+ years in project management and team collaboration tools.",
      avatar: "/placeholder-avatar.jpg"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      description: "Former senior engineer at major tech companies, passionate about user experience.",
      avatar: "/placeholder-avatar.jpg"
    },
    {
      name: "Mike Rodriguez",
      role: "Head of Design",
      description: "Award-winning designer focused on creating intuitive and beautiful interfaces.",
      avatar: "/placeholder-avatar.jpg"
    },
    {
      name: "Emma Wilson",
      role: "Head of Customer Success",
      description: "Dedicated to ensuring every user has an amazing experience with TASKIT.",
      avatar: "/placeholder-avatar.jpg"
    }
  ]

  const values = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaboration First",
      description: "We believe great things happen when teams work together seamlessly."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Goal-Oriented",
      description: "Every feature we build is designed to help teams achieve their objectives."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Speed & Efficiency",
      description: "We're committed to keeping teams productive and moving fast."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security & Trust",
      description: "Your data and privacy are our top priorities."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "User-Centric",
      description: "We listen to our users and build features they actually need."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Accessibility",
      description: "Making collaboration tools accessible to teams everywhere."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About TASKIT</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to make project collaboration simple, efficient, and enjoyable for teams of all sizes.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none text-center">
              <p className="text-lg mb-6">
                TASKIT was born from the frustration of juggling multiple tools for project management, communication, and file sharing. We experienced firsthand how fragmented workflows can slow down even the most talented teams.
              </p>
              <p className="text-lg mb-6">
                Founded in 2024, we set out to create a unified platform that brings together everything teams need to collaborate effectively. Our goal is simple: eliminate the chaos and help teams focus on what they do best.
              </p>
              <p className="text-lg">
                Today, TASKIT serves teams across the globe, from small startups to growing businesses, helping them stay organized, communicate clearly, and deliver results faster.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {value.icon}
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="outline">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">TASKIT by the Numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Teams</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-sm text-muted-foreground">Projects Created</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">500K+</div>
                  <div className="text-sm text-muted-foreground">Tasks Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg mb-6">
                To empower teams worldwide with intuitive collaboration tools that eliminate friction and amplify productivity.
              </p>
              <p className="text-muted-foreground">
                We believe that when teams can collaborate seamlessly, they can achieve extraordinary things. That's why we're committed to building tools that are not just powerful, but also enjoyable to use.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Want to Learn More?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                We'd love to hear from you. Whether you have questions, feedback, or just want to say hello, don't hesitate to reach out.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/register">Start Free Trial</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 TASKIT. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="/terms" className="text-sm text-primary hover:underline">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-primary hover:underline">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-sm text-primary hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
