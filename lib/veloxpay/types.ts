export type PaymentProvider = "mtn" | "airtel" | "zamtel" | "visa" | "mastercard";
export type PaymentMethod = "mobile_money" | "card";
export type PaymentStatus =
  | "pending"
  | "processing"
  | "successful"
  | "failed"
  | "cancelled";

export type CreatePaymentRequest = {
  amount: number;
  currency: "ZMW";
  method: PaymentMethod;
  provider: PaymentProvider;
  customer: {
    phone?: string;
    email?: string;
    name?: string;
  };
  callbackUrl?: string;
  reference?: string;
  metadata?: Record<string, string | number | boolean>;
};

export type Transaction = {
  id: string;
  reference: string;
  amount: number;
  currency: "ZMW";
  method: PaymentMethod;
  provider: PaymentProvider;
  status: PaymentStatus;
  merchantId: string;
  callbackUrl?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: string;
  updatedAt: string;
};
