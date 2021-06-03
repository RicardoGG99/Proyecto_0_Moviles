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
exports.deleteUser = exports.createUser = exports.updateUser = exports.LoginUser = exports.getUsers = void 0;
const bcryptjs_1 = require("bcryptjs");
const index_compare_1 = require("../helpers/index.compare");
const database_1 = require("../database");
const queries_1 = __importDefault(require("../utils/queries"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query(queries_1.default.GET_USER);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.getUsers = getUsers;
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { user_name, clave } = req.body;
        const response = yield database_1.pool.query(queries_1.default.LOGIN_USER, [
            id
        ]);
        const original = response.rows[0].clave;
        const userOriginal = response.rows[0].user_name;
        if (userOriginal === user_name && index_compare_1.comparePassword(original, clave)) {
            return res.json(`Sesion iniciada exitosamente con el usuario ${user_name}`);
        }
        else {
            return res.json('No se pudo iniciar sesion');
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.LoginUser = LoginUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { user_name, clave, nueva } = req.body;
        const salt = bcryptjs_1.genSaltSync(10);
        const claveHash = bcryptjs_1.hashSync(clave, salt);
        const comp = yield database_1.pool.query(queries_1.default.GET_USER_BY_ID, [
            id
        ]);
        const resu = yield index_compare_1.comparePassword(nueva, claveHash);
        if (resu) {
            const result = yield database_1.pool.query(queries_1.default.UPDATE_USER, [
                user_name,
                nueva,
                id
            ]);
            return res.json({
                message: "Usuario actualizada satisfactoriamente",
                body: {
                    id,
                    user_name
                }
            });
        }
        else {
            return res.json('Claves originales no coinciden');
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.updateUser = updateUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_name, clave } = req.body;
        //Encrypt pass
        const salt = bcryptjs_1.genSaltSync(10);
        const newClave = bcryptjs_1.hashSync(clave, salt);
        const response = yield database_1.pool.query(queries_1.default.CREATE_USER, [
            user_name,
            newClave
        ]);
        return res.json({
            message: "Usuario creado satisfactoriamente",
            body: {
                user_name,
                clave
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { clave } = req.body;
        // //Encriptar clave para compararla con la original (medida de seguridad)
        // const salt = genSaltSync(10);
        // const newClave = hashSync(clave, salt);
        const comp = yield database_1.pool.query(queries_1.default.RETURN_PASS_USER, [
            id
        ]);
        const claveHash = comp.rows[0].clave;
        if (yield index_compare_1.comparePassword(clave, claveHash)) {
            const response = yield database_1.pool.query(queries_1.default.DELETE_USER, [
                id,
                claveHash
            ]);
            return res.json(`Usuario con el id ${id} eliminado satisfactoriamente`);
        }
        else {
            return res.json(`Usuario con el id ${id} no pudo ser eliminado`);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error interno en el servidor');
    }
});
exports.deleteUser = deleteUser;
