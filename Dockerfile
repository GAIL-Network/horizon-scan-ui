# -------- Base --------
FROM node:18-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@8 --activate

# -------- Dependencies --------
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# -------- Build --------
FROM base AS builder

# ---- Accept NEXT_PUBLIC vars at build time ----
ARG NEXT_PUBLIC_COMPLIANCE_LIVE_API_BASE_URL
ARG NEXT_PUBLIC_HORIZON_SCAN_API_BASE_URL
ARG NEXT_PUBLIC_USE_MOCK_IA

# ---- Expose to Next.js build ----
ENV NEXT_PUBLIC_COMPLIANCE_LIVE_API_BASE_URL=$NEXT_PUBLIC_COMPLIANCE_LIVE_API_BASE_URL
ENV NEXT_PUBLIC_HORIZON_SCAN_API_BASE_URL=$NEXT_PUBLIC_HORIZON_SCAN_API_BASE_URL
ENV NEXT_PUBLIC_USE_MOCK_IA=$NEXT_PUBLIC_USE_MOCK_IA

# ---- Fail fast if missing ----
RUN test -n "$NEXT_PUBLIC_COMPLIANCE_LIVE_API_BASE_URL"
RUN test -n "$NEXT_PUBLIC_HORIZON_SCAN_API_BASE_URL"
RUN test -n "$NEXT_PUBLIC_USE_MOCK_IA"

# ---- Debug visibility (safe to keep or remove later) ----
RUN echo "COMPLIANCE API=$NEXT_PUBLIC_COMPLIANCE_LIVE_API_BASE_URL"
RUN echo "HORIZON API=$NEXT_PUBLIC_HORIZON_SCAN_API_BASE_URL"
RUN echo "USE MOCK IA=$NEXT_PUBLIC_USE_MOCK_IA"

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# -------- Runtime --------
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Non-root user
RUN addgroup -g 1001 -S nodejs \
 && adduser -S nextjs -u 1001

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
