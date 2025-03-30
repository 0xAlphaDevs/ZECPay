"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { InvoiceData, InvoiceMetadata } from "../invoice-generator-form";

interface ReviewStepProps {
  invoiceMetadata: InvoiceMetadata;
  updateInvoiceMetadata: (metadata: Partial<InvoiceMetadata>) => void;
  onBack: () => void;
  resetInvoice: () => void;
  invoiceData: InvoiceData;
}

export function ReviewStep({
  invoiceMetadata,
  updateInvoiceMetadata,
  onBack,
  resetInvoice,
  invoiceData,
}: ReviewStepProps) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof InvoiceMetadata, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateInvoiceMetadata({ [name]: value });

    // Clear error when user types
    if (errors[name as keyof InvoiceMetadata]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof InvoiceMetadata, string>> = {};

    if (!invoiceMetadata.invoiceNumber.trim()) {
      newErrors.invoiceNumber = "Invoice number is required";
    }

    if (!invoiceMetadata.issueDate.trim()) {
      newErrors.issueDate = "Issue date is required";
    }

    if (!invoiceMetadata.dueDate.trim()) {
      newErrors.dueDate = "Due date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateInvoice = () => {
    // Logic to generate the invoice

    console.log("Invoice data:", invoiceData);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Review & Generate Invoice</h2>

      <div className="space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-medium">Invoice Number</label>
          <Input
            name="invoiceNumber"
            value={invoiceMetadata.invoiceNumber}
            onChange={handleChange}
            className={`border-gray-300 ${
              errors.invoiceNumber ? "border-red-500" : ""
            }`}
          />
          {errors.invoiceNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.invoiceNumber}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Issue Date</label>
          <Input
            type="date"
            name="issueDate"
            value={invoiceMetadata.issueDate}
            onChange={handleChange}
            className={`border-gray-300 ${
              errors.issueDate ? "border-red-500" : ""
            }`}
          />
          {errors.issueDate && (
            <p className="text-xs text-red-500 mt-1">{errors.issueDate}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Due Date</label>
          <Input
            type="date"
            name="dueDate"
            value={invoiceMetadata.dueDate}
            onChange={handleChange}
            className={`border-gray-300 ${
              errors.dueDate ? "border-red-500" : ""
            }`}
          />
          {errors.dueDate && (
            <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>
          )}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex gap-3">
          <Button
            type="button"
            className="bg-black text-white hover:bg-gray-800 flex-1 flex items-center justify-center gap-2"
            onClick={() => {
              if (validateForm()) {
                // Generate the invoice
                generateInvoice();
                // alert("Invoice created successfully! You can now download it.");
              }
            }}
          >
            Generate Invoice
          </Button>

          {/* <Button
            type="button"
            onClick={handleDownload}
            className="bg-green-600 text-white hover:bg-green-700 flex-1 flex items-center justify-center gap-2"
          >
            <>
              <Download size={16} />
              Download
            </>
          </Button> */}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="border-gray-300 flex-1"
          >
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
          Your invoice data is saved locally. You can come back anytime to
          continue.
        </p>
      </div>
    </div>
  );
}
