import session from 'express-session';
import config from '../config';

export default session({
    secret: config.sessionSecret as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // Mude para true em produção com HTTPS
        maxAge: 60 * 60 * 1000
    }
});


