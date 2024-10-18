import { TokenPayload } from "../token/token.payload";

const TokenPayloadStub = (sub: number): TokenPayload => ({
    sub: sub
});

export const mockTokenPayload = () => TokenPayloadStub(1);