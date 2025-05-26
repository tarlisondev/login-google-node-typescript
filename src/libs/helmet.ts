import helmet from "helmet";

export default helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https://lh3.googleusercontent.com", "https://www.svgrepo.com"],
        },
    },
})