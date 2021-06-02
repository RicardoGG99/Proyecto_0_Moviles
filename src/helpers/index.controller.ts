import { Request, Response } from 'express'

export const getSongs = (req: Request, res: Response) => {
    res.send('songs')
}

