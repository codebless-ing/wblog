import "dotenv/config";
import express from "express";

import routes from '@routes/index.js';

const app = express();
const port = process.env.PORT || 6010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

/** Error handling */
app.use(() => {
  throw new Error("Not found");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})
