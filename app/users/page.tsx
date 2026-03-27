"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { users } from "@/lib/data"
import { UserPlus, Search, Mail, Phone } from "lucide-react"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <PageHeader
        title="User Management"
        description="Manage all users and their permissions"
        action={
          <Button className="bg-violet-500 hover:bg-violet-600">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        }
      />

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="p-6 bg-card border-border hover:border-violet-500/50 transition-colors">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xl font-bold flex-shrink-0">
                {user.avatar || user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-1 truncate">{user.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{user.department}</p>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === "online"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : user.status === "away"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="truncate">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 capitalize">
                {user.role}
              </span>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
