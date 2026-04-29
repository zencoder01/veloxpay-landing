# VeloxPay Phased Implementation

## Phase 1: Public Beta Safety Rails (Completed)
- `POC_MODE` sandbox simulation responses (`sandbox_simulated`)
- Idempotency-key support for `POST /api/v1/payments`
- Basic in-memory rate limiting
- Request IDs on key write endpoints
- Existing API routes and webhook signing retained

## Phase 2: Merchant Trial Flow (Completed)
- ✅ Self-serve merchant signup endpoint
- ✅ Merchant login endpoint (JWT issue)
- ✅ Test API key generation on signup
- ✅ DB-backed persistence and API-key validation

## Next: Phase 3
- Hosted checkout + payment links + webhook retries + status timeline

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
