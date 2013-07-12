CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT primary key,
  name varchar(30)
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT primary key,
  username varchar(30)
);

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT primary key,
  content varchar(140),
  created timestamp default now(),
  updated timestamp default now() on update now(),
  user_id INT NOT NULL,
  room_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

CREATE TABLE friends (
  id INT NOT NULL AUTO_INCREMENT primary key,
  user_id1 INT NOT NULL,
  user_id2 INT NOT NULL,
  FOREIGN KEY (user_id1) REFERENCES users(id),
  FOREIGN KEY (user_id2) REFERENCES users(id)
);


/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
