# VELOXPAY PAYMENT GATEWAY - TECHNICAL SPECIFICATION

**version:** 1.0  
**target:** zambian startups (mtn momo, airtel money, visa/mastercard)  
**tech stack:** next.js 14, node.js, postgresql (neon), stripe/flutterwave for settlement, redis for queue management

---

## 1. SYSTEM ARCHITECTURE

### 1.1 Core Components

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT APPLICATIONS                          │
│         (Web / Mobile SDK / Merchant Dashboard)                  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   API GATEWAY (Next.js)                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Authentication & Authorization (JWT + API Keys)          │   │
│  │ Rate Limiting & Throttling (Redis)                       │   │
│  │ Request Validation & Transformation                      │   │
│  │ Webhook Management                                       │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────┬─────────────────────────┬──────────────────┬─────┘
               │                         │                  │
         ┌─────▼──────┐          ┌──────▼──────┐    ┌──────▼──────┐
         │ Transaction │          │   Payment   │    │  Settlement │
         │  Service    │          │   Service   │    │  Service    │
         └─────┬──────┘          └──────┬──────┘    └──────┬──────┘
               │                         │                  │
         ┌─────▼──────┐          ┌──────▼──────┐    ┌──────▼──────┐
         │ PostgreSQL  │          │   MoMo API  │    │   Stripe/   │
         │ (Neon)      │          │  Airtel API │    │  Flutterwave│
         └─────────────┘          └─────────────┘    └─────────────┘
               │
         ┌─────▼──────────────────┐
         │  Redis (Queue/Cache)   │
         └────────────────────────┘
```

### 1.2 Deployment Architecture

```
veloxpay-api/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   ├── transactions/     (POST, GET, webhook callbacks)
│   │   │   │   ├── payments/         (initiate, validate, status)
│   │   │   │   ├── settlements/      (balance, payouts, history)
│   │   │   │   ├── webhooks/         (mtn, airtel, stripe callbacks)
│   │   │   │   └── health/           (system status)
│   │   │   └── auth/                 (login, token refresh)
│   │   └── dashboard/                (merchant portal - next.js routes)
│   ├── lib/
│   │   ├── db.ts                     (prisma client)
│   │   ├── redis.ts                  (redis client)
│   │   ├── payment-processors/
│   │   │   ├── mtn-momo.ts
│   │   │   ├── airtel-money.ts
│   │   │   ├── card-processor.ts
│   │   │   └── settlement.ts
│   │   ├── security/
│   │   │   ├── encryption.ts         (AES-256 for PII)
│   │   │   ├── signature.ts          (HMAC for webhooks)
│   │   │   └── jwt.ts
│   │   ├── queue/
│   │   │   ├── payment-queue.ts      (Bull/BullMQ)
│   │   │   └── settlement-queue.ts
│   │   └── utils/
│   │       ├── validators.ts
│   │       ├── formatters.ts
│   │       └── errors.ts
│   └── middleware/
│       ├── auth.ts
│       ├── rate-limit.ts
│       └── error-handler.ts
├── prisma/
│   └── schema.prisma                 (database models)
└── .env.example
```

---

## 2. DATABASE SCHEMA (PRISMA)

```prisma
// User/Merchant Model
model Merchant {
  id                String        @id @default(cuid())
  businessName      String
  email             String        @unique
  phoneNumber       String
  country           String        @default("ZM")
  businessType      String        // e-commerce, saas, service, etc
  
  // API Keys
  apiKey            String        @unique
  apiSecret         String        @db.VarChar(1000)  // encrypted
  
  // Settlement Account
  settlementBank    String?
  settlementAccount String?       // encrypted
  
  // KYC/Verification
  kycStatus         String        @default("pending")  // pending, verified, rejected
  kycDocuments      Json?
  
  // Settings
  webhookUrl        String?
  webhookSecret     String?       // encrypted
  
  // Limits
  dailyLimit        Int           @default(50000000)  // in ZMW (50M)
  monthlyLimit      Int           @default(500000000) // in ZMW (500M)
  
  // Tracking
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt
  
  // Relations
  transactions      Transaction[]
  settlements       Settlement[]
  webhookLogs       WebhookLog[]
  apiLogs           ApiLog[]
}

