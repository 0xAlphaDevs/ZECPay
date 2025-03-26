"use client"

import type React from "react"

import { useState } from "react"
import { Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { InvoiceMetadata } from "../invoice-generator-form"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface ReviewStepProps {
  invoiceMetadata: InvoiceMetadata
  updateInvoiceMetadata: (metadata: Partial<InvoiceMetadata>) => void
  onBack: () => void
  resetInvoice: () => void
  invoiceRef: HTMLDivElement | null
}

export function ReviewStep({
  invoiceMetadata,
  updateInvoiceMetadata,
  onBack,
  resetInvoice,
  invoiceRef,
}: ReviewStepProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof InvoiceMetadata, string>>>({})
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateInvoiceMetadata({ [name]: value })

    // Clear error when user types
    if (errors[name as keyof InvoiceMetadata]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof InvoiceMetadata, string>> = {}

    if (!invoiceMetadata.invoiceNumber.trim()) {
      newErrors.invoiceNumber = "Invoice number is required"
    }

    if (!invoiceMetadata.issueDate.trim()) {
      newErrors.issueDate = "Issue date is required"
    }

    if (!invoiceMetadata.dueDate.trim()) {
      newErrors.dueDate = "Due date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleDownload = async () => {
    if (!validateForm() || !invoiceRef) return

    try {
      setIsGeneratingPdf(true)

      const canvas = await html2canvas(invoiceRef, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`invoice-${invoiceMetadata.invoiceNumber}.pdf`)

      setIsGeneratingPdf(false)
    } catch (error) {
      console.error("Error generating PDF:", error)
      setIsGeneratingPdf(false)
      alert("There was an error generating the PDF. Please try again.")
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Review & Download</h2>

      <div className="space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-medium">Invoice Number</label>
          <Input
            name="invoiceNumber"
            value={invoiceMetadata.invoiceNumber}
            onChange={handleChange}
            className={`border-gray-300 ${errors.invoiceNumber ? "border-red-500" : ""}`}
          />
          {errors.invoiceNumber && <p className="text-xs text-red-500 mt-1">{errors.invoiceNumber}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Issue Date</label>
          <Input
            type="date"
            name="issueDate"
            value={invoiceMetadata.issueDate}
            onChange={handleChange}
            className={`border-gray-300 ${errors.issueDate ? "border-red-500" : ""}`}
          />
          {errors.issueDate && <p className="text-xs text-red-500 mt-1">{errors.issueDate}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Due Date</label>
          <Input
            type="date"
            name="dueDate"
            value={invoiceMetadata.dueDate}
            onChange={handleChange}
            className={`border-gray-300 ${errors.dueDate ? "border-red-500" : ""}`}
          />
          {errors.dueDate && <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <Button
          type="button"
          onClick={handleDownload}
          disabled={isGeneratingPdf}
          className="bg-black text-white hover:bg-gray-800 w-full flex items-center justify-center gap-2"
        >
          {isGeneratingPdf ? (
            <>
              <div className="h-4 w-4 border-2 border-t-white border-white/30 rounded-full animate-spin"></div>
              Generating PDF...
            </>
          ) : (
            <>
              <Download size={16} />
              Download Invoice
            </>
          )}
        </Button>

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onBack} className="border-gray-300 flex-1">
            ← Back
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={resetInvoice}
            className="border-gray-300 text-red-500 hover:text-red-600 hover:border-red-200 flex-1"
          >
            Reset Invoice
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Your invoice data is saved locally. You can come back anytime to continue.
        </p>
      </div>
    </div>
  )
}

