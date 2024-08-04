import { newLogger } from "@common/utils/logger.js";
import { HttpException } from "@common/exceptions/appExceptions.js";

const logger = newLogger("Middleware|errorHandler");

function logErrors(err, req, res, next) {
    // Doesn't log 404 HTTPErrors
    if (!(err instanceof HttpException && err.statusCode == 404)) {
        logger.error("%s", err);
    }

    next(err);
}

function errorHandler(err, req, res, next) {
    /*
     * HTTP ERRORS
     */
    if (err instanceof HttpException) {
        switch (err.statusCode) {
            case 404:
                return next();
            case 500:
                return res.status(500).render("errors/500", { message: err.httpMessage, reason: err.httpReason });

            default:
                break;
        }
    }

    return res.status(500).render("errors/500");
}

function notFoundHandler(req, res) {
    return res.status(404).render("errors/404");
}

export { logErrors, errorHandler, notFoundHandler };
