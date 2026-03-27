"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { notifications } from "@/lib/data"
import { Bell, Check, Trash2 } from "lucide-react"

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications)

  const markAsRead = (id: string) => {
    setNotificationList(notificationList.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id: string) => {
    setNotificationList(notificationList.filter((n) => n.id !== id))
  }

  const markAllAsRead = () => {
    setNotificationList(notificationList.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = notificationList.filter((n) => !n.read).length

  return (
    <DashboardLayout>
      <PageHeader
        title="Notifications"
        description={`You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`}
        action={
          unreadCount > 0 && (
            <Button onClick={markAllAsRead} className="bg-violet-500 hover:bg-violet-600">
              <Check className="w-4 h-4 mr-2" />
              Mark All as Read
            </Button>
          )
        }
      />

      {/* Notifications List */}
      <div className="space-y-4">
        {notificationList.length === 0 ? (
          <Card className="p-12 bg-card border-border text-center">
            <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No notifications</h3>
            <p className="text-muted-foreground">{"You're all caught up!"}</p>
          </Card>
        ) : (
          notificationList.map((notification) => (
            <Card
              key={notification.id}
              className={`p-6 bg-card border-border hover:border-violet-500/50 transition-colors ${
                !notification.read ? "border-violet-500/30" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    notification.type === "success"
                      ? "bg-emerald-500/10"
                      : notification.type === "warning"
                        ? "bg-amber-500/10"
                        : notification.type === "error"
                          ? "bg-red-500/10"
                          : "bg-violet-500/10"
                  }`}
                >
                  <Bell
                    className={`w-5 h-5 ${
                      notification.type === "success"
                        ? "text-emerald-400"
                        : notification.type === "warning"
                          ? "text-amber-400"
                          : notification.type === "error"
                            ? "text-red-400"
                            : "text-violet-400"
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold">{notification.title}</h3>
                    {!notification.read && <span className="flex-shrink-0 w-2 h-2 rounded-full bg-violet-500 mt-2" />}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{new Date(notification.date).toLocaleString()}</p>
                </div>

                <div className="flex gap-2">
                  {!notification.read && (
                    <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => deleteNotification(notification.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  )
}
