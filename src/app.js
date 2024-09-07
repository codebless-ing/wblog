import express from "express";
import "express-async-errors";

import config from "./config.js";
import { connectToDatabase } from "@models/index.js";
import { errorHandler, logErrors, notFoundHandler } from "@middlewares/errorHandler.js";
import { consoleLogger } from "@common/utils/logger.js";

import routes from "@routes/index.js";

/* Model */
await connectToDatabase(config.db.uri, config.db.user, config.db.pass, config.db.database);

/* HTTP */
const app = express();

app.set("view engine", "pug");
app.set("views", "./src/resources/views");
app.locals.basedir = app.get('views');

// Serving static files
app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

/** Error handling */
app.use(logErrors);
app.use(errorHandler);
app.use(notFoundHandler);

// Spin up the HTTP server
app.listen(config.app.port, async () => {
    consoleLogger.info(`App listening on port ${config.app.port}`);
});

export default app;
