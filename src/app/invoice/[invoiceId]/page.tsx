"use client";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Invoice = () => {
  const supabase = createClient();
  const { invoiceId } = useParams();

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
        console.log("Invoice data:", data);
      }
    };

    fetchInvoice();
  }, [invoiceId, supabase]);

  const saveInvoice = async () => {
    const newInvoiceId = uuidv4();
    const { data, error } = await supabase
      .from("invoices")
      .insert([{ invoice_id: newInvoiceId }])
      .select("*");

    if (error) {
      console.error("Error saving invoice:", error);
    } else {
      console.log("Invoice saved successfully:", data);
    }
  };

  return (
    <div>
      <p>Invoice ID: {invoiceId}</p>
      <button onClick={async () => await saveInvoice()}>Click me</button>
      {/* <h1>Invoice #{data.id}</h1>
      <p>Date: {data.date}</p>
      <p>Amount: {data.amount}</p>
      <p>Status: {data.status}</p> */}
      {/* Add more fields as needed */}
    </div>
  );
};

export default Invoice;
