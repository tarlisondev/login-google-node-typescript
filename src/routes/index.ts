import { Router } from 'express';
import passport from '../libs/passport';
import { addContactController, auth, dashboard, login, logout, pageChatController, pageContactController } from '../controllers';

const route = Router();

route.get('/login', login);

route.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

route.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), auth);

route.get("/dashboard", dashboard);

route.get("/logout", logout);

route.get('/create/contact/', pageContactController);
route.post('/create/contact', addContactController);

route.get('/chat', pageChatController);

export default route;