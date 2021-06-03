CREATE DATABASE proyecto1;

CREATE TABLE cancion(
    cancion_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    duracion VARCHAR(50) NOT NULL
);

CREATE TABLE cancion_artista(
    cancion_id INTEGER NOT NULL,
    id_artista_agrupacion INTEGER NOT NULL
);

CREATE TABLE artista_agrupacion(
    id_artista_agrupacion SERIAL PRIMARY KEY,
    nombre_artista_agrupacion VARCHAR(100) NOT NULL
);

CREATE TABLE usuario(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    clave VARCHAR(100) NOT NULL
);
