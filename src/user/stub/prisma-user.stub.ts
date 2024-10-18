import { User } from "@prisma/client";

const PrismaUserStub = (id: number): User => ({
    id: id,
    email: "stub@email.com",
    username: "Stub user"
});

export const mockPrismaUser = () => PrismaUserStub(1);