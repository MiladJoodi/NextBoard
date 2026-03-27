"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/data"
import { Plus, FolderOpen } from "lucide-react"

export default function CategoriesPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Categories"
        description="Manage product and content categories"
        action={
          <Button className="bg-violet-500 hover:bg-violet-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        }
      />

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="p-6 bg-card border-border hover:border-violet-500/50 transition-colors">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-violet-500/10">
                <FolderOpen className="w-6 h-6 text-violet-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                View Items
              </Button>
              <Button size="sm" className="flex-1 bg-violet-500 hover:bg-violet-600">
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
