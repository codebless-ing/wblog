import express from "express";
import "express-async-errors";
import session from "express-session";

import { NamedRouter, routes as registeredRoutes } from "reversical";

import config from "./config.js";
import { connectToDatabase } from "@models/index.js";
import { BootException } from "@common/exceptions/coreException.js";
import { errorHandler, logErrors, notFoundHandler } from "@middlewares/errorHandler.js";
import { consoleLogger } from "@common/utils/logger.js";

import routes from "@routes/index.js";

/* Model */
await connectToDatabase(config.db.uri, config.db.user, config.db.pass, config.db.database);

/* HTTP */
const app = express();
const router = new NamedRouter(app);

app.set("view engine", "pug");
app.set("views", "./src/resources/views");

// Data provided to the view-stack
app.locals.basedir = app.get("views");
app.locals.routes = registeredRoutes;

// Serving static files
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!config.app.http.session.secret) {
    throw new BootException("Undefined or invalid secret key for HTTP sessions. SESSION_SECRET must be defined in the environment file (.env).");
}

app.use(
    session({
        secret: config.app.http.session.secret,
        resave: false,
        saveUninitialized: true,
        cookie: config.app.http.cookie,
    })
);

router.use("/", routes);

/* Error handling */
app.use(logErrors);
app.use(errorHandler);
app.use(notFoundHandler);

// Spin up the HTTP server
app.listen(config.app.port, async () => {
    consoleLogger.info(`App listening on port ${config.app.port}`);
});

export default app;
