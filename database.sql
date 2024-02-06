-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
DROP TABLE IF EXISTS "user";

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" varchar(255)
);

DROP TABLE IF EXISTS "stories";

CREATE TABLE "stories" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (80) NOT NULL,
    "content" TEXT NOT NULL,
    "createddate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "lastupdateddate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "userid" INT REFERENCES "user"
);

DROP TABLE IF EXISTS "images";

CREATE TABLE "images" (
    "id" SERIAL PRIMARY KEY,
    "url" VARCHAR (255) NOT NULL,
    "caption" TEXT NOT NULL,
    "storyid" INT REFERENCES "stories"
);

DROP TABLE IF EXISTS "audios";

CREATE TABLE "audios" (
    "id" SERIAL PRIMARY KEY,
    "url" VARCHAR (255) NOT NULL,
    "description" TEXT NOT NULL,
    "voiceid" INT,
    "storyid" INT REFERENCES "stories"
);