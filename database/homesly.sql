CREATE TABLE user (
  username VARCHAR PRIMARY KEY,
  password VARCHAR NOT NULL,
  bio VARCHAR(140) NOT NULL
);

CREATE TABLE place (
  place_id INTEGER PRIMARY KEY,
  place_title VARCHAR NOT NULL,
  place_description VARCHAR NOT NULL,
  place_location VARCHAR NOT NULL,
  place_price_per_day REAL NOT NULL,
  place_owner VARCHAR NOT NULL REFERENCES user,
  place_showers INTEGER NOT NULL,
  place_bedrooms INTEGER NOT NULL,
  place_heating INTEGER NOT NULL,
  place_view INTEGER NOT NULL,
  place_wifi INTEGER NOT NULL,
  place_parking INTEGER NOT NULL
);

CREATE TABLE reservation (
  reservation_id INTEGER PRIMARY KEY,
  first_night DATE NOT NULL, 
  last_night DATE NOT NULL,
  guest VARCHAR NOT NULL REFERENCES user,
  place INTEGER NOT NULL REFERENCES place
);

CREATE TABLE review (
  id INTEGER PRIMARY KEY,
  place_id INTEGER REFERENCES place,
  username VARCHAR REFERENCES user,
  published DATE NOT NULL, 
  content VARCHAR,
  rating INTEGER
);

CREATE TABLE upvote (
  user VARCHAR NOT NULL REFERENCES user,
  review INTEGER REFERENCES review,
  PRIMARY KEY (user, review)
);

CREATE TABLE downvote (
  user VARCHAR NOT NULL REFERENCES user,
  review INTEGER REFERENCES review,
  PRIMARY KEY (user, review)
);

CREATE TABLE image (
  image_id INTEGER PRIMARY KEY,
  place_of_image INTEGER NOT NULL REFERENCES place
);


--trigger to delete reviews after a place is deleted
CREATE TRIGGER Delete_place
AFTER DELETE ON place
FOR EACH ROW
BEGIN
  DELETE FROM review WHERE place_id = OLD.place_id;
END;

--trigger to delete reservations after a place is deleted
CREATE TRIGGER Delete_reservation
AFTER DELETE ON place
FOR EACH ROW
BEGIN
  DELETE FROM reservation WHERE place = OLD.place_id;
END;

--trigger to delete downvote after the same review is upvoted
CREATE TRIGGER Delete_downvote
AFTER INSERT ON upvote
FOR EACH ROW
WHEN EXISTS (SELECT * FROM downvote WHERE user = New.user AND review = New.review)
BEGIN
  DELETE FROM downvote WHERE user = New.user AND review = New.review;
END;

--trigger to delete upvote after the same review is downvote
CREATE TRIGGER Delete_upvote
AFTER INSERT ON downvote
FOR EACH ROW
WHEN EXISTS (SELECT * FROM upvote WHERE user = New.user AND review = New.review)
BEGIN
  DELETE FROM upvote WHERE user = New.user AND review = New.review;
END;



BEGIN TRANSACTION;

