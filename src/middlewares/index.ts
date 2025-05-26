import { ErrorRequestHandler, RequestHandler } from 'express'
export const errorRoute: RequestHandler = (req, res, next) => {
    res.redirect('/login')
   // res.status(404).json({data: 'Route not found'});
}

export const errorRequest: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    //res.redirect('/login')
    res.status(500).json({ data: 'Internal server error' });
}