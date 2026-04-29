# VeloxPay API Beta Endpoints

Base URL: `http://localhost:3000`

POC/Beta behavior:
- Set `POC_MODE=true` to simulate outcomes without moving real money.
- Payment responses include `sandbox_simulated: true` in POC mode.
- Use `Idempotency-Key` header to safely retry create-payment requests.

## Health
`GET /api/v1/health`

## Create payment
`POST /api/v1/payments`

Headers:
- `Content-Type: application/json`
- `x-api-key: <merchant_key>`
- `Idempotency-Key: <unique-per-request>` (recommended)

Body example:
```json
{
  "amount": 85000,
  "currency": "ZMW",
  "method": "mobile_money",
  "provider": "mtn",
  "customer": {
    "phone": "+260977000000"
  },
  "callbackUrl": "https://example.com/webhooks/veloxpay"
}
```

## Get transaction
`GET /api/v1/transactions/:id`

## Merchant signup
`POST /api/v1/merchants/signup`

Body example:
```json
{
  "businessName": "Acme Zambia",
  "email": "owner@acme.co.zm",
  "password": "StrongPass123!"
}
```

## Merchant login
`POST /api/v1/merchants/login`

## Receive webhook callback
`POST /api/v1/webhooks/veloxpay`

Headers:
- `Content-Type: application/json`
- `x-veloxpay-signature: <hex_hmac_sha256>`

Environment variable required:
- `VELOXPAY_WEBHOOK_SECRET`
- `VELOXPAY_JWT_SECRET`
