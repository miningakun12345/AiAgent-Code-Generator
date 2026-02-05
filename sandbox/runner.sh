#!/bin/bash
set -e
CODE_FILE="$1"
LANG="$2"

IMAGE="node:18"
if [ "$LANG" = "python" ]; then
  IMAGE="python:3.11-slim"
fi

TMPDIR=$(mktemp -d)
cp "$CODE_FILE" "$TMPDIR/code"

docker run --rm --network none --cpus="0.5" --memory="256m" -v "$TMPDIR":/workspace -w /workspace "$IMAGE" bash -lc \
  "timeout 10s bash -c 'if [ -f code ]; then if [ \"$LANG\" = \"python\" ]; then python code; else node code; fi; fi'"

rm -rf "$TMPDIR"