INSERT INTO user VALUES('Ana', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very boring person.');
INSERT INTO user VALUES('John', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very boring person.');
INSERT INTO user VALUES('Rasmus', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very boring person.');
INSERT INTO user VALUES('Giovanni', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very interesting person.');
INSERT INTO user VALUES('Полина', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very interesting person.');
INSERT INTO user VALUES('Carlos', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very boring person.');
INSERT INTO user VALUES('Luis', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very boring person.');
INSERT INTO user VALUES('António', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very boring person.');
INSERT INTO user VALUES('Maria', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very interesting person.');
INSERT INTO user VALUES('Francisca', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very boring person.');
INSERT INTO user VALUES('Andy', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very boring person.');
INSERT INTO user VALUES('Tom', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very interesting person.');
INSERT INTO user VALUES('Elizabeth', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very boring person.');
INSERT INTO user VALUES('Alfhild', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very interesting person.');
INSERT INTO user VALUES('Gjord', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very boring person.');
INSERT INTO user VALUES('Edvard', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very interesting person.');
INSERT INTO user VALUES('Helmi', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very boring person.');
INSERT INTO user VALUES('Faustus', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very interesting person.');
INSERT INTO user VALUES('Jorges', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very boring person.');
INSERT INTO user VALUES('Пэмела', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', 'I am a very boring person.');

INSERT INTO place VALUES(NULL, 'Apartamento no centro de Lisboa', 
'Apartamento simpático e luminoso numa mais pitorescas zonas da cidade. O apartamento tem dois quartos disponíveis para receber confortavelmente quem visita Lisboa em viagem de lazer ou trabalho. Para além da localização central mas em local silencioso, a jóia deste apartamento é, sem duvida, a sua vista desafogada e deslumbrante, de quase 360º da Baixa da cidade e Costa do Castelo.',
'Lisbon', 100, 'Ana', 1, 2, 1, 1, 1, 0);
INSERT INTO place VALUES(NULL, 'Modern tiny home in Florida', 
'Get cozy in this Tiny Home because it offers it all! A kitchen, full bath, private entry, parking, private everything! Queen size memory foam bed, wifi, 32" Smart TV, cooking ware, and essentials. It is green and efficient, so you can help the earth while you travel as well! 10 minutes to downtown via UBER and 5 minutes to central shops. 15 minutes to the beach via UBER. The WiFi is 100 mbps!',
'Florida', 70, 'John', 1, 1, 1, 0, 1, 1);
INSERT INTO place VALUES(NULL, 'Cottage with a wonderful lakeview', 
'Welcome to our small cottage located close to the beach, with a beautiful view over Ringsjön. The sun sets infront of the porch. The house has a very basic standard. One bedroom with two single beds and sofa bed for two in the living room. Sheets and towels and cleaning can be arranged for a fee. The house is located in a holiday area close to Ringsjöstrand hotel. Good opportunities for nature experiences (fishing, hiking, bird watching). Skåneleden hiking trail passes the area.',
'Ringsjön', 140, 'Rasmus', 2, 3, 1, 1, 1, 1);
INSERT INTO place VALUES(NULL, 'Skopelos - The "Mamma Mia" island', 
'Mirabilia Skopelos is located in the centre of the old town of Skopelos. "Skopelos the green" is in the bigger national marine reserve of Greek. You can meet dolphins and seals. You will be accommodated in a 3-levels house built in the 18th century',
'Skopelos', 300, 'Giovanni', 3, 4, 1, 1, 1, 0);
INSERT INTO place VALUES(NULL, 'Большая комната на Таганской с новым ремонтом', 
'Тёплая комната 20 кв.м. в кирпичном историческом доме около Покровского женского монастыря Матроны Московской .Это не хостел.Вы будете нашим единственным гостем .У нас большая двухкомнатная квартира. В другой комнате живём мы.В Вашей комнате есть чайник, микроволновка и вся посуда.Большая кровать размера king-size. Дорогой ортопедический матрас. Письменный стол, большой телевизор, wi-fi, идеальная чистота и комфорт. В квартире живёт воспитанный, добрый ребенок.Девочка 7 лет. У нас не шумно.',
'Таганской ', 110, 'Полина', 1, 1, 1, 1, 0, 1);

INSERT INTO reservation VALUES(NULL, '2019-11-21', '2019-11-24', 'Carlos', 1);
INSERT INTO reservation VALUES(NULL, '2019-11-25', '2019-11-28', 'Luis', 1);
INSERT INTO reservation VALUES(NULL, '2019-11-29', '2019-12-02', 'António', 1);
INSERT INTO reservation VALUES(NULL, '2019-12-03', '2019-12-08', 'Maria', 1);
INSERT INTO reservation VALUES(NULL, '2019-12-09', '2019-12-14', 'Francisca', 1);

INSERT INTO review VALUES(NULL, 1, 'Carlos', '2019-11-25', 'Casa impecável e host muito agradável!', 5);
INSERT INTO review VALUES(NULL, 1, 'Luis', '2019-11-29', 'Alguns problemas com a limpeza, mas resolveram-se rapidamente. Fiquei satisfeito', 4);
INSERT INTO review VALUES(NULL, 1, 'António', '2019-12-03', 'Host é horrivel, não recomendo', 1);
INSERT INTO review VALUES(NULL, 1, 'Maria', '2019-12-09', 'Gostei', 3.5);
INSERT INTO review VALUES(NULL, 1, 'Francisca', '2019-12-15', '', 4.5);

INSERT INTO upvote VALUES('Carlos', 2);
INSERT INTO upvote VALUES('Carlos', 4);
INSERT INTO upvote VALUES('Luis', 1);
INSERT INTO upvote VALUES('Luis', 5);
INSERT INTO upvote VALUES('Maria', 1);
INSERT INTO upvote VALUES('Maria', 2);
INSERT INTO upvote VALUES('Francisca', 1);
INSERT INTO downvote VALUES('Carlos', 3);
INSERT INTO downvote VALUES('Luis', 3);
INSERT INTO downvote VALUES('Maria', 3);

INSERT INTO image VALUES(1, 1);
INSERT INTO image VALUES(2, 1);
INSERT INTO image VALUES(3, 1);

INSERT INTO reservation VALUES(NULL, '2019-11-21', '2019-11-27', 'Andy', 2);
INSERT INTO reservation VALUES(NULL, '2019-11-27', '2019-12-01', 'Tom', 2);
INSERT INTO reservation VALUES(NULL, '2019-12-02', '2019-12-11', 'Elizabeth', 2);

INSERT INTO review VALUES(NULL, 2, 'Andy', '2019-11-28', 'Loved it!', 5);
INSERT INTO review VALUES(NULL, 2, 'Tom', '2019-12-02', 'Host wasnt very friendly :( but the place was very nice and well kept.', 4);
INSERT INTO review VALUES(NULL, 2, 'Elizabeth', '2019-12-12', 'Awesome place, town has a lot of good places to visit', 4.5);

INSERT INTO upvote VALUES('Andy', 7);
INSERT INTO upvote VALUES('Andy', 8);
INSERT INTO upvote VALUES('Tom', 6);
INSERT INTO upvote VALUES('Elizabeth', 6);
INSERT INTO downvote VALUES('Tom', 8);

INSERT INTO image VALUES(4, 2);
INSERT INTO image VALUES(5, 2);
INSERT INTO image VALUES(6, 2);

INSERT INTO reservation VALUES(NULL, '2019-10-21', '2019-10-28', 'Alfhild', 3);
INSERT INTO reservation VALUES(NULL, '2019-11-04', '2019-11-09', 'Edvard', 3);
INSERT INTO reservation VALUES(NULL, '2019-11-13', '2019-11-21', 'Gjord', 3);
INSERT INTO reservation VALUES(NULL, '2019-12-02', '2019-12-07', 'Helmi', 3);

INSERT INTO review VALUES(NULL, 3, 'Alfhild', '2019-10-28', 'My uncles worn down place is better than this', 2);
INSERT INTO review VALUES(NULL, 3, 'Edvard', '2019-11-10', 'Eh, its alright... wasnt anything too special', 3);
INSERT INTO review VALUES(NULL, 3, 'Gjord', '2019-11-24', 'Went for a swim on part of the lake that wasnt frozen, one of a kind experience', 3.5);
INSERT INTO review VALUES(NULL, 3, 'Helmi', '2019-12-11', 'Make sure you take that hiking trail!!', 4);

INSERT INTO upvote VALUES('Alfhild', 10);
INSERT INTO upvote VALUES('Alfhild', 11);
INSERT INTO upvote VALUES('Edvard', 11);
INSERT INTO upvote VALUES('Edvard', 12);
INSERT INTO upvote VALUES('Gjord', 9);
INSERT INTO downvote VALUES('Helmi', 9);

INSERT INTO image VALUES(7, 3);
INSERT INTO image VALUES(8, 3);
INSERT INTO image VALUES(9, 3);

INSERT INTO reservation VALUES(NULL, '2020-01-21', '2020-01-27', 'Faustus', 4);
INSERT INTO reservation VALUES(NULL, '2020-02-03', '2020-02-09', 'Jorges', 4);

INSERT INTO review VALUES(NULL, 4, 'Faustus', '2019-12-17', 'My reservation keeps getting delayed...I am very upset.', 0);

INSERT INTO image VALUES(10, 4);
INSERT INTO image VALUES(11, 4);
INSERT INTO image VALUES(12, 4);

INSERT INTO reservation VALUES(NULL, '2019-12-01', '2019-12-05', 'Пэмела', 5);

INSERT INTO review VALUES(NULL, 5, 'Пэмела', '2019-12-06', 'не приезжайте сюда, хозяин очень грубо явно хочет только деньги. еда была в порядке, хотя', 1.5);

INSERT INTO image VALUES(13, 5);
INSERT INTO image VALUES(14, 5);
INSERT INTO image VALUES(15, 5);

COMMIT;