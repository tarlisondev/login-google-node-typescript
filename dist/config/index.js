"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = ({
    port: process.env.PORT,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    url: "http://localhost:3333" //  "https://login-google-node-typescript.onrender.com" // "http://localhost:3333" 
});
