import Joi from "joi";
import { BaseOutputDto } from "../dto";

class ReadArticleInputDto {
    static SCHEMA = Joi.object({
        id: Joi.string().hex().length(24),
    });

    constructor(data) {
        this.id = data.id;
    }
}

class ReadArticleOutputDto extends BaseOutputDto {
    data;

    constructor({ _id, title, body, tags }, success = true, info) {
        super(success, info);

        this.data = {
            _id: _id,
            title: title,
            body: body,
            tags: tags,
        };
    }
}

export { ReadArticleInputDto, ReadArticleOutputDto };
