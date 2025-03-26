import { CheckCircle2 } from 'lucide-react'

interface StepIndicatorProps {
  currentStep: number
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { number: 1, label: "Company" },
    { number: 2, label: "Client" },
    { number: 3, label: "Items" },
    { number: 4, label: "Payment" },
    { number: 5, label: "Review" }
  ]

  return (
    <div className="flex justify-between items-center w-full">
      {steps.map((step) => (
        <div key={step.number} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
              ${currentStep > step.number
                ? 'bg-green-100 text-green-600'
                : currentStep === step.number
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-400'}`}
          >
            {currentStep > step.number ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <span>{step.number}</span>
            )}
          </div>
          <span className={`text-xs ${currentStep === step.number ? 'font-medium' : 'text-gray-500'}`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  )
}
