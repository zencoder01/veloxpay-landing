import { CreatePaymentRequest } from "@/lib/veloxpay/types";

const PROVIDERS = new Set(["mtn", "airtel", "zamtel", "visa", "mastercard"]);
const METHODS = new Set(["mobile_money", "card"]);

export function validateCreatePaymentPayload(
  payload: unknown
): { valid: true; data: CreatePaymentRequest } | { valid: false; error: string } {
  if (!payload || typeof payload !== "object") {
    return { valid: false, error: "Invalid payload body." };
  }

  const body = payload as Partial<CreatePaymentRequest>;

  if (typeof body.amount !== "number" || !Number.isInteger(body.amount) || body.amount <= 0) {
    return { valid: false, error: "amount must be a positive integer in ngwee." };
  }

  if (body.currency !== "ZMW") {
    return { valid: false, error: "Only ZMW currency is currently supported." };
  }

  if (!body.method || !METHODS.has(body.method)) {
    return { valid: false, error: "method must be mobile_money or card." };
  }

  if (!body.provider || !PROVIDERS.has(body.provider)) {
    return { valid: false, error: "provider must be mtn, airtel, zamtel, visa, or mastercard." };
  }

  if (!body.customer || typeof body.customer !== "object") {
    return { valid: false, error: "customer object is required." };
  }

  if (body.method === "mobile_money" && !body.customer.phone) {
    return { valid: false, error: "customer.phone is required for mobile money." };
  }

  if (body.callbackUrl && typeof body.callbackUrl !== "string") {
    return { valid: false, error: "callbackUrl must be a valid URL string." };
  }

  return { valid: true, data: body as CreatePaymentRequest };
}
