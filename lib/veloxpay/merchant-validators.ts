export function validateSignupPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") return "Invalid payload body.";
  const body = payload as { businessName?: string; email?: string; password?: string };
  if (!body.businessName || body.businessName.trim().length < 2) return "businessName is required.";
  if (!body.email || !body.email.includes("@")) return "Valid email is required.";
  if (!body.password || body.password.length < 8) return "password must be at least 8 characters.";
  return null;
}

export function validateLoginPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") return "Invalid payload body.";
  const body = payload as { email?: string; password?: string };
  if (!body.email || !body.email.includes("@")) return "Valid email is required.";
  if (!body.password) return "password is required.";
  return null;
}
