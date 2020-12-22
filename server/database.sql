CREATE DATABASE mmaPernDB;


CREATE TABLE users(
  idUser serial PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  passwordUser VARCHAR(255) NOT NULL,
  maritalStatus VARCHAR(255) NOT NULL,
  gender VARCHAR(255) NOT NULL,
  placeOfBirth VARCHAR(255) NOT NULL,
  dateOfBirth Date NOT NULL
);

INSERT INTO users (firstName, lastName, phoneNumber, email, passwordUser, maritalStatus, gender, placeOfBirth, dateOfBirth)
 VALUES ('Bob', 'Marley', '111-111-111', 'bob@marley.com', 'bobby111', 'married', 'male', 'Jamaika', '1945-02-06');

INSERT INTO users (firstName, lastName, phoneNumber, email, passwordUser, maritalStatus, gender, placeOfBirth, dateOfBirth)
 VALUES ('Elon', 'Musk', '222-222-222', 'elon@musk.com', 'elon222', 'married', 'male', 'USA', '1971-06-28');