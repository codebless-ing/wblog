// see: https://datatracker.ietf.org/doc/html/rfc7231#section-6
const httpReasons = {
    400: "BadRequest",
    401: "Unauthorized",
    403: "Forbidden",
    404: "NotFound",
    405: "MethodNotAllowed",
    418: "ImATeapot", // Important!
    500: "InternalServerError"
}

class ModelException extends Error {
    layer = "Model"
    isOperational = true

    constructor(name, message, { isOperational } = {}) {
        super(name, message);

        this.isOperational = isOperational ?? isOperational
    }
}

class HttpException extends Error {
    layer = "Controller"
    isOperational = true
    httpMessage = "" // For communicating custom messages to the client
    httpReason = "" // Reason for the statusCode

    constructor(status, httpMessage, { isOperational, name, message } = {}) {
        name = name ?? "Http Exception"
        message = message ?? ""
        super(name, message);
        this.httpMessage = httpMessage ?? this.httpMessage
        this.isOperational = isOperational ?? this.isOperational
        this.statusCode = typeof status === "number" && typeof httpReasons[status] == "string" ? status : 500
    }

    set statusCode(status) {
        this.httpReason = httpReasons[status] ?? this.httpReason
    }

}

export { ModelException, HttpException };
