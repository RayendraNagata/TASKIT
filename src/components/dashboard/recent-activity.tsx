import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ActivityItem {
  id: string
  user: {
    name: string
    avatar?: string
  }
  action: string
  target: string
  timestamp: string
  type: 'created' | 'updated' | 'completed' | 'commented'
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    user: { name: 'Alice Johnson' },
    action: 'completed',
    target: 'Research Phase',
    timestamp: '2 hours ago',
    type: 'completed'
  },
  {
    id: '2',
    user: { name: 'Bob Smith' },
    action: 'created',
    target: 'New Project: Mobile App',
    timestamp: '4 hours ago',
    type: 'created'
  },
  {
    id: '3',
    user: { name: 'Carol Davis' },
    action: 'commented on',
    target: 'Design Review',
    timestamp: '6 hours ago',
    type: 'commented'
  },
  {
    id: '4',
    user: { name: 'David Wilson' },
    action: 'updated',
    target: 'Project Timeline',
    timestamp: '1 day ago',
    type: 'updated'
  }
]

const typeColors = {
  created: 'bg-green-100 text-green-800',
  updated: 'bg-blue-100 text-blue-800',
  completed: 'bg-purple-100 text-purple-800',
  commented: 'bg-yellow-100 text-yellow-800'
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback>
                  {activity.user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{activity.user.name}</span>
                  <Badge variant="secondary" className={typeColors[activity.type]}>
                    {activity.action}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.target}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {activity.timestamp}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
