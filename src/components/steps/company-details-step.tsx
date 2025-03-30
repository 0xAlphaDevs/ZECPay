"use client";

import type React from "react";

import { useState } from "react";
// import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { CompanyDetails } from "../invoice-generator-form";

interface CompanyDetailsStepProps {
  companyDetails: CompanyDetails;
  updateCompanyDetails: (details: Partial<CompanyDetails>) => void;
  onNext: () => void;
}

export function CompanyDetailsStep({
  companyDetails,
  updateCompanyDetails,
  onNext,
}: CompanyDetailsStepProps) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof CompanyDetails, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateCompanyDetails({ [name]: value });

    // Clear error when user types
    if (errors[name as keyof CompanyDetails]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CompanyDetails, string>> = {};

    if (!companyDetails.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!companyDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(companyDetails.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!companyDetails.address.trim()) {
      newErrors.address = "Address is required";
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
      <h2 className="text-xl font-semibold mb-6">Your company</h2>

      <div className="space-y-5">
        <div className="pt-2">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Company name</label>
              <Input
                name="companyName"
                value={companyDetails.companyName}
                onChange={handleChange}
                placeholder="Your company name"
                className={`border-gray-300 ${
                  errors.companyName ? "border-red-500" : ""
                }`}
              />
              {errors.companyName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* <div className="space-y-1">
              <label className="text-sm font-medium">Logo</label>
              <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleLogoChange} />
              {companyDetails.logo ? (
                <div className="relative border border-gray-300 rounded-md h-20 flex items-center justify-center overflow-hidden group">
                  <img
                    src={companyDetails.logo || "/placeholder.svg"}
                    alt="Company logo"
                    className="max-h-full max-w-full object-contain"
                  />
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={handleLogoClick}
                  >
                    <span className="text-white text-sm">Change Logo</span>
                  </div>
                </div>
              ) : (
                <div
                  className="border border-gray-300 rounded-md h-20 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                  onClick={handleLogoClick}
                >
                  <Upload size={20} className="text-gray-400 mb-1" />
                  <span className="text-sm text-gray-500">Upload logo</span>
                </div>
              )}
            </div> */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <Input
                name="email"
                value={companyDetails.email}
                onChange={handleChange}
                placeholder="e.g. info@acme.inc"
                className={`border-gray-300 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Address</label>
              <Input
                name="address"
                value={companyDetails.address}
                onChange={handleChange}
                placeholder="Street address"
                className={`border-gray-300 ${
                  errors.address ? "border-red-500" : ""
                }`}
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">{errors.address}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button
          type="submit"
          className="bg-black text-white hover:bg-gray-800 flex items-center gap-1"
        >
          Next <span className="ml-1">→</span>
        </Button>
        <span className="text-sm text-gray-500">Step 1 of 5</span>
      </div>
    </form>
  );
}
