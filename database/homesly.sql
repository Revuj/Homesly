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
  place_owner VARCHAR NOT NULL REFERENCES user
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



BEGIN TRANSACTION;

INSERT INTO user VALUES('john', '$2y$12$cH5Hmh/4JgKSEM4ZCih1jOOSItL2WW.XZruOxkG0udohjH5xMu6FG', '');

INSERT INTO place VALUES(NULL, 'Glamp under the northern lights', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at ante pharetra, malesuada odio et, volutpat risus. Quisque magna quam, faucibus et nibh ac, rhoncus luctus nunc. Sed in augue lobortis, faucibus mauris rutrum, condimentum lorem. Donec eget sem id dolor lacinia lobortis id pharetra dolor. Donec mattis ipsum et rutrum mollis. Etiam scelerisque elementum ipsum. Nam semper risus eu eros aliquam, in sodales elit vehicula. Vestibulum suscipit, elit finibus placerat pretium, elit magna tempus lectus, vel volutpat sapien libero vel mauris. Curabitur posuere urna erat, sed feugiat ante condimentum sit amet. Nulla vitae libero at nisl rhoncus pharetra. Donec et volutpat metus. Sed vulputate lacus elit, sed consectetur felis vulputate ut. Fusce vel enim nec dui vestibulum accumsan. Vivamus porttitor augue nisi, in finibus augue tempus sed. Etiam diam lorem, accumsan pulvinar cursus eu, cursus eget eros. Donec semper dolor eu enim tempus volutpat. ',
'Sweden', 350, 'john');
INSERT INTO place VALUES(NULL, '3 Days in paradiese', 
'Nulla et pretium nisi. Ut iaculis vel felis in rhoncus. Donec non nulla et eros dignissim venenatis eget vitae metus. Aliquam vulputate eleifend arcu sed vestibulum. Vestibulum posuere vel neque sit amet blandit. Sed ut dapibus mauris. Proin eu mi gravida, fermentum metus in, vehicula urna. Aliquam auctor rhoncus nisl, at maximus neque cursus id. Nulla sem ex, scelerisque ut erat eu, vestibulum rutrum lectus. Nullam id neque feugiat, consectetur nisl ut, molestie nunc. Duis sit amet aliquet justo. Cras ligula felis, gravida sit amet placerat eget, maximus quis nibh. Nunc lectus velit, pharetra ut neque id, viverra ultrices massa. Mauris quis iaculis justo. Nulla ultricies erat id felis mollis, quis sagittis orci ullamcorper. Duis finibus aliquam lectus eu volutpat. ',
'Brazil', 300, 'john');
INSERT INTO place VALUES(NULL, 'Get amazed by the wonderful landscapes', 
'Ut viverra dui ante. Nullam ultrices turpis erat, nec venenatis arcu egestas non. Morbi id quam cursus, blandit erat in, lacinia lectus. Curabitur ullamcorper risus non eros accumsan, vitae aliquet magna efficitur. Quisque venenatis odio vitae justo vehicula porttitor. Quisque suscipit ornare nisi et placerat. Cras dui est, elementum vel malesuada vitae, efficitur eu mauris. Proin pretium nisi auctor vulputate efficitur. Donec cursus, augue at consectetur volutpat, sem velit malesuada est, a sodales libero nibh ac sapien. Curabitur vitae mollis nisi, ac fermentum sapien. Vestibulum congue tempus malesuada. Sed dolor arcu, tristique at tristique eu, varius eu nulla. Pellentesque at posuere sem. Sed volutpat, dui ut molestie ultrices, sem massa consequat enim, in sodales lectus leo faucibus massa. ',
'Equador', 285, 'john');
INSERT INTO place VALUES(NULL, 'Forgotten Greece', 
'Pellentesque vitae nisi tempus mauris blandit ullamcorper. Quisque magna leo, blandit vitae efficitur at, scelerisque sed lectus. Duis sit amet nisi lectus. Praesent volutpat aliquet mi in viverra. Nullam ultrices justo sit amet pharetra varius. Phasellus nisi orci, eleifend in ornare rutrum, finibus sed ligula. Morbi facilisis venenatis ipsum sed lacinia. Integer sit amet nisi enim. Nam laoreet non dui vel maximus. Duis vitae viverra arcu. Vivamus fringilla laoreet metus sit amet mattis. Proin eget ex non turpis consequat fringilla. Nam commodo eros mi, sit amet luctus velit imperdiet eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum varius fringilla neque, at efficitur erat rutrum sed. ',
'Greece', 300, 'john');

INSERT INTO review VALUES(NULL, 1, 'john', 2019-12-09, 'Very nice place, really liked it!!!', 4.5);
INSERT INTO review VALUES(NULL, 1, 'john', 2019-12-09, 'Nevermind, I actualy found a dead rat on the bathroom :( awful place', 1);
INSERT INTO review VALUES(NULL, 1, 'john', 2019-12-09, 'Sorry it was my litle brother who wrote that', 4);
INSERT INTO review VALUES(NULL, 1, 'john', 2019-12-09, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', 5);

INSERT INTO image VALUES(1, 1);

COMMIT;