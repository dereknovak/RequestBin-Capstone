DROP DATABASE request_bin
CREATE DATABASE request_bin;

\c request_bin2

CREATE TABLE Bin (
  id SERIAL PRIMARY KEY,
  path VARCHAR(10) NOT NULL
);

CREATE TABLE Request (
  id SERIAL PRIMARY KEY,
  bin_id INTEGER REFERENCES Bin(id) NOT NULL,
  mongodb_doc_id VARCHAR(24) NOT NULL
);

INSERT INTO Bin (path) VALUES ('0p1s21h');
INSERT INTO Bin (path) VALUES ('yqgulne');
INSERT INTO Bin (path) VALUES ('f8ld6brsdf');

INSERT INTO Request (bin_id, mongodb_doc_id) VALUES (1, '68226ee9594b6dc5fb06d1a2');
INSERT INTO Request (bin_id, mongodb_doc_id) VALUES (1, '682271144bf86328b429dafb');
INSERT INTO Request (bin_id, mongodb_doc_id) VALUES (1, '68227185e17b72e789322353');