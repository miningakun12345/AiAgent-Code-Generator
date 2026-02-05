#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
npm install
npm run build
if ! command -v vsce >/dev/null 2>&1; then
  echo "vsce not found, installing globally..."
  npm install -g vsce
fi
vsce package
echo "VSIX package created in $(pwd)"

