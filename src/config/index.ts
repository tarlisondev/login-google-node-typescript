import 'dotenv/config';
export default ({
    port: process.env.PORT,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    url: "https://login-google-node-typescript.onrender.com" // "http://localhost:3333" //
})