import { Request, Response } from 'express'

const path = require('path');
import multer from 'multer'
const fs = require('fs');

export const render = (req: Request, res: Response) => {
    console.log(req.file)
    res.send('uploaded')
}

const storage = multer.diskStorage({
    destination: './public/imagenes',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + 
    path.extname(file.originalname));
    }
});

export const guardar = multer({
    storage: storage,
    limits: { fieldSize: 10 * 1024 * 1024 } 
})