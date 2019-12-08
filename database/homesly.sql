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

CREATE TABLE image (
  image_id INTEGER PRIMARY KEY,
  place_of_image INTEGER NOT NULL REFERENCES place
);


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

INSERT INTO image VALUES(1, 1);

COMMIT;