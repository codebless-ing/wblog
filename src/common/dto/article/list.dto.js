import Joi from "joi";
import { BaseOutputDto } from "../dto.js";

class ListArticleInputDto {
    static SCHEMA = Joi.object({
        title: Joi.string().allow(""),
        tags: Joi.array().items(Joi.string().allow("")),
    }).options({ abortEarly: false });

    constructor(data) {
        if (typeof data.tags == "string") {
            data.tags = data.tags.split(",");
        } else {
            data.tags = Array.isArray(data.tags) ? data.tags : [];
        }

        data = Joi.attempt(data, this.constructor.SCHEMA);

        this.title = typeof data.title == "string" ? data.title : "";
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
