"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type {
  InvoiceData,
  InvoiceItem,
  InvoiceMetadata,
} from "../invoice-generator-form";
import { v4 as uuidv4 } from "uuid";
import { InvoiceType } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { Copy } from "lucide-react";

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
  const supabase = createClient();
  const [errors, setErrors] = useState<
    Partial<Record<keyof InvoiceMetadata, string>>
  >({});

  const [generatingInvoice, setGeneratingInvoice] = useState(false);
  const [invoiceLink, setInvoiceLink] = useState("");

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

  const generateInvoice = async () => {
    // Logic to generate the invoice

    setGeneratingInvoice(true);

    console.log("Invoice data:", invoiceData);

    const newInvoiceId = uuidv4();
    const newInvoiceData: InvoiceType = {
      created_at: new Date().toISOString(),
      invoice_id: newInvoiceId,
      company: {
        name: invoiceData.companyDetails.companyName,
        address: invoiceData.companyDetails.address,
        email: invoiceData.companyDetails.email,
      },
      client: {
        name: invoiceData.clientDetails.clientName,
        address: invoiceData.clientDetails.clientAddress,
        email: invoiceData.clientDetails.clientEmail,
      },
      items: invoiceData.invoiceItems.map((item: InvoiceItem) => ({
        description: item.description,
        quantity: item.quantity,
        unit_price: item.price,
      })),
      payment: {
        wallet_address: invoiceData.paymentDetails.walletAddress,
      },
      review: {
        invoice_number: invoiceData.invoiceMetadata.invoiceNumber,
        issue_date: invoiceData.invoiceMetadata.issueDate,
        due_date: invoiceData.invoiceMetadata.dueDate,
      },
      paid: false,
    };

    const { data, error } = await supabase
      .from("invoices")
      .insert([newInvoiceData])
      .select("*");

    if (error) {
      console.error("Error saving invoice:", error);
      setGeneratingInvoice(false);
    } else {
      console.log("Invoice saved successfully:", data);
      setInvoiceLink(`${window.location.origin}/invoice/${newInvoiceId}`);
      setGeneratingInvoice(false);
    }
  };

  const handleInvoiceLinkCopy = async () => {
    if (invoiceLink) {
      await navigator.clipboard.writeText(invoiceLink);
      alert("Invoice link copied to clipboard!");
    }
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
          {!invoiceLink && (
            <Button
              type="button"
              disabled={generatingInvoice}
              className="bg-black text-white hover:bg-gray-800 flex-1 flex items-center justify-center gap-2"
              onClick={() => {
                if (validateForm()) {
                  // Generate the invoice
                  generateInvoice();
                }
              }}
            >
              {generatingInvoice ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : (
                "Generate Invoice"
              )}
            </Button>
          )}

          {invoiceLink && (
            <Button
              type="button"
              onClick={handleInvoiceLinkCopy}
              className="bg-green-600 text-white hover:bg-green-700 flex-1 flex items-center justify-center gap-2"
            >
              <>
                <Copy size={16} />
                Copy Invoice Link
              </>
            </Button>
          )}
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
