import { Router } from 'express';
import passport from '../libs/passport';
import { auth, dashboard, login, logout } from '../controllers';

const route = Router();

route.get('/login', login);

route.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

route.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), auth);

route.get("/dashboard", dashboard);

route.get("/logout", logout);

export default route;