// Transaction Model
model Transaction {
  id                String        @id @default(cuid())
  
  // Transaction Details
  merchantId        String
  merchant          Merchant      @relation(fields: [merchantId], references: [id], onDelete: Cascade)
  
  reference         String        @unique  // merchant's order ID
  amount            BigInt        // in ZMW (satoshi-like precision)
  currency          String        @default("ZMW")
  description       String?
  
  // Payer Details
  payerPhone        String        // encrypted
  payerName         String?
  payerEmail        String?
  
  // Payment Method
  paymentMethod     String        // "mtn_momo", "airtel_money", "visa", "mastercard"
  paymentNetwork    String?       // "MTN", "AIRTEL", "VISA", "MASTERCARD"
  
  // Card-specific (if applicable)
  cardToken         String?       // tokenized card
  cardLast4         String?
  cardBrand         String?
  
  // Status Flow
  status            String        @default("pending")  // pending, processing, completed, failed, expired
  statusHistory     Json          @default("[]")  // array of {status, timestamp, reason}
  
  // Payment Gateway Response
  gatewayRef        String?       // MTN/Airtel/Stripe reference
  gatewayResponse   Json?         // full gateway response (stored for debugging)
  
  // Retry Tracking
  retryCount        Int           @default(0)
  maxRetries        Int           @default(3)
  nextRetryAt       DateTime?
  
  // Fees & Settlement
  processingFee     BigInt        // in ZMW
  settlementAmount  BigInt        // amount - fee
  
  // Timestamps
  initiatedAt       DateTime      @default(now())
  completedAt       DateTime?
  expiredAt         DateTime?
  
  // Idempotency
  idempotencyKey    String?
  
  // Relations
  payments          Payment[]
  settlements       Settlement[]
  webhookEvents     WebhookEvent[]
  
  @@index([merchantId])
  @@index([reference])
  @@index([status])
  @@index([paymentMethod])
  @@index([createdAt])
}

// Payment Model (detailed payment attempt)
model Payment {
  id                String        @id @default(cuid())
  
  transactionId     String
  transaction       Transaction   @relation(fields: [transactionId], references: [id], onDelete: Cascade)
  
  // Payment Processor
  processor         String        // "mtn", "airtel", "stripe", "flutterwave"
  processorRef      String?       // payment ID from processor
  
  // Status
  status            String        @default("initiated")  // initiated, pending, completed, failed
  
  // Response from Processor
  processorResponse Json?
  errorCode         String?
  errorMessage      String?
  
  // Timestamps
  initiatedAt       DateTime      @default(now())
  completedAt       DateTime?
  
  @@index([transactionId])
  @@index([processor])
}

// Settlement Model
model Settlement {
  id                String        @id @default(cuid())
  
  merchantId        String
  merchant          Merchant      @relation(fields: [merchantId], references: [id], onDelete: Cascade)
  
  // Settlement Details
  totalAmount       BigInt        // gross amount
  totalFees         BigInt        // total fees deducted
  netAmount         BigInt        // amount to be paid
  currency          String        @default("ZMW")
  
  // Batching
  transactionIds    String[]      // transactions included in this settlement
  transactionCount  Int
  
  // Status
  status            String        @default("pending")  // pending, processing, completed, failed
  processorRef      String?       // stripe/flutterwave payout ref
  
  // Bank Transfer
  bankAccount       String?       // encrypted
  bankName          String?
  
  // Timestamps
  periodStart       DateTime
  periodEnd         DateTime
  initiatedAt       DateTime      @default(now())
  completedAt       DateTime?
  
  // Retry
  retryCount        Int           @default(0)
  maxRetries        Int           @default(5)
  
  @@index([merchantId])
  @@index([status])
}

// API Log (for debugging and compliance)
model ApiLog {
  id                String        @id @default(cuid())
  
  merchantId        String
  merchant          Merchant      @relation(fields: [merchantId], references: [id], onDelete: Cascade)
  
  method            String        // GET, POST, etc
  endpoint          String
  statusCode        Int
  
  requestBody       Json?         // sanitized (no secrets)
  responseBody      Json?         // sanitized
  
  ipAddress         String
  userAgent         String?
  
  duration          Int           // milliseconds
  
  createdAt         DateTime      @default(now())
  
  @@index([merchantId])
  @@index([createdAt])
}

// Webhook Event Log
model WebhookEvent {
  id                String        @id @default(cuid())
  
  transactionId     String
  transaction       Transaction   @relation(fields: [transactionId], references: [id], onDelete: Cascade)
  
  merchantId        String
  eventType         String        // payment.completed, payment.failed, settlement.completed
  
  payload           Json
  deliveryStatus    String        @default("pending")  // pending, sent, failed
  deliveryAttempts  Int           @default(0)
  nextRetryAt       DateTime?
  
  sentAt            DateTime?
  responseStatus    Int?
  responseBody      String?
  
  createdAt         DateTime      @default(now())
  
  @@index([merchantId])
  @@index([eventType])
}

// Webhook Log (for transparency)
model WebhookLog {
  id                String        @id @default(cuid())
  
  merchantId        String
  merchant          Merchant      @relation(fields: [merchantId], references: [id], onDelete: Cascade)
  
  url               String
  eventType         String
  payload           Json
  
  httpStatus        Int?
  response          String?
  
  attempt           Int           @default(1)
  nextRetryAt       DateTime?
  
  createdAt         DateTime      @default(now())
  
  @@index([merchantId])
}

