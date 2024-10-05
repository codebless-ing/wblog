import Joi from "joi";
import { BaseOutputDto } from "../dto.js";

class ListArticleInputDto {
    static SCHEMA = Joi.object({
        title: Joi.string().min(3).max(250),
        tags: Joi.array().items(Joi.string().min(2).max(30).pattern(new RegExp("^[A-z0-9 _-]*$"))),
        // Regex: alphanum + whitespace + underscore + dash
    }).options({ abortEarly: false });

    constructor(data) {
        data = Joi.attempt(data, this.constructor.SCHEMA);

        this.title = data.title;
        this.tags = data.tags;
    }
}

class ListArticleOutputDto extends BaseOutputDto {
    data;

    constructor({ title, tags }, success = true, info) {
        super(success, info);

        this.data = {
            title: title,
            tags: tags,
        };
    }
}

export { ListArticleInputDto, ListArticleOutputDto };
