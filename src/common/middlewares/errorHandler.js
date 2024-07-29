import { newLogger } from "@common/utils/logger.js";
import { HttpException } from "@common/exceptions/appExceptions.js";

const logger = newLogger("Middleware|errorHandler")

function logErrors(err, req, res, next) {
  if (!(err instanceof HttpException) || err.statusCode != 404) {
    logger.error(err.stack)
  }

  next(err)
}

function notFoundHandler(req, res, next) {
  const error = new HttpException(404, "Not found!");
  next(error);
}

function xhrErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

function errorHandler(err, req, res) {
  res.status(err.statusCode ?? 500)
  res.send(err.httpMessage ?? "Internal Server Error")
}

export { logErrors, xhrErrorHandler, errorHandler, notFoundHandler }
