"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = void 0;
const bcryptjs_1 = require("bcryptjs");
const comparePassword = (candidate, hash) => {
    return new Promise((res, rej) => {
        bcryptjs_1.compare(candidate, hash, (err, isMatch) => {
            if (err)
                rej(err);
            res(isMatch);
        });
    });
};
exports.comparePassword = comparePassword;
