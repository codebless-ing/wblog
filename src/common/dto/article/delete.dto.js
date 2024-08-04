import Joi from "joi";
import { BaseOutputDto } from "../dto.js";

class DeleteArticleInputDto {
    static SCHEMA = Joi.object({
        id: Joi.string().hex().length(24),
    });

    constructor(data) {
        this.id = data.id;
    }
}

class DeleteArticleOutputDto extends BaseOutputDto {
    data;

    constructor(_, success = true, info) {
        super(success, info);
    }
}

export { DeleteArticleInputDto, DeleteArticleOutputDto };
