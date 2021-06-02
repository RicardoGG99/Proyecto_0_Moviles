import { Request, Response } from 'express'
import { pool } from '../database'
import queries from '../utils/queries'
import { QueryResult } from 'pg'
import { parse } from 'dotenv'

export const getSongs = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query(queries.GET_SONG);
    return res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }
    
}

export const getSongByID = async (req: Request, res: Response): Promise<Response> => {
    try {

        const id = parseInt(req.params.id)

        const response: QueryResult = await pool.query(queries.GET_SONG_BY_ID, [
            id
        ]);
        return res.status(200).json(response.rows)

    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }
}


//Arreglar para que verifique si existe el user
export const updateSong = async (req: Request, res: Response): Promise<Response> => {
    
    const { nombre, duracion, cancion_id } = req.body

    const response: QueryResult = await pool.query(queries.UPDATE_SONG, [
        nombre, 
        duracion,
        cancion_id
    ]);

    return res.json({
            message: "Cancion actualizada satisfactoriamente",
            body: {
                nombre,
                duracion,
                cancion_id
            }
        })

    return res.status(200)
}

export const createSong = async (req: Request, res: Response): Promise<Response> => {
    
    try {
        const { cancion_id, nombre, duracion } = req.body
        const response: QueryResult = await pool.query(queries.CREATE_SONG, [
            nombre,
            duracion
        ]);
        
        return res.json({
            message: "Cancion insertada satisfactoriamente",
            body: {
                cancion_id,
                nombre,
                duracion
            }
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }

    
}

export const deleteSong = async (req: Request, res: Response): Promise<Response> => {
    
    try {
        const { cancion_id } = req.body

        const response: QueryResult = await pool.query(queries.DELETE_SONG, [
            parseInt(cancion_id) 
        ]);

        return res.json(`Cancion con el id ${cancion_id} eliminada satisfactoriamente`)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }
}

