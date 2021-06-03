"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_song_1 = require("../helpers/index.song");
const index_song_artist_1 = require("../helpers/index.song_artist");
const index_artist_1 = require("../helpers/index.artist");
const index_user_1 = require("../helpers/index.user");
const router = express_1.Router();
//tabla cancion
router.get('/song', index_song_1.getSongs);
router.get('/song/:id', index_song_1.getSongByID);
router.put('/song/:id', index_song_1.updateSong);
router.post('/song', index_song_1.createSong);
router.delete('/song/:id', index_song_1.deleteSong);
//tabla cancion_artista
router.get('/songart', index_song_artist_1.getSongsArtist);
router.get('/songart/:id', index_song_artist_1.getSongArtistByID);
router.put('/songart/:id', index_song_artist_1.updateSongArtist);
router.post('/songart/:id', index_song_artist_1.createSongArtist);
router.delete('/songart', index_song_artist_1.deleteSongArtist);
//tabla artista
router.get('/artist', index_artist_1.getArtist);
router.get('/artist/:id', index_artist_1.getArtistByID);
router.put('/artist/:id', index_artist_1.updateArtist);
router.post('/artist', index_artist_1.createArtist);
router.delete('/artist/:id', index_artist_1.deleteArtist);
//tabla user
router.get('/user', index_user_1.getUsers);
router.get('/user/:id', index_user_1.LoginUser);
router.put('/user/:id', index_user_1.updateUser);
router.post('/user', index_user_1.createUser);
router.delete('/user/:id', index_user_1.deleteUser);
exports.default = router;
