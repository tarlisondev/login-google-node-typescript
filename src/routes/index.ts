import { Router } from 'express';
import passport from '../libs/passport';
import { showDashboard, showLogin } from '../pages';

const route = Router();

// Rota de login
route.get('/login', (req, res) => {
    try {
        let login = showLogin();
        res.send(login)
        //res.status(200).send(`<h1>Login com <a href="/auth/google">Google</a></h1>`);
    } catch (error) {
        res.status(500).json({ data: 'Error' });
    }
});

// Inicia login com Google
route.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Redireciona após login
route.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/dashboard");
});

route.get("/dashboard", (req, res) => {
    if (!req.isAuthenticated()) return res.redirect("/login");

    const { _json } = req.user as any;
    let screen = showDashboard(_json.name, _json.picture)
    res.send(screen);
});

// Logout
route.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/login");
    });
});

export default route;