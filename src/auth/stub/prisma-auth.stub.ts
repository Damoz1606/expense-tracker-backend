import { AuthCredential } from "@prisma/client";

const PrismaAuthCredentialStub = (id: number): AuthCredential => ({
    id: id,
    email: "test@email.com",
    password: "12345",
    userId: 1,
    status: true
})

export const mockPrismaAuthCredential = () => PrismaAuthCredentialStub(1);