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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Invoice invoiceData={invoiceData as InvoiceType} />
    </div>
  );
};

export default InvoicePage;
