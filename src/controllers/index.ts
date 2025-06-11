import { Request, Response } from "express";
import { createContact, getAllContactById, getUserByEmail, upsertGoogleUser } from "../services";
import config from "../config";

export const login = (req: Request, res: Response) =>
    res.render('pages/login', { title: 'GMessage | Login' });

export const auth = (req: Request, res: Response) =>
    res.redirect("/dashboard");

export const logout = (req: Request, res: Response) =>
    req.logout(() => res.redirect("/login"));

export const pageContactController = (req: Request, res: Response) =>
    res.render('pages/addContact', { title: 'GMessage | Add contact', id: req.query.q });

export const pageChatController = (req: Request, res: Response) =>
    res.render('pages/chat', { title: 'GMessage | Chat', fromEmail: req.query.from, toEmail: req.query.to });

export const addContactController = async (req: Request, res: Response) => {

    try {

        const ownerId = Number(req.body.render);
        const recipient = await getUserByEmail(req.body.recipient);

        if (!recipient) {
            res.render('pages/error', { title: 'Error 4xx', message: 'Usuario não está no app', url: config.url });
            return;
        }

        // Função para adicionar um contato ao banco
        await createContact(ownerId, recipient.id);
        res.redirect('/dashboard');

    } catch (error) {

    }
}

export const dashboard = async (req: Request, res: Response) => {
    try {
        if (!req.isAuthenticated()) return res.redirect("/login");
        const { _json } = req.user as any;
        const user = await upsertGoogleUser({ name: _json.name, email: _json.email, sub: _json.sub, picture: _json.picture });
        const contacts = await getAllContactById(user.id);
        res.render('pages/dashboard', { title: 'Dashboard', user, contacts });
    } catch (error) {

    }
}