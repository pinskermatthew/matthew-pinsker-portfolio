#!/usr/bin/env bash
# Renders the favicon and social share image from the HTML templates in
# scripts/images/ into public/. Run it after changing a template, the name or
# headline, or the accent color:
#
#   npm run images
#
# Requires Google Chrome (set CHROME to use a different binary) and macOS `sips`.
set -euo pipefail

cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

render() { # render <template> <width> <height> <output>
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --default-background-color=00000000 --virtual-time-budget=3000 \
    --window-size="$2,$3" --screenshot="$4" "file://$PWD/scripts/images/$1" >/dev/null 2>&1
}

render og-image.html 1200 630 public/og-image.png
render favicon.html 512 512 "$TMP/favicon-512.png"

cp "$TMP/favicon-512.png" public/icon-512.png
sips -z 180 180 "$TMP/favicon-512.png" --out public/apple-touch-icon.png >/dev/null
sips -z 32 32 "$TMP/favicon-512.png" --out "$TMP/favicon-32.png" >/dev/null
sips -z 16 16 "$TMP/favicon-512.png" --out "$TMP/favicon-16.png" >/dev/null
cp "$TMP/favicon-32.png" public/favicon-32.png

# Pack the 16px and 32px PNGs into favicon.ico for browsers that request it.
python3 - "$TMP/favicon-16.png" "$TMP/favicon-32.png" public/favicon.ico <<'PY'
import struct, sys
*sources, out = sys.argv[1:]
images = [open(path, 'rb').read() for path in sources]
header = struct.pack('<HHH', 0, 1, len(images))
offset = 6 + 16 * len(images)
entries, data = b'', b''
for size, png in zip((16, 32), images):
    entries += struct.pack('<BBBBHHII', size, size, 0, 0, 1, 32, len(png), offset + len(data))
    data += png
open(out, 'wb').write(header + entries + data)
PY

echo "Wrote public/og-image.png, public/favicon.ico, public/favicon-32.png, public/apple-touch-icon.png, public/icon-512.png"
