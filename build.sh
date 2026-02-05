#!/usr/bin/env bash
set -e

echo "=== AI Agent SQLite - Build Script ==="

# Install server dependencies
echo "Installing server dependencies..."
cd server
npm install

# Build TypeScript
echo "Building server..."
npm run build

cd ..

echo "=== Build completed successfully ==="
echo ""
echo "To run the server:"
echo "  cd server && npm run dev"
echo ""
echo "Or with Docker:"
echo "  docker-compose up --build"

