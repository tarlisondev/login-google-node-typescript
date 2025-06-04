
import { prisma } from '../libs/prisma';
import { Prisma } from '../generated/prisma';
import '../server'

// USER
export async function upsertGoogleUser({ name, email, picture, sub }: Prisma.UserCreateInput) {
    return prisma.user.upsert({
        where: { email },
        update: { name, email, picture },
        create: { sub, name, email, picture },
    });
}

export const getUserById = (id: number) => prisma.user.findUnique({ where: { id } });
export const deleteUser = (id: number) => prisma.user.delete({ where: { id } });
export const getUserByEmail = (email: string) => prisma.user.findUnique({ where: { email } });

// CONTACT
export async function createContact(ownerId: number, contactId: number) {
    await prisma.contact.create({
        data: { ownerId, contactId },
    })
}

export async function getAllContactById(id: number) {
    return await prisma.contact.findMany({
        where: { ownerId: id },
        include: { contact: true }
    })
}