// Idempotency Keys (prevent duplicate charges)
model IdempotencyKey {
  id                String        @id @default(cuid())
  
  merchantId        String
  key               String        @unique
  
  response          Json          // cached response
  
  createdAt         DateTime      @default(now())
  expiresAt         DateTime      // 24 hours
  
  @@index([merchantId])
  @@index([expiresAt])
}

// Rate Limiting
model RateLimit {
  id                String        @id @default(cuid())
  
  merchantId        String
  endpoint          String
  
  requestCount      Int           @default(1)
  windowStart       DateTime      @default(now())
  
  @@unique([merchantId, endpoint])
  @@index([windowStart])
}
```

---

## 3. REST API ENDPOINTS

### 3.1 Authentication

#### POST `/api/v1/auth/register`
Register a new merchant account.

**Request:**
```json
{
  "businessName": "Kaze Solutions",
  "email": "hello@kaze.zm",
  "phoneNumber": "+260976543210",
  "businessType": "e-commerce",
  "password": "secure_password_here"
}
```

**Response:** `201 Created`
```json
{
  "id": "merchant_xyz123",
  "businessName": "Kaze Solutions",
  "apiKey": "pk_live_abc123xyz456",
  "apiSecret": "sk_live_secret_xyz",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/api/v1/auth/login`
Authenticate and get access token.

**Request:**
```json
{
  "email": "hello@kaze.zm",
  "password": "secure_password_here"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_xyz",
  "expiresIn": 3600
}
```

#### POST `/api/v1/auth/refresh`
Refresh access token using refresh token.

**Request:**
```json
{
  "refreshToken": "refresh_token_xyz"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

---

### 3.2 Transactions

#### POST `/api/v1/transactions/initiate`
Initiate a payment transaction.

**Authentication:** Bearer Token or API Key  
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
Idempotency-Key: {unique_request_id}  // Optional, for retry safety
```

**Request:**
```json
{
  "reference": "order_12345",
  "amount": 50000,
  "currency": "ZMW",
  "description": "Premium subscription - monthly",
  "paymentMethod": "mtn_momo",
  "payerPhone": "+260976543210",
  "payerName": "John Doe",
  "payerEmail": "john@example.com",
  "metadata": {
    "userId": "user_123",
    "planId": "premium_annual"
  }
}
```

**Response:** `200 OK`
```json
{
  "transactionId": "txn_abc123",
  "reference": "order_12345",
  "amount": 50000,
  "currency": "ZMW",
  "status": "pending",
  "paymentMethod": "mtn_momo",
  "ussdCode": "*166#",
  "expiresAt": "2024-04-30T10:30:00Z",
  "metadata": {
    "userId": "user_123",
    "planId": "premium_annual"
  }
}
```

**Errors:**
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing/invalid credentials
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Processing error

---

#### GET `/api/v1/transactions/{transactionId}`
Retrieve transaction details.

**Authentication:** Bearer Token or API Key  
**Response:** `200 OK`
```json
{
  "transactionId": "txn_abc123",
  "reference": "order_12345",
  "amount": 50000,
  "status": "completed",
  "paymentMethod": "mtn_momo",
  "payerPhone": "+260976543210",
  "processingFee": 1500,
  "settlementAmount": 48500,
  "completedAt": "2024-04-29T10:15:30Z",
  "statusHistory": [
    {
      "status": "pending",
      "timestamp": "2024-04-29T10:00:00Z"
    },
    {
      "status": "processing",
      "timestamp": "2024-04-29T10:05:00Z"
    },
    {
      "status": "completed",
      "timestamp": "2024-04-29T10:15:30Z"
    }
  ]
}
```

---

#### POST `/api/v1/transactions/{transactionId}/validate`
Validate a payment attempt (check USSD code, PIN, etc).

**Request:**
```json
{
  "pin": "1234",
  "confirmationCode": "xyz789"
}
```

**Response:** `200 OK`
```json
{
  "validated": true,
  "transactionId": "txn_abc123",
  "status": "processing"
}
```

---

#### GET `/api/v1/transactions`
List transactions (with pagination & filtering).

**Query Parameters:**
- `page` (int, default: 1)
- `limit` (int, default: 50, max: 100)
- `status` (string) - pending, completed, failed
- `paymentMethod` (string) - mtn_momo, airtel_money, visa, mastercard
- `startDate` (ISO 8601)
- `endDate` (ISO 8601)

**Response:** `200 OK`
```json
{
  "page": 1,
  "limit": 50,
  "total": 200,
  "transactions": [
    {
      "transactionId": "txn_abc123",
      "reference": "order_12345",
      "amount": 50000,
      "status": "completed",
      "paymentMethod": "mtn_momo",
      "completedAt": "2024-04-29T10:15:30Z"
    }
    // ... more transactions
  ]
}
```

---

### 3.3 Payments (Detailed)

#### GET `/api/v1/transactions/{transactionId}/payments`
Get all payment attempts for a transaction.

**Response:** `200 OK`
```json
{
  "transactionId": "txn_abc123",
  "payments": [
    {
      "paymentId": "pay_123",
      "processor": "mtn",
      "status": "completed",
      "processorRef": "mtn_ref_xyz",
      "initiatedAt": "2024-04-29T10:00:00Z",
      "completedAt": "2024-04-29T10:15:30Z"
    }
  ]
}
```

---

### 3.4 Settlements

#### GET `/api/v1/settlements/balance`
Get merchant's current balance and settlement info.

**Authentication:** Bearer Token or API Key  
**Response:** `200 OK`
```json
{
  "balance": {
    "available": 487500,
    "pending": 50000,
    "reserved": 0,
    "currency": "ZMW"
  },
  "lastSettlement": {
    "settledAt": "2024-04-28T23:00:00Z",
    "amount": 500000
  },
  "nextSettlementDate": "2024-04-30T23:00:00Z"
}
```

---

#### GET `/api/v1/settlements`
List settlement history.

**Query Parameters:**
- `page` (int, default: 1)
- `limit` (int, default: 50)
- `status` (string) - pending, processing, completed, failed

**Response:** `200 OK`
```json
{
  "page": 1,
  "limit": 50,
  "total": 24,
  "settlements": [
    {
      "settlementId": "sett_abc123",
      "amount": 500000,
      "fee": 5000,
      "netAmount": 495000,
      "status": "completed",
      "periodStart": "2024-04-27T00:00:00Z",
      "periodEnd": "2024-04-27T23:59:59Z",
      "completedAt": "2024-04-28T23:00:00Z",
      "bankAccount": "**** **** **** 5678"
    }
  ]
}
```

---

#### POST `/api/v1/settlements/payout`
Request immediate payout (if available).

**Request:**
```json
{
  "amount": 200000,
  "reason": "emergency_withdrawal"
}
```

**Response:** `202 Accepted`
```json
{
  "payoutId": "payout_xyz123",
  "amount": 200000,
  "status": "processing",
  "estimatedArrival": "2024-04-29T18:00:00Z"
}
```

---

### 3.5 Webhooks

#### POST `/api/v1/webhooks/register`
Register a webhook endpoint.

**Request:**
```json
{
  "url": "https://kaze.zm/webhooks/veloxpay",
  "events": ["payment.completed", "payment.failed", "settlement.completed"],
  "active": true
}
```

**Response:** `201 Created`
```json
{
  "webhookId": "webhook_abc123",
  "url": "https://kaze.zm/webhooks/veloxpay",
  "secret": "whsec_xyz123abc",
  "events": ["payment.completed", "payment.failed", "settlement.completed"]
}
```

---

#### GET `/api/v1/webhooks`
List registered webhooks.

**Response:** `200 OK`
```json
{
  "webhooks": [
    {
      "webhookId": "webhook_abc123",
      "url": "https://kaze.zm/webhooks/veloxpay",
      "events": ["payment.completed", "payment.failed"],
      "active": true,
      "createdAt": "2024-04-20T10:00:00Z"
    }
  ]
}
```

---

#### GET `/api/v1/webhooks/{webhookId}/logs`
View webhook delivery logs.

**Query Parameters:**
- `page` (int)
- `limit` (int)
- `status` (string) - sent, failed, pending

**Response:** `200 OK`
```json
{
  "webhookId": "webhook_abc123",
  "page": 1,
  "limit": 50,
  "logs": [
    {
      "eventId": "evt_123",
      "eventType": "payment.completed",
      "status": "sent",
      "attempt": 1,
      "httpStatus": 200,
      "sentAt": "2024-04-29T10:15:35Z"
    }
  ]
}
```

---

#### POST `/api/v1/webhooks/{webhookId}/retry`
Manually retry a failed webhook delivery.

**Response:** `202 Accepted`
```json
{
  "eventId": "evt_123",
  "status": "pending_retry",
  "nextRetryAt": "2024-04-29T10:20:00Z"
}
```

---

### 3.6 Card Tokenization (PCI-DSS Compliant)

#### POST `/api/v1/payments/tokenize-card`
Tokenize a card (client-side should use iframe/hosted form).

**Request:**
```json
{
  "cardNumber": "4532015112830366",
  "expiryMonth": 12,
  "expiryYear": 2026,
  "cvv": "123",
  "cardholderName": "John Doe"
}
```

**Response:** `200 OK`
```json
{
  "cardToken": "card_tok_abc123xyz",
  "last4": "0366",
  "brand": "visa",
  "expiryMonth": 12,
  "expiryYear": 2026
}
```

---

### 3.7 Health & Status

#### GET `/api/v1/health`
System health check (no authentication required).

**Response:** `200 OK`
```json
{
  "status": "healthy",
  "timestamp": "2024-04-29T10:30:00Z",
  "services": {
    "database": "healthy",
    "mtnApi": "healthy",
    "airtelApi": "healthy",
    "stripeApi": "healthy",
    "redis": "healthy"
  }
}
```

---

## 4. WEBHOOK PAYLOAD STRUCTURES

### Payment Completed
```json
{
  "event": "payment.completed",
  "timestamp": "2024-04-29T10:15:30Z",
  "data": {
    "transactionId": "txn_abc123",
    "merchantId": "merchant_xyz123",
    "reference": "order_12345",
    "amount": 50000,
    "currency": "ZMW",
    "paymentMethod": "mtn_momo",
    "payerPhone": "+260976543210",
    "status": "completed",
    "processingFee": 1500,
    "settlementAmount": 48500,
    "metadata": {
      "userId": "user_123",
      "planId": "premium_annual"
    }
  }
}
```

### Payment Failed
```json
{
  "event": "payment.failed",
  "timestamp": "2024-04-29T10:05:00Z",
  "data": {
    "transactionId": "txn_abc123",
    "merchantId": "merchant_xyz123",
    "reference": "order_12345",
    "amount": 50000,
    "currency": "ZMW",
    "paymentMethod": "mtn_momo",
    "status": "failed",
    "errorCode": "insufficient_funds",
    "errorMessage": "Customer has insufficient balance",
    "metadata": {}
  }
}
```

### Settlement Completed
```json
{
  "event": "settlement.completed",
  "timestamp": "2024-04-28T23:00:00Z",
  "data": {
    "settlementId": "sett_abc123",
    "merchantId": "merchant_xyz123",
    "totalAmount": 500000,
    "totalFees": 5000,
    "netAmount": 495000,
    "transactionCount": 12,
    "periodStart": "2024-04-27T00:00:00Z",
    "periodEnd": "2024-04-27T23:59:59Z",
    "bankAccount": "**** **** **** 5678"
  }
}
```

---

## 5. PAYMENT PROCESSORS INTEGRATION

### 5.1 MTN Mobile Money

#### API Endpoint
- **Sandbox:** `https://sandbox.momoapi.mtn.com`
- **Production:** `https://api.mtn.com`

#### Flow
1. Merchant initiates payment via veloxpay API
2. VeloxPay calls MTN API with consumer phone number
3. Customer receives USSD prompt on phone
4. Customer enters PIN to authorize
5. MTN sends callback to VeloxPay webhook
6. VeloxPay updates transaction status and notifies merchant

#### Implementation Details
```typescript
// src/lib/payment-processors/mtn-momo.ts

interface MTNPaymentRequest {
  amount: string;
  currency: string;
  externalId: string;  // veloxpay transaction ID
  payer: {
    partyIdType: 'MSISDN';
    partyId: string;    // +260976543210
  };
  payerMessage: string;
  payeeNote: string;
}

interface MTNPaymentResponse {
  financialTransactionId: string;
  status: 'PENDING' | 'SUCCESSFUL' | 'FAILED';
}

async function initiatePayment(request: MTNPaymentRequest): Promise<MTNPaymentResponse> {
  const subscriptionKey = process.env.MTN_SUBSCRIPTION_KEY;
  const apiUser = process.env.MTN_API_USER;
  const apiKey = process.env.MTN_API_KEY;
  
  const response = await fetch(`${MTN_API_BASE}/collection/v1_0/requesttopay`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${generateMTNToken()}`,
      'X-Reference-Id': request.externalId,
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    },
    body: JSON.stringify(request),
  });
  
  const data = await response.json();
  return data;
}

