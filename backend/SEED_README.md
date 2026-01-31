# Seed Scripts Documentation

## Sitter Data Seeding

### Purpose
Seeds comprehensive test data for a sitter user's homepage, including today's bookings, recent client history, and nearby posts.

### Target User
- **Email**: `ramykhb18@gmail.com`
- **Name**: Ramy Khachab

### Usage

```bash
npm run seed:sitter
```

### What Gets Created

#### 1. **Today's Bookings** (3 bookings)
Bookings scheduled for today with different times:
- Morning walk (9:00 AM) - Cocker Spaniel
- Afternoon sitting (2:30 PM) - Chihuahua  
- Evening grooming (4:00 PM) - Maine Coon

#### 2. **Recent Clients** (5 clients with completed bookings)
Past clients who have used the sitter's services, each with:
- Completed booking history
- 4-5 star reviews
- Different pets and service types
- Locations in Beirut, Jounieh, and Baabda

#### 3. **Nearby Posts** (5 open posts)
Available pet sitting requests from different owners:
- Walking services
- Grooming
- Multi-day sitting
- Hiking
- Various locations in Beirut area

### Data Structure

Each section includes:
- **Owners**: Automatically created with OWNER role
- **Pets**: Associated with their owners
- **Locations**: Beirut-area locations
- **Reviews**: For completed bookings (ratings 4-5 stars)
- **Images**: Unsplash pet images

### Prerequisites

The target user (ramykhb18@gmail.com) must already exist in the database. The script will:
- Verify the user exists
- Add SITTER role if not present
- Create profile with location if needed

### Notes

- Script is idempotent for user/pet creation but will create duplicate posts/bookings on multiple runs
- All times are set to today's date
- Past bookings are randomly distributed over the last 30 days
- Default password hash is used for created test users

### Related Scripts

- `npm run seed:posts` - Seeds general posts (for owner users)
- `npx ts-node prisma/seed-locations.ts` - Seeds Lebanese locations

### Example Output

```
🔍 Looking for sitter user: ramykhb18@gmail.com
✅ Found sitter: Ramy Khachab

📝 Creating sample data...

Creating nearby posts...
  ✓ Created post: Energetic Husky needs morning walks
  ✓ Created post: Persian Cat needs grooming and care
  [...]

Creating client history...
  ✓ Created client: James Wilson
  [...]

Creating today's bookings...
  ✓ Created booking: Ava Harris at 09:00
  [...]

✅ Successfully seeded all data for ramykhb18@gmail.com

Summary:
  - 5 nearby posts created
  - 5 recent clients with reviews created
  - 3 today's bookings created
```
