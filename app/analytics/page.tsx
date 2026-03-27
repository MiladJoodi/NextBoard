"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { dashboardStats } from "@/lib/data"
import { LineChart, BarChart3, PieChart, Activity } from "lucide-react"

export default function AnalyticsPage() {
  const chartData = [
    { month: "Jan", revenue: 45000, users: 1200 },
    { month: "Feb", revenue: 52000, users: 1350 },
    { month: "Mar", revenue: 48000, users: 1280 },
    { month: "Apr", revenue: 61000, users: 1450 },
    { month: "May", revenue: 55000, users: 1380 },
    { month: "Jun", revenue: 67000, users: 1520 },
  ]

  return (
    <DashboardLayout>
      <PageHeader title="Analytics" description="Data analysis and insights" />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Revenue", value: `$${dashboardStats.totalRevenue.toLocaleString()}`, color: "violet" },
          { label: "Active Users", value: dashboardStats.activeUsers.toLocaleString(), color: "fuchsia" },
          { label: "New Users", value: `+${dashboardStats.newUsers}`, color: "emerald" },
          { label: "Growth Rate", value: `${dashboardStats.monthlyGrowth}%`, color: "amber" },
        ].map((metric) => (
          <Card key={metric.label} className="p-6 bg-card border-border">
            <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
            <p className="text-3xl font-bold">{metric.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <LineChart className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Revenue Trend</h2>
              <p className="text-sm text-muted-foreground">Monthly revenue over time</p>
            </div>
          </div>

          {/* Simple bar chart visualization */}
          <div className="space-y-4">
            {chartData.map((data) => (
              <div key={data.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{data.month}</span>
                  <span className="text-muted-foreground">${data.revenue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-2 rounded-full"
                    style={{ width: `${(data.revenue / 70000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* User Growth Chart */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <BarChart3 className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">User Growth</h2>
              <p className="text-sm text-muted-foreground">Monthly active users</p>
            </div>
          </div>

          {/* Simple bar chart visualization */}
          <div className="space-y-4">
            {chartData.map((data) => (
              <div key={data.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{data.month}</span>
                  <span className="text-muted-foreground">{data.users.toLocaleString()} users</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                    style={{ width: `${(data.users / 1600) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <PieChart className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Category Distribution</h2>
              <p className="text-sm text-muted-foreground">Sales by category</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { name: "Templates", value: 45, color: "violet" },
              { name: "Libraries", value: 30, color: "fuchsia" },
              { name: "Tools", value: 15, color: "emerald" },
              { name: "Education", value: 10, color: "amber" },
            ].map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className={`bg-${item.color}-500 h-2 rounded-full`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <Activity className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Performance Metrics</h2>
              <p className="text-sm text-muted-foreground">Key performance indicators</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { metric: "Conversion Rate", value: "3.2%", change: "+0.5%", positive: true },
              { metric: "Avg. Order Value", value: "$87.50", change: "+$12", positive: true },
              { metric: "Bounce Rate", value: "42%", change: "-8%", positive: true },
              { metric: "Customer Retention", value: "68%", change: "+5%", positive: true },
            ].map((item) => (
              <div key={item.metric} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <p className="font-medium">{item.metric}</p>
                  <p className="text-2xl font-bold mt-1">{item.value}</p>
                </div>
                <div className={`text-sm font-medium ${item.positive ? "text-emerald-400" : "text-red-400"}`}>
                  {item.change}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
