import { Router } from 'express'
import { getSongs, getSongByID, updateSong, createSong, deleteSong } from '../helpers/index.controller'
const router = Router()

//tabla cancion
router.get('/song', getSongs) 
router.get('/song/:id', getSongByID)
router.put('/song', updateSong) 
router.post('/song/:id', createSong) 
router.delete('/song', deleteSong) 


export default router;