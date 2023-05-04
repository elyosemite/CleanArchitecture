CREATE TABLE example.parking_lot (
    code VARCHAR PRIMARY KEY,
    capacity SMALLINT,
    open_hour SMALLINT,
    close_hour SMALLINT
);

CREATE TABLE example.parking_car (
    code VARCHAR PRIMARY KEY,
    plate VARCHAR,
    date TIMESTAMP
);
