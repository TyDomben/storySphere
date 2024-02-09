-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" varchar(255)
);


CREATE TABLE "stories" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (80) NOT NULL,
    "content" TEXT NOT NULL,
    "createddate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "lastupdateddate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "userid" INT REFERENCES "user"
);


CREATE TABLE "images" (
    "id" SERIAL PRIMARY KEY,
    "url" VARCHAR (255) NOT NULL,
    "caption" TEXT NOT NULL,
    "storyid" INT REFERENCES "stories"
);


CREATE TABLE "audios" (
    "id" SERIAL PRIMARY KEY,
    "url" VARCHAR (255) NOT NULL,
    "description" TEXT NOT NULL,
    "voiceid" INT,
    "storyid" INT REFERENCES "stories"
);

INSERT INTO "user" (username, password, email) VALUES ('kittenLover', 'password123', 'kittenlover@example.com');
INSERT INTO "user" (username, password, email) VALUES ('puppyFan', 'password456', 'puppyfan@example.com');

-- Story by kittenLover
INSERT INTO "stories" (title, content, userid) VALUES ('A Day in the Life of Whiskers', 'Whiskers the kitten had a day full of adventure, from chasing leaves in the garden to cuddling up in a cozy blanket.', 1);

-- Story by puppyFan
INSERT INTO "stories" (title, content, userid) VALUES ('Buddy''s First Walk', 'Buddy the puppy experienced his first walk in the park. He made friends with ducks, sniffed every tree, and even helped a little girl find her lost toy.', 2);
-- Images related to "A Day in the Life of Whiskers" story
INSERT INTO "images" (url, caption, storyid) VALUES ('https://placekitten.com/200/300', 'Whiskers playing in the garden', 1);
INSERT INTO "images" (url, caption, storyid) VALUES ('https://placekitten.com/250/350', 'Whiskers taking a nap', 1);

-- Images related to "Buddy's First Walk" story
INSERT INTO "images" (url, caption, storyid) VALUES ('https://placedog.net/250/250', 'Buddy making friends in the park', 2);
INSERT INTO "images" (url, caption, storyid) VALUES ('https://placedog.net/250/250?random', 'Buddy meeting a duck', 2);

-- Additional images of baby animals
INSERT INTO "images" (url, caption, storyid) VALUES ('https://placekitten.com/g/200/300', 'Curious little kitten', 1);
INSERT INTO "images" (url, caption, storyid) VALUES ('https://placedog.net/250/250', 'Sleepy puppy', 2);
INSERT INTO "images" (url, caption, storyid) VALUES ('https://loremflickr.com/320/240/bunny', 'A cute bunny', 1);
INSERT INTO "images" (url, caption, storyid) VALUES ('https://loremflickr.com/320/240/duckling', 'Adorable duckling', 2);

-- Images related to "Buddy's First Walk"
INSERT INTO "images" (url, caption, storyid) VALUES ('/images/buddy-park.jpg', 'Buddy making friends in the park', 2);
INSERT INTO "images" (url, caption, storyid) VALUES ('/images/buddy-duck.jpg', 'Buddy meeting a duck', 2);


