"use client";

import Link from "next/link"
import { ArrowRight, Shield, Repeat, UserCheck, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ConnectButton from "@/components/wallet/ConnectButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
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

      {/* Header */}
      <header className="relative z-10 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-black text-white w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm">
              ZP
            </div>
            <span className="font-semibold text-lg">ZECPay</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">
              How it works
            </a>
            <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900">
              FAQ
            </a>
          </nav>
          <Link href="/invoice-generator">
            <Button className="bg-black text-white hover:bg-gray-800">Create Invoice</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Private Payments with <br />
            Cross-Chain Settlements
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            ZECPay enables private transactions using Zcash shielded technology while allowing settlements on any
            blockchain through Near Intents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/invoice-generator">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8">
                Create an Invoice <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-gray-300">
              Learn More <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <ConnectButton />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Private Payments</h3>
              <p className="text-gray-600">
                Utilize Zcash shielded transactions to keep your payment details private without exposing on-chain
                activity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Repeat className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cross-Chain Settlements</h3>
              <p className="text-gray-600">
                Settle payments on your preferred blockchain using Near Intents, enabling seamless cross-chain
                transactions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <UserCheck className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">User-Friendly Workflow</h3>
              <p className="text-gray-600">
                Create invoices easily, pay using Near Wallet, and settle on your desired chain with a simple, intuitive
                interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Create Invoice</h3>
                <p className="text-gray-600">Generate a professional invoice with our easy-to-use invoice creator.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Pay with Near Wallet</h3>
                <p className="text-gray-600">Connect your Near wallet and make a payment with just a few clicks.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Settle on Any Chain</h3>
                <p className="text-gray-600">Choose your preferred blockchain for settlement using Near Intents.</p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link href="/invoice-generator">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                  Try It Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">How does ZECPay ensure privacy?</h3>
              <p className="text-gray-600">
                ZECPay leverages Zcash&apos;s shielded transaction technology to ensure that payment details remain private.
                Your on-chain activity is not exposed, protecting your financial privacy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">What blockchains can I settle payments on?</h3>
              <p className="text-gray-600">
                With Near Intents, you can settle payments on various blockchains including Ethereum, Solana, Polygon,
                and more. The cross-chain settlement process is seamless and user-friendly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Do I need a Near wallet to use ZECPay?</h3>
              <p className="text-gray-600">
                Yes, a Near wallet is required for the payment process. However, you can settle the payment on your
                preferred blockchain, not just Near.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Are there any fees for using ZECPay?</h3>
              <p className="text-gray-600">
                ZECPay charges a small fee for facilitating cross-chain settlements. Standard network fees for the
                blockchains involved will also apply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="bg-black text-white w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm">
                ZP
              </div>
              <span className="font-semibold">ZECPay</span>
            </div>

            <div className="flex gap-8">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </div>

            <div className="mt-6 md:mt-0 text-sm text-gray-500">© 2025 ZECPay. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

