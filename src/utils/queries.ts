const queries = {
  GET_SONG: `SELECT * FROM cancion`,
  GET_SONG_BY_ID: `SELECT * FROM cancion WHERE cancion_id = $1`,
  CREATE_SONG: `INSERT INTO cancion (nombre, duracion) VALUES ($1, $2) RETURNING *`,
  UPDATE_SONG: `UPDATE cancion SET nombre = $1, duracion = $2 WHERE cancion_id = $3`,
  DELETE_SONG: `DELETE FROM cancion WHERE cancion_id = $1`,

  GET_ARTIST_SONG: `SELECT * FROM cancion_artista`,
  GET_ARTIST_SONG_BY_ID: `SELECT * FROM cancion_artista WHERE id_artista_agrupacion = $1`,
  CREATE_ARTIST_SONG: `INSERT INTO cancion_artista (cancion_id, id_artista_agrupacion) VALUES ($1, $2) RETURNING *`,
  UPDATE_ARTIST_SONG: `UPDATE cancion_artista SET cancion_id = $1, id_artista_agrupacion = $2 RETURNING *`,
  DELETE_ARTIST_SONG: `DELETE FROM cancion_artista WHERE cancion_id = $1 AND id_artista_agrupacion = $2`,

  GET_ARTIST: `SELECT * FROM artista_agrupacion`,
  GET_ARTIST_BY_ID: `SELECT * FROM artista_agrupacion WHERE id_artista_agrupacion = $1`,
  CREATE_ARTIST: `INSERT INTO artista_agrupacion (nombre_artista_agrupacion) VALUES ($1) RETURNING *`,
  UPDATE_ARTIST: `UPDATE artista_agrupacion SET nombre_artista_agrupacion = $1 WHERE id_artista_agrupacion = $2 RETURNING *`,
  DELETE_ARTIST: `DELETE FROM artista_agrupacion WHERE id_artista_agrupacion = $1`,
};

export default queries;