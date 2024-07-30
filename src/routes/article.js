import express from 'express';
import ArticleController from '@controllers/article.controller.js'

const router = express.Router();

const controller = new ArticleController();

router.post("/", controller.create);
router.get("/", controller.read);

export default router;
