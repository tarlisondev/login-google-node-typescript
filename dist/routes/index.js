"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("../libs/passport"));
const controllers_1 = require("../controllers");
const route = (0, express_1.Router)();
route.get('/login', controllers_1.login);
route.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
route.get("/auth/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), controllers_1.auth);
route.get("/dashboard", controllers_1.dashboard);
route.get("/logout", controllers_1.logout);
route.get('/create/contact/', controllers_1.pageContactController);
route.post('/create/contact', controllers_1.addContactController);
route.get('/chat', controllers_1.pageChatController);
exports.default = route;
