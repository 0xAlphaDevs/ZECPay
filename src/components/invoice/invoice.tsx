"use client";

import { InvoiceType } from "@/lib/types";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay
} from "@/components/ui/dialog"


interface InvoiceProps {
  invoiceData: InvoiceType;
}

export function Invoice({ invoiceData }: InvoiceProps) {
  const [qrValue, setQrValue] = useState<string>("");
  const [zecAmount, setZecAmount] = useState<string>("");
  const handlePay = () => {
    // Handle payment logic here
    console.log("Pay button clicked");
  };

  async function getZcashPrice(): Promise<number> {
    // Fetch Zcash price from CoinGecko API
    return await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=zcash&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(`ZEC Price: $${data.zcash.usd}`);
        return data.zcash.usd;
      })
      .catch((error) => {
        console.error("Error fetching ZEC price:", error);
        return 0;
      });
  }

  async function getQrValue() {
    const address = "t1Kw7yg9QE9eLLXiKwy1QhSPeYgAJs5Uiqk";
    const amountInUSD = 1;
    // convert amount to ZEC
    const zecPrice: number = await getZcashPrice();
    if (!zecPrice) {
      console.error("ZEC price is not available");
      setQrValue("");
    }
    const amountInZEC = amountInUSD / zecPrice;
    const amount = amountInZEC.toFixed(4); // 8 decimal places for Zcash
    setZecAmount(amount);
    const qrValue = `zcash:${address}?amount=${amount}`;
    console.log(`QR Value: ${qrValue}`);
    setQrValue(qrValue);
  }

  useEffect(() => {
    // Fetch Zcash price when component mounts
    getQrValue();
  }, []);

  return (
    <div className="my-10 z-10 w-[650px] h-[870px] overflow-auto bg-white rounded-lg shadow-lg p-8 border border-gray-100">
      <div className="flex justify-between mb-8">
        <div>
          <div className="text-xs text-gray-500">INVOICE NO</div>
          <div className="font-medium">
            {invoiceData.review.invoice_number || "000001"}
          </div>
        </div>
        <div className="flex gap-8">
          <div>
            <div className="text-xs text-gray-500">ISSUED</div>
            <div className="font-medium">
              {new Date(invoiceData.review.issue_date).toDateString() ||
                "x/x/xx"}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">DUE DATE</div>
            <div className="font-medium">
              {new Date(invoiceData.review.due_date).toDateString() || "x/x/xx"}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-12">
        <div className="w-[45%]">
          <div className="text-xs text-gray-500 mb-2">FROM</div>
          {invoiceData.company.name ? (
            <div className="border border-gray-200 rounded-md p-4">
              {/* {invoiceData.logo && (
                <div className="mb-3 flex justify-center">
                  <img
                    src={companyDetails.logo || "/placeholder.svg"}
                    alt={`${companyDetails.companyName} logo`}
                    className="max-h-16 max-w-full object-contain"
                  />
                </div>
              )} */}
              <div className="font-medium">{invoiceData.company.name}</div>
              <div className="text-sm text-gray-600 mt-1">
                {invoiceData.company.address && (
                  <div>{invoiceData.company.address}</div>
                )}
                {/* {(companyDetails.city ||
                  companyDetails.state ||
                  companyDetails.zip) && (
                  <div>
                    {companyDetails.city}
                    {companyDetails.city && companyDetails.state ? ", " : ""}
                    {companyDetails.state} {companyDetails.zip}
                  </div>
                )} */}
                {/* {companyDetails.country && <div>{companyDetails.country}</div>} */}
                {invoiceData.company.email && (
                  <div className="mt-2">{invoiceData.company.email}</div>
                )}
                {/* {companyDetails.taxId && (
                  <div className="text-xs mt-2">
                    Tax ID: {companyDetails.taxId}
                  </div>
                )} */}
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-gray-200 rounded-md h-32 flex items-center justify-center">
              <div className="text-center text-gray-400 text-sm">
                <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2"></div>
                <div>Company name</div>
                <div className="text-xs">Company address</div>
              </div>
            </div>
          )}
        </div>
        <div className="w-[45%]">
          <div className="text-xs text-gray-500 mb-2">TO</div>
          {invoiceData.client.name ? (
            <div className="border border-gray-200 rounded-md p-4">
              <div className="font-medium">{invoiceData.client.name}</div>
              <div className="text-sm text-gray-600 mt-1">
                {invoiceData.client.address && (
                  <div>{invoiceData.client.address}</div>
                )}
                {/* {(clientDetails.clientCity ||
                  clientDetails.clientState ||
                  clientDetails.clientZip) && (
                  <div>
                    {clientDetails.clientCity}
                    {clientDetails.clientCity && clientDetails.clientState
                      ? ", "
                      : ""}
                    {clientDetails.clientState} {clientDetails.clientZip}
                  </div>
                )} */}
                {/* {clientDetails.clientCountry && (
                  <div>{clientDetails.clientCountry}</div>
                )} */}
                {invoiceData.client.email && (
                  <div className="mt-2">{invoiceData.client.email}</div>
                )}
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-gray-200 rounded-md h-32 flex items-center justify-center">
              <div className="text-center text-gray-400 text-sm">
                <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2"></div>
                <div>Client name</div>
                <div className="text-xs">Client address</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 text-xs text-gray-500 font-medium">
              DESCRIPTION
            </th>
            <th className="text-center py-2 text-xs text-gray-500 font-medium">
              QTY
            </th>
            <th className="text-center py-2 text-xs text-gray-500 font-medium">
              PRICE
            </th>
            <th className="text-right py-2 text-xs text-gray-500 font-medium">
              AMOUNT
            </th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.length > 0 &&
            invoiceData.items[0].description &&
            invoiceData.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 text-sm">
                  {item.description || "Item description"}
                </td>
                <td className="py-3 text-center text-sm">{item.quantity}</td>
                <td className="py-3 text-center text-sm">
                  ${item.unit_price.toFixed(2)}
                </td>
                <td className="py-3 text-right text-sm">
                  ${item.unit_price.toFixed(2)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-8">
        <div className="w-1/3">
          <div className="flex justify-between py-2">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="font-medium">${Number("100").toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-gray-200">
            <span className="text-sm text-gray-500">Total</span>
            <span className="font-medium">${Number("100").toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-12">
        <div className="w-[45%]">
          <div className="text-xs text-gray-500 mb-2">PAYABLE IN</div>
          <div className="border border-gray-200 rounded-md p-4">
            <div className="font-medium">ZEC (Zcash)</div>
            <div className="text-xs text-gray-500 mt-1">
              Private cryptocurrency payments
            </div>
          </div>
        </div>
        <div className="w-[45%]">
          <div className="text-xs text-gray-500 mb-2">INSTRUCTIONS</div>
          <div className="text-sm text-gray-600">
            <div>Network</div>
            <div className="font-medium">Zcash</div>
            <div className="mt-2">Wallet</div>
            <div className="font-medium break-all">
              {invoiceData.payment.wallet_address || "Enter wallet address"}
            </div>
          </div>
        </div>
      </div>

      {/* pay now button */}
      <div className="flex justify-center mt-8">
        <Dialog>
          <DialogTrigger asChild>
            <button
              onClick={handlePay}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-8 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <span>Pay Now</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13 5L20 12L13 19M4 12H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </DialogTrigger>
          <DialogOverlay className="bg-black/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogContent className="sm:max-w-md rounded-xl border-0 shadow-2xl">
            <DialogHeader className="pb-2">
              <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Pay {zecAmount} ZEC
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-6 items-center py-4">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-2xl shadow-inner">
                <QRCodeCanvas value={qrValue} size={220} />
              </div>
              <div className="text-center space-y-2">
                <p className="text-gray-700">Scan QR code using your Zashi wallet to pay</p>
                <p className="text-sm text-gray-500">Payment will be processed on the Zcash network</p>
              </div>
              <div className="w-full pt-2 flex justify-center">
                <div className="bg-gray-50 rounded-lg px-4 py-2 text-sm text-gray-500 flex items-center gap-2 max-w-xs overflow-hidden">
                  <span className="truncate">
                    {invoiceData.payment.wallet_address || "t1Kw7yg9QE9eLLXiKwy1QhSPeYgAJs5Uiqk"}
                  </span>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        invoiceData.payment.wallet_address || "t1Kw7yg9QE9eLLXiKwy1QhSPeYgAJs5Uiqk",
                      )
                    }
                    className="text-indigo-500 hover:text-indigo-700"
                    title="Copy address"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V17M8 5C8 6.10457 8.89543 7 10 7H14C15.1046 7 16 6.10457 16 5M8 5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5M16 5V7C16 8.10457 16.8954 9 18 9H20C21.1046 9 22 9.89543 22 11V17C22 18.1046 21.1046 19 20 19H18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="text-center mt-8 text-xs text-gray-500 flex items-center justify-center gap-1">
        Powered by
        <span className="font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          ZECPay
        </span>
      </div>
    </div>
  );
}
