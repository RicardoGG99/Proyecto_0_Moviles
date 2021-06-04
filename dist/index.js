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
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const multer = require('multer');
const app = express_1.default();
const PORT = process.env.PORT || 4000;
//middles
app.use(express_1.default.json()); //Transforma lo que llegue a un objeto json
app.use(express_1.default.urlencoded({ extended: false })); //Transforma un form a json
app.use(index_1.default);
app.use(cors_1.default());
//sets
app.set('views', path_1.default.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');
app.use(multer({
    dest: path_1.default.join(__dirname, '../src/public/imagenes')
}).single('image'));
index_1.default.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('index');
}));
index_1.default.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield console.log(req.file);
    res.send('uploaded');
}));
app.listen(PORT, () => {
    console.log(`Server en puerto ${PORT}`);
});
