"use client"

import type React from "react"

import { useState } from "react"
import { Trash2, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { InvoiceItem } from "../invoice-generator-form"

interface InvoiceItemsStepProps {
  invoiceItems: InvoiceItem[]
  updateInvoiceItems: (items: InvoiceItem[]) => void
  onNext: () => void
  onBack: () => void
}

export function InvoiceItemsStep({ invoiceItems, updateInvoiceItems, onNext, onBack }: InvoiceItemsStepProps) {
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({})

  const handleChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = invoiceItems.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }

        // Recalculate amount if quantity or price changes
        if (field === "quantity" || field === "price") {
          updatedItem.amount = Number(updatedItem.quantity) * Number(updatedItem.price)
        }

        return updatedItem
      }
      return item
    })

    updateInvoiceItems(updatedItems)

    // Clear error when user types
    if (errors[id]?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [field]: "",
        },
      }))
    }
  }

  const addItem = () => {
    const newId = String(Date.now())
    updateInvoiceItems([
      ...invoiceItems,
      {
        id: newId,
        description: "",
        quantity: 1,
        price: 0,
        amount: 0,
      },
    ])
  }

  const removeItem = (id: string) => {
    if (invoiceItems.length > 1) {
      updateInvoiceItems(invoiceItems.filter((item) => item.id !== id))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, Record<string, string>> = {}
    let isValid = true

    invoiceItems.forEach((item) => {
      const itemErrors: Record<string, string> = {}

      if (!item.description.trim()) {
        itemErrors.description = "Description is required"
        isValid = false
      }

      if (item.quantity <= 0) {
        itemErrors.quantity = "Quantity must be greater than 0"
        isValid = false
      }

      if (item.price < 0) {
        itemErrors.price = "Price cannot be negative"
        isValid = false
      }

      if (Object.keys(itemErrors).length > 0) {
        newErrors[item.id] = itemErrors
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onNext()
    }
  }

  const calculateSubtotal = () => {
    return invoiceItems.reduce((total, item) => total + item.amount, 0)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-6">Invoice items</h2>

      <div className="space-y-6">
        {invoiceItems.map((item, index) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Item {index + 1}</h3>
              {invoiceItems.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Description</label>
                <Input
                  value={item.description}
                  onChange={(e) => handleChange(item.id, "description", e.target.value)}
                  placeholder="Item description"
                  className={`border-gray-300 ${errors[item.id]?.description ? "border-red-500" : ""}`}
                />
                {errors[item.id]?.description && (
                  <p className="text-xs text-red-500 mt-1">{errors[item.id].description}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Quantity</label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleChange(item.id, "quantity", Number(e.target.value))}
                    className={`border-gray-300 ${errors[item.id]?.quantity ? "border-red-500" : ""}`}
                  />
                  {errors[item.id]?.quantity && <p className="text-xs text-red-500 mt-1">{errors[item.id].quantity}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Price</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleChange(item.id, "price", Number(e.target.value))}
                    className={`border-gray-300 ${errors[item.id]?.price ? "border-red-500" : ""}`}
                  />
                  {errors[item.id]?.price && <p className="text-xs text-red-500 mt-1">{errors[item.id].price}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Amount</label>
                  <Input type="number" readOnly value={item.amount.toFixed(2)} className="border-gray-300 bg-gray-50" />
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addItem}
          className="w-full border-dashed border-gray-300 flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          Add Item
        </Button>

        <div className="flex justify-end">
          <div className="w-1/3">
            <div className="flex justify-between py-2">
              <span className="text-sm font-medium">Subtotal</span>
              <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-200">
              <span className="text-sm font-medium">Total</span>
              <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onBack} className="border-gray-300">
            ← Back
          </Button>
          <Button type="submit" className="bg-black text-white hover:bg-gray-800 flex items-center gap-1">
            Next <span className="ml-1">→</span>
          </Button>
        </div>
        <span className="text-sm text-gray-500">Step 3 of 5</span>
      </div>
    </form>
  )
}

