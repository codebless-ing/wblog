import Joi from "joi";
const ValidationError = Joi.ValidationError;

import { newLogger } from "@common/utils/logger.js";
const logger = newLogger("Controller|BaseController");

import { HttpException } from "@common/exceptions/appExceptions.js";

class BaseController {
    reportBadData(error, data) {
        if (!(error instanceof ValidationError)) {
            throw error;
        }

        logger.info("Invalid data (%j): %s", data, error);
        throw new HttpException(400, error.message);
    }
}

export default BaseController;
