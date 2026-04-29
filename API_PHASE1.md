# VeloxPay API Phase 1 Endpoints

Base URL: `http://localhost:3000`

## Health
`GET /api/v1/health`

## Create payment
`POST /api/v1/payments`

Headers:
- `Content-Type: application/json`
- `x-api-key: <merchant_key>`

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

## Receive webhook callback
`POST /api/v1/webhooks/veloxpay`

Headers:
- `Content-Type: application/json`
- `x-veloxpay-signature: <hex_hmac_sha256>`

Environment variable required:
- `VELOXPAY_WEBHOOK_SECRET`
