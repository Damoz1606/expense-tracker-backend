import { AuthCredential } from "@prisma/client";

const AuthCredentialStub = (id: number): AuthCredential => ({
    id: id,
    email: "test@email.com",
    password: "12345",
    userId: 1
})

export const mockAuthCredential = () => AuthCredentialStub(1);