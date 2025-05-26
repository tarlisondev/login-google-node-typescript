"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorRequest = exports.errorRoute = void 0;
const errorRoute = (req, res, next) => {
    res.redirect('/login');
    // res.status(404).json({data: 'Route not found'});
};
exports.errorRoute = errorRoute;
const errorRequest = (err, req, res, next) => {
    console.log(err);
    //res.redirect('/login')
    res.status(500).json({ data: 'Internal server error' });
};
exports.errorRequest = errorRequest;
