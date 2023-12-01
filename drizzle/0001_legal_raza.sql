DO $$ BEGIN
 CREATE TYPE "cover" AS ENUM('content', 'avatar');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
