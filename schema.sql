CREATE TABLE applications (
  id serial primary key,
  created timestamp with time zone NOT NULL default current_timestamp,
  updated timestamp with time zone not null default current_timestamp,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  simi int NOT NULL,
  texti varchar NOT NULL,
  starf varchar(64),
  unnin boolean default false
);
