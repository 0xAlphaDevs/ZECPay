"use client";

import { InvoiceType } from "@/lib/types";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

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

      {/* Add pay now button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePay}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
        >
          Pay Now
        </button>
      </div>

      {/* Put this in modal : TO DO */}

      <div className="flex flex-col justify-center items-center mt-8">
        <h2>Paying {zecAmount}ZEC</h2>
        <p>Scan QR using your Zashi wallet to pay.</p>
        <QRCodeCanvas value={qrValue} size={200} />
      </div>

      <div className="text-center mt-8 text-xs text-gray-400">
        Powered by ZECPay
      </div>
    </div>
  );
}
