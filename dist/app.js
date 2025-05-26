"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("./libs/passport"));
const session_1 = __importDefault(require("./libs/session"));
const helmet_1 = __importDefault(require("./libs/helmet"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
// Sessão segura
app.use(session_1.default);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Middlewares
app.use(helmet_1.default);
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Middleware route
app.use(routes_1.default);
app.use(middlewares_1.errorRoute);
app.use(middlewares_1.errorRequest);
exports.default = ({
    run() {
        app.listen(config_1.default.port, () => {
            //console.log(`http://localhost:${config.port}`);
        });
    }
});
