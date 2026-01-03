#!/bin/bash

# Usage: ./seed-sitter.sh <sitter-email>

if [ -z "$1" ]; then
  echo "Usage: ./seed-sitter.sh <sitter-email>"
  exit 1
fi

SITTER_EMAIL="$1"

echo "Seeding data for sitter: $SITTER_EMAIL"

# Run the TypeScript seed file
npx ts-node -r tsconfig-paths/register prisma/seed-sitter.ts "$SITTER_EMAIL"
