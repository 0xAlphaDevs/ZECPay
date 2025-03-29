/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { Invoice } from "@/components/invoice/invoice";
import { InvoiceType } from "@/lib/types";

// import { InvoiceType } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";

const defaultInvoiceData: InvoiceType = {
  created_at: "",
  invoice_id: "",
  company: {
    name: "",
    address: "",
    email: "",
  },
  client: {
    name: "",
    address: "",
    email: "",
  },
  items: [],
  payment: {
    wallet_address: "",
  },
  review: {
    invoice_number: "",
    issue_date: "",
    due_date: "",
  },
  paid: false,
};

const InvoicePage = () => {
  const supabase = createClient();
  const { invoiceId } = useParams();
  const [invoiceData, setInvoiceData] =
    useState<InvoiceType>(defaultInvoiceData);

  useEffect(() => {
    const fetchInvoice = async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("invoice_id", invoiceId?.toString())
        .single();

      if (error) {
        console.error("Error fetching invoice:", error);
      } else {
        console.log("Invoice data fetched from database:", data);
        // set the invoice data
        setInvoiceData(data);
      }
    };

    fetchInvoice();
  }, [invoiceId, supabase]);

  // const saveInvoice = async () => {
  //   const newInvoiceId = uuidv4();
  //   const invoiceData: InvoiceType = {
  //     created_at: new Date().toISOString(),
  //     invoice_id: newInvoiceId,
  //     company: {
  //       name: "Company Name",
  //       address: "Company Address",
  //       email: "test@email.com",
  //     },
  //     client: {
  //       name: "Client Name",
  //       address: "Client Address",
  //       email: "client@email.com",
  //     },
  //     items: [
  //       {
  //         description: "Item 1",
  //         quantity: 2,
  //         unit_price: 100,
  //       },
  //       {
  //         description: "Item 2",
  //         quantity: 1,
  //         unit_price: 200,
  //       },
  //     ],
  //     payment: {
  //       wallet_address: "0x1234567890abcdef1234567890abcdef12345678",
  //     },
  //     review: {
  //       invoice_number: "123",
  //       issue_date: new Date().toISOString(),
  //       due_date: new Date(
  //         new Date().setDate(new Date().getDate() + 30)
  //       ).toISOString(),
  //     },
  //     paid: false,
  //   };
  //   const { data, error } = await supabase
  //     .from("invoices")
  //     .insert([invoiceData])
  //     .select("*");

  //   if (error) {
  //     console.error("Error saving invoice:", error);
  //   } else {
  //     console.log("Invoice saved successfully:", data);
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Invoice invoiceData={invoiceData as InvoiceType} />
    </div>
  );
};

export default InvoicePage;
