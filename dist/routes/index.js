"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("../libs/passport"));
const pages_1 = require("../pages");
const route = (0, express_1.Router)();
// Rota de login
route.get('/login', (req, res) => {
    try {
        let login = (0, pages_1.showLogin)();
        res.send(login);
        //res.status(200).send(`<h1>Login com <a href="/auth/google">Google</a></h1>`);
    }
    catch (error) {
        res.status(500).json({ data: 'Error' });
    }
});
// Inicia login com Google
route.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
// Redireciona após login
route.get("/auth/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/dashboard");
});
route.get("/dashboard", (req, res) => {
    if (!req.isAuthenticated())
        return res.redirect("/login");
    const { _json } = req.user;
    let screen = (0, pages_1.showDashboard)(_json.name, _json.picture);
    res.send(screen);
});
// Logout
route.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/login");
    });
});
exports.default = route;
