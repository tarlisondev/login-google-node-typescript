import { Request, Response } from "express";
import { showDashboard, showLogin } from "../pages";

export const login = (req: Request, res: Response) => {
    try {
        let login = showLogin();
        res.send(login)
        //res.status(200).send(`<h1>Login com <a href="/auth/google">Google</a></h1>`);
    } catch (error) {
        res.status(500).json({ data: 'Error' });
    }
}

export const auth = (req: Request, res: Response) => {
    res.redirect("/dashboard");
}

export const dashboard = (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.redirect("/login");

    const { _json } = req.user as any;
    let screen = showDashboard(_json.name, _json.picture)
    res.send(screen);
}

export const logout = (req: Request, res: Response) => {
    req.logout(() => {
        res.redirect("/login");
    });
}