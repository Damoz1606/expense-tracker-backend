import { Logger } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

const middleware = (req: Request, res: Response, next: NextFunction) => {
    const logger = new Logger();
    const { url, ip, method } = req;
    res.on('finish', () => {
        const message = res.get('Content-Length') ? `Response size: ${res.get('Content-Length')} bytes` : 'No content';
        const { statusCode } = res;
        if (400 <= statusCode && statusCode < 500) logger.warn(`[${method.toUpperCase()}] ${url} - ${statusCode}`, message);
        else if (500 <= statusCode) logger.error(`[${method.toUpperCase()}][${ip}] ${url} - ${statusCode}`, message);
    });

    next();
}

export default middleware;