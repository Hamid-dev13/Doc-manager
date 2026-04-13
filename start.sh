#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==> Building and starting doc-manager..."
docker compose up --build -d

echo ""
echo "==> App running at http://localhost:3057"
echo "    Backend (internal) : port 3001"
echo ""
echo "Logs : docker compose logs -f"
echo "Stop : docker compose down"
