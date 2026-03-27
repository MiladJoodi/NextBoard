"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { faqs } from "@/lib/data"
import { Search, ChevronDown, ChevronUp, Eye } from "lucide-react"

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedIds, setExpandedIds] = useState<string[]>([])

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleExpand = (id: string) => {
    setExpandedIds(expandedIds.includes(id) ? expandedIds.filter((i) => i !== id) : [...expandedIds, id])
  }

  const faqsByCategory = filteredFAQs.reduce(
    (acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = []
      }
      acc[faq.category].push(faq)
      return acc
    },
    {} as Record<string, typeof faqs>,
  )

  return (
    <DashboardLayout>
      <PageHeader title="Frequently Asked Questions" description="Find answers to common questions" />

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 text-lg"
          />
        </div>
      </div>

      {/* FAQs by Category */}
      <div className="space-y-8">
        {Object.entries(faqsByCategory).map(([category, categoryFAQs]) => (
          <div key={category}>
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="space-y-3">
              {categoryFAQs.map((faq) => {
                const isExpanded = expandedIds.includes(faq.id)

                return (
                  <Card key={faq.id} className="bg-card border-border overflow-hidden">
                    <button
                      onClick={() => toggleExpand(faq.id)}
                      className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Eye className="w-4 h-4" />
                            {faq.views}
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-violet-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-6 pt-0">
                        <div className="pt-4 border-t border-border">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <Card className="p-12 bg-card border-border text-center">
          <h3 className="text-lg font-semibold mb-2">No results found</h3>
          <p className="text-muted-foreground">Try searching with different keywords</p>
        </Card>
      )}
    </DashboardLayout>
  )
}