async function checkPaymentStatus(transactionId: string): Promise<MTNPaymentResponse> {
  const subscriptionKey = process.env.MTN_SUBSCRIPTION_KEY;
  
  const response = await fetch(
    `${MTN_API_BASE}/collection/v1_0/requesttopay/${transactionId}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${generateMTNToken()}`,
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
    }
  );
  
  return response.json();
}
```

#### Error Codes
- `PAYER_NOT_FOUND` - Customer phone not registered with MTN
- `NOT_ENOUGH_FUNDS` - Customer has insufficient balance
- `DECLINED` - Request declined by MTN system
- `TIMEOUT` - Request timed out

---

### 5.2 Airtel Money

#### API Endpoint
- **Sandbox:** `https://sandbox.airtel.co.zm`
- **Production:** `https://api.airtel.co.zm`

#### Flow (Similar to MTN, but different API structure)

```typescript
// src/lib/payment-processors/airtel-money.ts

interface AirtelPaymentRequest {
  reference: string;        // veloxpay transaction ID
  subscriber: {
    country: 'ZM';
    currency: 'ZMW';
    msisdn: string;        // 260976543210 (without +)
  };
  transaction: {
    amount: string;
    country: 'ZM';
    currency: 'ZMW';
    id: string;            // unique transaction ID
    type: 'MobileMoneyReceiptTransaction';
  };
}

async function initiatePayment(request: AirtelPaymentRequest): Promise<object> {
  const clientId = process.env.AIRTEL_CLIENT_ID;
  const clientSecret = process.env.AIRTEL_CLIENT_SECRET;
  
  const token = await getAirtelToken(clientId, clientSecret);
  
  const response = await fetch(`${AIRTEL_API_BASE}/standard/v1/payments/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  
  return response.json();
}
```

---

### 5.3 Card Processing (Stripe/Flutterwave)

#### Card Payment Flow
1. Client tokenizes card on frontend (never send raw card data to your server)
2. Client sends cardToken + transactionId to backend
3. Backend calls Stripe/Flutterwave to charge card
4. Processor sends webhook confirmation
5. VeloxPay updates transaction and notifies merchant

```typescript
// src/lib/payment-processors/card-processor.ts

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function chargeCard(
  cardToken: string,
  amount: number,      // in ZMW
  description: string,
  transactionId: string
): Promise<object> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),  // convert to cents
      currency: 'usd',  // or use Stripe's ZWL if available
      payment_method: cardToken,
      confirm: true,
      metadata: {
        transactionId,
        merchantId: process.env.MERCHANT_ID,
      },
      description,
    });
    
    return {
      success: true,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
```

---

### 5.4 Settlement (Stripe Payouts)

```typescript
// src/lib/payment-processors/settlement.ts

async function initiatePayout(
  amount: number,
  bankAccount: string,
  merchantId: string
): Promise<object> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  
  try {
    // Create connected account for merchant (or use existing)
    const account = await stripe.accounts.retrieve(merchantId);
    
    // Initiate payout
    const payout = await stripe.payouts.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
    }, {
      stripeAccount: account.id,
    });
    
    return {
      success: true,
      payoutId: payout.id,
      status: payout.status,  // succeeded, pending, in_transit, paid, failed
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
```

---

## 6. SECURITY

### 6.1 API Key Management
- **Public Key (pk_live_xxx)**: Client-side, can be exposed
- **Secret Key (sk_live_xxx)**: Server-side only, never expose
- Rotate keys regularly, support key versioning
- Rate limiting per API key (default: 1000 req/min)

### 6.2 Encryption
- **PII Data (phone, card, account)**: AES-256-GCM
- **API Secrets**: Hashed using bcrypt + salt
- **Webhook Secrets**: HMAC-SHA256

```typescript
// src/lib/security/encryption.ts

import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;

export function encrypt(plaintext: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${encrypted}:${authTag.toString('hex')}`;
}

export function decrypt(ciphertext: string): string {
  const [iv, encrypted, authTag] = ciphertext.split(':');
  const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY, 'hex'), Buffer.from(iv, 'hex'));
  
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

export function signWebhook(payload: object, secret: string): string {
  return crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex');
}
```

### 6.3 PCI-DSS Compliance
- Never store raw card data
- Use tokenization (Stripe Tokens, Virtual Cards)
- All card data in transit must be TLS 1.2+
- Regular security audits
- Implement 3D Secure for card transactions

### 6.4 Rate Limiting
```typescript
// src/middleware/rate-limit.ts

import { RateLimitStore } from 'rate-limit-redis';
import RedisStore from 'rate-limit-redis';
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  store: new RateLimitStore({
    client: redisClient,
    prefix: 'veloxpay:rate_limit:',
  }),
  windowMs: 60 * 1000,  // 1 minute
  max: 100,              // 100 requests per minute
  skip: (req) => req.user?.isAdmin,  // exempt admins
});
```

### 6.5 CORS & CSRF
```typescript
// src/middleware/security.ts

export const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['https://yourdomain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// CSRF token middleware for state-changing operations
export function verifyCsrfToken(req: NextRequest) {
  const token = req.headers.get('x-csrf-token');
  const storedToken = req.cookies.get('csrf_token')?.value;
  
  if (!token || token !== storedToken) {
    throw new Error('CSRF token validation failed');
  }
}
```

---

## 7. ERROR HANDLING & STATUS CODES

### Standard HTTP Status Codes
- `200 OK` - Request succeeded
- `201 Created` - Resource created
- `202 Accepted` - Request accepted, async processing
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing/invalid credentials
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Idempotency conflict (duplicate request)
- `422 Unprocessable Entity` - Business logic validation failed
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error
- `503 Service Unavailable` - Maintenance/degradation

### Error Response Format
```json
{
  "error": {
    "code": "INSUFFICIENT_FUNDS",
    "message": "Customer does not have enough balance to complete this transaction",
    "details": {
      "required": 50000,
      "available": 25000
    },
    "requestId": "req_abc123xyz"
  }
}
```

### Business Logic Error Codes
- `INVALID_MERCHANT` - Merchant not found or inactive
- `INVALID_AMOUNT` - Amount out of range
- `MERCHANT_LIMIT_EXCEEDED` - Daily/monthly limit exceeded
- `PAYMENT_METHOD_DISABLED` - Payment method not enabled for merchant
- `CUSTOMER_NOT_FOUND` - Phone number not registered with provider
- `INSUFFICIENT_FUNDS` - Customer doesn't have enough balance
- `INVALID_CARD` - Card is invalid or expired
- `DUPLICATE_TRANSACTION` - Transaction already exists (idempotency)
- `SETTLEMENT_IN_PROGRESS` - Cannot process request during settlement
- `WEBHOOK_VERIFICATION_FAILED` - Webhook signature invalid

---

## 8. SETTLEMENT LOGIC

### Daily Settlement (T+1)
- **Batch Time:** 23:00 UTC daily (adjust for ZM timezone)
- **Batching:** Group all transactions from previous 24 hours
- **Fee Calculation:**
  - MTN MoMo: 1.5% of transaction amount (min ZMW 50, max ZMW 5000)
  - Airtel Money: 1.8% of transaction amount (min ZMW 50, max ZMW 5000)
  - Visa/Mastercard: 2.5% of transaction amount (min ZMW 100)
- **Processing:**
  1. Calculate total amount & fees
  2. Create settlement record with status "pending"
  3. Call Stripe/payment provider to initiate payout
  4. Wait for confirmation webhook
  5. Update settlement status to "completed"
  6. Send merchant webhook notification

### Settlement Retry Logic
```typescript
// Settlement processor with exponential backoff

async function processSettlements() {
  const pendingSettlements = await db.settlement.findMany({
    where: {
      status: 'pending',
      retryCount: { lt: maxRetries },
      nextRetryAt: { lte: new Date() },
    },
  });
  
  for (const settlement of pendingSettlements) {
    try {
      const payout = await initiatePayout(
        settlement.netAmount,
        settlement.bankAccount,
        settlement.merchantId
      );
      
      await db.settlement.update({
        where: { id: settlement.id },
        data: {
          status: 'processing',
          processorRef: payout.payoutId,
        },
      });
    } catch (error) {
      const retryCount = settlement.retryCount + 1;
      const nextRetryAt = new Date(Date.now() + exponentialBackoff(retryCount));
      
      await db.settlement.update({
        where: { id: settlement.id },
        data: {
          retryCount,
          nextRetryAt,
        },
      });
    }
  }
}

function exponentialBackoff(attempt: number): number {
  // 5 min, 15 min, 45 min, 2 hours, 6 hours
  return Math.pow(3, Math.min(attempt, 4)) * 5 * 60 * 1000;
}
```

---

## 9. IMPLEMENTATION ROADMAP

### Phase 1 (Week 1-2): Core Infrastructure
- [ ] Next.js project setup with TypeScript
- [ ] PostgreSQL schema & Prisma ORM
- [ ] JWT authentication & API key management
- [ ] Rate limiting & middleware
- [ ] Error handling & logging

### Phase 2 (Week 3-4): Transaction Engine
- [ ] POST `/api/v1/transactions/initiate`
- [ ] GET `/api/v1/transactions/{id}`
- [ ] Idempotency key implementation
- [ ] Transaction status flow machine

### Phase 3 (Week 5-6): Payment Processors
- [ ] MTN Mobile Money integration
- [ ] Airtel Money integration
- [ ] Webhook callback handlers
- [ ] Status polling & retry logic

### Phase 4 (Week 7-8): Card Payments
- [ ] Stripe integration
- [ ] Card tokenization endpoint
- [ ] 3D Secure flow
- [ ] Card transaction processing

### Phase 5 (Week 9-10): Settlement
- [ ] Settlement batching logic
- [ ] Stripe payout integration
- [ ] Settlement retry mechanism
- [ ] Merchant notifications

### Phase 6 (Week 11-12): Dashboard & Testing
- [ ] Merchant dashboard (Next.js routes)
- [ ] Real-time transaction analytics
- [ ] Full test coverage (Jest + Supertest)
- [ ] Load testing & optimization

---

## 10. DEPLOYMENT

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:password@neon.tech/veloxpay?schema=public

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRY=3600

# Encryption
ENCRYPTION_KEY=your_32_char_hex_key

# MTN Mobile Money
MTN_API_BASE=https://sandbox.momoapi.mtn.com
MTN_SUBSCRIPTION_KEY=your_key
MTN_API_USER=your_api_user
MTN_API_KEY=your_api_key

# Airtel Money
AIRTEL_API_BASE=https://sandbox.airtel.co.zm
AIRTEL_CLIENT_ID=your_client_id
AIRTEL_CLIENT_SECRET=your_client_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...

# Flutterwave (Alternative)
FLUTTERWAVE_SECRET_KEY=sk_test_...

# Application
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://api.veloxpay.com
ALLOWED_ORIGINS=https://veloxpay.com,https://app.veloxpay.com

# Email (for notifications)
SENDGRID_API_KEY=your_key
ADMIN_EMAIL=admin@veloxpay.com
```

### Docker Deployment
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source
COPY . .

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### Kubernetes Deployment (Optional)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: veloxpay-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: veloxpay-api
  template:
    metadata:
      labels:
        app: veloxpay-api
    spec:
      containers:
      - name: api
        image: veloxpay-api:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: veloxpay-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            configMapKeyRef:
              name: veloxpay-config
              key: redis-url
        resources:
          limits:
            memory: "512Mi"
            cpu: "500m"
          requests:
            memory: "256Mi"
            cpu: "250m"
        livenessProbe:
          httpGet:
            path: /api/v1/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
```

---

## 11. MONITORING & OBSERVABILITY

### Structured Logging
```typescript
import { pino } from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

// Usage
logger.info({
  transactionId: 'txn_123',
  amount: 50000,
  status: 'completed',
  timestamp: new Date(),
});
```

### Metrics (Prometheus)
- Transaction success rate
- Average processing time
- Settlement latency
- API error rate
- Database query performance

### Alerting
- Payment processor API down
- Settlement failure rate > 5%
- API error rate > 1%
- Response time > 2s
- Database connection pool exhausted

---

## 12. TESTING STRATEGY

### Unit Tests (Jest)
```typescript
describe('MTN Payment Processor', () => {
  test('should initiate payment with valid request', async () => {
    const request: MTNPaymentRequest = {
      amount: '50000',
      currency: 'ZMW',
      externalId: 'txn_123',
      payer: { partyIdType: 'MSISDN', partyId: '+260976543210' },
      payerMessage: 'Payment',
      payeeNote: 'Order 12345',
    };
    
    const response = await initiatePayment(request);
    expect(response.status).toBe('PENDING');
  });
});
```

### Integration Tests
```typescript
describe('POST /api/v1/transactions/initiate', () => {
  test('should create transaction and return transaction ID', async () => {
    const response = await request(app)
      .post('/api/v1/transactions/initiate')
      .set('Authorization', `Bearer ${merchantToken}`)
      .send({
        reference: 'order_12345',
        amount: 50000,
        paymentMethod: 'mtn_momo',
        payerPhone: '+260976543210',
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('transactionId');
  });
});
```

### Load Testing (Artillery)
```yaml
config:
  target: 'https://api.veloxpay.com'
  phases:
    - duration: 60
      arrivalRate: 10
    - duration: 120
      arrivalRate: 50
    - duration: 60
      arrivalRate: 100

scenarios:
  - name: 'Payment Flow'
    flow:
      - post:
          url: '/api/v1/transactions/initiate'
          json:
            reference: 'order_{{ $randomNumber(1, 1000000) }}'
            amount: 50000
            paymentMethod: 'mtn_momo'
            payerPhone: '+260976543210'
```

---

## APPENDIX: Quick Reference

### Fee Structure
| Payment Method | Fee | Min | Max |
|---|---|---|---|
| MTN MoMo | 1.5% | ZMW 50 | ZMW 5,000 |
| Airtel Money | 1.8% | ZMW 50 | ZMW 5,000 |
| Visa/MC | 2.5% | ZMW 100 | ZMW 10,000 |

### Rate Limits
- Default: 1,000 requests/minute per API key
- Burst: 200 requests/10 seconds
- Settlement API: 10 requests/minute
- Webhook retry: Exponential backoff (5m, 15m, 45m, 2h, 6h)

### Timeouts
- Transaction expiry: 15 minutes
- API request timeout: 30 seconds
- Webhook delivery timeout: 15 seconds
- Settlement polling: 5 seconds (max 1 hour)

### Support & Documentation
- **API Docs:** https://api.veloxpay.com/docs
- **Dashboard:** https://app.veloxpay.com
- **Email Support:** support@veloxpay.com
- **Slack Community:** [invite link]
