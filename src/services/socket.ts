// LOGICA PARA ENVIO DE MENSAGEM COM SOCKET.IO

import { Server } from "socket.io";
import { Server as HttpServer } from 'node:http'
import { getUserByEmail } from ".";
import { prisma } from "../libs/prisma";

const connectedUsers: Record<string, string> = {}; // email -> socket.id


export default function socketService(server: HttpServer) {

    const io = new Server(server);

    io.on('connection', (socket) => {
        // Register email no socket id
        socket.on('register', (email) => {
            connectedUsers[email] = socket.id;
            console.log(`🟢 ${email} conectado com socket ${socket.id}`);
        });

        

        // Enviar mensagem
        socket.on('send_message', async ({ fromEmail, toEmail, content, createdAt }) => {
            try {
                // 1. Buscar usuários pelo e-mail
                const [fromUser, toUser] = await Promise.all([
                    getUserByEmail(fromEmail),
                    getUserByEmail(toEmail),
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

                console.log(message)

                const targetSocket = connectedUsers[toEmail];

                if (targetSocket) {
                    // Usuário online → envia via socket
                    io.to(targetSocket).emit('receive_message', {
                        ...message,
                        fromEmail,
                        toEmail
                    });
                    console.log(`📨 Mensagem enviada para ${toEmail}`);
                } else {
                    // Usuário offline → salva no banco
                    await prisma.message.create({ data: message });
                    console.log(`💾 Mensagem salva para ${toEmail}`);
                }
            } catch (error) {
                console.error('Erro ao enviar mensagem:', error);
            }
        });

        socket.on('disconnect', () => {
            for (const [email, id] of Object.entries(connectedUsers)) {
                if (id === socket.id) {
                    delete connectedUsers[email];
                    console.log(`🔴 ${email} desconectado`);
                    break;
                }
            }
        });
    })
}
