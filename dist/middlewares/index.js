"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorRequest = exports.errorRoute = void 0;
const errorRoute = (req, res, next) => {
    res.redirect('/login');
};
exports.errorRoute = errorRoute;
const errorRequest = (err, req, res, next) => {
    console.log(err);
    res.render('pages/error', { title: 'Error 5xx', message: 'Ops! Hove um erro desconhecido.', url: '' });
};
exports.errorRequest = errorRequest;
