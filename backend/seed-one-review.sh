#!/bin/bash

# This script adds reviews to owner1@example.com (Sarah Johnson - "Golden Retriever needs a walk to the park")

echo "Adding dummy reviews for Sarah Johnson (owner1@example.com)..."

# Run the seed-reviews script for owner1
npx ts-node -r tsconfig-paths/register prisma/seed-reviews.ts "owner1@example.com"

echo ""
echo "✅ Done! Sarah Johnson now has reviews and will show a rating in nearby requests."
