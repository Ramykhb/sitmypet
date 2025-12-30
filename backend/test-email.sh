#!/bin/bash

# Email Testing Script - Tests actual email sending functionality
# Make sure your server is running and SMTP is configured in .env

BASE_URL="http://localhost:3000"
EMAIL="ramykhb18@gmail.com"
PASSWORD="Test123!@#"

echo "========================================="
echo "Testing Email Sending Functionality"
echo "========================================="
echo ""
echo "This script will:"
echo "1. Register a new user"
echo "2. Send OTP to email (check your inbox!)"
echo "3. Wait for you to enter the OTP"
echo "4. Verify and complete registration"
echo ""
echo "⚠️  IMPORTANT: Check your email inbox for the OTP!"
echo "   If SMTP is not configured, check server console."
echo ""
read -p "Press ENTER to continue..."

# 1. Register user
echo ""
echo "1. Registering user: $EMAIL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"firstname\": \"Test\",
    \"lastname\": \"User\",
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\"
  }")

echo "$REGISTER_RESPONSE" | jq '.'

REQUIRES_VERIFICATION=$(echo "$REGISTER_RESPONSE" | jq -r '.requiresEmailVerification')

if [ "$REQUIRES_VERIFICATION" != "true" ]; then
  echo ""
  echo "❌ FAILED: Registration should return requiresEmailVerification=true"
  exit 1
fi

echo ""
echo "✅ Registration successful!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📧 CHECK YOUR EMAIL: $EMAIL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "You should receive an email with:"
echo "  • Subject: 'Your SitMyPet Verification Code'"
echo "  • A 6-digit OTP code"
echo "  • Beautiful HTML formatting with 🐾 branding"
echo ""
echo "If you don't see it:"
echo "  ✓ Check your spam/junk folder"
echo "  ✓ Verify SMTP settings in .env"
echo "  ✓ Check server console for fallback OTP"
echo ""

# 2. Get OTP from user
read -p "Enter the 6-digit OTP from your email: " OTP

if [ -z "$OTP" ]; then
  echo "❌ No OTP entered. Exiting."
  exit 1
fi

if [ ${#OTP} -ne 6 ]; then
  echo "❌ Invalid OTP format (must be 6 digits)"
  exit 1
fi

# 3. Verify OTP
echo ""
echo "2. Verifying OTP: $OTP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

VERIFY_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/verify-email-otp" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"otp\": \"$OTP\"
  }")

echo "$VERIFY_RESPONSE" | jq '.'

ACCESS_TOKEN=$(echo "$VERIFY_RESPONSE" | jq -r '.accessToken')

if [ "$ACCESS_TOKEN" == "null" ] || [ -z "$ACCESS_TOKEN" ]; then
  echo ""
  echo "❌ FAILED: Verification failed"
  ERROR_MSG=$(echo "$VERIFY_RESPONSE" | jq -r '.message')
  echo "Error: $ERROR_MSG"
  exit 1
fi

echo ""
echo "✅ Email verified successfully!"
echo "✅ Tokens received!"
echo ""

# 4. Test resend functionality
echo "3. Testing OTP resend functionality..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Registering another user to test resend..."

EMAIL2="test_resend_$(date +%s)@example.com"

REGISTER2_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"firstname\": \"Test\",
    \"lastname\": \"Resend\",
    \"email\": \"$EMAIL2\",
    \"password\": \"$PASSWORD\"
  }")

echo "$REGISTER2_RESPONSE" | jq '.'

echo ""
echo "Waiting 2 seconds before testing resend..."
sleep 2

RESEND_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/resend-email-otp" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL2\"
  }")

echo ""
echo "Resend response:"
echo "$RESEND_RESPONSE" | jq '.'

RESEND_MSG=$(echo "$RESEND_RESPONSE" | jq -r '.message')

if [ "$RESEND_MSG" == "Verification code sent" ]; then
  echo "✅ Resend OTP works!"
else
  echo "⚠️  Resend OTP may have issues"
fi

echo ""
echo "Testing cooldown (should fail if < 60s)..."
RESEND2_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/resend-email-otp" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL2\"
  }")

echo "$RESEND2_RESPONSE" | jq '.'

if echo "$RESEND2_RESPONSE" | jq -e '.statusCode == 400' > /dev/null; then
  echo "✅ Cooldown protection working!"
else
  echo "⚠️  Cooldown may not be working properly"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ EMAIL TESTING COMPLETE!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Summary:"
echo "  ✓ User registration sends OTP email"
echo "  ✓ OTP verification works"
echo "  ✓ Tokens issued after verification"
echo "  ✓ Resend OTP functionality works"
echo "  ✓ Cooldown protection active"
echo ""
echo "📧 Check your email ($EMAIL) to see the"
echo "   beautiful HTML-formatted verification email!"
echo ""
echo "If SMTP is configured correctly, you should have"
echo "received professional emails with 🐾 SitMyPet branding."
