import { genSaltSync, hashSync } from 'bcryptjs';
import { comparePassword } from '../helpers/index.compare'
import e, { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';
import queries from '../utils/queries';


export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {

        const response: QueryResult = await pool.query(queries.GET_USER);
    return res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }
    
}

export const LoginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id)

        const {user_name, clave} = req.body

        const response: QueryResult = await pool.query(queries.LOGIN_USER, [
            id
        ]);

        const original = response.rows[0].clave
        const userOriginal = response.rows[0].user_name


        if(userOriginal === user_name && comparePassword(original, clave)){
            return res.json(`Sesion iniciada exitosamente con el usuario ${user_name}`)
        }else{
            return res.json('No se pudo iniciar sesion')
        }


        
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }
    
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {

        const id = parseInt(req.params.id)

    const { user_name, clave, nueva } = req.body

    const salt = genSaltSync(10);
    const claveHash = hashSync(clave, salt);

    const comp: QueryResult = await pool.query(queries.GET_USER_BY_ID, [
        id
    ])

    const resu = await comparePassword(nueva, claveHash)
    
    if(resu){

        const result: QueryResult = await pool.query(queries.UPDATE_USER, [
            user_name,
            nueva,
            id
        ])

        return res.json({
            message: "Usuario actualizada satisfactoriamente",
            body: {                
                id,
                user_name
            }
        })   
    }else{
        return res.json('Claves originales no coinciden')
    }

    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }
    
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { user_name, clave } = req.body

        //Encrypt pass
        const salt = genSaltSync(10);
        const newClave = hashSync(clave, salt);


        const response: QueryResult = await pool.query(queries.CREATE_USER, [
            user_name,
            newClave
        ]);
        
        
        return res.json({
            message: "Usuario creado satisfactoriamente",
            body: {
                user_name,
                clave
            }
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }
    
}


export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {

        const id = parseInt(req.params.id)

        const { clave } = req.body

        const comp: QueryResult = await pool.query(queries.RETURN_PASS_USER, [
            id
        ]);

        const claveHash = comp.rows[0].clave   

        

         if(await comparePassword(clave, claveHash)){

            const response = await pool.query(queries.DELETE_USER, [
            id,
            claveHash
        ])
            

            return res.json(`Usuario con el id ${id} eliminado satisfactoriamente`)
    
            }else{
                return res.json(`Usuario con el id ${id} no pudo ser eliminado`)
            }      

        
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error interno en el servidor')
    }
    
}