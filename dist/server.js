"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const app_1 = __importDefault(require("./app"));
const socket_1 = __importDefault(require("./services/socket"));
const config_1 = __importDefault(require("./config"));
const server = (0, node_http_1.createServer)(app_1.default);
(0, socket_1.default)(server);
server.listen(config_1.default.port, () => {
    console.log('Server run...');
});
