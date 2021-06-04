"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardar = exports.render = void 0;
const path = require('path');
const multer_1 = __importDefault(require("multer"));
const fs = require('fs');
const render = (req, res) => {
    console.log(req.file);
    res.send('uploaded');
};
exports.render = render;
const storage = multer_1.default.diskStorage({
    destination: './public/imagenes',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});
exports.guardar = multer_1.default({
    storage: storage,
    limits: { fieldSize: 10 * 1024 * 1024 }
});
// export const subir = multer({
//     guardar,
//     limits: {fileSize: 1000000}
// }).single('image');
