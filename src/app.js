import "dotenv/config";
import express from "express";

import { errorHandler, xhrErrorHandler, logErrors } from "@middlewares/errorHandler.js";
import routes from '@routes/index.js';
import { connectToDatabase } from "@models/index.js";

/* Model */
await connectToDatabase(
  process.env.DB_URI,
  process.env.DB_USER,
  process.env.DB_PASS,
  process.env.DB_DATABASE
)

/* HTTP */
const app = express();
const port = process.env.PORT || 6010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.statusCode = 404;
  next(error);
});

app.use(logErrors)
app.use(xhrErrorHandler)
app.use(errorHandler)

// Spin up the HTTP server
app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
})
