// import Link from "next/link"
// import { Plus, X, ArrowLeft } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
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
      {/* Header for mobile */}
      {/* <div className="md:hidden w-full p-4 border-b border-gray-200 flex items-center gap-3 relative z-10">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-2">
          <div className="bg-black text-white w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm">
            ZP
          </div>
          <h1 className="font-semibold">ZECPay Invoice Generator</h1>
        </div>
      </div> */}

      {/* Left side - Form */}
      {/* <div className="w-full md:w-[450px] p-6 border-r border-gray-200 relative z-10">
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

        <h2 className="text-xl font-semibold mb-6">Your company</h2>

        <div className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <Input placeholder="e.g. info@acme.inc" className="border-gray-300" />
            <p className="text-xs text-gray-500 mt-1">
              We&apos;ll fill the billing details automatically if we find the company.
            </p>
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Billing details</h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Company name</label>
                <Input defaultValue="Acme Inc" className="border-gray-300" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Logo</label>
                <div className="border border-gray-300 rounded-md h-10 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Plus size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Address</label>
                <Input defaultValue="Mission Street, 79" className="border-gray-300" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">City</label>
                <Input defaultValue="San Francisco" className="border-gray-300" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">State</label>
                <Input defaultValue="California" className="border-gray-300" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Zip</label>
                <Input defaultValue="94016" className="border-gray-300" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Country</label>
                <Input defaultValue="United States" className="border-gray-300" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Tax ID</label>
                <Input defaultValue="0123VS" className="border-gray-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button variant="default" className="bg-black text-white hover:bg-gray-800 flex items-center gap-1">
            Next <span className="ml-1">→</span>
          </Button>
          <span className="text-sm text-gray-500">Your client</span>
        </div>
      </div> */}

      {/* Right side - Invoice Preview */}
      {/* <div className="flex-1 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-[650px] p-8 border border-gray-100">
          <div className="flex justify-between mb-8">
            <div>
              <div className="text-xs text-gray-500">INVOICE NO</div>
              <div className="font-medium">000001</div>
            </div>
            <div className="flex gap-8">
              <div>
                <div className="text-xs text-gray-500">ISSUED</div>
                <div className="font-medium">3/24/25</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">DUE DATE</div>
                <div className="font-medium">4/07/25</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mb-12">
            <div className="w-[45%]">
              <div className="text-xs text-gray-500 mb-2">FROM</div>
              <div className="border border-dashed border-gray-200 rounded-md h-32 flex items-center justify-center">
                <div className="text-center text-gray-400 text-sm">
                  <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2"></div>
                  <div>Company name</div>
                  <div className="text-xs">Company address</div>
                </div>
              </div>
            </div>
            <div className="w-[45%]">
              <div className="text-xs text-gray-500 mb-2">TO</div>
              <div className="border border-dashed border-gray-200 rounded-md h-32 flex items-center justify-center">
                <div className="text-center text-gray-400 text-sm">
                  <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2"></div>
                  <div>Client name</div>
                  <div className="text-xs">Client address</div>
                </div>
              </div>
            </div>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-xs text-gray-500 font-medium">DESCRIPTION</th>
                <th className="text-center py-2 text-xs text-gray-500 font-medium">QTY</th>
                <th className="text-center py-2 text-xs text-gray-500 font-medium">PRICE</th>
                <th className="text-right py-2 text-xs text-gray-500 font-medium">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 text-gray-400 text-sm">Add a description</td>
                <td className="py-3 text-center text-gray-400 text-sm">0</td>
                <td className="py-3 text-center text-gray-400 text-sm">$0</td>
                <td className="py-3 text-right text-gray-400 text-sm">$0</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end mb-8">
            <div className="w-1/3">
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200">
                <span className="text-sm text-gray-500">Total</span>
                <span className="font-medium">$0.00</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-12">
            <div className="w-[45%]">
              <div className="text-xs text-gray-500 mb-2">PAYABLE IN</div>
              <div className="border border-dashed border-gray-200 rounded-md h-20 flex items-center justify-center">
                <div className="text-center text-gray-400 text-sm">Select a cryptocurrency</div>
              </div>
            </div>
            <div className="w-[45%]">
              <div className="text-xs text-gray-500 mb-2">INSTRUCTIONS</div>
              <div className="text-sm text-gray-600">
                <div>Network</div>
                <div className="text-gray-400">Select a network</div>
                <div className="mt-2">Wallet</div>
                <div className="text-gray-400">Enter wallet address</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-xs text-gray-400">Powered by ZECPay</div>
        </div>
      </div> */}
    </div>
  )
}

