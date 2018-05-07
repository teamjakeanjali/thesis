DROP DATABASE IF EXISTS twilio;

CREATE DATABASE twilio;

\c twilio;

CREATE TABLE users (
  user_id BIGSERIAL PRIMARY KEY,
  phone_number varchar(20) NOT NULL UNIQUE,
  password varchar(255),
  verify_code integer NOT NULL,
  verified_status boolean NOT NULL
);


/*  Execute this file from the command line by typing:
 *    psql -U anjaliahuja < schema.pgsql
 *  to create the database and the tables.*/

--  
