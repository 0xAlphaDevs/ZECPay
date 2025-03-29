"use client";

import { InvoiceType } from "@/lib/types";

interface InvoiceProps {
  invoiceData: InvoiceType;
}

export function Invoice({ invoiceData }: InvoiceProps) {
  return (
    <div className="my-10 z-10 w-[650px] h-[800px] overflow-auto bg-white rounded-lg shadow-lg p-8 border border-gray-100">
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
              {invoiceData.review.issue_date || "3/24/25"}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">DUE DATE</div>
            <div className="font-medium">
              {invoiceData.review.due_date || "4/07/25"}
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
            <div className="font-medium">NEAR</div>
            <div className="mt-2">Wallet</div>
            <div className="font-medium break-all">
              {invoiceData.payment.wallet_address || "Enter wallet address"}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-xs text-gray-400">
        Powered by ZECPay
      </div>
    </div>
  );
}
