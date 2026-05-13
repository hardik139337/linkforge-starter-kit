#!/bin/bash

# =============================================================================
# LinkForge — First-time Setup Script
# =============================================================================
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

info()    { echo -e "${CYAN}[INFO]${NC}  $*"; }
success() { echo -e "${GREEN}[OK]${NC}    $*"; }
warn()    { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error()   { echo -e "${RED}[ERROR]${NC} $*"; exit 1; }

# ---------------------------------------------------------------------------
# 1. Check Node.js (>= 18)
# ---------------------------------------------------------------------------
info "Checking for Node.js..."

if ! command -v node &>/dev/null; then
    error "Node.js is not installed. Install it from https://nodejs.org (v18 or later) and re-run this script."
fi

NODE_VERSION=$(node -v | sed 's/^v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    error "Node.js v${NODE_VERSION} detected, but v18+ is required. Please upgrade."
fi

success "Node.js $(node -v) found."

# ---------------------------------------------------------------------------
# 2. Copy .env.example -> .env  (skip if .env already exists)
# ---------------------------------------------------------------------------
ENV_FILE=".env"

if [ -f "$ENV_FILE" ]; then
    warn ".env already exists — leaving it untouched."
else
    if [ ! -f ".env.example" ]; then
        error ".env.example not found. Make sure you are running this script from the project root."
    fi
    cp .env.example .env
    success "Created .env from .env.example."
fi

# ---------------------------------------------------------------------------
# 3. Generate NEXTAUTH_SECRET with openssl
# ---------------------------------------------------------------------------
info "Generating NEXTAUTH_SECRET..."

if command -v openssl &>/dev/null; then
    SECRET=$(openssl rand -base64 32)

    # Replace the empty NEXTAUTH_SECRET= line (or append if missing)
    if grep -q '^NEXTAUTH_SECRET=$' "$ENV_FILE" || grep -q '^NEXTAUTH_SECRET=$' "$ENV_FILE"; then
        # macOS and Linux compatible sed — use a temp file
        TMP_FILE=$(mktemp)
        sed "s|^NEXTAUTH_SECRET=.*|NEXTAUTH_SECRET=\"${SECRET}\"|" "$ENV_FILE" > "$TMP_FILE" && mv "$TMP_FILE" "$ENV_FILE"
        success "NEXTAUTH_SECRET written to .env."
    else
        echo "NEXTAUTH_SECRET=\"${SECRET}\"" >> "$ENV_FILE"
        success "NEXTAUTH_SECRET appended to .env."
    fi
else
    warn "openssl not found — skipping secret generation."
    warn "Set NEXTAUTH_SECRET manually in .env before starting the app."
fi

# ---------------------------------------------------------------------------
# 4. Install dependencies
# ---------------------------------------------------------------------------
info "Installing npm dependencies..."
npm install
success "Dependencies installed."

# ---------------------------------------------------------------------------
# 5. Run Prisma migrations
# ---------------------------------------------------------------------------
info "Running Prisma migrations..."
npx prisma migrate dev --name init
success "Database migrated."

# ---------------------------------------------------------------------------
# 6. Generate Prisma client
# ---------------------------------------------------------------------------
info "Generating Prisma client..."
npx prisma generate
success "Prisma client generated."

# ---------------------------------------------------------------------------
# Done
# ---------------------------------------------------------------------------
echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  LinkForge setup complete!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "Next steps:"
echo ""
echo "  1. Open .env and fill in the remaining values:"
echo "     - STRIPE_SECRET_KEY"
echo "     - STRIPE_WEBHOOK_SECRET"
echo "     - NEXT_PUBLIC_STRIPE_PRO_PRICE_ID"
echo ""
echo "  2. Start the development server:"
echo "     npm run dev"
echo ""
echo "  3. Open http://localhost:3000 in your browser."
echo ""
