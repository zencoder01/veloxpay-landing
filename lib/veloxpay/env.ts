export const env = {
  pocMode: process.env.POC_MODE !== "false",
  jwtSecret: process.env.VELOXPAY_JWT_SECRET || "veloxpay-dev-jwt-secret",
};
