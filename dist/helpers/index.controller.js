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
exports.deleteSong = exports.createSong = exports.updateSong = exports.getSongByID = exports.getSongs = void 0;
const database_1 = require("../database");
const queries_1 = __importDefault(require("../utils/queries"));
const getSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query(queries_1.default.GET_SONG);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.getSongs = getSongs;
const getSongByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield database_1.pool.query(queries_1.default.GET_SONG_BY_ID, [
            id
        ]);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.getSongByID = getSongByID;
//Arreglar para que verifique si existe el user
const updateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, duracion, cancion_id } = req.body;
    const response = yield database_1.pool.query(queries_1.default.UPDATE_SONG, [
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
    });
    return res.status(200);
});
exports.updateSong = updateSong;
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cancion_id, nombre, duracion } = req.body;
        const response = yield database_1.pool.query(queries_1.default.CREATE_SONG, [
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
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.createSong = createSong;
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cancion_id } = req.body;
        const response = yield database_1.pool.query(queries_1.default.DELETE_SONG, [
            parseInt(cancion_id)
        ]);
        return res.json(`Cancion con el id ${cancion_id} eliminada satisfactoriamente`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.deleteSong = deleteSong;
