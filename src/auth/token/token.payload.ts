export class TokenPayload {
    public readonly sub: string;

    constructor(
        subject: string,
    ) {
        this.sub = subject;
    }
}