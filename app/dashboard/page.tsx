"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { dashboardStats, activities, projects } from "@/lib/data"
import { TrendingUp, Users, FolderKanban, CheckCircle, ArrowUp, ArrowDown } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const stats = [
    {
      label: "Total Projects",
      value: dashboardStats.totalProjects,
      change: "+12%",
      positive: true,
      icon: FolderKanban,
    },
    {
      label: "Active Tasks",
      value: dashboardStats.activeTasks,
      change: "+8%",
      positive: true,
      icon: CheckCircle,
    },
    {
      label: "Team Members",
      value: dashboardStats.teamMembers,
      change: "+2",
      positive: true,
      icon: Users,
    },
    {
      label: "Completion",
      value: `${dashboardStats.completion}%`,
      change: "-3%",
      positive: false,
      icon: TrendingUp,
    },
  ]

  return (
    <DashboardLayout>
      <PageHeader title="Dashboard" description="Welcome back! Here's your overview" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 bg-card border-border hover:border-violet-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-violet-500/10">
                <stat.icon className="w-5 h-5 text-violet-400" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.positive ? "text-emerald-400" : "text-red-400"}`}>
                {stat.positive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Activities</h2>
            <Link href="/activities" className="text-sm text-violet-400 hover:text-violet-300">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {activities.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-violet-400 mt-2" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium text-violet-400">{activity.action.split(" ")[0]}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      {activity.action.slice(activity.action.indexOf(" "))}{" "}
                    </span>
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Projects */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Active Projects</h2>
            <Link href="/projects" className="text-sm text-violet-400 hover:text-violet-300">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {projects
              .filter((p) => p.status === "active")
              .map((project) => (
                <div
                  key={project.id}
                  className="p-4 rounded-lg border border-border hover:border-violet-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{project.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
