"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../helpers/index.controller");
const router = express_1.Router();
router.get('/song', index_controller_1.getSongs);
router.get('/song/:id', index_controller_1.getSongs);
exports.default = router;
