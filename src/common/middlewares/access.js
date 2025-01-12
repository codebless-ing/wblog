import { newLogger } from "@common/utils/logger.js";

const logger = newLogger("Middleware|access");

function accessLog(req, res, next) {
    const remoteClient = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    logger.debug('[access] %s "%s %s HTTP/%s"', remoteClient, req.originalMethod, req.originalUrl, req.httpVersion);

    next();
}

export { accessLog };
