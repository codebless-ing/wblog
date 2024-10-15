import Joi from "joi";
import { BaseOutputDto } from "../dto.js";

class ListArticleInputDto {
    static SCHEMA = Joi.object({
        title: Joi.string().min(3).max(250).allow(''),
        tags: Joi.array().items(Joi.string().min(2).max(30).pattern(new RegExp("^[A-z0-9 _-]*$")).allow('')),
        // Regex: alphanum + whitespace + underscore + dash
    }).options({ abortEarly: false });

    constructor(data) {
        data = Joi.attempt(data, this.constructor.SCHEMA);

        this.title = data.title;
        this.tags = data.tags;
    }
}

class ListArticleOutputDto extends BaseOutputDto {
    data = [];

    constructor(articles, success = true, info) {
        super(success, info);

        for (let k in articles) {
            this.data[k] = {
                _id: articles[k]._id,
                title: articles[k].title,
                body: articles[k].body,
                tags: articles[k].tags,
            };
        }
    }
}

export { ListArticleInputDto, ListArticleOutputDto };
