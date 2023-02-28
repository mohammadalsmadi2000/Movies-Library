DROP TABLE IF EXISTS testTable;

CREATE TABLE IF NOT EXISTS testTable(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    release_date VARCHAR(255),
    overview VARCHAR(10000),
    poster_path VARCHAR(10000),
    comment VARCHAR(10000)
);


