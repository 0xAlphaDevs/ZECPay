"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { PaymentDetails } from "../invoice-generator-form";

interface PaymentDetailsStepProps {
  paymentDetails: PaymentDetails;
  updatePaymentDetails: (details: Partial<PaymentDetails>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PaymentDetailsStep({
  paymentDetails,
  updatePaymentDetails,
  onNext,
  onBack,
}: PaymentDetailsStepProps) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof PaymentDetails, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePaymentDetails({ [name]: value });

    // Clear error when user types
    if (errors[name as keyof PaymentDetails]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  function validateZcashTAddress(address: string): boolean {
    const regex = /^t[13][1-9A-HJ-NP-Za-km-z]{33}$/;
    return regex.test(address);
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof PaymentDetails, string>> = {};

    if (!paymentDetails.walletAddress.trim()) {
      newErrors.walletAddress = "Wallet address is required";
    }

    if (!validateZcashTAddress(paymentDetails.walletAddress)) {
      newErrors.walletAddress = "Please enter a valid Zcash T address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-6">Payment details</h2>

      <div className="space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-medium">Currency</label>
          <div className="border border-gray-300 rounded-md h-10 px-3 flex items-center bg-gray-50">
            <span>ZEC (Zcash)</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            ZECPay only supports Zcash for private payments
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Network</label>
          <div className="border border-gray-300 rounded-md h-10 px-3 flex items-center bg-gray-50">
            <span>NEAR</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Payments are processed on the NEAR network
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Wallet Address</label>
          <Input
            name="walletAddress"
            value={paymentDetails.walletAddress}
            onChange={handleChange}
            placeholder="Enter your ZEC wallet address"
            className={`border-gray-300 ${
              errors.walletAddress ? "border-red-500" : ""
            }`}
          />
          {errors.walletAddress && (
            <p className="text-xs text-red-500 mt-1">{errors.walletAddress}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            This is where you&apos;ll receive the payment
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="border-gray-300"
          >
            ← Back
          </Button>
          <Button
            type="submit"
            className="bg-black text-white hover:bg-gray-800 flex items-center gap-1"
          >
            Next <span className="ml-1">→</span>
          </Button>
        </div>
        <span className="text-sm text-gray-500">Step 4 of 5</span>
      </div>
    </form>
  );
}
