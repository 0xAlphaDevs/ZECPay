"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { ClientDetails } from "../invoice-generator-form"

interface ClientDetailsStepProps {
  clientDetails: ClientDetails
  updateClientDetails: (details: Partial<ClientDetails>) => void
  onNext: () => void
  onBack: () => void
}

export function ClientDetailsStep({ clientDetails, updateClientDetails, onNext, onBack }: ClientDetailsStepProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof ClientDetails, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateClientDetails({ [name]: value })

    // Clear error when user types
    if (errors[name as keyof ClientDetails]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ClientDetails, string>> = {}

    if (!clientDetails.clientName.trim()) {
      newErrors.clientName = "Client name is required"
    }

    if (clientDetails.clientEmail && !/^\S+@\S+\.\S+$/.test(clientDetails.clientEmail)) {
      newErrors.clientEmail = "Please enter a valid email"
    }

    if (!clientDetails.clientAddress.trim()) {
      newErrors.clientAddress = "Address is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onNext()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-6">Your client</h2>

      <div className="space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-medium">Client name</label>
          <Input
            name="clientName"
            value={clientDetails.clientName}
            onChange={handleChange}
            placeholder="Client name or company"
            className={`border-gray-300 ${errors.clientName ? "border-red-500" : ""}`}
          />
          {errors.clientName && <p className="text-xs text-red-500 mt-1">{errors.clientName}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Client email</label>
          <Input
            name="clientEmail"
            value={clientDetails.clientEmail}
            onChange={handleChange}
            placeholder="client@example.com"
            className={`border-gray-300 ${errors.clientEmail ? "border-red-500" : ""}`}
          />
          {errors.clientEmail && <p className="text-xs text-red-500 mt-1">{errors.clientEmail}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Address</label>
          <Input
            name="clientAddress"
            value={clientDetails.clientAddress}
            onChange={handleChange}
            placeholder="Client address"
            className={`border-gray-300 ${errors.clientAddress ? "border-red-500" : ""}`}
          />
          {errors.clientAddress && <p className="text-xs text-red-500 mt-1">{errors.clientAddress}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">City</label>
          <Input
            name="clientCity"
            value={clientDetails.clientCity}
            onChange={handleChange}
            placeholder="City"
            className="border-gray-300"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">State</label>
          <Input
            name="clientState"
            value={clientDetails.clientState}
            onChange={handleChange}
            placeholder="State/Province"
            className="border-gray-300"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Zip</label>
          <Input
            name="clientZip"
            value={clientDetails.clientZip}
            onChange={handleChange}
            placeholder="ZIP/Postal code"
            className="border-gray-300"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Country</label>
          <Input
            name="clientCountry"
            value={clientDetails.clientCountry}
            onChange={handleChange}
            placeholder="Country"
            className="border-gray-300"
          />
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
        <span className="text-sm text-gray-500">Step 2 of 5</span>
      </div>
    </form>
  )
}

