import express from "express";
import { NamedRouter, routes } from "reversical";

import ArticleController from "@controllers/article.controller.js";

const router = express();
const namedRouter = new NamedRouter(router);

router.set("views", "./src/resources/views");
router.locals.basedir = router.get("views");
router.locals.routes = routes;

const controller = new ArticleController();

namedRouter.post("articleCreate", "/", controller.create);
namedRouter.put("articleUpdate", "/:id", controller.update);
namedRouter.delete("articleDelete", "/:id", controller.delete);

namedRouter.get("articleNew", "/new", controller.write);
namedRouter.get("articleList", "/", controller.list);
namedRouter.get("articleTags", "/tags", controller.tags);
namedRouter.get("articleRead", "/:id", controller.read);
namedRouter.get("articleEdit", "/:id/edit", controller.write);

export default router;
