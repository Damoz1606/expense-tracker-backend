export class TokenPayload {
    public readonly sub: number;

    constructor(
        subject: number,
    ) {
        this.sub = subject;
    }
}