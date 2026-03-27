"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Smartphone, Key, AlertTriangle } from "lucide-react"

export default function SecurityPage() {
  const { user } = useAuth()
  const [twoFactor, setTwoFactor] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleToggle2FA = () => {
    setTwoFactor(!twoFactor)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <DashboardLayout>
      <PageHeader title="Security Settings" description="Manage your account security" />

      {success && (
        <Alert className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Security settings updated successfully!</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <Smartphone className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <p className="font-medium">Enable 2FA</p>
              <p className="text-sm text-muted-foreground">
                {twoFactor ? "Two-factor authentication is enabled" : "Two-factor authentication is disabled"}
              </p>
            </div>
            <Button onClick={handleToggle2FA} variant={twoFactor ? "destructive" : "default"}>
              {twoFactor ? "Disable" : "Enable"}
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <Key className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Active Sessions</h2>
              <p className="text-sm text-muted-foreground">Manage devices with access to your account</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { device: "Chrome on Windows", location: "New York, US", current: true, lastActive: "Active now" },
              { device: "Safari on iPhone", location: "Los Angeles, US", current: false, lastActive: "2 hours ago" },
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex-1">
                  <p className="font-medium flex items-center gap-2">
                    {session.device}
                    {session.current && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Current
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {session.location} • {session.lastActive}
                  </p>
                </div>
                {!session.current && (
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-card border-border border-amber-500/20">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="font-semibold">Security Recommendations</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Use a strong, unique password
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Enable two-factor authentication
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Review active sessions regularly
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              {"Don't share your password with anyone"}
            </li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  )
}
