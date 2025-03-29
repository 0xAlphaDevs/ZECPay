export interface InvoiceType {
  created_at: string;
  invoice_id: string;
  company: Company;
  client: Client;
  items: Item[];
  payment: Payment;
  review: Review;
  paid: boolean;
}

export interface Company {
  name: string;
  address: string;
  email: string;
}

export interface Client {
  name: string;
  address: string;
  email: string;
}

export interface Item {
  description: string;
  quantity: number;
  unit_price: number;
}

export interface Payment {
  wallet_address: string;
}

export interface Review {
  invoice_number: string;
  issue_date: string;
  due_date: string;
}
