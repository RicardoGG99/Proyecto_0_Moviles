import jwt from 'jsonwebtoken'
import config from '../config/aliases'

export const createToken = async (StringID: string, user: string) => {
    const token = await jwt.sign({id: StringID, user_name: user}, config.jwtSecret || 'wildtoken', {
        expiresIn: 86400
    })   

    return token
}