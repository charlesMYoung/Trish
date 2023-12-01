CREATE TABLE IF NOT EXISTS "t_blog_article" (
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar(100),
	"description" text,
	"is_release" boolean DEFAULT false,
	"content" text,
	"release_date" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"modified_at" timestamp DEFAULT now(),
	"category_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_blog_article_to_tag" (
	"article_id" varchar NOT NULL,
	"tag_id" varchar NOT NULL,
	CONSTRAINT t_blog_article_to_tag_article_id_tag_id_pk PRIMARY KEY("article_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_blog_category" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"created_at" timestamp DEFAULT now(),
	"modified_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_blog_image" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"url" varchar(256),
	"path" varchar(256),
	"cover" "cover",
	"created_at" timestamp DEFAULT now(),
	"modified_at" timestamp DEFAULT now(),
	"article_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_blog_tag" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"created_at" timestamp DEFAULT now(),
	"modified_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t_blog_article_to_tag" ADD CONSTRAINT "t_blog_article_to_tag_article_id_t_blog_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "t_blog_article"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t_blog_article_to_tag" ADD CONSTRAINT "t_blog_article_to_tag_tag_id_t_blog_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "t_blog_tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
