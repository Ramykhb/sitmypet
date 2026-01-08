#!/bin/bash

BASE_URL="http://localhost:3000"
EMAIL="testuser_$(date +%s)@example.com"
NEW_EMAIL="new_email_$(date +%s)@example.com"
PASSWORD="ShowPassword123!"
NEW_PASSWORD="NewPassword123!"
IMAGE_PATH="/Users/tarekhatib/.gemini/antigravity/brain/e39a8f1d-1add-41e2-ad11-d184ba98bb7c/uploaded_image_1767889954669.png"

echo "1. Registering User..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"firstname\": \"Test\", \"lastname\": \"User\", \"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")
echo "Response: $REGISTER_RESPONSE"

# Extracting User ID (assuming auto-verified or handled, but wait, auth service sends OTP)
# Ah, account verification is needed. This complicates the script.
# I might need to manually verify the user in the database or disable verification check for testing.
# Or I can just inspect the DB directly if I could, but I can't easily.
# Wait, I can verify email if I extract the OTP from the logs? No logs access.
# I will try to use a pre-existing user if possible, or assume I can modify the user in the DB?
# Actually creating a user returns "requiresEmailVerification: true".
# The login will fail with ForbiddenException if not verified.
# I will use 'prisma db execute' to manually verify the user for testing purposes.

echo "   Manually verifying user in DB..."
npx prisma db execute --stdin --schema prisma/schema.prisma <<EOF
UPDATE "User" SET "emailVerified" = true WHERE email = '$EMAIL';
EOF

echo "2. Logging In..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")
TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "Login failed. Response: $LOGIN_RESPONSE"
    exit 1
fi
echo "Logged in. Token acquired."

echo "3. Uploading Profile Image..."
UPLOAD_RESPONSE=$(curl -s -X POST "$BASE_URL/users/profile-image" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@$IMAGE_PATH")
echo "Response: $UPLOAD_RESPONSE"

echo "4. Changing Email..."
CHANGE_EMAIL_RESPONSE=$(curl -s -X PATCH "$BASE_URL/users/email" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"email\": \"$NEW_EMAIL\", \"password\": \"$PASSWORD\"}")
echo "Response: $CHANGE_EMAIL_RESPONSE"

echo "5. Changing Password..."
CHANGE_PASS_RESPONSE=$(curl -s -X PATCH "$BASE_URL/users/password" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"oldPassword\": \"$PASSWORD\", \"newPassword\": \"$NEW_PASSWORD\"}")
echo "Response: $CHANGE_PASS_RESPONSE"

echo "6. Deleting Account..."
DELETE_RESPONSE=$(curl -s -X DELETE "$BASE_URL/users/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"password\": \"$NEW_PASSWORD\"}")
echo "Response: $DELETE_RESPONSE"

echo "Done."
