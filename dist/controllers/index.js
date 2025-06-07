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
exports.dashboard = exports.addContactController = exports.pageChatController = exports.pageContactController = exports.logout = exports.auth = exports.login = void 0;
const services_1 = require("../services");
const config_1 = __importDefault(require("../config"));
const login = (req, res) => res.render('pages/login', { title: 'GMessage | Login' });
exports.login = login;
const auth = (req, res) => res.redirect("/dashboard");
exports.auth = auth;
const logout = (req, res) => req.logout(() => res.redirect("/login"));
exports.logout = logout;
const pageContactController = (req, res) => res.render('pages/addContact', { title: 'GMessage | Add contact', id: req.query.q });
exports.pageContactController = pageContactController;
const pageChatController = (req, res) => res.render('pages/chat', { title: 'GMessage | Chat', fromEmail: req.query.from, toEmail: req.query.to });
exports.pageChatController = pageChatController;
const addContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ownerId = Number(req.body.render);
        const recipient = yield (0, services_1.getUserByEmail)(req.body.recipient);
        if (!recipient) {
            res.render('pages/error', { title: 'Error 4xx', message: 'Usuario não está no app', url: config_1.default.url });
            return;
        }
        // Função para adicionar um contato ao banco
        yield (0, services_1.createContact)(ownerId, recipient.id);
        res.redirect('/dashboard');
    }
    catch (error) {
    }
});
exports.addContactController = addContactController;
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.isAuthenticated())
            return res.redirect("/login");
        const { _json } = req.user;
        const user = yield (0, services_1.upsertGoogleUser)({ name: _json.name, email: _json.email, sub: _json.sub, picture: _json.picture });
        const contacts = yield (0, services_1.getAllContactById)(user.id);
        res.render('pages/dashboard', { title: 'Dashboard', user, contacts });
    }
    catch (error) {
    }
});
exports.dashboard = dashboard;
