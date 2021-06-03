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
exports.deleteArtist = exports.createArtist = exports.updateArtist = exports.getArtistByID = exports.getArtist = void 0;
const database_1 = require("../database");
const queries_1 = __importDefault(require("../utils/queries"));
//Read
const getArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query(queries_1.default.GET_ARTIST);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.getArtist = getArtist;
//Read
const getArtistByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield database_1.pool.query(queries_1.default.GET_ARTIST_BY_ID, [
            id
        ]);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.getArtistByID = getArtistByID;
//Arreglar para que verifique si existe el user
//Update
const updateArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { nombre_artista_agrupacion } = req.body;
    const response = yield database_1.pool.query(queries_1.default.UPDATE_ARTIST, [
        nombre_artista_agrupacion,
        id
    ]);
    return res.json({
        message: "Artista actualizado satisfactoriamente",
        body: {
            id,
            nombre_artista_agrupacion
        }
    });
    return res.status(200);
});
exports.updateArtist = updateArtist;
//Create
const createArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_artista_agrupacion } = req.body;
        const response = yield database_1.pool.query(queries_1.default.CREATE_ARTIST, [
            nombre_artista_agrupacion
        ]);
        return res.json({
            message: "Artista insertado satisfactoriamente",
            body: {
                nombre_artista_agrupacion
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.createArtist = createArtist;
//Delete
const deleteArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield database_1.pool.query(queries_1.default.DELETE_ARTIST, [
            id
        ]);
        return res.json(`Artista con el id ${id} eliminada satisfactoriamente`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.deleteArtist = deleteArtist;
