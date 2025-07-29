"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Search, 
  BookOpen, 
  Users, 
  Settings, 
  FileText, 
  MessageSquare,
  HelpCircle,
  Video,
  Download,
  ChevronRight
} from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Getting Started",
      description: "Learn the basics of TASKIT",
      articles: 12,
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Management",
      description: "Invite and manage team members",
      articles: 8,
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Project Settings",
      description: "Configure your projects",
      articles: 15,
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Files & Resources",
      description: "Upload and manage project files",
      articles: 6,
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Communication",
      description: "Discussions and notifications",
      articles: 10,
      color: "bg-pink-100 text-pink-600"
    },
    {
      icon: <HelpCircle className="h-6 w-6" />,
      title: "Troubleshooting",
      description: "Common issues and solutions",
      articles: 20,
      color: "bg-red-100 text-red-600"
    }
  ]

  const popularArticles = [
    {
      title: "How to create your first project",
      category: "Getting Started",
      readTime: "3 min read",
      views: "5.2k views"
    },
    {
      title: "Inviting team members to your project",
      category: "Team Management",
      readTime: "2 min read",
      views: "3.8k views"
    },
    {
      title: "Setting up project permissions",
      category: "Project Settings",
      readTime: "4 min read",
      views: "2.9k views"
    },
    {
      title: "Using the kanban board effectively",
      category: "Getting Started",
      readTime: "5 min read",
      views: "4.1k views"
    },
    {
      title: "Managing project files and resources",
      category: "Files & Resources",
      readTime: "3 min read",
      views: "2.3k views"
    }
  ]

  const quickLinks = [
    {
      icon: <Video className="h-5 w-5" />,
      title: "Video Tutorials",
      description: "Watch step-by-step guides"
    },
    {
      icon: <Download className="h-5 w-5" />,
      title: "Download Resources",
      description: "Templates and guides"
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Community Forum",
      description: "Connect with other users"
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      title: "Contact Support",
      description: "Get help from our team"
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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to your questions and learn how to get the most out of TASKIT
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {link.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{link.title}</h3>
                      <p className="text-xs text-muted-foreground">{link.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{category.articles} articles</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{article.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <span>{article.readTime}</span>
                        <span>{article.views}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="mb-12">
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Still need help?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is here to help you get the most out of TASKIT.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="mailto:support@taskit.com">Email Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Preview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I upgrade my plan?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You can upgrade your plan anytime from your account settings. Go to Settings → Billing → Change Plan. All upgrades take effect immediately.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I invite unlimited team members?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The number of team members depends on your plan. Free plans include up to 5 members, while paid plans offer unlimited team members.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is my data backed up automatically?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, all your data is automatically backed up multiple times daily. We also provide data export options if you ever need to migrate.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t">
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
