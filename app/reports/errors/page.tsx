"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { errorLogs } from "@/lib/data"
import { AlertTriangle, CheckCircle } from "lucide-react"

export default function ErrorReportsPage() {
  return (
    <DashboardLayout>
      <PageHeader title="Error Reports" description="System errors and debugging logs" />

      {/* Error Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Errors", value: errorLogs.length },
          { label: "Critical", value: errorLogs.filter((e) => e.severity === "critical").length },
          { label: "Resolved", value: errorLogs.filter((e) => e.resolved).length },
          { label: "Pending", value: errorLogs.filter((e) => !e.resolved).length },
        ].map((stat) => (
          <Card key={stat.label} className="p-6 bg-card border-border">
            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Error List */}
      <div className="space-y-4">
        {errorLogs.map((error) => (
          <Card
            key={error.id}
            className={`p-6 bg-card border-border hover:border-violet-500/50 transition-colors ${
              error.severity === "critical" && !error.resolved ? "border-red-500/50" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg ${
                  error.resolved
                    ? "bg-emerald-500/10"
                    : error.severity === "critical"
                      ? "bg-red-500/10"
                      : "bg-amber-500/10"
                }`}
              >
                {error.resolved ? (
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                ) : (
                  <AlertTriangle
                    className={`w-6 h-6 ${error.severity === "critical" ? "text-red-400" : "text-amber-400"}`}
                  />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{error.message}</h3>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium uppercase ${
                          error.severity === "critical"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : error.severity === "high"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                        }`}
                      >
                        {error.severity}
                      </span>
                      {error.resolved && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Resolved
                        </span>
                      )}
                    </div>
                    {error.stack && (
                      <pre className="text-xs text-muted-foreground bg-muted p-3 rounded-lg overflow-x-auto mb-2">
                        {error.stack}
                      </pre>
                    )}
                    <p className="text-xs text-muted-foreground">{new Date(error.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {!error.resolved && (
                <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
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
