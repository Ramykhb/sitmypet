#!/bin/bash

# Comprehensive OTP Authentication Test Script
# Tests: register → verify OTP → login → refresh → logout

BASE_URL="http://localhost:3000"
EMAIL="test_$(date +%s)@example.com"
PASSWORD="Test123!@#"

echo "========================================="
echo "Testing OTP Authentication Flow"
echo "========================================="
echo ""

# 1. Register a new user
echo "1. Registering a new user..."
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
  echo "❌ FAILED: Registration should return requiresEmailVerification=true"
  exit 1
fi

echo "✅ Registration successful - verification required"
echo ""

# 2. Extract OTP from server logs (in production, user gets this via email)
echo "2. Waiting for OTP to be logged..."
sleep 2
echo "⚠️  In a real environment, the OTP would be sent via email."
echo "📧 Check your server console for the OTP code."
echo ""

# Get OTP from user input
read -p "Enter the 6-digit OTP from the server logs: " OTP

if [ -z "$OTP" ] || [ ${#OTP} -ne 6 ]; then
  echo "❌ FAILED: Invalid OTP format"
  exit 1
fi

# 3. Verify email with OTP
echo ""
echo "3. Verifying email with OTP..."
VERIFY_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/verify-email-otp" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"otp\": \"$OTP\"
  }")

echo "$VERIFY_RESPONSE" | jq '.'

ACCESS_TOKEN=$(echo "$VERIFY_RESPONSE" | jq -r '.accessToken')
REFRESH_TOKEN=$(echo "$VERIFY_RESPONSE" | jq -r '.refreshToken')

if [ "$ACCESS_TOKEN" == "null" ] || [ "$REFRESH_TOKEN" == "null" ]; then
  echo "❌ FAILED: Verification should return tokens"
  exit 1
fi

echo "✅ Email verified successfully - received tokens"
echo ""

# 4. Login with verified email
echo "4. Logging in with verified email..."
sleep 1
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\"
  }")

echo "$LOGIN_RESPONSE" | jq '.'

NEW_ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.accessToken')
NEW_REFRESH_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.refreshToken')

if [ "$NEW_ACCESS_TOKEN" == "null" ] || [ "$NEW_REFRESH_TOKEN" == "null" ]; then
  echo "❌ FAILED: Login should return tokens for verified user"
  exit 1
fi

echo "✅ Login successful - received tokens"
echo ""

# 5. Refresh tokens
echo "5. Refreshing tokens..."
sleep 1
REFRESH_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/refresh" \
  -H "Content-Type: application/json" \
  -d "{
    \"refreshToken\": \"$NEW_REFRESH_TOKEN\"
  }")

echo "$REFRESH_RESPONSE" | jq '.'

REFRESHED_ACCESS_TOKEN=$(echo "$REFRESH_RESPONSE" | jq -r '.accessToken')
REFRESHED_REFRESH_TOKEN=$(echo "$REFRESH_RESPONSE" | jq -r '.refreshToken')

if [ "$REFRESHED_ACCESS_TOKEN" == "null" ] || [ "$REFRESHED_REFRESH_TOKEN" == "null" ]; then
  echo "❌ FAILED: Refresh should return new tokens"
  exit 1
fi

if [ "$REFRESHED_REFRESH_TOKEN" == "$NEW_REFRESH_TOKEN" ]; then
  echo "❌ FAILED: Refresh token should be rotated (sliding expiration)"
  exit 1
fi

echo "✅ Token refresh successful - tokens rotated"
echo ""

# 6. Logout
echo "6. Logging out..."
LOGOUT_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/logout" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $REFRESHED_ACCESS_TOKEN")

echo "$LOGOUT_RESPONSE" | jq '.'
echo "✅ Logout successful"
echo ""

# 7. Try to refresh after logout (should fail)
echo "7. Trying to refresh after logout (should fail)..."
AFTER_LOGOUT_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/refresh" \
  -H "Content-Type: application/json" \
  -d "{
    \"refreshToken\": \"$REFRESHED_REFRESH_TOKEN\"
  }")

echo "$AFTER_LOGOUT_RESPONSE" | jq '.'

if echo "$AFTER_LOGOUT_RESPONSE" | jq -e '.statusCode == 401' > /dev/null; then
  echo "✅ Refresh correctly rejected after logout"
else
  echo "❌ FAILED: Refresh should be rejected after logout"
  exit 1
fi

echo ""
echo "========================================="
echo "✅ All OTP authentication tests passed!"
echo "========================================="
echo ""
echo "Summary:"
echo "  ✓ Registration with OTP"
echo "  ✓ Email verification with OTP"
echo "  ✓ Login after verification"
echo "  ✓ Token refresh with rotation"
echo "  ✓ Logout"
echo "  ✓ Token invalidation after logout"
