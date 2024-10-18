import { User } from "../dto/response/user.base.dto";

const UserStub = (id: number): User => ({
    id: id,
    email: "stub@email.com",
    username: "Stub user"
});

export const mockUser = () => UserStub(1);