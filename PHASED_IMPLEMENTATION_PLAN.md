# VeloxPay Phased Implementation

## Phase 1: API MVP Scaffold (Completed)
- Next.js App Router API routes under `app/api/v1/*`
- `POST /api/v1/payments` request validation and transaction creation
- `GET /api/v1/transactions/:id` lookup endpoint
- `POST /api/v1/webhooks/veloxpay` HMAC webhook verification
- `GET /api/v1/health` service health endpoint
- Domain types and utility modules in `lib/veloxpay/*`

Current Phase 1 constraints:
- In-memory transaction store only (non-persistent)
- Stub API-key auth only (`x-api-key` presence check)
- No provider-side network calls yet

## Phase 2: Persistence + Merchant Auth
- Add Prisma + PostgreSQL (Neon) schema from `veloxpay-spec.md`
- Replace in-memory store with DB-backed repositories
- Merchant registration + API key issuance/rotation
- Idempotency keys on create-payment endpoint
- Structured error catalog and request correlation IDs
- Add unit/integration tests for core payment flows

## Phase 3: Provider Integrations + Settlement
- MTN/Airtel/Zamtel adapters with retry and timeout policies
- Card processing provider integration (Visa/Mastercard via gateway)
- Redis queues for async processing and retries
- Webhook dispatcher and delivery retries to merchant callback URLs
- Settlement ledger, payout scheduling, and reconciliation jobs

## Phase 4: Security + Operations Hardening
- Rate limiting and abuse controls
- RBAC for dashboard users
- Audit trails for transaction and admin actions
- Alerting, metrics, and incident runbooks
- Compliance review for PCI scope and data retention policies
