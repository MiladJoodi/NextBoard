"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { articles } from "@/lib/data"
import { BookOpen, Eye, Calendar, User } from "lucide-react"

export default function ArticlesPage() {
  return (
    <DashboardLayout>
      <PageHeader title="Articles & Resources" description="Educational content and tutorials" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="p-6 bg-card border-border hover:border-violet-500/50 transition-colors">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-violet-500/10">
                <BookOpen className="w-6 h-6 text-violet-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-2">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{article.content}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {article.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {article.publishDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {article.views.toLocaleString()} views
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
