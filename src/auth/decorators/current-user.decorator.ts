import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

const getCurrentUserFromContext = (ctx: ExecutionContext) => {
    const request: any = ctx.switchToHttp().getRequest<Request>();
    return request.user;
}

/**
 * Returns the data inside request object, by default is a TokenPayload
 */
export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => getCurrentUserFromContext(context));