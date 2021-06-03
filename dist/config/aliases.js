"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const dev = process.env.NODE_ENV !== 'production';
exports.default = {
    jwtSecret: process.env.JWT_SECRET || 'wildtoken'
};
