# --- !Ups

CREATE TABLE Timeout (
    timeout bigint NOT NULL,
    PRIMARY KEY (timeout)
);

# --- !Downs

DROP TABLE Timeout;