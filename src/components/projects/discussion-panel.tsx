"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Send, 
  Paperclip, 
  Smile,
  Reply,
  Heart,
  MoreHorizontal,
  AtSign
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  id: string
  text: string
  author: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  createdAt: Date
  replies?: Comment[]
  likes?: number
  attachments?: {
    id: string
    name: string
    type: string
    url: string
  }[]
}

interface DiscussionPanelProps {
  projectId: string
}

export function DiscussionPanel({ projectId }: DiscussionPanelProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      text: "Hey team! I've just uploaded the new wireframes for the homepage. Please take a look and let me know your thoughts. @jane @mike",
      author: {
        id: "1",
        name: "John Doe",
        email: "john@company.com"
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 3,
      replies: [
        {
          id: "2",
          text: "Looks great! I especially like the new navigation layout. Very clean and intuitive.",
          author: {
            id: "2", 
            name: "Jane Smith",
            email: "jane@company.com"
          },
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
          likes: 1
        }
      ]
    },
    {
      id: "3",
      text: "Quick update: The database migration is complete. All user data has been successfully transferred to the new schema.",
      author: {
        id: "3",
        name: "Mike Chen", 
        email: "mike@company.com"
      },
      createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      likes: 5,
      attachments: [
        {
          id: "1",
          name: "migration-report.pdf",
          type: "application/pdf",
          url: "#"
        }
      ]
    }
  ])

  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      author: {
        id: "current-user",
        name: "Current User",
        email: "user@company.com"
      },
      createdAt: new Date(),
      likes: 0
    }

    setComments(prev => [comment, ...prev])
    setNewComment("")
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const renderMentions = (text: string) => {
    return text.split(/(@\w+)/).map((part, index) => {
      if (part.startsWith("@")) {
        return (
          <span key={index} className="text-blue-600 bg-blue-50 px-1 rounded">
            {part}
          </span>
        )
      }
      return part
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Project Discussion</h3>
        <p className="text-sm text-muted-foreground">
          Collaborate with your team through threaded discussions
        </p>
      </div>

      {/* New Comment Input */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <Textarea
              placeholder="Share an update, ask a question, or start a discussion..."
              value={newComment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <AtSign className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              
              <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
                <Send className="mr-2 h-4 w-4" />
                Post Comment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Comment Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback>
                        {comment.author.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(comment.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Comment Content */}
                <div className="ml-11">
                  <p className="text-sm whitespace-pre-wrap">
                    {renderMentions(comment.text)}
                  </p>

                  {/* Attachments */}
                  {comment.attachments && comment.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {comment.attachments.map((attachment) => (
                        <div 
                          key={attachment.id}
                          className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50"
                        >
                          <Paperclip className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comment Actions */}
                  <div className="flex items-center space-x-4 mt-3">
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <Heart className="mr-1 h-3 w-3" />
                      <span className="text-xs">{comment.likes}</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-2"
                      onClick={() => setReplyingTo(comment.id)}
                    >
                      <Reply className="mr-1 h-3 w-3" />
                      <span className="text-xs">Reply</span>
                    </Button>
                  </div>

                  {/* Reply Input */}
                  {replyingTo === comment.id && (
                    <div className="mt-3 space-y-2">
                      <Input
                        placeholder="Write a reply..."
                        className="text-sm"
                      />
                      <div className="flex items-center space-x-2">
                        <Button size="sm">Reply</Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setReplyingTo(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-3 border-l-2 border-muted pl-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                              <AvatarFallback className="text-xs">
                                {reply.author.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-xs">{reply.author.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(reply.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground ml-8">
                            {renderMentions(reply.text)}
                          </p>
                          <div className="flex items-center space-x-3 ml-8">
                            <Button variant="ghost" size="sm" className="h-5 px-1">
                              <Heart className="mr-1 h-2 w-2" />
                              <span className="text-xs">{reply.likes}</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More Comments</Button>
      </div>
    </div>
  )
}
