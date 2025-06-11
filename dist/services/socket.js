"use strict";
// LOGICA PARA ENVIO DE MENSAGEM COM SOCKET.IO
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = socketService;
const socket_io_1 = require("socket.io");
const _1 = require(".");
const prisma_1 = require("../libs/prisma");
const connectedUsers = {}; // email -> socket.id
function socketService(server) {
    const io = new socket_io_1.Server(server);
    io.on('connection', (socket) => {
        // Register email no socket id
        socket.on('register', (email) => {
            connectedUsers[email] = socket.id;
            console.log(`🟢 ${email} conectado com socket ${socket.id}`);
        });
        // Enviar mensagem
        socket.on('send_message', (_a) => __awaiter(this, [_a], void 0, function* ({ fromEmail, toEmail, content, createdAt }) {
            try {
                // 1. Buscar usuários pelo e-mail
                const [fromUser, toUser] = yield Promise.all([
                    (0, _1.getUserByEmail)(fromEmail),
                    (0, _1.getUserByEmail)(toEmail),
                ]);
                if (!fromUser || !toUser) {
                    console.log('❌ Usuário não encontrado');
                    return;
                }
                const message = {
                    fromId: fromUser.id,
                    toId: toUser.id,
                    content,
                    createdAt: new Date(createdAt)
                };
                const targetSocket = connectedUsers[toEmail];
                if (targetSocket) {
                    // Usuário online → envia via socket
                    io.to(targetSocket).emit('receive_message', Object.assign(Object.assign({}, message), { fromEmail,
                        toEmail }));
                    console.log(`📨 Mensagem enviada para ${toEmail}`);
                }
                else {
                    // Usuário offline → salva no banco
                    yield prisma_1.prisma.message.create({ data: message });
                    console.log(`💾 Mensagem salva para ${toEmail}`);
                }
            }
            catch (error) {
                console.error('Erro ao enviar mensagem:', error);
            }
        }));
        socket.on('disconnect', () => {
            for (const [email, id] of Object.entries(connectedUsers)) {
                if (id === socket.id) {
                    delete connectedUsers[email];
                    console.log(`🔴 ${email} desconectado`);
                    break;
                }
            }
        });
    });
}
