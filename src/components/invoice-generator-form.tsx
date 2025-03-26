"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"
import { CompanyDetailsStep } from "./steps/company-details-step"
import { ClientDetailsStep } from "./steps/client-details-step"
import { InvoiceItemsStep } from "./steps/invoice-items-step"
import { PaymentDetailsStep } from "./steps/payment-details-step"
import { ReviewStep } from "./steps/review-step"
import { StepIndicator } from "./step-indicator"
import { InvoicePreview } from "./invoice-preview"

// Define the types for our form data
export type CompanyDetails = {
  email: string
  companyName: string
  logo?: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  taxId: string
}

export type ClientDetails = {
  clientName: string
  clientEmail: string
  clientAddress: string
  clientCity: string
  clientState: string
  clientZip: string
  clientCountry: string
  logo?: string
}

export type InvoiceItem = {
  id: string
  description: string
  quantity: number
  price: number
  amount: number
}

export type PaymentDetails = {
  currency: string
  network: string
  walletAddress: string
}

export type InvoiceMetadata = {
  invoiceNumber: string
  issueDate: string
  dueDate: string
}

export type InvoiceData = {
  companyDetails: CompanyDetails
  clientDetails: ClientDetails
  invoiceItems: InvoiceItem[]
  paymentDetails: PaymentDetails
  invoiceMetadata: InvoiceMetadata
  currentStep: number
}

// Default values
const defaultCompanyDetails: CompanyDetails = {
  email: "",
  companyName: "",
  logo: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  taxId: "",
}

const defaultClientDetails: ClientDetails = {
  clientName: "",
  clientEmail: "",
  clientAddress: "",
  clientCity: "",
  clientState: "",
  clientZip: "",
  clientCountry: "",
}

const defaultInvoiceItems: InvoiceItem[] = [
  {
    id: "1",
    description: "",
    quantity: 1,
    price: 0,
    amount: 0,
  },
]

const defaultPaymentDetails: PaymentDetails = {
  currency: "ZEC",
  network: "NEAR",
  walletAddress: "",
}

const defaultInvoiceMetadata: InvoiceMetadata = {
  invoiceNumber: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
}

const defaultInvoiceData: InvoiceData = {
  companyDetails: defaultCompanyDetails,
  clientDetails: defaultClientDetails,
  invoiceItems: defaultInvoiceItems,
  paymentDetails: defaultPaymentDetails,
  invoiceMetadata: defaultInvoiceMetadata,
  currentStep: 1,
}

export default function InvoiceGeneratorForm() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(defaultInvoiceData)
  const [isLoading, setIsLoading] = useState(true)
  const [invoiceRef, setInvoiceRef] = useState<HTMLDivElement | null>(null)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("zecpay_invoice_data")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setInvoiceData(parsedData)
      } catch (error) {
        console.error("Error parsing saved invoice data:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("zecpay_invoice_data", JSON.stringify(invoiceData))
    }
  }, [invoiceData, isLoading])

  const goToNextStep = () => {
    if (invoiceData.currentStep < 5) {
      setInvoiceData((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }))
      window.scrollTo(0, 0)
    }
  }

  const goToPreviousStep = () => {
    if (invoiceData.currentStep > 1) {
      setInvoiceData((prev) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
      }))
      window.scrollTo(0, 0)
    }
  }

  const updateCompanyDetails = (details: Partial<CompanyDetails>) => {
    setInvoiceData((prev) => ({
      ...prev,
      companyDetails: {
        ...prev.companyDetails,
        ...details,
      },
    }))
  }

  const updateClientDetails = (details: Partial<ClientDetails>) => {
    setInvoiceData((prev) => ({
      ...prev,
      clientDetails: {
        ...prev.clientDetails,
        ...details,
      },
    }))
  }

  const updateInvoiceItems = (items: InvoiceItem[]) => {
    setInvoiceData((prev) => ({
      ...prev,
      invoiceItems: items,
    }))
  }

  const updatePaymentDetails = (details: Partial<PaymentDetails>) => {
    setInvoiceData((prev) => ({
      ...prev,
      paymentDetails: {
        ...prev.paymentDetails,
        ...details,
      },
    }))
  }

  const updateInvoiceMetadata = (metadata: Partial<InvoiceMetadata>) => {
    setInvoiceData((prev) => ({
      ...prev,
      invoiceMetadata: {
        ...prev.invoiceMetadata,
        ...metadata,
      },
    }))
  }

  const resetInvoice = () => {
    if (confirm("Are you sure you want to reset the invoice? All data will be lost.")) {
      localStorage.removeItem("zecpay_invoice_data")
      setInvoiceData(defaultInvoiceData)
    }
  }

  const calculateSubtotal = () => {
    return invoiceData.invoiceItems.reduce((total, item) => total + item.amount, 0)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 border-4 border-t-black border-gray-200 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Header for mobile */}
      <div className="md:hidden w-full p-4 border-b border-gray-200 flex items-center gap-3 relative z-10 bg-white">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-2">
          <div className="bg-black text-white w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm">
            ZP
          </div>
          <h1 className="font-semibold">ZECPay Invoice Generator</h1>
        </div>
      </div>

      {/* Left side - Form */}
      <div className="w-full md:w-[450px] p-6 border-r border-gray-200 relative z-10 bg-white overflow-y-auto">
        <div className="hidden md:flex items-center gap-3 mb-6">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-black text-white w-10 h-10 rounded-lg flex items-center justify-center font-mono">
            <span>ZP</span>
          </div>
          <div>
            <h1 className="font-semibold text-lg">ZECPay Invoice Generator</h1>
            <p className="text-sm text-gray-500">Private payments with cross-chain settlements</p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-md p-3 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">NEW</span>
            <span className="text-sm text-gray-700">Invoice tracking, automated emails and more</span>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>

        <StepIndicator currentStep={invoiceData.currentStep} />

        <div className="mt-8">
          {invoiceData.currentStep === 1 && (
            <CompanyDetailsStep
              companyDetails={invoiceData.companyDetails}
              updateCompanyDetails={updateCompanyDetails}
              onNext={goToNextStep}
            />
          )}

          {invoiceData.currentStep === 2 && (
            <ClientDetailsStep
              clientDetails={invoiceData.clientDetails}
              updateClientDetails={updateClientDetails}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
            />
          )}

          {invoiceData.currentStep === 3 && (
            <InvoiceItemsStep
              invoiceItems={invoiceData.invoiceItems}
              updateInvoiceItems={updateInvoiceItems}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
            />
          )}

          {invoiceData.currentStep === 4 && (
            <PaymentDetailsStep
              paymentDetails={invoiceData.paymentDetails}
              updatePaymentDetails={updatePaymentDetails}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
            />
          )}

          {invoiceData.currentStep === 5 && (
            <ReviewStep
              invoiceMetadata={invoiceData.invoiceMetadata}
              updateInvoiceMetadata={updateInvoiceMetadata}
              onBack={goToPreviousStep}
              resetInvoice={resetInvoice}
              invoiceRef={invoiceRef}
            />
          )}
        </div>
      </div>

      {/* Right side - Invoice Preview */}
      <div className="flex-1 bg-white flex items-center justify-center overflow-hidden">
        <div className="h-full w-full flex px-28">
          <InvoicePreview invoiceData={invoiceData} subtotal={calculateSubtotal()} setInvoiceRef={setInvoiceRef} />
        </div>
      </div>
    </div>
  )
}

