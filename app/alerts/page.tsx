"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { alerts } from "@/lib/data"
import { AlertTriangle, CheckCircle } from "lucide-react"

export default function AlertsPage() {
  const [alertList, setAlertList] = useState(alerts)

  const resolveAlert = (id: string) => {
    setAlertList(alertList.map((a) => (a.id === id ? { ...a, resolved: true } : a)))
  }

  const activeAlerts = alertList.filter((a) => !a.resolved).length

  return (
    <DashboardLayout>
      <PageHeader
        title="Alerts & Warnings"
        description={`${activeAlerts} active alert${activeAlerts !== 1 ? "s" : ""} require attention`}
      />

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Critical", value: alertList.filter((a) => !a.resolved && a.severity === "critical").length },
          { label: "High", value: alertList.filter((a) => !a.resolved && a.severity === "high").length },
          { label: "Medium", value: alertList.filter((a) => !a.resolved && a.severity === "medium").length },
          { label: "Low", value: alertList.filter((a) => !a.resolved && a.severity === "low").length },
        ].map((stat) => (
          <Card key={stat.label} className="p-6 bg-card border-border">
            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alertList.map((alert) => (
          <Card
            key={alert.id}
            className={`p-6 bg-card border-border hover:border-violet-500/50 transition-colors ${
              !alert.resolved
                ? alert.severity === "critical"
                  ? "border-red-500/50"
                  : alert.severity === "high"
                    ? "border-amber-500/50"
                    : ""
                : "opacity-60"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg ${
                  alert.severity === "critical"
                    ? "bg-red-500/10"
                    : alert.severity === "high"
                      ? "bg-amber-500/10"
                      : alert.severity === "medium"
                        ? "bg-amber-500/10"
                        : "bg-violet-500/10"
                }`}
              >
                {alert.resolved ? (
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                ) : (
                  <AlertTriangle
                    className={`w-6 h-6 ${
                      alert.severity === "critical"
                        ? "text-red-400"
                        : alert.severity === "high"
                          ? "text-amber-400"
                          : alert.severity === "medium"
                            ? "text-amber-400"
                            : "text-violet-400"
                    }`}
                  />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{alert.title}</h3>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium uppercase ${
                          alert.severity === "critical"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : alert.severity === "high"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : alert.severity === "medium"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                        }`}
                      >
                        {alert.severity}
                      </span>
                      {alert.resolved && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Resolved
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{new Date(alert.date).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {!alert.resolved && (
                <Button
                  onClick={() => resolveAlert(alert.id)}
                  size="sm"
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  Mark Resolved
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
