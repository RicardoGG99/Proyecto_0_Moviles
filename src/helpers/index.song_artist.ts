import { Request, Response } from 'express'
import { pool } from '../database'
import queries from '../utils/queries'
import { QueryResult } from 'pg'

export const getSongsArtist = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query(queries.GET_ARTIST_SONG);
    return res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }
    
}

export const getSongArtistByID = async (req: Request, res: Response): Promise<Response> => {
    try {

        const id = parseInt(req.params.id)

        const response: QueryResult = await pool.query(queries.GET_ARTIST_SONG_BY_ID, [
            id
        ]);
        return res.status(200).json(response.rows)

    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }
}


//Arreglar para que verifique si existe el user
export const updateSongArtist = async (req: Request, res: Response): Promise<Response> => {

    const id = parseInt(req.params.id)

    const { cancion_id, id_artista_agrupacion } = req.body

    const response: QueryResult = await pool.query(queries.UPDATE_ARTIST_SONG, [
        cancion_id, 
        id_artista_agrupacion,
        id
    ]);

    return res.json({
            message: "Cancion/Artista actualizada satisfactoriamente",
            body: {
                cancion_id,
                id_artista_agrupacion
            }
        })

    return res.status(200)
}

export const createSongArtist = async (req: Request, res: Response): Promise<Response> => {
    
    try {
        
        const { cancion_id, id_artista_agrupacion } = req.body
        const response: QueryResult = await pool.query(queries.CREATE_ARTIST_SONG, [
            cancion_id,
            id_artista_agrupacion
        ]);
        
        
        return res.json({
            message: "Cancion/Artista insertada satisfactoriamente",
            body: {
                cancion_id,
                id_artista_agrupacion
            }
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }

    
}

export const deleteSongArtist = async (req: Request, res: Response): Promise<Response> => {
    
    try {
        const { cancion_id, id_artista_agrupacion  } = req.body

        const response: QueryResult = await pool.query(queries.DELETE_ARTIST_SONG, [
            parseInt(cancion_id),
            id_artista_agrupacion 
        ]);

        return res.json(`Cancion con el id ${cancion_id} y Artista con id ${id_artista_agrupacion} fueron eliminados satisfactoriamente`)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }
}

