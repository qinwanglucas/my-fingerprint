#!/usr/bin/env bash
# Build Firefox extension and pack as .xpi for AMO upload.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

DIST_DIR="dist-firefox"
OUT_DIR="releases"

if ! command -v zip >/dev/null 2>&1; then
  echo "error: zip is required (apt install zip / brew install zip)" >&2
  exit 1
fi

echo "==> Building Firefox extension..."
npm run build:firefox

if [[ ! -f "$DIST_DIR/manifest.json" ]]; then
  echo "error: $DIST_DIR/manifest.json not found after build" >&2
  exit 1
fi

VERSION="$(node -e "console.log(require('./$DIST_DIR/manifest.json').version)")"
NAME="my-fingerprint-${VERSION}-firefox"
XPI_PATH="$OUT_DIR/${NAME}.xpi"
ZIP_PATH="$OUT_DIR/${NAME}.zip"

mkdir -p "$OUT_DIR"
rm -f "$XPI_PATH" "$ZIP_PATH"

echo "==> Packaging $DIST_DIR -> $XPI_PATH"
(
  cd "$DIST_DIR"
  # Store only (no compression quirks); AMO accepts .xpi / .zip of extension root.
  zip -r -FS "../$XPI_PATH" .
)

# AMO developer hub commonly expects .zip; keep an identical copy.
cp "$XPI_PATH" "$ZIP_PATH"

SIZE="$(du -h "$XPI_PATH" | cut -f1)"
echo
echo "Done."
echo "  version : $VERSION"
echo "  xpi     : $XPI_PATH ($SIZE)"
echo "  zip     : $ZIP_PATH"
echo
echo "Upload either file to https://addons.mozilla.org/developers/"
echo "Note: package is unsigned; AMO will sign on approval."
