#!/usr/bin/env bash
# Takes full-page screenshots of the running site at phone, tablet, and desktop
# widths, in light and dark mode, for reviewing design changes:
#
#   npm run dev            # in another terminal, if it isn't running
#   npm run screenshots    # or: bash scripts/screenshots.sh [url] [output-dir]
#
# Requires Google Chrome (set CHROME to use a different binary). Headless Chrome
# can't render narrower than about 500px, so each width is rendered inside an
# iframe of that width.
set -euo pipefail

URL="${1:-http://localhost:4321/}"
OUT="${2:-${TMPDIR:-/tmp}/portfolio-screenshots}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
HEIGHT=5200

mkdir -p "$OUT"
if ! curl -s -o /dev/null "$URL"; then
  echo "Nothing is running at $URL. Start it with: npm run dev" >&2
  exit 1
fi

for width in 360 768 1280; do
  wrapper="$OUT/wrapper-$width.html"
  printf '<!doctype html><body style="margin:0"><iframe src="%s" style="width:%spx;height:%spx;border:0;display:block"></iframe>' \
    "$URL" "$width" "$HEIGHT" > "$wrapper"
  for mode in light dark; do
    scheme=$([ "$mode" = dark ] && echo 0 || echo 1)
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
      --blink-settings=preferredColorScheme="$scheme" --virtual-time-budget=6000 \
      --window-size="$width,$HEIGHT" --screenshot="$OUT/$width-$mode.png" "file://$wrapper" >/dev/null 2>&1
  done
  rm "$wrapper"
done

echo "Screenshots saved to $OUT:"
ls "$OUT"/*.png
