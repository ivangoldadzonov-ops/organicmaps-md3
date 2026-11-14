#!/usr/bin/env bash
# Local static server for the prototype (Linux/macOS).
# Usage: ./tools/serve.sh [port]

set -euo pipefail
PORT="${1:-8000}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Organic Maps MD3 prototype: http://localhost:${PORT}/prototype/index.html"
exec python3 -m http.server "$PORT" --directory "$ROOT"
