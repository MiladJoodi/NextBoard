"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { products } from "@/lib/data"
import { Plus, Search, Package } from "lucide-react"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <DashboardLayout>
      <PageHeader
        title="Products"
        description="Manage your product inventory"
        action={
          <Button className="bg-violet-500 hover:bg-violet-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        }
      />

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="p-6 bg-card border-border hover:border-violet-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-violet-500/10">
                <Package className="w-8 h-8 text-violet-400" />
              </div>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  product.status === "active"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                }`}
              >
                {product.status}
              </span>
            </div>

            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{product.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Price</span>
                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Stock</span>
                <span className={`font-medium ${product.stock < 50 ? "text-red-400" : "text-emerald-400"}`}>
                  {product.stock} units
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">SKU</span>
                <span className="font-mono text-xs">{product.sku}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                View
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
