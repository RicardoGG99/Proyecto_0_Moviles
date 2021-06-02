"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../helpers/index.controller");
const router = express_1.Router();
//tabla cancion
router.get('/song', index_controller_1.getSongs);
router.get('/song/:id', index_controller_1.getSongByID);
router.put('/song', index_controller_1.updateSong);
router.post('/song/:id', index_controller_1.createSong);
router.delete('/song', index_controller_1.deleteSong);
exports.default = router;
