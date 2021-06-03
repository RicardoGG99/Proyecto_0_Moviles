import { Request, Response } from 'express'
import { pool } from '../database'
import queries from '../utils/queries'
import { QueryResult } from 'pg'

//Read
export const getArtist = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query(queries.GET_ARTIST);
    return res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }
    
}

//Read
export const getArtistByID = async (req: Request, res: Response): Promise<Response> => {
    try {

        const id = parseInt(req.params.id)

        const response: QueryResult = await pool.query(queries.GET_ARTIST_BY_ID, [
            id
        ]);
        return res.status(200).json(response.rows)

    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }
}


//Arreglar para que verifique si existe el user
//Update
export const updateArtist = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)

    const { nombre_artista_agrupacion } = req.body

    const response: QueryResult = await pool.query(queries.UPDATE_ARTIST, [
        nombre_artista_agrupacion,
        id
    ]);

    return res.json({
            message: "Artista actualizado satisfactoriamente",
            body: {
                id,
                nombre_artista_agrupacion
            }
        })

    return res.status(200)
}

//Create
export const createArtist = async (req: Request, res: Response): Promise<Response> => {
    
    try {

        const { nombre_artista_agrupacion } = req.body
        
        const response: QueryResult = await pool.query(queries.CREATE_ARTIST, [
            nombre_artista_agrupacion
        ]);
        
        return res.json({
            message: "Artista insertado satisfactoriamente",
            body: {
                nombre_artista_agrupacion
            }
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }

    
}

//Delete
export const deleteArtist = async (req: Request, res: Response): Promise<Response> => {
    
    try {
        const id = parseInt(req.params.id)

        const response: QueryResult = await pool.query(queries.DELETE_ARTIST, [
            id
        ]);

        return res.json(`Artista con el id ${id} eliminada satisfactoriamente`)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }
}

