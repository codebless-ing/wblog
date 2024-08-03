import BaseController from "@controllers/controller.js";
import service from "@services/article.js"
import { HttpException } from "@common/exceptions/appExceptions.js";

class ArticleController extends BaseController {
    async create(req, res) {
        // => TODO: Data validation

        const data = req.body

        // Temporary validation
        if (
            !data || typeof data.title !== "string" || data.title.length < 3 || data.title.length > 250 ||
            typeof data.body !== "string" || data.body.length < 3 || data.body.length > 5000 ||
            typeof data.tags !== "string" || data.tags.length < 2 || data.tags.length > 5000
        ) {
            throw new HttpException(400, "Invalid data")
        }

        // => TODO: Contract
        await service.create({
            title: data.title,
            body: data.body,
            tags: data.tags.split(";")
        })

        res.status(200)
        return res.send("Article created successfully!");
    }

    async read(req, res) {
        if (typeof req.params.id !== "string") {
            throw new HttpException(400, 'Invalid data')
        }

        const result = await service.read(req.params.id)

        const article = result.data

        if (!article) {
            throw new HttpException(404, result.message)
        }

        res.status(200)
        return res.render('article/index', { title: article.title, body: article.body, tags: article.tags });
    }

    async update(req, res) {
        const data = req.body

        // Temporary validation, you're really taking your time with it huh
        if (
            typeof req.params.id !== "string" || !req.params.id || !data || typeof data.title !== "string" || data.title.length < 3 || data.title.length > 250 ||
            typeof data.body !== "string" || data.body.length < 3 || data.body.length > 5000 ||
            typeof data.tags !== "string" || data.tags.length < 2 || data.tags.length > 5000
        ) {
            throw new HttpException(400, "Invalid data")
        }

        const newArticle = {
            id: req.params.id,
            title: data.title,
            body: data.body,
            tags: data.tags.split(";")
        }

        const result = await service.update(newArticle)
        const article = result.data

        if (!article) {
            throw new HttpException(404, result.message)
        }

        res.status(200)
        return res.render('article/index', { title: article.title, body: article.body, tags: article.tags });
    }

    async delete(req, res) {
        if (typeof req.params.id !== "string") {
            throw new HttpException(400, 'Invalid data')
        }

        const result = await service.delete(req.params.id)

        if (!result.data) {
            throw new HttpException(404, result.message)
        }

        res.status(200)
        return res.render('article/index', { title: result.message });
    }
}

export default ArticleController;
