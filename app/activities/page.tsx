"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { activities, users } from "@/lib/data"
import { Activity } from "lucide-react"

export default function ActivitiesPage() {
  return (
    <DashboardLayout>
      <PageHeader title="Activity Log" description="Track all user activities and system events" />

      <Card className="p-6 bg-card border-border">
        <div className="space-y-6">
          {activities.map((activity) => {
            const user = users.find((u) => u.id === activity.userId)

            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-violet-500/10 flex-shrink-0">
                  <Activity className="w-5 h-5 text-violet-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium text-violet-400">{user?.name}</span>
                        <span className="text-muted-foreground"> {activity.action} </span>
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      {activity.details && <p className="text-sm text-muted-foreground mt-1">{activity.details}</p>}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </DashboardLayout>
  )
}
