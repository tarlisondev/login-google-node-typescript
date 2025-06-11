"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const config_1 = __importDefault(require("../config"));
exports.default = (0, express_session_1.default)({
    secret: config_1.default.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true, // Mude para true em produção com HTTPS
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
        sameSite: 'lax',
    }
});
