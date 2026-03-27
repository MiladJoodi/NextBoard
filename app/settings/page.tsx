"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/theme-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Moon, Sun, Bell, Globe } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [success, setSuccess] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: false,
    marketing: false,
  })

  const handleSave = () => {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <DashboardLayout>
      <PageHeader title="Settings" description="Manage your account preferences" />

      {success && (
        <Alert className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Settings saved successfully!</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-violet-500/10">
              {theme === "dark" ? (
                <Moon className="w-5 h-5 text-violet-400" />
              ) : (
                <Sun className="w-5 h-5 text-violet-400" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">Appearance</h2>
              <p className="text-sm text-muted-foreground">Customize how the app looks</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div>
                <Label className="text-base">Theme</Label>
                <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
              </div>
              <Button onClick={toggleTheme} variant="outline">
                {theme === "dark" ? (
                  <>
                    <Sun className="w-4 h-4 mr-2" />
                    Light
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 mr-2" />
                    Dark
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <Bell className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Notifications</h2>
              <p className="text-sm text-muted-foreground">Configure notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { key: "email", label: "Email Notifications", description: "Receive notifications via email" },
              { key: "push", label: "Push Notifications", description: "Receive push notifications in browser" },
              { key: "updates", label: "Product Updates", description: "Get notified about new features" },
              { key: "marketing", label: "Marketing Emails", description: "Receive promotional content" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <Label className="text-base">{item.label}</Label>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[item.key as keyof typeof notifications]}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      [item.key]: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded border-border text-violet-500 focus:ring-violet-500"
                />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <Globe className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Language & Region</h2>
              <p className="text-sm text-muted-foreground">Set your preferred language</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <select className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Persian (فارسی)</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-violet-500 hover:bg-violet-600">
            Save Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
