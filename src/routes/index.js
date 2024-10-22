import express from "express";
import { NamedRouter } from "reversical";

const router = express()
const namedRouter = new NamedRouter(router)

import articleRoutes from "@routes/article.js";

namedRouter.use("/article", articleRoutes);

export default router;
