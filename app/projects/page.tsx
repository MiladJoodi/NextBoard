"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { projects, users } from "@/lib/data"
import { FolderPlus, Calendar, DollarSign, UsersIcon } from "lucide-react"

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Projects"
        description="Manage all your projects and track progress"
        action={
          <Button className="bg-violet-500 hover:bg-violet-600">
            <FolderPlus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        }
      />

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project) => {
          const manager = users.find((u) => u.id === project.managerId)
          const teamSize = project.teamMembers.length

          return (
            <Card key={project.id} className="p-6 bg-card border-border hover:border-violet-500/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : project.status === "completed"
                            ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{project.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Start Date</p>
                        <p className="text-sm font-medium">{project.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Budget</p>
                        <p className="text-sm font-medium">${project.budget.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Spent</p>
                        <p className="text-sm font-medium">${project.spent.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Team Size</p>
                        <p className="text-sm font-medium">{teamSize} members</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-3 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Managed by:</span>
                  <span className="text-sm font-medium">{manager?.name}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" className="bg-violet-500 hover:bg-violet-600">
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </DashboardLayout>
  )
}
