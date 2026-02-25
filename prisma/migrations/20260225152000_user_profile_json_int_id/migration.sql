-- Preserve existing user/auth-provider data while converting:
-- 1) User.id from UUID text to integer
-- 2) User profile fields into a single JSONB column

ALTER TABLE "User"
ADD COLUMN "new_id" SERIAL,
ADD COLUMN "profile" JSONB;

UPDATE "User"
SET "profile" = jsonb_build_object(
  'email', "email",
  'fullname', "fullname",
  'avatar', "avatar",
  'password', "password",
  'role', "role",
  'institution', "institution",
  'area_of_interest', "area_of_interest"
);

ALTER TABLE "AuthProvider"
ADD COLUMN "new_user_id" INTEGER;

UPDATE "AuthProvider" ap
SET "new_user_id" = u."new_id"
FROM "User" u
WHERE ap."userId" = u."id";

ALTER TABLE "AuthProvider" DROP CONSTRAINT IF EXISTS "AuthProvider_userId_fkey";
ALTER TABLE "User" DROP CONSTRAINT IF EXISTS "User_pkey";

ALTER TABLE "User" DROP COLUMN "id";
ALTER TABLE "User" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

ALTER TABLE "User"
DROP COLUMN "email",
DROP COLUMN "fullname",
DROP COLUMN "avatar",
DROP COLUMN "password",
DROP COLUMN "role",
DROP COLUMN "institution",
DROP COLUMN "area_of_interest";

ALTER TABLE "AuthProvider" DROP COLUMN "userId";
ALTER TABLE "AuthProvider" RENAME COLUMN "new_user_id" TO "userId";
ALTER TABLE "AuthProvider" ALTER COLUMN "userId" SET NOT NULL;

ALTER TABLE "AuthProvider"
ADD CONSTRAINT "AuthProvider_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
