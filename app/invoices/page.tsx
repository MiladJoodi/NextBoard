"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { invoices, users } from "@/lib/data"
import { FileText, Download, Eye } from "lucide-react"

export default function InvoicesPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Invoices"
        description="Manage and track all invoices"
        action={
          <Button className="bg-violet-500 hover:bg-violet-600">
            <FileText className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Invoices", value: invoices.length, color: "violet" },
          {
            label: "Paid",
            value: invoices.filter((i) => i.status === "paid").length,
            color: "emerald",
          },
          {
            label: "Pending",
            value: invoices.filter((i) => i.status === "pending").length,
            color: "amber",
          },
          {
            label: "Overdue",
            value: invoices.filter((i) => i.status === "overdue").length,
            color: "red",
          },
        ].map((stat) => (
          <Card key={stat.label} className="p-6 bg-card border-border">
            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {invoices.map((invoice) => {
          const user = users.find((u) => u.id === invoice.userId)
          return (
            <Card key={invoice.id} className="p-6 bg-card border-border hover:border-violet-500/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">Invoice {invoice.id}</h3>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        invoice.status === "paid"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : invoice.status === "pending"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Customer: {user?.name}</p>
                  <p className="text-sm text-muted-foreground">Order ID: {invoice.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${invoice.total.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Due: {invoice.dueDate}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-4">
                <div className="space-y-2">
                  {invoice.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.description} × {item.quantity}
                      </span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${invoice.tax.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </DashboardLayout>
  )
}
