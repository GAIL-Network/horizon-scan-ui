#!/bin/sh
set -e

ENVIRONMENT="$1"

if [ -z "$ENVIRONMENT" ]; then
  echo "Usage: ./scripts/deploy.sh <dev|staging|prod>"
  exit 1
fi

# ---- Resolve project root ----
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# ---- Required deploy config ----
: "${AWS_REGION:?Missing AWS_REGION}"
: "${AWS_ACCOUNT_ID:?Missing AWS_ACCOUNT_ID}"
: "${ECR_REPO:?Missing ECR_REPO}"

ENV_FILE="$PROJECT_ROOT/.env.$ENVIRONMENT"

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE"
  exit 1
fi

IMAGE_TAG="$ENVIRONMENT"
ECR_URI="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO"

echo "▶ Deploying environment: $ENVIRONMENT"
echo "▶ Using env file: $ENV_FILE"
echo "▶ Target ECR repo: $ECR_URI:$IMAGE_TAG"

# ---- Load env vars ----
set -a
. "$ENV_FILE"
set +a

# ---- Fail fast on required NEXT_PUBLIC vars ----
: "${NEXT_PUBLIC_COMPLIANCE_LIVE_API_BASE_URL:?Missing NEXT_PUBLIC_COMPLIANCE_LIVE_API_BASE_URL}"
: "${NEXT_PUBLIC_HORIZON_SCAN_API_BASE_URL:?Missing NEXT_PUBLIC_HORIZON_SCAN_API_BASE_URL}"
: "${NEXT_PUBLIC_USE_MOCK_IA:?Missing NEXT_PUBLIC_USE_MOCK_IA}"
: "${NEXT_PUBLIC_USE_MOCK_RP:?Missing NEXT_PUBLIC_USE_MOCK_RP}"

# ---- Safety: never allow mocks in prod ----
if [ "$ENVIRONMENT" = "prod" ] && [ "$NEXT_PUBLIC_USE_MOCK_IA" = "true" ]; then
  echo "❌ NEXT_PUBLIC_USE_MOCK_IA must be false in prod"
  exit 1
fi

if [ "$ENVIRONMENT" = "prod" ] && [ "$NEXT_PUBLIC_USE_MOCK_RP" = "true" ]; then
  echo "❌ Refusing to deploy with RP mocks enabled in prod"
  exit 1
fi

# ---- Login to ECR ----
aws ecr get-login-password --region "$AWS_REGION" \
  | docker login \
    --username AWS \
    --password-stdin "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

# ---- Build image ----
docker build \
  --build-arg NEXT_PUBLIC_COMPLIANCE_LIVE_API_BASE_URL="$NEXT_PUBLIC_COMPLIANCE_LIVE_API_BASE_URL" \
  --build-arg NEXT_PUBLIC_HORIZON_SCAN_API_BASE_URL="$NEXT_PUBLIC_HORIZON_SCAN_API_BASE_URL" \
  --build-arg NEXT_PUBLIC_USE_MOCK_IA="$NEXT_PUBLIC_USE_MOCK_IA" \
  --build-arg NEXT_PUBLIC_USE_MOCK_RP="$NEXT_PUBLIC_USE_MOCK_RP" \
  -t "$ECR_REPO:$IMAGE_TAG" \
  "$PROJECT_ROOT"

# ---- Tag for ECR ----
docker tag \
  "$ECR_REPO:$IMAGE_TAG" \
  "$ECR_URI:$IMAGE_TAG"

# ---- Push ----
docker push "$ECR_URI:$IMAGE_TAG"

echo "✅ Deployed $ECR_URI:$IMAGE_TAG"
