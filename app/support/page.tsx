"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supportTickets } from "@/lib/data"
import { MessageSquare, CheckCircle2, Send } from "lucide-react"

export default function SupportPage() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(true)
    setSubject("")
    setMessage("")
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <DashboardLayout>
      <PageHeader title="Support" description="Get help and submit support tickets" />

      {success && (
        <Alert className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Support ticket submitted successfully! We'll get back to you soon.</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit Ticket Form */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <Send className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Submit a Ticket</h2>
              <p className="text-sm text-muted-foreground">{"We'll respond within 24 hours"}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Brief description of your issue"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Describe your issue in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select id="priority" className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <Button type="submit" className="w-full bg-violet-500 hover:bg-violet-600">
              <Send className="w-4 h-4 mr-2" />
              Submit Ticket
            </Button>
          </form>
        </Card>

        {/* Recent Tickets */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <MessageSquare className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Your Tickets</h2>
              <p className="text-sm text-muted-foreground">Recent support tickets</p>
            </div>
          </div>

          <div className="space-y-4">
            {supportTickets.map((ticket) => (
              <div key={ticket.id} className="p-4 rounded-lg border border-border hover:border-violet-500/50">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{ticket.subject}</h3>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.status === "resolved"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : ticket.status === "in-progress"
                          ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                          : ticket.status === "open"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{ticket.message}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Ticket #{ticket.id}</span>
                  <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
