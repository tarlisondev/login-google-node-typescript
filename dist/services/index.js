"use strict";
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
exports.getUserByEmail = exports.deleteUser = exports.getUserById = void 0;
exports.upsertGoogleUser = upsertGoogleUser;
exports.createContact = createContact;
exports.getAllContactById = getAllContactById;
const prisma_1 = require("../libs/prisma");
// USER
function upsertGoogleUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ name, email, picture, sub }) {
        console.log('passou aqui no service');
        return prisma_1.prisma.user.upsert({
            where: { email },
            update: { name, email, picture },
            create: { sub, name, email, picture },
        });
    });
}
//
const getUserById = (id) => prisma_1.prisma.user.findUnique({ where: { id } });
exports.getUserById = getUserById;
const deleteUser = (id) => prisma_1.prisma.user.delete({ where: { id } });
exports.deleteUser = deleteUser;
const getUserByEmail = (email) => prisma_1.prisma.user.findUnique({ where: { email } });
exports.getUserByEmail = getUserByEmail;
// CONTACT
function createContact(ownerId, contactId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma_1.prisma.contact.create({
            data: { ownerId, contactId },
        });
    });
}
function getAllContactById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.contact.findMany({
            where: { ownerId: id },
            include: { contact: true }
        });
    });
}
