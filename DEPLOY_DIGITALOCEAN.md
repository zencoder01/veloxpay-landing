# Deploy VeloxPay Backend on DigitalOcean

## 1. Create managed PostgreSQL
1. In DigitalOcean, create a PostgreSQL cluster.
2. Copy the connection string into `DATABASE_URL`.

## 2. Configure app environment variables
Set these in App Platform:
- `DATABASE_URL`
- `VELOXPAY_WEBHOOK_SECRET`
- `SEED_MERCHANT_API_KEY` (optional for first seed)

## 3. Deploy with App Platform
1. Create App from GitHub repo `zencoder01/veloxpay-landing`.
2. Select branch `main`.
3. Set resource type as `Web Service`.
4. Build command:
`npm ci && npm run prisma:generate && npm run build`
5. Run command:
`npm run start -- -p 8080`
6. HTTP Port: `8080`

## 4. Initialize schema
Run one-time database push/migration:
`npm run prisma:push`

Then seed a test merchant:
`npm run prisma:seed`

## 5. Test health endpoint
`GET /api/v1/health`

## Notes
- Phase 2 currently uses DB-backed API key auth (`x-api-key` header).
- For production, rotate keys and move to encrypted secret management.
