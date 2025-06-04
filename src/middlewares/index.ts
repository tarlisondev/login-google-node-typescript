import { ErrorRequestHandler, RequestHandler } from 'express'
export const errorRoute: RequestHandler = (req, res, next) => {
    res.redirect('/login')
}

export const errorRequest: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err)
    res.render('pages/error', { title: 'Error 5xx', message: 'Ops! Hove um erro desconhecido.', url: '' });
}