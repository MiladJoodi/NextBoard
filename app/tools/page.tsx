"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, Calculator, FileText, ImageIcon, Database, Code } from "lucide-react"

export default function ToolsPage() {
  const tools = [
    {
      name: "Calculator",
      description: "Perform quick calculations",
      icon: Calculator,
      color: "violet",
    },
    {
      name: "Text Editor",
      description: "Edit and format text documents",
      icon: FileText,
      color: "fuchsia",
    },
    {
      name: "Image Tools",
      description: "Resize, crop, and edit images",
      icon: ImageIcon,
      color: "emerald",
    },
    {
      name: "Database Tools",
      description: "Query and manage databases",
      icon: Database,
      color: "amber",
    },
    {
      name: "Code Formatter",
      description: "Format and beautify code",
      icon: Code,
      color: "violet",
    },
    {
      name: "Utilities",
      description: "Various utility tools",
      icon: Wrench,
      color: "fuchsia",
    },
  ]

  return (
    <DashboardLayout>
      <PageHeader title="Tools" description="Helpful utilities and tools for your workflow" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card key={tool.name} className="p-6 bg-card border-border hover:border-violet-500/50 transition-colors">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-lg bg-violet-500/10 mb-4">
                <tool.icon className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
              <Button className="w-full bg-violet-500 hover:bg-violet-600">Launch Tool</Button>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
