import express from "express";
import morgan from 'morgan';
import cors from 'cors';

import passport from "./libs/passport";
import session from "./libs/session";
import helmet from "./libs/helmet";
import config from './config';
import route from "./routes";
import { errorRequest, errorRoute } from "./middlewares";
import path from "path";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Sessão segura
app.use(session);
app.use(passport.initialize())
app.use(passport.session())

// Middlewares
app.use(helmet);
app.use(morgan("dev"));
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use( express.static(path.join(__dirname, '../public')));

// Middleware route
app.use(route);
app.use(errorRoute);
app.use(errorRequest);

export default app;