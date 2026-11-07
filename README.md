# Digital Products Store

Vietnamese digital-goods storefront built with Next.js 15, TypeScript, Prisma and Neon-compatible PostgreSQL.

## Included
- Responsive Vietnamese storefront with demo catalogue and product details.
- Order lookup API with email + order-code matching.
- PostgreSQL schema for products, orders and payment states.
- Health endpoint at `/api/health`.
- Environment variable template; no secrets committed.

## Local setup
1. Copy `.env.example` to `.env` and set PostgreSQL URLs.
2. `npm install`
3. `npx prisma generate`
4. `npx prisma db push` against a disposable development database.
5. `npm run dev`

## Payment safety
VietQR image rendering is not bank-transfer verification. Automated Techcombank reconciliation requires an approved bank-data provider/payment gateway and credentials. MoMo, ZaloPay and VNPay require merchant onboarding and sandbox/production credentials. Verify signed server-to-server callbacks, amount and order reference, and make webhook handling idempotent. Never mark an order paid based on browser redirect or customer-uploaded receipt.

No live gateway is enabled in this initial scaffold. Preview must be configured and tested before Production credentials or migration are used. The sample catalogue is demo content, not live inventory.
