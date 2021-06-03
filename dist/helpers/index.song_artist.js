"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSongArtist = exports.createSongArtist = exports.updateSongArtist = exports.getSongArtistByID = exports.getSongsArtist = void 0;
const database_1 = require("../database");
const queries_1 = __importDefault(require("../utils/queries"));
const getSongsArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query(queries_1.default.GET_ARTIST_SONG);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.getSongsArtist = getSongsArtist;
const getSongArtistByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield database_1.pool.query(queries_1.default.GET_ARTIST_SONG_BY_ID, [
            id
        ]);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.getSongArtistByID = getSongArtistByID;
//Arreglar para que verifique si existe el user
const updateSongArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { cancion_id, id_artista_agrupacion } = req.body;
    const response = yield database_1.pool.query(queries_1.default.UPDATE_ARTIST_SONG, [
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
    });
    return res.status(200);
});
exports.updateSongArtist = updateSongArtist;
const createSongArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cancion_id, id_artista_agrupacion } = req.body;
        const response = yield database_1.pool.query(queries_1.default.CREATE_ARTIST_SONG, [
            cancion_id,
            id_artista_agrupacion
        ]);
        return res.json({
            message: "Cancion/Artista insertada satisfactoriamente",
            body: {
                cancion_id,
                id_artista_agrupacion
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.createSongArtist = createSongArtist;
const deleteSongArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cancion_id, id_artista_agrupacion } = req.body;
        const response = yield database_1.pool.query(queries_1.default.DELETE_ARTIST_SONG, [
            parseInt(cancion_id),
            id_artista_agrupacion
        ]);
        return res.json(`Cancion con el id ${cancion_id} y Artista con id ${id_artista_agrupacion} fueron eliminados satisfactoriamente`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.deleteSongArtist = deleteSongArtist;
