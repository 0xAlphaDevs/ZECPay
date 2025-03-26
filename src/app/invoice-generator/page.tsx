
import InvoiceGeneratorForm from "@/components/invoice-generator-form"

export default function InvoiceGenerator() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white relative">
      {/* Background dots pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>
      <InvoiceGeneratorForm />
    </div>
  )
}

