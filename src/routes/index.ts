import { Router } from 'express'
import { getSongs, getSongByID, updateSong, createSong, deleteSong } from '../helpers/index.song'
import { getSongsArtist, getSongArtistByID, updateSongArtist, createSongArtist, deleteSongArtist } from '../helpers/index.song_artist'
import { getArtist, getArtistByID, updateArtist, createArtist, deleteArtist } from '../helpers/index.artist'
import { getUsers, LoginUser, updateUser, createUser, deleteUser } from '../helpers/index.user'

const router = Router()

//tabla cancion
router.get('/song', getSongs) 
router.get('/song/:id', getSongByID)
router.put('/song/:id', updateSong) 
router.post('/song', createSong) 
router.post('/song/:id', createSong) 
router.delete('/song/:id', deleteSong) 

//tabla cancion_artista
router.get('/songart', getSongsArtist) 
router.get('/songart/:id', getSongArtistByID)
router.put('/songart/:id', updateSongArtist) 
router.post('/songart/:id', createSongArtist) 
router.delete('/songart', deleteSongArtist) 

//tabla artista
router.get('/artist', getArtist) 
router.get('/artist/:id', getArtistByID)
router.put('/artist/:id', updateArtist) 
router.post('/artist', createArtist) 
router.delete('/artist/:id', deleteArtist) 

//tabla user
router.get('/user', getUsers) 
router.get('/user/:id', LoginUser)
router.put('/user/:id', updateUser) 
router.post('/user', createUser) 
router.delete('/user/:id', deleteUser) 
router.post('/artist/:id', createArtist) 
router.delete('/artist/:id', deleteArtist) 


export default router;